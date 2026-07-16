import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content/site.config";
import { EmergencyResources } from "@/components/EmergencyResources";

/**
 * Pied de page — Direction A.
 * Intègre le bloc ressources d'urgence (accessible depuis le footer, BRIEF §5).
 * Liens sociaux : uniquement ceux réellement renseignés (href non vide) —
 * on n'affiche jamais de placeholder inventé.
 */
export function Footer() {
  const { identity, nav, social, contact } = siteConfig;
  const year = new Date().getFullYear();

  // On ne montre que les réseaux dont l'URL est fournie.
  // Placeholders `#` affichés en attendant les vraies URLs (jamais inventées).
  // Un lien réel (http…) s'ouvre dans un nouvel onglet ; un `#` reste inerte.
  const activeSocial = social.filter((s) => s.href !== "");

  return (
    <footer className="mt-auto">
      {/* Ressources d'urgence santé mentale */}
      <EmergencyResources />

      {/* Corps du footer */}
      <div className="border-t border-border bg-surface text-foreground">
        <div className="container-editorial py-14 md:py-16">
          <div className="grid gap-10 md:grid-cols-12">
            {/* Marque */}
            <div className="md:col-span-5">
              <Link
                href="/"
                className="display-title text-3xl leading-none text-foreground"
                aria-label={`${identity.name} — home`}
              >
                {identity.name}
              </Link>
              <p className="mt-4 max-w-sm text-muted-foreground">
                {identity.tagline}
              </p>

              {activeSocial.length > 0 && (
                <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {activeSocial.map((s) => {
                    const isReal = s.href.startsWith("http");
                    return (
                      <li key={s.platform}>
                        <a
                          href={s.href}
                          {...(isReal
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="group inline-flex items-center gap-1 font-heading text-sm font-semibold text-foreground transition-colors hover:text-accent"
                        >
                          {s.label}
                          <ArrowUpRight
                            className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Navigation */}
            <nav
              aria-label="Footer"
              className="md:col-span-4 md:col-start-7"
            >
              <h2 className="section-number text-sm">01</h2>
              <p className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Explore
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                {nav.footer.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-foreground underline-offset-4 hover:text-accent hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div className="md:col-span-2">
              <p className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Contact
              </p>
              <address className="not-italic text-sm text-foreground">
                {contact.location}
                {contact.email !== "" && (
                  <>
                    <br />
                    <a
                      href={`mailto:${contact.email}`}
                      className="hover:text-accent"
                    >
                      {contact.email}
                    </a>
                  </>
                )}
              </address>
            </div>
          </div>

          {/* Filet + barre légale */}
          <hr className="rule-line mt-12" />
          <div className="mt-6 flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {identity.name}. {identity.legalStatus}
            </p>
            <ul className="flex items-center gap-5">
              <li>
                <Link href="/privacy" className="hover:text-accent">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/legal" className="hover:text-accent">
                  Legal
                </Link>
              </li>
              <li>
                <Link href="/get-help" className="hover:text-accent">
                  Get help
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}