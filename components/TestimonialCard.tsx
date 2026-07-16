import { Quote } from "lucide-react";

/**
 * Carte témoignage réutilisable (BRIEF /impact, /keep-the-dream-alive).
 * Présentationnelle. ⚠️ Ne jamais fabriquer de témoignage : n'afficher que
 * des citations réelles fournies par Soccology.
 */
export function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role?: string;
}) {
  return (
    <figure className="flex h-full flex-col border-t-2 border-t-accent bg-surface p-8">
      <Quote className="h-8 w-8 text-accent" aria-hidden />
      <blockquote className="mt-6 flex-1 font-heading text-xl font-medium leading-snug text-foreground md:text-2xl">
        “{quote}”
      </blockquote>
      <figcaption className="mt-8 border-t border-border pt-4">
        <span className="font-heading font-semibold text-foreground">{name}</span>
        {role && (
          <span className="block text-sm text-muted-foreground">{role}</span>
        )}
      </figcaption>
    </figure>
  );
}