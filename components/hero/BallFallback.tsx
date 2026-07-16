/**
 * Repli statique du ballon (SPEC §6 fallback + §7 accessibilité).
 * Affiché :
 *  - pendant le chargement du chunk 3D (next/dynamic),
 *  - en permanence si l'utilisateur a activé `prefers-reduced-motion`.
 * Purement décoratif (aria-hidden). Couleurs = tokens.
 */
export function BallFallback() {
  return (
    <div aria-hidden className="relative h-full w-full">
      <div className="absolute inset-[12%] rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute inset-[8%] rounded-full border border-border" />
      <div className="absolute inset-[20%] rounded-full border border-border/70" />
      <div className="absolute inset-[34%] rounded-full border border-accent/60" />
      <div className="absolute inset-[46%] rounded-full border border-border/50" />
    </div>
  );
}