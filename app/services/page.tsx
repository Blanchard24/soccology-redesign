import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { Placeholder } from "@/components/Placeholder";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/content/site.config";

const { servicesPage, services, audiences } = siteConfig;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Workshops, programmes, alternative interventions and staff training — football-led mental health work for schools, communities, prisons and clubs across the UK.",
  alternates: { canonical: "/services" },
};

/**
 * /services — BRIEF §5 : le détail des offres PAR FORMAT et PAR PUBLIC,
 * chaque service portant un CTA clair.
 *
 * ⚠️ Les ancres sont un contrat déjà pris par le reste du site :
 *   - site.config `services[].href` → /services#workshops, #programmes, …
 *   - `audiences[].href`           → /services#families, #schools, #partners
 * Ces `id` doivent donc exister ici, sinon les liens de la home tombent dans
 * le vide. `scroll-mt-24` compense le header sticky à l'arrivée sur l'ancre.
 *
 * Layout DA §3 : les blocs de format alternent image gauche / image droite
 * (`isEven`), au lieu d'empiler quatre fois la même composition.
 */
export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow={servicesPage.eyebrow}
        title={servicesPage.title}
        intro={servicesPage.intro}
      />

      {/* 01 — Par format : 4 blocs détaillés, composition alternée */}
      <section aria-label={servicesPage.byFormat.eyebrow} className="bg-background text-foreground">
        <div className="container-editorial py-20 md:py-28">
          <SectionHeading
            index={1}
            eyebrow={servicesPage.byFormat.eyebrow}
            title={servicesPage.byFormat.title}
          />

          <div className="mt-16 flex flex-col gap-20 md:gap-28">
            {services.map((service, i) => {
              const isEven = i % 2 === 0;
              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-24 grid grid-cols-1 gap-x-6 gap-y-10 border-t-2 border-border-strong pt-10 lg:grid-cols-12"
                >
                  {/* Colonne texte — bascule de côté un bloc sur deux */}
                  <div
                    className={cn(
                      "lg:col-span-6",
                      isEven ? "lg:col-start-1" : "lg:col-start-7 lg:row-start-1",
                    )}
                  >
                    <Reveal>
                      <div className="flex items-baseline gap-4">
                        <span className="section-number text-3xl leading-none md:text-4xl">
                          {(i + 1).toString().padStart(2, "0")}
                        </span>
                        <h3 className="font-heading text-2xl font-bold leading-tight md:text-3xl">
                          {service.title}
                        </h3>
                      </div>
                    </Reveal>

                    <Reveal delay={0.06}>
                      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                        {service.summary}
                      </p>
                    </Reveal>

                    {/* Public visé — label discret, pas une icône décorative */}
                    <Reveal delay={0.1}>
                      <p className="mt-6 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        For: <span className="text-foreground">{service.audience}</span>
                      </p>
                    </Reveal>

                    <Stagger as="ul" className="mt-8 flex flex-col" step={0.06}>
                      {service.includes.map((item) => (
                        <StaggerItem
                          as="li"
                          key={item}
                          className="flex gap-4 border-t border-border py-3 text-sm"
                        >
                          <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-accent" />
                          <span className="text-muted-foreground">{item}</span>
                        </StaggerItem>
                      ))}
                    </Stagger>

                    <Reveal delay={0.12}>
                      <Button asChild size="lg" className="mt-8">
                        <Link href={service.cta.href}>
                          {service.cta.label}
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                      </Button>
                    </Reveal>
                  </div>

                  {/* Colonne image */}
                  <Reveal
                    delay={0.08}
                    className={cn(
                      "lg:col-span-5",
                      isEven ? "lg:col-start-8" : "lg:col-start-1 lg:row-start-1",
                    )}
                  >
                    <Placeholder
                      label={service.imageLabel}
                      tone={isEven ? "muted" : "deep"}
                      ratio="landscape"
                    />
                  </Reveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 02 — Par public : fond vert, ancres #families / #schools / #partners */}
      <section
        aria-label={servicesPage.byAudience.eyebrow}
        data-theme="dark"
        className="bg-background text-foreground"
      >
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeading
                index={2}
                eyebrow={servicesPage.byAudience.eyebrow}
                title={servicesPage.byAudience.title}
              />
            </div>
            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:self-end">
              <p className="max-w-md text-muted-foreground">{servicesPage.byAudience.intro}</p>
            </Reveal>
          </div>

          <Stagger as="ul" className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2" step={0.08}>
            {audiences.map((audience, i) => (
              <StaggerItem as="li" key={audience.id} id={audience.id} className="scroll-mt-24">
                <Link
                  href={audience.href}
                  className="group flex h-full flex-col border border-border border-t-2 border-t-accent bg-surface p-8 transition-colors hover:bg-surface-muted"
                >
                  <span className="section-number text-lg">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <div className="mt-6 flex items-start justify-between gap-3">
                    <h3 className="font-heading text-xl font-bold leading-tight">
                      {audience.title}
                    </h3>
                    <ArrowUpRight
                      className="mt-1 h-5 w-5 shrink-0 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">
                    {audience.description}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA final */}
      <section aria-label="Get involved" className="bg-accent text-accent-foreground">
        <div className="container-editorial flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <AnimatedHeading
            as="h2"
            text={servicesPage.cta.title}
            className="display-title max-w-2xl text-3xl leading-[1.05] md:text-5xl"
          />
          <Reveal delay={0.1} className="shrink-0">
            <Button asChild variant="support" size="lg">
              <Link href={servicesPage.cta.href}>{servicesPage.cta.label}</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
