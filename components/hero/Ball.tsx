"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { createBallTextures } from "./ballTexture";

/** Nombre de tours complets effectués sur toute la traversée du hero. */
const TURNS = 1.5;
/** Inclinaison fixe de l'axe de rotation (donne du relief au ballon au repos). */
const TILT_X = 0.35;

/**
 * Ballon — sphère générée + texture procédurale (SPEC §5).
 *
 * La rotation est ABSOLUE : elle est fonction de la progression du scroll, et
 * non du temps. Sans scroll, `progress` est constant → le ballon est
 * strictement immobile (aucune rotation continue, aucun flottement idle).
 *
 * `progress` est déjà lissé en amont (useSpring dans Hero), ce qui évite les
 * à-coups : on peut donc l'appliquer directement, sans amortissement ici.
 * La traversée diagonale à l'écran est portée par le conteneur DOM (Hero) ;
 * ce composant ne gère que la rotation, l'échelle et le fondu.
 */
export function Ball({
  progress,
  segments = 64,
}: {
  /** Progression de scroll du hero (0 → 1), lissée, fournie par Framer Motion. */
  progress: MotionValue<number>;
  segments?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  const invalidate = useThree((state) => state.invalidate);

  const textures = useMemo(() => createBallTextures(), []);
  useEffect(() => () => textures.dispose(), [textures]);

  // Le canvas rend à la demande : on ne redessine que quand le scroll bouge
  // (le ballon étant immobile au repos, une boucle continue ne peindrait que
  // des images identiques). `invalidate` prend un nombre d'images en argument,
  // d'où le wrapper — lui passer la valeur du MotionValue serait un bug.
  useEffect(() => progress.on("change", () => invalidate()), [progress, invalidate]);

  useFrame(() => {
    const sp = progress.get();

    if (meshRef.current) {
      meshRef.current.rotation.y = sp * TURNS * Math.PI * 2;
      meshRef.current.rotation.x = TILT_X + sp * 0.6;
    }

    if (groupRef.current) {
      groupRef.current.scale.setScalar(1 - sp * 0.25);
    }

    if (matRef.current) {
      matRef.current.opacity = 1 - sp * 0.9; // s'estompe pour libérer le contenu
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} castShadow={false} receiveShadow={false}>
        <sphereGeometry args={[1.6, segments, Math.max(16, segments / 2)]} />
        <meshStandardMaterial
          ref={matRef}
          map={textures.map}
          bumpMap={textures.bumpMap}
          bumpScale={0.015}
          roughness={0.5}
          metalness={0.05}
          envMapIntensity={0.7}
          transparent
        />
      </mesh>
    </group>
  );
}
