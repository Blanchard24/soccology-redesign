import { cn } from "@/lib/utils";

/**
 * Emplacement d'image — bloc aux couleurs des tokens + label descriptif centré.
 *
 * Aucune image réelle, aucun lien externe, aucun `next/image` cassé : on réserve
 * la place et la proportion exactes des futures photos (BRIEF §3 — l'ancien site
 * avait des images cassées, on ne reproduit pas le problème en attendant).
 *
 * `data-placeholder` sert de crochet de recherche : quand le client aura fourni
 * les vraies photos, `grep -r "data-placeholder"` liste tous les emplacements à
 * remplacer. Le `label` décrit la photo attendue — c'est un brief de shooting.
 *
 * Le contenu est purement décoratif tant qu'il n'y a pas d'image : le bloc est
 * donc `aria-hidden`, et le label ne s'adresse qu'à l'équipe qui construit.
 * TODO(client) : remplacer par <Image> + alt réel après accord photo.
 */
export function Placeholder({
  label,
  tone = "muted",
  ratio = "landscape",
  className,
}: {
  /** Description de la photo attendue (ex. « Portrait N&B — atelier en prison »). */
  label: string;
  /** Aplat de fond — rôles sémantiques du thème, jamais une couleur en dur. */
  tone?: "muted" | "deep" | "support" | "accent";
  ratio?: "landscape" | "portrait" | "square" | "wide";
  className?: string;
}) {
  const tones = {
    muted: "bg-surface-muted text-muted-foreground",
    deep: "bg-surface-deep text-muted-foreground",
    support: "bg-support text-support-foreground",
    accent: "bg-accent-soft text-foreground",
  } as const;

  const ratios = {
    landscape: "aspect-[4/3]",
    portrait: "aspect-[3/4]",
    square: "aspect-square",
    wide: "aspect-[16/9]",
  } as const;

  return (
    <div
      aria-hidden
      data-placeholder={label}
      className={cn(
        // Bord franc + filet d'accent en tête : même famille visuelle que les
        // cartes (DA §3 « un seul style de carte »), pas de rounded-2xl/shadow.
        "flex flex-col items-center justify-center gap-3 border border-border border-t-2 border-t-accent p-6 text-center",
        tones[tone],
        ratios[ratio],
        className,
      )}
    >
      <span className="font-heading text-[0.625rem] font-semibold uppercase tracking-[0.16em] opacity-70">
        Image placeholder
      </span>
      <span className="max-w-[26ch] font-heading text-sm font-medium leading-snug text-balance">
        {label}
      </span>
    </div>
  );
}
