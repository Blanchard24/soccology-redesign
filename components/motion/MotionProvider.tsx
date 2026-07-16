"use client";

import { MotionConfig } from "framer-motion";
import { tokens } from "@/lib/tokens";

/**
 * Fournit la configuration Motion globale (DA §4 : micro-interactions discrètes).
 *
 * `reducedMotion="user"` est la pièce maîtresse d'accessibilité : Framer Motion
 * neutralise alors de lui-même les animations de transform/layout pour les
 * utilisateurs `prefers-reduced-motion`, tout en conservant les fondus.
 *
 * On passe par là plutôt que de tester `useReducedMotion()` pour brancher le
 * rendu : ce hook renvoie `null` côté serveur et un booléen au premier rendu
 * client, ce qui fait diverger les deux arbres (l'erreur d'hydratation déjà
 * rencontrée sur le hero). MotionConfig agit sur l'animation, pas sur l'arbre
 * rendu — donc aucun risque de ce côté.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: tokens.motion.ease }}>
      {children}
    </MotionConfig>
  );
}
