import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site.config";

/**
 * Aperçu du projet phare — Keep The Dream Alive! (BRIEF §5).
 * Section immersive en thème sombre « terrain », composition split :
 * texte + CTA à gauche, panneau visuel signature à droite (emplacement photo
 * réservé, aria-hidden — pas d'image cassée tant que les vraies photos ne sont
 * pas fournies).
 */
export function FlagshipPreview({ index = 3 }: { index?: number }) {
  const { flagshipProject } = siteConfig;

  return (
    <section
      data-theme="dark"
      aria-label="Flagship project"
      className="bg-background text-foreground"
    >
      <div className="container-editorial grid grid-cols-1 items-center gap-12 py-20 md:py-28 lg:grid-cols-12">
        {/* Texte */}
        <div className="lg:col-span-6">
          <div className="flex items-center gap-4">
            <span className="section-number text-2xl md:text-3xl">
              {index.toString().padStart(2, "0")}
            </span>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Flagship project
            </span>
          </div>
          <hr className="rule-line mt-4" />

          <h2 className="display-title mt-8 text-4xl md:text-5xl">
            {flagshipProject.title}
          </h2>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            {flagshipProject.summary}
          </p>

          <Button asChild size="lg" className="mt-10">
            <Link href={flagshipProject.href}>
              Discover the project
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>

        {/* Panneau visuel signature (emplacement photo) */}
        <div className="lg:col-span-5 lg:col-start-8">
          <div
            aria-hidden
            className="relative aspect-[4/5] w-full border border-border"
          >
            <span className="absolute left-6 top-6 section-number text-xl">
              {index.toString().padStart(2, "0")}
            </span>
            <span className="display-title absolute bottom-6 left-6 right-6 text-3xl leading-none text-foreground/90">
              {flagshipProject.title}
            </span>
            {/* filets signature */}
            <span className="absolute inset-x-6 top-1/2 h-px bg-border" />
          </div>
        </div>
      </div>
    </section>
  );
}