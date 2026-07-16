import * as THREE from "three";

/**
 * Génère la texture du ballon SANS aucun modèle ni asset externe
 * (cf. SPEC-BALLON-3D §4 : « sphère générée + texture », zéro fichier à charger).
 *
 * ⚠️ Contrainte juridique (SPEC §2) : ballon GÉNÉRIQUE, sans marque, sans logo,
 * sans texte. On dessine un motif classique de taches pentagonales sombres sur
 * fond crème chaud — évoque un ballon, ne copie aucune marque.
 *
 * Retourne une texture couleur (map) et une texture de relief (bumpMap) pour
 * les coutures/creux — le tout en projection équirectangulaire.
 */

// Couleurs alignées sur la Direction A (crème + encre). Littéraux limités à ce
// fichier "texture" ; les composants ne portent aucune couleur en dur.
const PAPER = "#EDE7DA";
const INK = "#161616";
const SEAM = "#0E0E0E";

/** Dessine un pentagone (pointe vers le haut) centré en (cx, cy). */
function pentagon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  rot: number,
) {
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a = rot - Math.PI / 2 + (i * 2 * Math.PI) / 5;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

type Spot = { u: number; v: number; r: number; rot: number };

/**
 * Répartit des taches sur une grille lat/long, densité ~ cos(latitude) pour
 * limiter l'accumulation aux pôles de la projection équirectangulaire.
 */
function buildSpots(w: number, h: number): Spot[] {
  const spots: Spot[] = [];
  const rows = 7; // bandes de latitude
  for (let row = 0; row < rows; row++) {
    const lat = (row + 0.5) / rows; // 0..1
    const y = lat * h;
    const polar = Math.sin(lat * Math.PI); // 0 aux pôles, 1 à l'équateur
    const count = Math.max(1, Math.round(6 * polar));
    const stagger = (row % 2) * 0.5;
    for (let i = 0; i < count; i++) {
      const u = ((i + stagger) / count) % 1;
      spots.push({
        u,
        v: lat,
        r: (0.045 + 0.02 * polar) * h,
        rot: (row * 0.7 + i * 1.3) % (Math.PI * 2),
      });
    }
    void y;
  }
  return spots;
}

function paint(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  spots: Spot[],
  mode: "color" | "bump",
) {
  // Fond
  ctx.fillStyle = mode === "color" ? PAPER : "#808080";
  ctx.fillRect(0, 0, w, h);

  // Coutures fines (grille hexagonale suggérée) — en relief sur la bump
  ctx.strokeStyle = mode === "color" ? "rgba(20,20,20,0.10)" : "#5a5a5a";
  ctx.lineWidth = mode === "color" ? 2 : 3;
  const cells = 12;
  for (let i = 0; i <= cells; i++) {
    const x = (i / cells) * w;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + (i % 2 ? w / cells / 2 : -w / cells / 2), h);
    ctx.stroke();
  }

  // Taches pentagonales (dupliquées pour le wrap horizontal)
  ctx.fillStyle = mode === "color" ? INK : "#141414";
  for (const s of spots) {
    for (const du of [-1, 0, 1]) {
      pentagon(ctx, (s.u + du) * w, s.v * h, s.r, s.rot);
    }
  }

  // Liseré des taches sur la bump pour un creux net
  if (mode === "bump") {
    ctx.strokeStyle = SEAM;
    ctx.lineWidth = 4;
    for (const s of spots) {
      for (const du of [-1, 0, 1]) {
        pentagon(ctx, (s.u + du) * w, s.v * h, s.r, s.rot);
        ctx.stroke();
      }
    }
  }
}

export type BallTextures = {
  map: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
  dispose: () => void;
};

/** Construit les textures (couleur + relief). À appeler côté client uniquement. */
export function createBallTextures(): BallTextures {
  const w = 1024;
  const h = 512;
  const spots = buildSpots(w, h);

  const make = (mode: "color" | "bump") => {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    paint(ctx, w, h, spots, mode);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace =
      mode === "color" ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.anisotropy = 4;
    tex.needsUpdate = true;
    return tex;
  };

  const map = make("color");
  const bumpMap = make("bump");

  return {
    map,
    bumpMap,
    dispose: () => {
      map.dispose();
      bumpMap.dispose();
    },
  };
}