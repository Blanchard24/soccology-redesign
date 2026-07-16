import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Users,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/content/site.config";

/** Icônes par audience (clés définies dans site.config). */
const ICONS: Record<string, LucideIcon> = {
  Users,
  GraduationCap,
  Handshake,
  HeartHandshake,
};

/**
 * « Who we help » — 4 parcours de conversion (BRIEF §5).
 * Style de carte unique de la Direction A : filet supérieur en accent,
 * numéro + icône, texte aligné à gauche, lien fléché. Bord franc, pas d'ombre.
 */
export function AudienceCards({ index = 2 }: { index?: number }) {
  const { audiences } = siteConfig;

  return (
    <section aria-label="Who we help" className="bg-background text-foreground">
      <div className="container-editorial py-20 md:py-28">
        <SectionHeading index={index} eyebrow="Who we help" title="Find your path" />

        <ul className="mt-14 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience, i) => {
            const Icon = ICONS[audience.icon] ?? Users;
            return (
              <li key={audience.id} className="bg-background">
                <Link
                  href={audience.href}
                  className="group flex h-full flex-col border-t-2 border-t-accent p-6 transition-colors hover:bg-surface-muted"
                >
                  <div className="flex items-center justify-between">
                    <span className="section-number text-lg">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <Icon className="h-6 w-6 text-accent" aria-hidden />
                  </div>

                  <h3 className="mt-8 font-heading text-xl font-bold leading-tight">
                    {audience.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">
                    {audience.description}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-1 font-heading text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                    Explore
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}