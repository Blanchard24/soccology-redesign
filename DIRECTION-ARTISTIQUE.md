# Direction Artistique — anti-générique

> À lire par Claude Code AVANT d'écrire le moindre style. Ce document définit le parti pris visuel et, surtout, ce qu'il faut ÉVITER pour ne pas produire un site "généré par IA".

---

## 0. Objectif : ne PAS ressembler à un site IA

Les sites générés par défaut partagent une signature reconnaissable. **Interdits stricts :**

- ❌ Dégradés violet→bleu / indigo→cyan (le "AI gradient").
- ❌ Palette bleu/indigo/violet par défaut de Tailwind (`blue-500`, `indigo-600`, `purple-500`).
- ❌ Emojis dans les titres ou les boutons.
- ❌ Glassmorphism (cartes semi-transparentes floutées) partout.
- ❌ Tout centré : hero centré → 3 cartes → section centrée → répété.
- ❌ Cartes arrondies avec ombre douce identiques partout (`rounded-2xl shadow-lg` en boucle).
- ❌ Typographie unique Inter/Roboto utilisée pour tout, sans contraste.
- ❌ Icônes décoratives génériques sans fonction.
- ❌ Sections "pleine largeur centrée" empilées sans rythme.
- ❌ Le combo "grand titre gras + sous-titre gris + deux boutons" comme seul hero possible.

**Principe directeur :** un design unique vient de **contraintes fortes + un seul parti pris assumé**, pas d'une accumulation d'effets. Mieux vaut une idée visuelle forte répétée avec discipline que dix effets à la mode.

---

## 1. Ce qui crée l'unicité (leviers prioritaires)

1. **Typographie à caractère.** C'est le levier n°1. Un titrage à forte personnalité + un corps sobre et lisible. Fort contraste de taille et de graisse entre les deux.
2. **Palette non-tech.** Couleurs terreuses, chaudes, ou noir profond + UNE couleur d'accent inattendue. Jamais le bleu corporate par défaut.
3. **Layout éditorial.** Grilles asymétriques, alignements à gauche, chevauchements maîtrisés, du vrai rythme vertical (alternance de densités). S'inspirer de la mise en page magazine, pas du template SaaS.
4. **Un élément signature récurrent.** Une idée graphique unique déclinée partout : un trait/filet, un système de numérotation, un cadrage photo particulier, un traitement de titre. (Référence : Age of Union et son usage cohérent de "la ligne".)
5. **Photographie humaine plein cadre**, traitée avec cohérence (même grain, même température). Les images font 80% de l'émotion.

---

## 2. Trois directions au choix

> Choisir UNE direction et s'y tenir intégralement. Ne pas mélanger.

### Direction A — Éditorial / Terrain
*Ambiance : documentaire sportif, magazine engagé, humain et crédible.*

- **Titres :** une grotesque condensée à fort impact — `Archivo Expanded` ou `Anton` pour les très gros titres, `Archivo` pour les sous-titres.
- **Corps :** `Inter` ou `Söhne`-like (au défaut : Inter), taille généreuse, interligne aéré.
- **Palette :**
  - Fond principal : blanc cassé chaud `#F4F1EA`
  - Encre : noir profond `#141414`
  - Accent unique : orange terrain `#E0552B` (énergie, ballon, urgence maîtrisée)
  - Appui : vert sombre `#1F3A2E`
- **Signature :** grands numéros de section (01, 02, 03) + filets horizontaux fins. Titres alignés à gauche, très grands, qui débordent presque de la grille.
- **Photo :** noir et blanc contrasté pour les portraits, couleur pour l'action.

### Direction B — Brut / Raw
*Ambiance : franc, direct, sans fioritures — colle au public "The Invisibles".*

- **Titres :** `Space Grotesk` ou `Neue Haas`-like, en majuscules pour les accroches.
- **Corps :** monospace léger pour les labels (`JetBrains Mono`) + sans-serif neutre pour le texte long.
- **Palette :**
  - Fond : presque noir `#0E0E0E`
  - Texte : blanc `#FAFAFA`
  - Accent unique : jaune signal `#F2C200` (ou vert acide au choix)
  - Pas de troisième couleur.
- **Signature :** bordures franches 1-2px (pas d'ombres), blocs délimités, contrastes durs. Grille visible assumée. Aucune rondeur (angles droits partout).
- **Photo :** duotone (noir + accent) pour l'unité visuelle.

### Direction C — Chaleureux / Humain
*Ambiance : soin, santé mentale, accueil — met à l'aise, rassure.*

- **Titres :** une serif éditoriale douce — `Fraunces` (avec son axe "soft") ou `Instrument Serif`.
- **Corps :** `Inter` ou `Mundial`-like, chaleureux et lisible.
- **Palette :**
  - Fond : crème `#F7F3EC`
  - Encre : brun-noir `#22201C`
  - Accent 1 : terracotta `#C56A4F`
  - Accent 2 : vert sauge `#7A8B6F`
- **Signature :** grands rayons doux MAIS asymétriques (pas le même arrondi partout), photos en formes organiques ponctuelles, beaucoup d'air. Titrage serif de grande taille aligné à gauche.
- **Photo :** couleur chaude, lumière naturelle, gens réels.

---

## 3. Règles de layout (sortir du "tout centré")

- **Alterner les compositions :** une section alignée à gauche, la suivante en split 2 colonnes, la suivante en pleine largeur image. Créer un rythme.
- **Grille éditoriale 12 colonnes** exploitée réellement (contenu sur 7 colonnes, image sur 5, décalages volontaires).
- **Hero non conventionnel :** éviter le titre parfaitement centré + 2 boutons. Préférer un grand titre à gauche, une image forte à droite/derrière, un seul CTA primaire net.
- **Espacements intentionnels :** grands sauts entre sections, mais densité à l'intérieur. Pas d'espace vide "par défaut".
- **Un seul style de carte**, mais pensé (pas le `rounded-2xl shadow` générique) : par ex. carte à filet supérieur + numéro, ou carte à bord franc.

---

## 4. Micro-interactions (discrètes, pas gadget)

- Apparition au scroll subtile (fade + léger translate), via Framer Motion — jamais d'effets tape-à-l'œil.
- Hover sur les liens : soulignement animé ou changement d'accent, pas de scale exagéré.
- Transitions de page douces.
- **Zéro** carousel automatique, zéro parallaxe lourde, zéro curseur custom gadget.

---

## 5. Setup technique du design

- Centraliser TOUS les tokens (couleurs, fontes, rayons, espacements) dans `/lib/tokens.ts` et les exposer en variables CSS + config Tailwind. **Aucune couleur en dur dans les composants.**
- Polices via `next/font` (Google Fonts) pour la performance.
- `@tailwindcss/typography` pour le blog.
- Vérifier tous les contrastes en WCAG AA.
- La direction choisie doit être remplaçable pour un autre client en changeant uniquement les tokens (c'est la logique de template réutilisable).

---

## 6. Instruction de démarrage pour Claude Code

> "Avant tout style, lis DIRECTION-ARTISTIQUE.md. Applique la Direction [A / B / C]. Respecte strictement la liste des interdits de la section 0. Mets en place les design tokens dans /lib/tokens.ts et n'utilise aucune couleur en dur. Construis d'abord la home en suivant les règles de layout de la section 3, puis on itère."
