import { siteConfig } from "@/content/site.config";

/**
 * Bandeau statistique d'impact — chiffres RÉELS uniquement (BRIEF §2/§5).
 * Composition en split horizontal : très grand nombre (Anton) à gauche,
 * libellé à droite, séparés par un filet. Aligné à gauche, pas centré.
 */
export function StatBanner() {
  const stats = [...siteConfig.impactStats];
  if (stats.length === 0) return null;

  return (
    <section
      aria-label="Our impact in numbers"
      className="bg-surface-deep text-foreground"
    >
      <div className="container-editorial py-20 md:py-24">
        <ul className="flex flex-col gap-14">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="grid grid-cols-1 items-end gap-6 border-t border-border-strong pt-8 md:grid-cols-12"
            >
              <p className="display-title text-6xl leading-none text-accent md:col-span-4 md:text-7xl">
                {stat.value}
              </p>
              <p className="max-w-xl font-heading text-xl font-medium leading-snug text-foreground md:col-span-7 md:col-start-6 md:text-2xl">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}