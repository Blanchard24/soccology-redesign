# Brief de refonte — Soccology

> Document de référence pour Claude Code. À lire en premier avant toute génération de code.
> Objectif : reconstruire le site de Soccology (actuellement sur Squarespace) en une version moderne, rapide et orientée mission, servant à la fois de **démo portfolio** et de **base de template réutilisable** pour d'autres ONG / organisations à impact.

---

## 1. Contexte

**Client (démo) :** Soccology — organisation britannique qui utilise le football et l'influence des footballeurs professionnels pour sensibiliser à la santé mentale et à l'inclusion sociale.

**Public de l'organisation :** écoles, population carcérale, enseignants, parents, footballeurs de Premier League et staff. Cible prioritaire : les hommes en difficulté psychologique (« The Invisibles »), qui rejettent les interventions traditionnelles.

**Partenaires réels à mettre en valeur :** Pro Direct, Rising Ballers, clubs de Premier League, anciens joueurs pros (Jérémie Aliadière / Arsenal, Anthony Gardner / Tottenham).

**Ton de marque :** humain, crédible, chaleureux mais sérieux. Pas corporate froid. On parle de santé mentale — l'émotion et la confiance priment.

---

## 2. Objectifs de la refonte

1. Faire ressortir la **mission** et **l'impact** dès l'écran d'accueil.
2. Créer des **parcours de conversion distincts** selon le visiteur : familles/bénéficiaires, écoles/institutions, partenaires, donateurs, bénévoles.
3. Mettre en avant la **preuve sociale** (partenariats prestigieux, stat « 24% de self-referral »).
4. Corriger tous les **défauts techniques** de l'ancien site (voir §3).
5. Livrer une base **réutilisable** (design tokens + composants) déclinable pour d'autres clients.

---

## 3. Audit de l'existant (à corriger)

**Technique**
- Images cassées / non chargées sur la home (dont le hero principal).
- Images lourdes non optimisées (JPG/PNG en 1500w), pas de WebP/AVIF, pas de lazy-loading maîtrisé.
- Dépendance à un template Squarespace non nettoyé (suffixes « sonora » visibles dans les URLs).

**SEO**
- Faute dans la meta-description (« within difference spaces » → "different").
- Titre de page trop long et non structuré.
- Hiérarchie Hn incohérente (H2/H3 utilisés comme décor).
- URLs non harmonisées (`/about` ET `/about-us-sonora`).

**Structure / navigation**
- Deux pages "About" en doublon.
- Une « New Page » (`/new-page-84`) non finalisée laissée en ligne dans le menu.
- Menu redondant (principal + mobile mal fusionnés).
- Ancres de footer brutes (« Feature », « Quote », « Divider », « Location »).
- **Liens sociaux du footer pointant vers les comptes Squarespace** au lieu de ceux de Soccology (erreur grave).

**Contenu / conversion**
- Home pauvre, aérée artificiellement par des espaces vides.
- Un seul CTA vague, formulaire peu visible.
- Panier e-commerce (« Cart 0 ») orphelin, aucun produit.
- Une seule stat d'impact, pas de témoignages structurés ni d'études de cas.

**Crédibilité / conformité**
- Pas de mur de logos partenaires officiel.
- Pas de mentions légales / politique de confidentialité (RGPD).
- Aucune ressource d'urgence santé mentale (attendu sur ce type de site).
- Statut juridique non affiché.

---

## 4. Stack technique

- **Framework :** Next.js (App Router) + TypeScript
- **Styling :** Tailwind CSS
- **Contenu :** MDX ou CMS headless léger (Sanity) pour le blog — commencer en statique, prévoir l'abstraction
- **Composants UI :** shadcn/ui
- **Images :** `next/image` (optimisation, lazy-loading, WebP auto)
- **Formulaires :** React Hook Form + validation Zod ; envoi via une route API (ou Formspree/Resend en démo)
- **Déploiement :** Vercel
- **Accessibilité :** viser WCAG 2.1 AA (contrastes, focus visibles, alt sur toutes les images, navigation clavier)

---

## 5. Arborescence & contenu des pages

### `/` — Accueil
- **Hero :** titre mission + sous-titre + CTA principal ("Discover our work") + CTA secondaire ("Support us"). Image humaine forte, pas cassée.
- **Bandeau stat d'impact :** « 24% of participants self-refer for our counselling service » + 2-3 autres chiffres à intégrer si fournis.
- **Bloc "How we work" :** workshops, programmes, interventions alternatives, formation du staff.
- **Mur de logos partenaires** (Pro Direct, Rising Ballers, clubs PL).
- **Section "Who we help"** avec 4 parcours cliquables : Families & individuals / Schools & institutions / Partners / Donors.
- **Aperçu du projet phare :** Keep The Dream Alive!
- **Aperçu blog** (3 derniers articles).
- **CTA final** + formulaire de contact court.

### `/about` — À propos (fusionner les deux anciennes pages)
Histoire, approche thérapeutique du football, philosophie (The Invisibles, Pre Therapy, RM&P, Integration présentés comme piliers de méthode).

### `/team` — L'équipe
Profils, dont Kevin George. Photos, rôles, courtes bios.

### `/services`
Détail des offres par format (workshops, programmes, interventions alternatives, staff training) ET par public. Chaque service = un CTA clair.

### `/keep-the-dream-alive` — Projet phare
Descriptif, témoignages de participants (ex : Simon invité à Charlton Athletic FC), photos, partenaires, CTA inscription.

### `/impact` — Impact & témoignages
Chiffres, études de cas, citations, mur de logos, éventuels rapports téléchargeables.

### `/blog` + `/blog/[slug]`
Liste + articles. Structure MDX.

### `/contact`
Formulaire fonctionnel (nom, email, type de demande, message) + coordonnées + réseaux sociaux **corrects** + carte optionnelle.

### Pages légales
`/privacy`, `/legal` — mentions légales + politique de confidentialité RGPD.

### Composant transversal : **bandeau ressources d'urgence**
Accessible partout (footer ou page dédiée `/get-help`) : lignes d'écoute santé mentale UK (Samaritans, etc.). À afficher clairement.

---

## 6. Direction visuelle (design tokens)

> Base de départ — à ajuster selon la charte réelle de Soccology. Ces tokens sont pensés pour être facilement remplaçables client par client (c'est le cœur de la réutilisabilité).

**Palette (proposition, ton humain + confiance)**
- `--color-primary` : vert profond / bleu nuit (confiance, calme) — ex. `#0F3D3E`
- `--color-accent` : ambre chaud (énergie, football, humanité) — ex. `#E8A33D`
- `--color-neutral-dark` : `#1A1A1A`
- `--color-neutral-light` : `#F7F5F0`
- Contrastes vérifiés AA.

**Typographie**
- Titres : sans-serif à fort caractère (ex. Sofia Sans, Archivo, ou Anton pour les gros titres).
- Corps : sans-serif lisible (Inter).

**Style**
- Photographie humaine authentique en grand format.
- Beaucoup d'air, mais structuré (pas de vide artificiel).
- Coins arrondis doux, ombres subtiles.
- Micro-animations discrètes (apparition au scroll).

---

## 7. Structure de dossiers attendue

```
/app
  /(marketing)
    page.tsx              # home
    /about/page.tsx
    /team/page.tsx
    /services/page.tsx
    /keep-the-dream-alive/page.tsx
    /impact/page.tsx
    /contact/page.tsx
    /get-help/page.tsx
  /blog
    page.tsx
    /[slug]/page.tsx
  /privacy/page.tsx
  /legal/page.tsx
  /api/contact/route.ts
  layout.tsx
/components
  /ui                     # shadcn
  Hero.tsx
  StatBanner.tsx
  PartnerLogos.tsx
  AudienceCards.tsx
  ServiceCard.tsx
  TestimonialCard.tsx
  BlogPreview.tsx
  ContactForm.tsx
  EmergencyResources.tsx
  Header.tsx
  Footer.tsx
/content
  /blog                   # fichiers .mdx
/lib
  tokens.ts               # design tokens centralisés (clé de la réutilisabilité)
/public
  /images
```

---

## 8. SEO & conformité (à ne pas oublier)

- Balises meta propres et uniques par page (corriger la faute "difference").
- Un seul H1 par page, hiérarchie Hn cohérente.
- Données structurées `Organization` / `NGO` (JSON-LD).
- Sitemap + robots.txt.
- Alt text sur toutes les images.
- Bannière cookies si tracking.
- Pages légales réelles, pas de lorem ipsum.

---

## 9. Réutilisabilité (objectif business)

Ce site est le **template maître** pour d'autres clients (ONG anglophones/francophones, médiums, coachs).
- Centraliser TOUT ce qui change d'un client à l'autre dans `/lib/tokens.ts` et un fichier `/content/site.config.ts` (nom, couleurs, typo, textes, liens sociaux, sections activées).
- Les composants doivent lire depuis cette config, jamais de valeurs en dur.
- Objectif : décliner un nouveau client en changeant surtout la config + le contenu, pas le code.

---

## 10. Ordre de travail suggéré pour Claude Code

1. Init projet (Next.js + TS + Tailwind + shadcn).
2. Poser `tokens.ts` et `site.config.ts`.
3. Header + Footer (avec liens sociaux corrects + bloc ressources d'urgence).
4. Composants réutilisables (Hero, StatBanner, etc.).
5. Home complète.
6. Pages secondaires.
7. Blog (MDX).
8. Formulaire de contact fonctionnel.
9. SEO + pages légales.
10. Passe accessibilité + optimisation images + build de vérification.
