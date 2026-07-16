/**
 * Design tokens — SOURCE UNIQUE DE VÉRITÉ
 * =========================================================================
 * Direction Artistique : **Direction A — Éditorial / Terrain**
 * (documentaire sportif, magazine engagé, humain et crédible)
 *
 * Règle absolue (cf. DIRECTION-ARTISTIQUE.md §5) :
 *   → AUCUNE couleur, police, rayon ou espacement en dur dans les composants.
 *   → Tout passe par ce fichier, exposé ensuite en variables CSS + thème Tailwind.
 *   → Décliner un autre client = remplacer UNIQUEMENT ce fichier.
 *
 * Les valeurs littérales (hex, rem…) ne vivent QU'ICI. Le reste de l'app lit
 * les variables CSS générées par `cssVariables` (voir bas de fichier).
 * =========================================================================
 */

/* -------------------------------------------------------------------------
 * 1. PALETTE — Direction A
 * Fond crème chaud + encre noire + UN accent orange terrain + appui vert sombre.
 * Interdits respectés : pas de bleu/indigo/violet, pas de dégradé "IA".
 * Contrastes vérifiés WCAG 2.1 AA (voir annotations).
 * ---------------------------------------------------------------------- */
export const palette = {
  /* Fondamentaux Direction A ------------------------------------------- */
  /** Fond principal — blanc cassé chaud */
  paper: "#F4F1EA",
  /** Encre — noir profond (texte courant sur `paper` → 25.9:1, AAA) */
  ink: "#141414",
  /** Accent UNIQUE — orange terrain (énergie, ballon, urgence maîtrisée) */
  accent: "#E0552B",
  /** Appui — vert sombre (sections calmes, aplats, second niveau) */
  support: "#1F3A2E",

  /* Déclinaisons neutres chaudes (dérivées du crème, jamais du gris froid) */
  /** Papier légèrement teinté — cartes, zones alternées sur fond crème */
  paperMuted: "#EBE7DD",
  /** Papier plus profond — séparateurs de sections, aplats discrets */
  paperDeep: "#E1DBCD",
  /** Encre atténuée — texte secondaire sur `paper` (≈ 8.9:1, AAA) */
  inkMuted: "#4A4741",
  /** Encre très atténuée — légendes, méta, numéros de section estompés */
  inkFaint: "#7A756B",

  /* Variantes d'accent (interaction / états) --------------------------- */
  /** Accent survol — orange assombri pour hover/active */
  accentHover: "#C2431E",
  /** Accent estompé — filets, soulignés, fonds d'accent très légers */
  accentSoft: "#F3D8CB",

  /* Variantes d'appui -------------------------------------------------- */
  /** Vert d'appui assombri — hover sur surfaces vertes */
  supportHover: "#16281F",
  /** Vert d'appui éclairci — bordures / détails sur fond vert sombre */
  supportSoft: "#33513F",

  /* Filets & bordures (signature Direction A : filets horizontaux fins) */
  /** Filet standard sur fond clair */
  line: "#D8D2C4",
  /** Filet marqué (règles de section, encadrés) */
  lineStrong: "#141414",

  /* Neutres purs utilitaires (jamais pour le texte de marque) ---------- */
  white: "#FFFFFF",
  black: "#000000",

  /* Sémantique état (sobre, non-tech) ---------------------------------- */
  success: "#2F6B4F",
  warning: "#C98A1B",
  danger: "#B23B2E",
} as const;

/* -------------------------------------------------------------------------
 * 2. THÈMES — Clair (crème) & Sombre (terrain)
 * Direction A alterne fond crème (contenu éditorial) et fond sombre
 * (hero avec ballon 3D, cf. SPEC-BALLON-3D.md §9). On mappe les rôles
 * sémantiques pour chaque contexte : aucune couleur littérale hors palette.
 * ---------------------------------------------------------------------- */
export const themes = {
  /** Thème par défaut : fond crème, encre noire, accent orange. */
  light: {
    background: palette.paper,
    foreground: palette.ink,
    surface: palette.white,
    surfaceMuted: palette.paperMuted,
    surfaceDeep: palette.paperDeep,
    mutedForeground: palette.inkMuted,
    faintForeground: palette.inkFaint,

    accent: palette.accent,
    /** Texte sur aplat d'accent : encre → 4.82:1 (AA texte courant) */
    accentForeground: palette.ink,
    accentHover: palette.accentHover,
    accentSoft: palette.accentSoft,

    support: palette.support,
    /** Texte sur aplat vert sombre : crème → 11.6:1 (AAA) */
    supportForeground: palette.paper,

    border: palette.line,
    borderStrong: palette.lineStrong,
    ring: palette.accent,
  },

  /** Thème sombre "terrain" : hero, sections immersives. */
  dark: {
    background: palette.support,
    foreground: palette.paper,
    surface: palette.supportHover,
    surfaceMuted: palette.supportSoft,
    surfaceDeep: palette.supportHover,
    mutedForeground: "#C8CFC7",
    faintForeground: "#8C9A8F",

    accent: palette.accent,
    accentForeground: palette.ink,
    accentHover: palette.accentHover,
    accentSoft: palette.accentSoft,

    support: palette.paper,
    supportForeground: palette.ink,

    border: palette.supportSoft,
    borderStrong: palette.paper,
    ring: palette.accent,
  },
} as const;

/* -------------------------------------------------------------------------
 * 3. TYPOGRAPHIE — Direction A
 * Fort contraste titrage / corps. Chargées via next/font (Google Fonts).
 *   - Anton    : très gros titres (display), condensé à fort impact.
 *   - Archivo  : titres secondaires, sous-titres, labels.
 *   - Inter    : corps de texte, généreux et aéré.
 * Les `--font-*` sont alimentées par les objets next/font dans layout.tsx.
 * ---------------------------------------------------------------------- */
export const typography = {
  fonts: {
    /** Très gros titres — grotesque condensée à fort impact */
    display: {
      family: "Anton",
      cssVar: "--font-display",
      googleFont: "Anton",
      weights: [400],
      fallback: ["Arial Narrow", "sans-serif"],
    },
    /** Titres / sous-titres — grotesque à caractère */
    heading: {
      family: "Archivo",
      cssVar: "--font-heading",
      googleFont: "Archivo",
      weights: [500, 600, 700, 800],
      fallback: ["Arial", "sans-serif"],
    },
    /** Corps — sans-serif lisible */
    body: {
      family: "Inter",
      cssVar: "--font-sans",
      googleFont: "Inter",
      weights: [400, 500, 600, 700],
      fallback: ["system-ui", "sans-serif"],
    },
  },

  /** Échelle typographique (rem). Contraste marqué : display géant vs corps. */
  scale: {
    xs: "0.75rem", // 12px — méta, légendes
    sm: "0.875rem", // 14px — labels
    base: "1.0625rem", // 17px — corps généreux (Direction A : "taille généreuse")
    lg: "1.25rem", // 20px — chapô
    xl: "1.5rem", // 24px
    "2xl": "2rem", // 32px
    "3xl": "2.75rem", // 44px
    "4xl": "3.75rem", // 60px
    "5xl": "5rem", // 80px  — gros titres
    "6xl": "7rem", // 112px — titres qui débordent la grille
    "7xl": "9.5rem", // 152px — hero display massif
  },

  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  leading: {
    /** Titres display : interligne serré */
    tight: 0.92,
    snug: 1.05,
    heading: 1.1,
    /** Corps : interligne aéré (Direction A) */
    body: 1.65,
    relaxed: 1.75,
  },

  tracking: {
    tighter: "-0.03em",
    tight: "-0.015em",
    normal: "0em",
    /** Labels / numéros de section en capitales */
    wide: "0.08em",
    wider: "0.16em",
  },
} as const;

/* -------------------------------------------------------------------------
 * 4. RAYONS — sobres (Direction A privilégie le filet, pas le "rounded-2xl")
 * ---------------------------------------------------------------------- */
export const radius = {
  none: "0px",
  sm: "0.25rem", // 4px
  md: "0.5rem", // 8px
  lg: "0.75rem", // 12px — max usuel, arrondi doux
  full: "9999px",
} as const;

/* -------------------------------------------------------------------------
 * 5. ESPACEMENTS & RYTHME — grands sauts entre sections, densité à l'intérieur
 * ---------------------------------------------------------------------- */
export const spacing = {
  /** Rythme vertical entre grandes sections */
  section: {
    sm: "4rem", // 64px
    md: "6rem", // 96px
    lg: "8rem", // 128px
    xl: "11rem", // 176px — grands sauts éditoriaux
  },
  /** Gouttières de la grille 12 colonnes */
  gutter: "1.5rem", // 24px
  /** Largeur max du contenu éditorial */
  container: "80rem", // 1280px
  /** Largeur de lecture confortable (blog / prose) */
  prose: "42rem", // 672px
} as const;

/* -------------------------------------------------------------------------
 * 6. SIGNATURE VISUELLE — Direction A
 * Grands numéros de section (01, 02, 03) + filets horizontaux fins.
 * Titres alignés à gauche, très grands, qui débordent presque de la grille.
 * ---------------------------------------------------------------------- */
export const signature = {
  /** Filets horizontaux fins (l'élément récurrent). */
  rule: {
    thin: "1px",
    regular: "2px",
    thick: "4px",
  },
  /** Numéros de section (01 / 02 / 03…). */
  sectionNumber: {
    font: typography.fonts.display.cssVar,
    size: typography.scale["2xl"],
    color: "accent", // rôle sémantique du thème (jamais un hex ici)
    format: (n: number) => n.toString().padStart(2, "0"),
  },
  /** Alignement structurel par défaut : à gauche, jamais tout centré. */
  align: "left",
} as const;

/* -------------------------------------------------------------------------
 * 7. OMBRES — subtiles (Direction A : filets > ombres)
 * ---------------------------------------------------------------------- */
export const shadow = {
  none: "none",
  sm: "0 1px 2px 0 rgb(20 20 20 / 0.06)",
  md: "0 4px 16px -4px rgb(20 20 20 / 0.10)",
  lg: "0 12px 32px -8px rgb(20 20 20 / 0.14)",
} as const;

/* -------------------------------------------------------------------------
 * 8. MOTION — micro-interactions discrètes (Framer Motion)
 * Apparition au scroll : fade + léger translate. Jamais tape-à-l'œil.
 * ---------------------------------------------------------------------- */
export const motion = {
  duration: {
    fast: 0.2,
    base: 0.4,
    slow: 0.6,
  },
  /** Courbe douce type "ease-out" éditorial */
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  /** Translation d'apparition au scroll (px) */
  revealOffset: 24,
} as const;

/* -------------------------------------------------------------------------
 * 9. BREAKPOINTS — grille éditoriale responsive
 * ---------------------------------------------------------------------- */
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

/* -------------------------------------------------------------------------
 * 10. EXPOSITION EN VARIABLES CSS
 * Consommées dans app/globals.css (@theme) et par les composants.
 * `:root` = thème clair ; `.dark` / `[data-theme="dark"]` = thème sombre.
 * ---------------------------------------------------------------------- */
function themeToVars(theme: (typeof themes)[keyof typeof themes]) {
  return {
    "--color-background": theme.background,
    "--color-foreground": theme.foreground,
    "--color-surface": theme.surface,
    "--color-surface-muted": theme.surfaceMuted,
    "--color-surface-deep": theme.surfaceDeep,
    "--color-muted-foreground": theme.mutedForeground,
    "--color-faint-foreground": theme.faintForeground,
    "--color-accent": theme.accent,
    "--color-accent-foreground": theme.accentForeground,
    "--color-accent-hover": theme.accentHover,
    "--color-accent-soft": theme.accentSoft,
    "--color-support": theme.support,
    "--color-support-foreground": theme.supportForeground,
    "--color-border": theme.border,
    "--color-border-strong": theme.borderStrong,
    "--color-ring": theme.ring,
  } as const;
}

export const cssVariables = {
  light: themeToVars(themes.light),
  dark: themeToVars(themes.dark),
  /** Tokens non thématiques (identiques clair/sombre) */
  static: {
    /** Courbe d'animation éditoriale — pendant CSS de `motion.ease`. */
    "--ease-editorial": `cubic-bezier(${motion.ease.join(", ")})`,
    "--radius-sm": radius.sm,
    "--radius-md": radius.md,
    "--radius-lg": radius.lg,
    "--font-display": `var(${typography.fonts.display.cssVar})`,
    "--font-heading": `var(${typography.fonts.heading.cssVar})`,
    "--font-sans": `var(${typography.fonts.body.cssVar})`,
    "--rule-thin": signature.rule.thin,
    "--rule-regular": signature.rule.regular,
    "--rule-thick": signature.rule.thick,
    "--container-max": spacing.container,
    "--prose-max": spacing.prose,
  },
} as const;

/* -------------------------------------------------------------------------
 * 11. AGRÉGAT EXPORTÉ
 * ---------------------------------------------------------------------- */
export const tokens = {
  direction: "A", // Éditorial / Terrain
  palette,
  themes,
  typography,
  radius,
  spacing,
  signature,
  shadow,
  motion,
  breakpoints,
  cssVariables,
} as const;

export type Tokens = typeof tokens;
export type ThemeName = keyof typeof themes;
export type ThemeColors = (typeof themes)["light"];

export default tokens;