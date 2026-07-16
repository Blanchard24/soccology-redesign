import { Hero } from "@/components/Hero";
import { StatBanner } from "@/components/StatBanner";
import { PartnerLogos } from "@/components/PartnerLogos";
import { AudienceCards } from "@/components/AudienceCards";
import { ServiceCard } from "@/components/ServiceCard";
import { FlagshipPreview } from "@/components/FlagshipPreview";
import { BlogPreview } from "@/components/BlogPreview";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { MarqueeBand } from "@/components/MarqueeBand";
import { siteConfig } from "@/content/site.config";

/**
 * Accueil — structure BRIEF §5, dans l'ordre :
 *   Hero → bandeau stat d'impact → How we work → mur de logos partenaires →
 *   Who we help → aperçu projet phare → aperçu blog → CTA final + contact.
 *
 * Règles de layout DA §3 : alternance des compositions, grille éditoriale,
 * jamais tout centré. Hero en version STATIQUE (ballon 3D branché plus tard).
 */
export default function HomePage() {
  const { services, contact, homePage } = siteConfig;

  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Bandeau stat d'impact */}
      <StatBanner />

      {/* 3. How we work (formats de service) — split 2 colonnes */}
      <section aria-label="How we work" className="bg-surface-muted text-foreground">
        <div className="container-editorial grid grid-cols-1 gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading index={1} eyebrow="Services" title="How we work" />
            <p className="mt-6 max-w-sm text-muted-foreground">
              Football-led interventions, by format and by audience — each with a
              clear next step.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {services.map((service, i) => (
              <li key={service.id}>
                <ServiceCard
                  index={i + 1}
                  title={service.title}
                  description={service.description}
                  href={service.href}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Mur de logos partenaires */}
      <PartnerLogos />

      {/* 5. Who we help — grille 4 colonnes */}
      <AudienceCards index={2} />

      {/* 6. Aperçu du projet phare — Keep The Dream Alive! (sombre, split) */}
      <FlagshipPreview index={3} />

      {/* 7. Aperçu blog */}
      <BlogPreview index={4} posts={[]} />

      {/* 8a. Bande déroulante — respiration typographique avant le contact.
          Le CTA de conversion est assuré juste en dessous par le formulaire
          (et en permanence par le « Support us » du header). */}
      <MarqueeBand text={homePage.marquee.text} />

      {/* 8b. Formulaire de contact court — split */}
      <section
        id="contact"
        aria-label="Contact"
        className="bg-surface-muted text-foreground"
      >
        <div className="container-editorial grid grid-cols-1 gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading index={5} eyebrow="Contact" title="Start a conversation" />
            <p className="mt-6 max-w-sm text-muted-foreground">
              Whether you&apos;re a family, a school, a partner or a supporter —
              tell us how we can help.
            </p>
            <p className="mt-6 text-sm text-muted-foreground">{contact.location}</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}