import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * Carte de service réutilisable (BRIEF /services).
 * Même famille visuelle que les autres cartes : filet supérieur, numéro,
 * titre Archivo, lien. Présentationnelle — pilotée par props.
 */
export function ServiceCard({
  index,
  title,
  description,
  href,
}: {
  index: number;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col border border-border border-t-2 border-t-accent bg-surface p-6 transition-colors hover:bg-surface-muted"
    >
      <span className="section-number text-lg">
        {index.toString().padStart(2, "0")}
      </span>
      <div className="mt-6 flex items-start justify-between gap-3">
        <h3 className="font-heading text-xl font-bold leading-tight">{title}</h3>
        <ArrowUpRight
          className="mt-1 h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </div>
      <p className="mt-3 flex-1 text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}