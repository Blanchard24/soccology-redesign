import { cn } from "@/lib/utils";
import { Reveal, AnimatedRule } from "@/components/motion/Reveal";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";

/**
 * Titre de section — élément SIGNATURE de la Direction A.
 * Numéro « 0X » en accent + filet horizontal fin + titre aligné à gauche.
 * Réutilisé par toutes les sections pour créer le rythme éditorial.
 *
 * Animé en trois temps (DA §1.4 : une idée graphique déclinée partout) —
 * le numéro apparaît, le filet se trace, puis le titre monte mot à mot.
 * Reste un Server Component : il ne fait que composer des enfants client.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  className,
  as: Heading = "h2",
}: {
  /** Numéro de section (1 → "01"). */
  index: number;
  /** Sur-titre optionnel (majuscules, tracké). */
  eyebrow?: string;
  title: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="section-number text-2xl md:text-3xl">
            {index.toString().padStart(2, "0")}
          </span>
          {eyebrow && (
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {eyebrow}
            </span>
          )}
        </div>
      </Reveal>

      <AnimatedRule className="mt-4" />

      <AnimatedHeading
        as={Heading}
        text={title}
        className="mt-6 max-w-3xl font-heading text-3xl font-bold leading-[1.05] md:text-4xl"
      />
    </div>
  );
}
