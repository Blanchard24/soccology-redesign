import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { Placeholder } from "@/components/Placeholder";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site.config";

const { aboutPage, methodPillars } = siteConfig;

export const metadata: Metadata = {
  title: "About",
  description:
    "How Soccology uses football as a therapeutic frame to reach people conventional mental-health services miss — and the four pillars behind the method.",
  alternates: { canonical: "/about" },
};

/**
 * /about — BRIEF §5 : fusionne les deux anciennes pages "About" (l'ancien site
 * avait /about ET /about-us-sonora). Histoire → approche thérapeutique du
 * football → 4 piliers de méthode → CTA.
 *
 * Layout DA §3 — chaque section change de composition pour créer du rythme :
 *   ouverture sombre → split 7/5 → split inversé sur fond vert → liste
 *   éditoriale numérotée → bandeau accent.
 * Les 4 piliers sont des RANGÉES, pas des cartes : la carte à filet est déjà
 * prise par ServiceCard, et la DA impose un seul style de carte.
 */
export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={aboutPage.eyebrow}
        title={aboutPage.title}
        intro={aboutPage.intro}
      />

      {/* Bandeau image pleine largeur — rupture de densité après l'ouverture */}
      <Reveal>
        <Placeholder
          label={aboutPage.heroImageLabel}
          tone="deep"
          ratio="wide"
          className="border-x-0 border-t-0"
        />
      </Reveal>

      {/* 01 — Notre histoire : split 6/5, texte à gauche, image décalée à droite */}
      <section aria-label={aboutPage.story.eyebrow} className="bg-background text-foreground">
        <div className="container-editorial grid grid-cols-1 gap-x-6 gap-y-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading
              index={1}
              eyebrow={aboutPage.story.eyebrow}
              title={aboutPage.story.title}
            />
            <div className="mt-8 flex flex-col gap-6">
              {aboutPage.story.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className="max-w-xl text-muted-foreground">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <Placeholder label={aboutPage.story.imageLabel} tone="muted" ratio="portrait" />
          </Reveal>
        </div>
      </section>

      {/* 02 — Approche : fond vert « terrain », split INVERSÉ (image à gauche) */}
      <section
        aria-label={aboutPage.approach.eyebrow}
        data-theme="dark"
        className="bg-background text-foreground"
      >
        <div className="container-editorial grid grid-cols-1 gap-x-6 gap-y-12 py-20 md:py-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-5 lg:row-start-1">
            <Placeholder label={aboutPage.approach.imageLabel} tone="support" ratio="landscape" />
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <SectionHeading
              index={2}
              eyebrow={aboutPage.approach.eyebrow}
              title={aboutPage.approach.title}
            />
            <div className="mt-8 flex flex-col gap-6">
              {aboutPage.approach.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className="max-w-xl text-muted-foreground">{p}</p>
                </Reveal>
              ))}
            </div>

            {/* Garde-fou : ne jamais laisser croire à un substitut au soin. */}
            <Reveal delay={0.12}>
              <div className="mt-10 border-l-2 border-l-accent bg-surface-muted p-6">
                <p className="text-sm text-foreground">{aboutPage.approach.disclaimer}</p>
                <Link
                  href={aboutPage.approach.disclaimerCta.href}
                  className="group mt-4 inline-flex items-center gap-2 font-heading text-sm font-semibold text-accent"
                >
                  {aboutPage.approach.disclaimerCta.label}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 — Les 4 piliers : rangées éditoriales numérotées, pas des cartes */}
      <section aria-label={aboutPage.pillars.eyebrow} className="bg-surface-muted text-foreground">
        <div className="container-editorial py-20 md:py-28">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeading
                index={3}
                eyebrow={aboutPage.pillars.eyebrow}
                title={aboutPage.pillars.title}
              />
            </div>
            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:self-end">
              <p className="max-w-md text-muted-foreground">{aboutPage.pillars.intro}</p>
            </Reveal>
          </div>

          <Stagger as="ol" className="mt-16 flex flex-col" step={0.1}>
            {methodPillars.map((pillar, i) => (
              <StaggerItem
                as="li"
                key={pillar.id}
                id={pillar.id}
                className="scroll-mt-24 border-t border-border-strong py-10 first:border-t-2"
              >
                <div className="grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-12">
                  {/* Numéro géant — signature Direction A */}
                  <p className="section-number text-5xl leading-none md:text-6xl lg:col-span-2">
                    {(i + 1).toString().padStart(2, "0")}
                  </p>

                  <div className="lg:col-span-4">
                    <h3 className="font-heading text-2xl font-bold leading-tight md:text-3xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>

                  <p className="max-w-xl text-muted-foreground lg:col-span-6 lg:col-start-7">
                    {pillar.detail}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA final — bandeau accent, même famille que la home */}
      <section aria-label="Work with us" className="bg-accent text-accent-foreground">
        <div className="container-editorial flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <AnimatedHeading
            as="h2"
            text={aboutPage.cta.title}
            className="display-title max-w-2xl text-3xl leading-[1.05] md:text-5xl"
          />
          <Reveal delay={0.1} className="shrink-0">
            <Button asChild variant="support" size="lg">
              <Link href={aboutPage.cta.href}>{aboutPage.cta.label}</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
