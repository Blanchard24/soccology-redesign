import * as React from "react";
import { cn } from "@/lib/utils";

/** Libellé de champ — Archivo, majuscules discrètes (Direction A). */
export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "mb-1.5 block font-heading text-sm font-semibold text-foreground",
        className,
      )}
      {...props}
    />
  );
});
Label.displayName = "Label";