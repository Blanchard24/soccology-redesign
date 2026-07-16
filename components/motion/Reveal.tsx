"use client";

import { motion } from "framer-motion";
import { tokens } from "@/lib/tokens";
import { cn } from "@/lib/utils";

const { duration, ease, revealOffset } = tokens.motion;

/**
 * Apparition au scroll — fade + léger translate (DA §4, tokens.motion).
 *
 * `data-reveal` est le crochet du filet de sécurité sans JS : Framer pose
 * `opacity: 0` en style inline dès le rendu serveur, donc si le JS ne s'exécute
 * jamais le contenu resterait invisible. La règle `@media (scripting: none)`
 * dans globals.css le rend visible dans ce cas (un `!important` de feuille de
 * style l'emporte sur un style inline non-important).
 *
 * Pas de test `prefers-reduced-motion` ici : MotionConfig s'en charge en amont.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  /** Décalage en secondes — pour orchestrer à la main hors d'un <Stagger>. */
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: revealOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: duration.slow, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Conteneur de liste : décale l'apparition de chaque <StaggerItem> enfant.
 * Le décalage vit dans le parent (variants) plutôt que dans un `delay` calculé
 * au point d'appel — les enfants n'ont ainsi rien à savoir de leur index.
 */
export function Stagger({
  children,
  className,
  step = 0.08,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** Intervalle entre deux enfants (secondes). */
  step?: number;
  as?: "div" | "ul" | "ol";
}) {
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ visible: { transition: { staggerChildren: step } } }}
    >
      {children}
    </MotionTag>
  );
}

/** Enfant d'un <Stagger>. Doit être un descendant direct pour hériter des variants. */
export function StaggerItem({
  children,
  className,
  id,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** Ancre de navigation (ex. /about#pre-therapy). */
  id?: string;
  as?: "div" | "li";
}) {
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      data-reveal
      id={id}
      className={className}
      variants={{
        hidden: { opacity: 0, y: revealOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: duration.slow, ease },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Filet horizontal animé — l'élément SIGNATURE de la Direction A (§1.4),
 * tracé de gauche à droite à l'entrée dans le viewport.
 */
export function AnimatedRule({ className }: { className?: string }) {
  return (
    <motion.hr
      data-reveal
      className={cn("rule-line origin-left", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: duration.slow, ease }}
    />
  );
}
