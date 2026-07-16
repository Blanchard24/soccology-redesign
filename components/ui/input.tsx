import * as React from "react";
import { cn } from "@/lib/utils";

/** Champ texte — bord franc, couleurs = tokens (Direction A). */
export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-11 w-full rounded-sm border border-border bg-surface px-3 text-base text-foreground placeholder:text-faint-foreground focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring disabled:opacity-50 aria-[invalid=true]:border-accent",
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";