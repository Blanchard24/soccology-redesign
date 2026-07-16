"use client";

import { motion } from "framer-motion";
import { tokens } from "@/lib/tokens";

const { duration, ease } = tokens.motion;

type HeadingTag = "h1" | "h2" | "h3" | "p";

/**
 * Titre à révélation mot par mot — chaque mot monte derrière un masque.
 * Réservé aux gros titres éditoriaux (DA §1.1 : la typo est le levier n°1).
 *
 * Deux détails qui font la différence entre « pro » et « bricolé » :
 *
 * 1. Jambages. Le masque est un `overflow-hidden`, or `.display-title` tourne
 *    en `line-height: .92` : la boîte est PLUS COURTE que le glyphe, donc le
 *    « g » de « Language » serait tranché net. D'où le `pb-[0.16em]` qui rouvre
 *    le masque vers le bas, annulé par `-mb-[0.16em]` pour ne pas décaler la
 *    ligne de base.
 * 2. Cette marge basse ré-ouvre une fente par laquelle le sommet du mot resterait
 *    visible à l'état caché — le mot part donc à 120% et non à 100%.
 *
 * L'espace est une INSÉCABLE placée dans le mot : un espace ordinaire en fin
 * d'inline-block serait supprimé par la collapse, et les mots se colleraient.
 *
 * Le texte reste du vrai texte dans le DOM (lisible par les lecteurs d'écran et
 * les moteurs). `prefers-reduced-motion` est géré par MotionConfig en amont.
 */
export function AnimatedHeading({
  text,
  as: Tag = "h2",
  className,
  step = 0.06,
}: {
  text: string;
  as?: HeadingTag;
  className?: string;
  /** Intervalle entre deux mots (secondes). */
  step?: number;
}) {
  const MotionTag = motion[Tag];
  const words = text.split(" ");

  return (
    <MotionTag
      data-reveal
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ visible: { transition: { staggerChildren: step } } }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.16em] -mb-[0.16em] align-bottom"
        >
          <motion.span
            // `data-reveal` DOIT être ici, et pas seulement sur le titre parent :
            // c'est ce span-ci qui porte le translate, et c'est lui que le filet
            // `@media (scripting: none)` doit remettre à zéro. Sans ce marqueur,
            // le titre garde bien sa hauteur mais ses mots restent poussés hors
            // du masque `overflow-hidden` — un titre invisible qui occupe sa place.
            data-reveal
            className="inline-block"
            variants={{
              hidden: { y: "120%" },
              visible: { y: 0, transition: { duration: duration.slow, ease } },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
