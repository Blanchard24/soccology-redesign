import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { siteConfig } from "@/content/site.config";

const { contactPage, contact, social, nav } = siteConfig;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Soccology — for schools, families, partners, donors and media. Tell us how we can help.",
  alternates: { canonical: "/contact" },
};

/**
 * /contact — BRIEF §5 : formulaire fonctionnel + coordonnées + réseaux sociaux.
 *
 * ⚠️ Ancres = contrats pris ailleurs dans le site :
 *   - `nav.cta.href`      → /contact#support  (CTA du header, sur toutes les pages)
 *   - `services[].cta`    → /contact#enquiry  (CTA de chaque service)
 *
 * Coordonnées : `contact.email` / `contact.phone` sont VIDES dans la config —
 * volontairement, elles n'ont pas été fournies. On n'invente pas une adresse et
 * on ne rend surtout pas un `mailto:` vide (lien mort) : le composant affiche un
 * état « à fournir » explicite tant que la donnée manque.
 *
 * Réseaux sociaux : tous en `#` avec TODO — l'ancien site pointait vers les
 * comptes SQUARESPACE (BRIEF §3, erreur grave). Mieux vaut un lien neutre
 * qu'un lien faux. Libellés en TEXTE et non en icônes : la DA §0 proscrit les
 * icônes décoratives sans fonction, et le texte est plus éditorial.
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow={contactPage.eyebrow}
        title={contactPage.title}
        intro={contactPage.intro}
      />

      {/* 01 — Formulaire (7 col) + coordonnées (4 col) : split, jamais centré */}
      <section
        id="enquiry"
        aria-label={contactPage.formHeading}
        className="scroll-mt-24 bg-background text-foreground"
      >
        <div className="container-editorial grid grid-cols-1 gap-x-6 gap-y-16 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading index={1} eyebrow="Enquiries" title={contactPage.formHeading} />
            <Reveal delay={0.1}>
              <div className="mt-10">
                <ContactForm />
              </div>
            </Reveal>
          </div>

          {/* Coordonnées + réseaux — colonne décalée */}
          <div className="lg:col-span-4 lg:col-start-9">
            <SectionHeading index={2} eyebrow="Details" title={contactPage.detailsHeading} />

            <Stagger as="ul" className="mt-10 flex flex-col" step={0.06}>
              <ContactDetail label="Location" value={contact.location} />
              <ContactDetail label="Email" value={contact.email} href={`mailto:${contact.email}`} />
              <ContactDetail label="Phone" value={contact.phone} href={`tel:${contact.phone}`} />
            </Stagger>

            <h3 className="mt-12 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Follow
            </h3>
            <Stagger as="ul" className="mt-4 flex flex-col" step={0.05}>
              {social.map((link) => (
                <StaggerItem
                  as="li"
                  key={link.platform}
                  className="border-t border-border first:border-t-2 first:border-t-border-strong"
                >
                  <a
                    href={link.href}
                    className="group relative flex items-center justify-between py-3 font-heading text-sm font-semibold text-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                    {/* TODO(client): remplacer `#` par l'URL réelle (site.config.ts §3). */}
                    <span className="font-sans text-xs font-normal text-faint-foreground">
                      TODO
                    </span>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* 02 — Soutien : cible du CTA « Support us » présent sur tout le site.
          Volontairement en CRÈME et non en sombre : le bandeau « ressources
          d'urgence » du footer est déjà `data-theme="dark"`, deux aplats verts
          consécutifs fusionneraient en une seule masse et le vide de la section
          passerait pour de l'espace mort (exactement le reproche fait à
          l'ancien site, BRIEF §3). */}
      <section
        id="support"
        aria-label={contactPage.supportHeading}
        className="scroll-mt-24 border-t border-border bg-surface-muted text-foreground"
      >
        <div className="container-editorial grid grid-cols-1 gap-x-6 gap-y-8 py-20 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading index={3} eyebrow="Support" title={contactPage.supportHeading} />
          </div>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="max-w-md text-muted-foreground">{contactPage.supportBody}</p>
            <Link
              href="#enquiry"
              className="group mt-6 inline-flex items-center gap-2 font-heading text-sm font-semibold text-accent"
            >
              Tell us how you&apos;d like to help
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
            {/* Le CTA global pointe ici ; on garde le libellé de la config. */}
            <span className="sr-only">{nav.cta.label}</span>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/**
 * Ligne de coordonnée. Si la valeur n'est pas encore fournie, on affiche un
 * état « à fournir » plutôt qu'un lien mort (`mailto:` vide) — cf. BRIEF §3,
 * l'ancien site était truffé de liens cassés.
 */
function ContactDetail({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const provided = value.trim().length > 0;

  return (
    <StaggerItem
      as="li"
      className="border-t border-border py-3 first:border-t-2 first:border-t-border-strong"
    >
      <span className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      <div className="mt-1">
        {provided && href ? (
          <a
            href={href}
            className="font-heading text-sm font-semibold text-foreground transition-colors hover:text-accent"
          >
            {value}
          </a>
        ) : provided ? (
          <span className="font-heading text-sm font-semibold text-foreground">{value}</span>
        ) : (
          // TODO(client): renseigner dans site.config.ts §4 — ne pas inventer.
          <span className="font-sans text-sm text-faint-foreground">
            To be provided <span className="text-xs">(TODO)</span>
          </span>
        )}
      </div>
    </StaggerItem>
  );
}
