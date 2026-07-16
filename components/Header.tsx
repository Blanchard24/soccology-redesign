"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/content/site.config";
import { cn } from "@/lib/utils";

/**
 * En-tête — Direction A (Éditorial / Terrain)
 * Wordmark aligné à gauche, navigation, un seul CTA primaire net.
 * Menu mobile accessible (bouton toggle + panneau). Couleurs = tokens.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const { name } = siteConfig.identity;
  const { primary, cta } = siteConfig.nav;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="container-editorial flex h-16 items-center justify-between gap-6 md:h-20">
        {/* Wordmark */}
        <Link
          href="/"
          className="display-title text-xl leading-none text-foreground md:text-2xl"
          aria-label={`${name} — home`}
        >
          {name}
        </Link>

        {/* Navigation desktop */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 lg:flex"
        >
          {primary.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* CTA primaire */}
          <Link
            href={cta.href}
            className="hidden rounded-sm bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover sm:inline-flex"
          >
            {cta.label}
          </Link>

          {/* Toggle mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border text-foreground lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Panneau mobile */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-border bg-background lg:hidden"
        >
          <ul className="container-editorial flex flex-col py-4">
            {primary.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border py-3 font-heading text-lg text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Link
                href={cta.href}
                onClick={() => setOpen(false)}
                className="inline-flex rounded-sm bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
              >
                {cta.label}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

/** Lien de nav avec soulignement animé (hover) — pas de scale gadget. */
function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative text-sm font-medium text-foreground transition-colors hover:text-accent",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full"
      />
    </Link>
  );
}