import { siteConfig } from "@/content/site.config";

/**
 * Mur de partenaires (BRIEF §5 — preuve sociale).
 * NB : les vrais logos ne sont pas encore fournis. Pour éviter des images
 * cassées (défaut n°1 de l'ancien site, cf. BRIEF §3), on affiche les noms
 * en logotypes texte dans une grille bordée. Dès que les SVG réels seront
 * placés dans /public/images/partners/, remplacer par <Image>.
 */
export function PartnerLogos() {
  const { partners, ambassadors } = siteConfig;

  return (
    <section aria-label="Our partners" className="bg-background text-foreground">
      <div className="container-editorial py-16 md:py-20">
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Working with
        </p>

        <ul className="mt-6 grid grid-cols-1 border-t border-border sm:grid-cols-3">
          {partners.map((partner) => (
            <li
              key={partner.name}
              className="flex min-h-24 items-center border-b border-border px-2 py-6 sm:border-r sm:last:border-r-0"
            >
              <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                {partner.name}
              </span>
            </li>
          ))}
        </ul>

        {ambassadors.length > 0 && (
          <p className="mt-8 text-sm text-muted-foreground">
            With former professionals including{" "}
            {ambassadors.map((a, i) => (
              <span key={a.name} className="text-foreground">
                {a.name}
                <span className="text-faint-foreground"> ({a.note})</span>
                {i < ambassadors.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}