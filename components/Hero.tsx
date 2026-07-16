"use client";

import { useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BallFallback } from "@/components/hero/BallFallback";
import { siteConfig } from "@/content/site.config";

/**
 * Hero — Direction A, composition NON centrée (DA §3 + SPEC-BALLON-3D §9).
 * Fond sombre « terrain », titre display massif à gauche, un seul CTA primaire
 * + un lien secondaire discret. À droite : le ballon 3D (sphère générée).
 * Le ballon n'est animé QUE par le scroll : il tourne et traverse l'écran en
 * diagonale à mesure qu'on descend, et reste strictement immobile au repos.
 *
 * Perf/A11y (SPEC §6/§7) :
 *  - le texte du hero est rendu immédiatement (SSR), indépendamment du canvas ;
 *  - le canvas 3D est chargé en lazy (next/dynamic, ssr:false) avec repli statique ;
 *  - `prefers-reduced-motion` → on n'affiche QUE le repli statique (pas de 3D) ;
 *  - le canvas est purement décoratif (aria-hidden porté par ses éléments).
 */
const BallCanvas = dynamic(
  () => import("@/components/hero/BallCanvas").then((m) => m.BallCanvas),
  { ssr: false, loading: () => <BallFallback /> },
);

// Détection « l'hydratation est terminée », via useSyncExternalStore : React
// utilise le snapshot serveur pour le rendu d'hydratation, puis rebascule sur
// le snapshot client juste après. Le store ne change jamais, d'où l'abonnement
// no-op (identités stables pour éviter tout ré-abonnement à chaque rendu).
const subscribeNoop = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function Hero() {
  const { identity, nav } = siteConfig;

  const heroRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  // Progression du scroll pendant que le hero défile (0 en haut → 1 en sortie).
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Lissage : le scroll brut est saccadé (molette, trackpad). Ce ressort est la
  // SEULE source d'animation du ballon — il se stabilise dès qu'on arrête de
  // défiler, donc au repos plus rien ne bouge (SPEC §5 « lissage indispensable »).
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.35,
    restDelta: 0.0005,
  });

  // Traversée diagonale : le ballon part de sa position de repos (à droite,
  // centré — composition DA §3) et file vers le bas à gauche à mesure qu'on
  // descend. Porté par le conteneur DOM, donc traversée réelle de l'écran ;
  // la rotation, elle, est gérée dans la scène 3D à partir du même signal.
  const ballX = useTransform(smoothProgress, [0, 1], [0, -560]);
  const ballY = useTransform(smoothProgress, [0, 1], [0, 320]);

  // `useReducedMotion` lit `matchMedia` dès le premier rendu client, mais vaut
  // `null` côté serveur : s'en servir directement ferait diverger les deux
  // arbres (repli statique en SSR vs canvas en CSR) → erreur d'hydratation.
  // On rend donc le repli tant que l'hydratation n'est pas terminée, puis on
  // bascule sur la 3D — sauf si `prefers-reduced-motion` est actif (SPEC §7).
  const hydrated = useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot,
  );

  const show3D = hydrated && prefersReduced === false;

  return (
    <section
      ref={heroRef}
      data-theme="dark"
      className="relative overflow-hidden bg-background text-foreground"
    >
      {/* Ballon (3D ou repli statique) — décoratif, hors flux du texte.
          Le conteneur externe porte le placement (dont `-translate-y-1/2`) ;
          la traversée vit sur un motion.div interne, sinon les deux se
          disputeraient la propriété `transform`. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 hidden aspect-square w-[38rem] -translate-y-1/2 lg:block"
      >
        <motion.div
          className="h-full w-full"
          style={show3D ? { x: ballX, y: ballY } : undefined}
        >
          {show3D ? <BallCanvas progress={smoothProgress} /> : <BallFallback />}
        </motion.div>
      </div>

      <div className="container-editorial relative grid min-h-[86vh] grid-cols-1 items-center gap-10 py-24 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-8">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            {identity.name}
          </p>

          <h1 className="display-title mt-6 text-5xl sm:text-6xl md:text-7xl">
            {identity.tagline}
          </h1>

          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            {identity.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button asChild size="lg">
              <Link href="/about">
                Discover our work
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>

            {/* Lien secondaire discret — pas un second bouton (DA §0). */}
            <Link
              href={nav.cta.href}
              className="group relative font-heading text-sm font-semibold text-foreground"
            >
              {nav.cta.label}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-full bg-accent transition-transform duration-300 group-hover:scale-x-0"
                style={{ transformOrigin: "right" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}