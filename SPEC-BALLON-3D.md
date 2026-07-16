# Spec technique — Ballon 3D animé (Hero)

> Document destiné à Claude Code. À lire avec BRIEF-soccology-refonte.md et DIRECTION-ARTISTIQUE.md.
> Objectif : un ballon de football 3D dans le hero de la page d'accueil, en rotation continue lente, dont le mouvement est amplifié et piloté par le scroll.

---

## 1. Comportement attendu

**État de repos (sans scroll)**
- Le ballon tourne lentement sur lui-même en continu (rotation douce sur l'axe Y, légère inclinaison sur X).
- Flottement subtil (léger mouvement vertical, type "idle float").

**Au scroll**
- La rotation s'accélère proportionnellement à la vitesse de défilement.
- Le ballon translate verticalement et/ou se décale légèrement (parallaxe).
- Il peut réduire d'échelle et s'estomper en sortant du hero, pour laisser place au contenu.

**Ressenti visé :** premium, fluide, maîtrisé. Pas gadget. Le ballon doit soutenir le message, pas le voler.

---

## 2. Contrainte juridique IMPORTANTE

⚠️ **Ne PAS utiliser un ballon de marque** (Adidas Al Rihla, Jabulani, Brazuca, Telstar, etc.) ni aucun logo FIFA / Coupe du Monde / club.
Utiliser un **ballon générique sans marque**. Modèle classique (pentagones/hexagones) ou design neutre. Aucun texte, aucun logo sur la texture.

---

## 3. Stack technique

- **React Three Fiber** (`@react-three/fiber`) — wrapper React pour Three.js.
- **Drei** (`@react-three/drei`) — helpers (chargement GLTF, environnement, contrôles).
- **Framer Motion** (`framer-motion`) — pour lier le scroll (`useScroll`, `useTransform`) et les animations DOM.
- Alternative si perf insuffisante : voir §7 (plan de repli).

Installation :
```bash
npm install three @react-three/fiber @react-three/drei framer-motion
```

---

## 4. Assets nécessaires

**Modèle 3D**
- Format : `.glb` (compressé, optimisé web).
- Source : Sketchfab / Poly Haven / modèles libres de droits — vérifier la licence (CC0 ou CC-BY).
- **Optimisation obligatoire :** passer le modèle dans `gltf-transform` ou `gltfjsx` pour réduire le poids. Cible : **< 1.5 Mo**.
- Placer dans `/public/models/football.glb`.

**Alternative sans modèle 3D** (souvent suffisante et plus légère) :
Générer la sphère directement en code avec une géométrie Three.js + une **texture de ballon** (image équirectangulaire d'un motif pentagone/hexagone, ou texture générée). Zéro modèle à charger, poids minimal.
→ **Commencer par cette approche.** Ne passer au modèle GLB que si le rendu n'est pas satisfaisant.

**Textures à prévoir** (si sphère générée) :
- `/public/textures/ball-color.jpg` — la couleur/motif
- `/public/textures/ball-normal.jpg` — le relief (coutures) — optionnel mais fait beaucoup pour le réalisme
- `/public/textures/ball-roughness.jpg` — optionnel

---

## 5. Implémentation

### Structure de composants
```
/components
  /hero
    Hero.tsx              # le hero complet (texte + canvas)
    BallCanvas.tsx        # le <Canvas> R3F + éclairage + suspense
    Ball.tsx              # le mesh du ballon + logique d'animation
    useScrollRotation.ts  # hook liant scroll → rotation
```

### Logique d'animation (principe)

**Dans `Ball.tsx` :**
- Utiliser `useFrame` pour la rotation continue de base :
  ```
  meshRef.current.rotation.y += delta * BASE_SPEED
  meshRef.current.rotation.x += delta * BASE_SPEED * 0.3
  ```
- Ajouter un flottement idle : `position.y = Math.sin(clock.elapsedTime) * AMPLITUDE`
- Lire la progression de scroll (via un store léger ou un contexte alimenté par `useScroll` de Framer Motion) et l'appliquer :
  - rotation additionnelle proportionnelle au scroll,
  - translation Y,
  - scale et opacité décroissantes en sortie de hero.

**Lissage indispensable :** interpoler les valeurs (lerp / `damp`) pour éviter les à-coups. Une animation scroll non lissée fait immédiatement "amateur".

### Éclairage (crucial pour le rendu premium)
- Une `directionalLight` principale (key light) chaude.
- Une `ambientLight` faible pour ne pas écraser les ombres.
- Un `Environment` (drei) en preset sombre pour les reflets — donne du réalisme instantanément.
- Cohérent avec la Direction A : ambiance sombre, accent orange.

---

## 6. Performance (non négociable)

- **`<Canvas dpr={[1, 2]}>`** pour limiter le pixel ratio.
- **Lazy-load du canvas** : `next/dynamic` avec `ssr: false` (Three.js ne doit pas s'exécuter côté serveur).
- **Pause du rendu hors viewport** : `frameloop="demand"` ou désactiver quand le hero n'est plus visible.
- Réduire la géométrie sur mobile (moins de segments sur la sphère).
- Fallback statique (image PNG du ballon) pendant le chargement, via `<Suspense>`.
- Cible : ne pas dégrader le LCP. Le texte du hero doit s'afficher **immédiatement**, indépendamment du canvas.

---

## 7. Accessibilité

- Respecter **`prefers-reduced-motion`** : si l'utilisateur l'a activé, désactiver la rotation et le scroll-driven, afficher une image statique du ballon.
- Le canvas est **purement décoratif** → `aria-hidden="true"`.
- Le contenu du hero (titre, CTA) doit être entièrement lisible et fonctionnel même si le canvas ne charge pas.

---

## 8. Plan de repli (si 3D trop lourde ou rendu décevant)

**Repli 1 — Sprite sheet :** séquence d'images du ballon sous N angles, jouée selon la progression du scroll. Effet de rotation crédible, très léger.

**Repli 2 — CSS/Framer Motion 2D :** PNG détouré du ballon, animé en rotation + translation. Le plus simple, mais rendu plus plat (les motifs ne s'enroulent pas autour de la sphère).

Décider après un test réel de performance sur mobile.

---

## 9. Intégration dans le hero (Direction A)

Le ballon ne doit **pas** être centré comme un logo. Composition suggérée :
- Titre massif aligné à gauche (typo condensée, très grand).
- Ballon en grand sur la droite / en arrière-plan partiel, débordant du cadre.
- Un seul CTA primaire net.
- Fond sombre, accent orange conforme aux tokens.

---

## 10. Instruction de démarrage

> "Lis SPEC-BALLON-3D.md. Implémente le hero avec React Three Fiber. Commence par l'approche sphère générée + textures (§4, alternative), pas par un modèle GLB. Lie la rotation au scroll via Framer Motion avec lissage. Respecte les contraintes de performance (§6) et d'accessibilité (§7) — elles ne sont pas optionnelles. Le texte du hero doit être visible immédiatement, indépendamment du canvas."
