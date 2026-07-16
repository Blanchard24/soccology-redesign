/** Copies par piste — assez pour couvrir un écran large sans laisser de trou. */
const COPIES = 4;

/**
 * Bande déroulante — aplat d'accent, phrase en display qui défile en continu.
 * Registre « panneau LED de stade » : très Direction A (documentaire sportif).
 * Sert de respiration typographique entre l'aperçu blog et le formulaire.
 *
 * Zéro JavaScript : l'animation est en CSS (cf. `.marquee-track` dans
 * globals.css), donc la bande défile même sans hydratation, et le bloc
 * `prefers-reduced-motion` de globals.css l'immobilise sans test ici.
 *
 * Accessibilité — le texte est répété ~8 fois à l'écran : il serait lu 8 fois
 * de suite. Les pistes sont donc `aria-hidden`, et un <h2> en `sr-only` porte
 * la phrase UNE fois, pour les lecteurs d'écran, le plan de titres et le SEO.
 *
 * ⚠️ Il n'y a volontairement AUCUN moyen de mettre en pause (choix produit
 * explicite). Conséquence assumée : WCAG 2.2.2 « Pause, Stop, Hide » (niveau A)
 * demande un moyen d'arrêter tout défilement automatique durant plus de 5s.
 * Les utilisateurs `prefers-reduced-motion` restent couverts (bande figée),
 * les autres n'ont pas de contrôle. À rouvrir si la conformité AA visée au
 * BRIEF §4 devient un critère de recette.
 */
export function MarqueeBand({ text }: { text: string }) {
  // Une piste = COPIES exemplaires. On en rend DEUX, identiques : pendant que
  // la première sort à gauche, la seconde vient exactement prendre sa place.
  const track = (
    <div className="marquee-track flex shrink-0 items-center">
      {Array.from({ length: COPIES }, (_, i) => (
        <span key={i} className="flex items-center">
          <span className="display-title whitespace-nowrap text-3xl leading-none md:text-5xl">
            {text}
          </span>
          {/* Séparateur : losange plein, langage géométrique à bord franc
              de la Direction A — pas une icône décorative. */}
          <span
            aria-hidden
            className="mx-8 h-2.5 w-2.5 shrink-0 rotate-45 bg-accent-foreground/60 md:mx-12"
          />
        </span>
      ))}
    </div>
  );

  return (
    <section aria-label={text} className="bg-accent text-accent-foreground">
      {/* La phrase, une seule fois, pour les lecteurs d'écran et la hiérarchie Hn. */}
      <h2 className="sr-only">{text}</h2>

      <div className="marquee relative flex overflow-hidden border-y-2 border-accent-foreground/20 py-6 md:py-8">
        {/* Les deux pistes sont purement visuelles : le <h2> ci-dessus dit déjà tout. */}
        <div aria-hidden className="flex">
          {track}
          {track}
        </div>
      </div>
    </section>
  );
}
