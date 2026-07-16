import * as React from "react";
import { cn } from "@/lib/utils";

/** Zone de texte — bord franc, couleurs = tokens. */
export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-28 w-full rounded-sm border border-border bg-surface px-3 py-2 text-base text-foreground placeholder:text-faint-foreground focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring disabled:opacity-50 aria-[invalid=true]:border-accent",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";