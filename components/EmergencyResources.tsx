import { LifeBuoy, Phone } from "lucide-react";
import { siteConfig } from "@/content/site.config";

/**
 * Bloc ressources d'urgence santé mentale (BRIEF §5 — transversal).
 * Attendu sur ce type de site : lignes d'écoute UK réelles, affichées
 * clairement. Rendu en thème sombre "terrain" pour l'ancrage visuel.
 * Rôle sémantique `region` + libellé pour l'accessibilité.
 */
export function EmergencyResources() {
  const { intro, lines } = siteConfig.emergencyResources;

  return (
    <section
      data-theme="dark"
      aria-labelledby="emergency-heading"
      className="bg-background text-foreground"
    >
      <div className="container-editorial py-12 md:py-14">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
          <div className="flex items-center gap-3 md:w-1/3">
            <LifeBuoy className="h-6 w-6 shrink-0 text-accent" aria-hidden />
            <div>
              <h2
                id="emergency-heading"
                className="font-heading text-xl font-bold"
              >
                Need help now?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{intro}</p>
            </div>
          </div>

          <ul className="grid flex-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            {lines.map((line) => (
              <li key={line.name} className="border-t border-border pt-3">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-heading font-semibold">{line.name}</h3>
                  <a
                    href={line.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground underline-offset-4 hover:text-accent hover:underline"
                  >
                    Website
                  </a>
                </div>
                <a
                  href={line.href}
                  className="mt-1 inline-flex items-center gap-2 text-sm text-foreground hover:text-accent"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden />
                  {line.detail}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}