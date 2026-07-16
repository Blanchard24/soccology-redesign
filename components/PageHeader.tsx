import { Reveal, AnimatedRule } from "@/components/motion/Reveal";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";

/**
 * Ouverture de page — signature commune à toutes les pages intérieures.
 *
 * Fond sombre « terrain » comme le hero : le visiteur reconnaît une ouverture
 * de page, puis les sections suivantes repassent en crème (alternance DA §3).
 *
 * Composition volontairement asymétrique et JAMAIS centrée (DA §0/§3) : titre
 * display massif sur 8 colonnes à gauche, chapô calé en bas à droite sur 4.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section data-theme="dark" className="bg-background text-foreground">
      <div className="container-editorial grid grid-cols-1 items-end gap-x-6 gap-y-10 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Reveal>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              {eyebrow}
            </span>
          </Reveal>

          <AnimatedRule className="mt-4" />

          <AnimatedHeading
            as="h1"
            text={title}
            className="display-title mt-8 text-4xl sm:text-5xl md:text-6xl"
          />
        </div>

        <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
          <p className="max-w-md text-lg text-muted-foreground">{intro}</p>
        </Reveal>
      </div>
    </section>
  );
}
