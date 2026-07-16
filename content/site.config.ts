/**
 * Configuration du site — CONTENU & PARAMÈTRES CLIENT
 * =========================================================================
 * Tout ce qui change d'un client à l'autre (nom, textes, liens, sections
 * activées, données de contact, ressources) est centralisé ici.
 *
 * Règle : ce fichier NE contient AUCUNE couleur ni police en dur.
 * L'identité visuelle vit exclusivement dans `/lib/tokens.ts`.
 * Ici on ne fait que référencer la direction artistique choisie.
 *
 * Décliner un nouveau client = ce fichier + `/lib/tokens.ts` + le contenu.
 * =========================================================================
 */

import { tokens } from "@/lib/tokens";

/* -------------------------------------------------------------------------
 * 1. IDENTITÉ
 * ---------------------------------------------------------------------- */
export const identity = {
  name: "Soccology",
  legalName: "Soccology",
  /** Statut juridique à afficher (cf. BRIEF §3 — conformité). */
  legalStatus: "[À CONFIRMER]", // TODO: statut juridique réel à fournir pour les pages légales
  tagline: "Football as a language for mental health.",
  /** Description SEO — corrigée (l'ancien site écrivait « difference spaces »). */
  description:
    "Soccology uses football and the influence of professional players to open up mental health and social inclusion across schools, communities and prisons in the UK.",
  locale: "en-GB",
  /** URL canonique de production (Vercel/domaine). À renseigner au déploiement. */
  url: "https://soccology.example",
  /** Direction artistique appliquée — liée aux design tokens (source unique). */
  artDirection: tokens.direction, // "A" — Éditorial / Terrain
} as const;

/* -------------------------------------------------------------------------
 * 2. NAVIGATION
 * URLs harmonisées (l'ancien site avait /about ET /about-us-sonora,
 * une "new-page-84" orpheline, etc. — cf. BRIEF §3).
 * ---------------------------------------------------------------------- */
export const nav = {
  primary: [
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Services", href: "/services" },
    { label: "Keep The Dream Alive", href: "/keep-the-dream-alive" },
    { label: "Impact", href: "/impact" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  /** CTA d'en-tête (un seul primaire net, cf. Direction A). */
  cta: { label: "Support us", href: "/contact#support" },
  /** Liens secondaires (footer). */
  footer: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Impact", href: "/impact" },
    { label: "Get help", href: "/get-help" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
    { label: "Legal", href: "/legal" },
  ],
} as const;

/* -------------------------------------------------------------------------
 * 3. RÉSEAUX SOCIAUX
 * ⚠️ BRIEF §3 : l'ancien footer pointait vers les comptes SQUARESPACE.
 * Les vraies URLs de Soccology ne sont pas connues — NE PAS inventer.
 * Placeholder neutre `#` en attendant les vraies URLs du client.
 * (Le JSON-LD `sameAs` ignore les `#`, cf. SEO plus bas.)
 * ---------------------------------------------------------------------- */
type SocialLink = { platform: string; label: string; href: string };

export const social: readonly SocialLink[] = [
  { platform: "instagram", label: "Instagram", href: "#" }, // TODO: à renseigner
  { platform: "x", label: "X (Twitter)", href: "#" }, // TODO: à renseigner
  { platform: "linkedin", label: "LinkedIn", href: "#" }, // TODO: à renseigner
  { platform: "facebook", label: "Facebook", href: "#" }, // TODO: à renseigner
  { platform: "youtube", label: "YouTube", href: "#" }, // TODO: à renseigner
];

/* -------------------------------------------------------------------------
 * 4. CONTACT
 * ---------------------------------------------------------------------- */
export const contact = {
  email: "", // TODO: à renseigner (ne pas inventer)
  phone: "", // TODO: à renseigner si fourni
  location: "London, United Kingdom",
  /** Destinataire du formulaire (route API / Resend / Formspree en démo). */
  formEndpoint: "/api/contact",
  /** Types de demande proposés dans le formulaire (BRIEF §5 /contact). */
  enquiryTypes: [
    "Family or individual",
    "School or institution",
    "Partnership",
    "Donation",
    "Volunteering",
    "Media",
    "Other",
  ],
} as const;

/* -------------------------------------------------------------------------
 * 5. PARCOURS DE CONVERSION — "Who we help"
 * 4 audiences cliquables (BRIEF §5 home). Icônes = clés lucide-react.
 * ---------------------------------------------------------------------- */
export const audiences = [
  {
    id: "families",
    title: "Families & individuals",
    description:
      "Reaching men in psychological difficulty — “The Invisibles” — who turn away from traditional support.",
    href: "/services#families",
    icon: "Users",
  },
  {
    id: "schools",
    title: "Schools & institutions",
    description:
      "Workshops and programmes for pupils, teachers and prison populations, built around football.",
    href: "/services#schools",
    icon: "GraduationCap",
  },
  {
    id: "partners",
    title: "Partners",
    description:
      "Clubs, academies and players joining the mission — from grassroots to the Premier League.",
    href: "/services#partners",
    icon: "Handshake",
  },
  {
    id: "donors",
    title: "Donors",
    description:
      "Fund alternative interventions that reach people conventional services miss.",
    href: "/contact#support",
    icon: "HeartHandshake",
  },
] as const;

/* -------------------------------------------------------------------------
 * 6. PILIERS DE MÉTHODE — approche thérapeutique du football (BRIEF /about)
 * `detail` = version longue pour la page /about ; `description` = version
 * courte réutilisable ailleurs (cartes, aperçus).
 * ---------------------------------------------------------------------- */
export const methodPillars = [
  {
    id: "invisibles",
    title: "The Invisibles",
    description:
      "Men in difficulty who reject conventional interventions — the people we exist to reach.",
    detail:
      "They rarely book an appointment. They don't fill in a referral form. They are struggling in plain sight — at work, at home, on the touchline — and every service designed to help them assumes they will ask first. The Invisibles names a gap in the system, not a diagnosis.",
    imageLabel: "Documentary shot — man alone on the touchline, natural light, colour",
  },
  {
    id: "pre-therapy",
    title: "Pre Therapy",
    description:
      "Meeting people before clinical settings, on ground they trust: the pitch.",
    detail:
      "Before anyone can talk about their mental health, they need ground they trust and a language they already speak. Football is both. Pre Therapy is the work that happens before clinical work is even possible: showing up, building familiarity, and letting conversation start sideways rather than head-on.",
    imageLabel: "Group session on a five-a-side pitch, mid-conversation, colour",
  },
  {
    id: "rmp",
    title: "RM&P",
    description:
      "Reflection, Meaning & Purpose — turning lived experience into direction.",
    detail:
      "Reflection, Meaning & Purpose. Once someone is talking, the work is to make sense of what they carry and turn it into direction — what happened, what it means, and what it is for. The game gives the vocabulary: form, setbacks, teammates, the next fixture.",
    imageLabel: "Close portrait, black & white, high contrast — participant reflecting",
  },
  {
    id: "integration",
    title: "Integration",
    description: "Bringing people back into community, education and belonging.",
    detail:
      "The session is not the goal — what happens afterwards is. Integration is the bridge back into community, education, work and belonging, and the point where someone stops being reached and starts taking part.",
    imageLabel: "Wide shot — team huddle after a session, colour, warm light",
  },
] as const;

/* -------------------------------------------------------------------------
 * 6b. PAGE /about — récit et approche
 * ⚠️ Contenu volontairement adossé aux SEULS faits établis par le brief
 * (mission, publics, « The Invisibles », partenaires, stat 24%).
 * Rien n'est inventé : ni date de création, ni récit fondateur, ni chiffre.
 * TODO(client) : fournir l'historique réel (année de création, genèse, rôle
 * de Kevin George) — à insérer dans `story.paragraphs` une fois validé.
 * ---------------------------------------------------------------------- */
export const aboutPage = {
  eyebrow: "About",
  title: "We meet people where they already are.",
  intro:
    "Soccology uses football — and the influence of the professional game — to open conversations about mental health that would otherwise never happen.",
  heroImageLabel:
    "Hero — wide documentary shot, players and coach mid-session, colour, natural light",

  story: {
    eyebrow: "Our story",
    title: "Football is already the conversation.",
    paragraphs: [
      "Football is one of the most spoken languages in the country. It travels into places clinical services rarely reach — changing rooms, playgrounds, prison wings, group chats — and it carries trust that a waiting room never earns.",
      "Soccology starts there. We work across schools, communities and prisons in the UK, alongside teachers, parents, Premier League players and club staff, using the game as the way in rather than the reward at the end.",
      "The influence of professional players matters here. When someone who has lived the dream talks openly about struggling, it gives permission — and permission is usually the thing standing in the way.",
    ],
    imageLabel: "Portrait, black & white, high contrast — Kevin George on a pitch",
  },

  approach: {
    eyebrow: "Our approach",
    title: "Football as a therapeutic frame.",
    paragraphs: [
      "We don't put the game next to the therapy — the game is the frame the work happens inside. A pitch has rules, roles, ritual and a team, which is a structure people already know how to be inside. That familiarity does the work an unfamiliar clinical room cannot.",
      "It means we can reach people long before they would ever describe themselves as someone who needs help, and stay alongside them long after a single session would have ended.",
    ],
    /** Garde-fou éditorial : ne jamais laisser croire à un substitut au soin. */
    disclaimer:
      "Soccology is not a replacement for clinical care. If you need urgent support, our crisis resources are always one click away.",
    disclaimerCta: { label: "Get help now", href: "/get-help" },
    imageLabel: "Wide shot — workshop circle in a school hall, colour",
  },

  pillars: {
    eyebrow: "Method",
    title: "Four pillars.",
    intro:
      "The method has four parts. They are sequential in intent, not in practice — people move between them, and back.",
  },

  cta: {
    title: "Bring Soccology to your school, club or organisation.",
    label: "Start a conversation",
    href: "/contact#enquiry",
  },
} as const;

/* -------------------------------------------------------------------------
 * 7. OFFRE — formats de service (BRIEF /services)
 * `title` / `description` / `href` : utilisés par la home (aperçu).
 * Les champs longs (`summary`, `audience`, `includes`, `cta`) servent au
 * détail de /services. Chaque service porte un CTA explicite (BRIEF §5).
 * ⚠️ Aucun prix, durée ou volume : non fournis par le client — ne pas inventer.
 * ---------------------------------------------------------------------- */
export const services = [
  {
    id: "workshops",
    title: "Workshops",
    description: "Football-led sessions opening conversations about mental health.",
    href: "/services#workshops",
    summary:
      "A single session, built around the game, that gets a room talking about something it usually avoids. The football is not a warm-up — it is the reason the conversation is possible.",
    audience: "Schools, clubs, community groups, workplaces",
    includes: [
      "Football-led session delivered on site",
      "Facilitated conversation on mental health and inclusion",
      "Framed around Pre Therapy — no clinical setting required",
      "Suitable for groups who would not attend a talk",
    ],
    cta: { label: "Enquire about workshops", href: "/contact#enquiry" },
    imageLabel: "Workshop in a sports hall, group mid-session, colour, natural light",
  },
  {
    id: "programmes",
    title: "Programmes",
    description: "Sustained interventions in schools, communities and prisons.",
    href: "/services#programmes",
    summary:
      "Where a workshop opens the door, a programme keeps it open. Sustained work over time, with the same faces, until change has somewhere to land.",
    audience: "Schools, prisons, community organisations, local authorities",
    includes: [
      "Repeat sessions with a consistent group",
      "The full method: Pre Therapy, RM&P, Integration",
      "Delivery in schools, communities and prison settings",
      "Route into our counselling service where needed",
    ],
    cta: { label: "Discuss a programme", href: "/contact#enquiry" },
    imageLabel: "Documentary series shot — recurring group session over time, colour",
  },
  {
    id: "alternative-interventions",
    title: "Alternative interventions",
    description: "Reaching people conventional mental-health services don't.",
    href: "/services#alternative-interventions",
    summary:
      "Designed for The Invisibles: people who will not self-refer, will not attend, and are missed by every service that waits to be asked. We go to them, on ground they trust.",
    audience: "Men in psychological difficulty, people disengaged from services",
    includes: [
      "Engagement with people who reject traditional support",
      "Delivered on familiar ground, not in a clinical room",
      "Built on the influence of the professional game",
      "Designed as a first step, not a substitute for clinical care",
    ],
    cta: { label: "Talk to us about reach", href: "/contact#enquiry" },
    imageLabel: "Portrait, black & white — participant, quiet moment, high contrast",
  },
  {
    id: "staff-training",
    title: "Staff training",
    description: "Equipping teachers, coaches and staff to support wellbeing.",
    href: "/services#staff-training",
    summary:
      "The people already in the room every day are the intervention. We equip teachers, coaches and club staff to recognise what they are seeing and to respond without freezing.",
    audience: "Teachers, coaches, club and academy staff, support workers",
    includes: [
      "Training for teachers, coaches and club staff",
      "Recognising distress in people who won't name it",
      "Practical language for opening the conversation",
      "Knowing the limits — and when to route to clinical help",
    ],
    cta: { label: "Enquire about training", href: "/contact#enquiry" },
    imageLabel: "Staff training room, adults in discussion, colour, natural light",
  },
] as const;

/* -------------------------------------------------------------------------
 * 7a-bis. PAGE / (accueil) — bande déroulante avant le formulaire de contact
 * ---------------------------------------------------------------------- */
export const homePage = {
  marquee: {
    text: "Every conversation can change a life.",
  },
} as const;

/* -------------------------------------------------------------------------
 * 7b. PAGE /services — chapeaux de page
 * ---------------------------------------------------------------------- */
export const servicesPage = {
  eyebrow: "Services",
  title: "Football-led work, by format and by audience.",
  intro:
    "Every piece of work starts the same way — on ground people already trust. What changes is the depth, the setting and who is in the room.",
  byFormat: { eyebrow: "By format", title: "What we deliver." },
  byAudience: {
    eyebrow: "By audience",
    title: "Who it's for.",
    intro:
      "The same method, pointed at four different starting points. Not sure which one you are? Start a conversation and we'll work it out with you.",
  },
  cta: {
    title: "Every conversation can change a life.",
    label: "Start a conversation",
    href: "/contact#enquiry",
  },
} as const;

/* -------------------------------------------------------------------------
 * 7c. PAGE /contact — chapeaux de page
 * ---------------------------------------------------------------------- */
export const contactPage = {
  eyebrow: "Contact",
  title: "Start a conversation.",
  intro:
    "Whether you're a family, a school, a partner or a supporter — tell us how we can help. We read everything that comes in.",
  formHeading: "Send us a message",
  detailsHeading: "Find us",
  supportHeading: "Support the work",
  supportBody:
    "Soccology reaches people that conventional services miss. Funding, partnerships and player influence are what keep that work going.",
} as const;

/* -------------------------------------------------------------------------
 * 8. PREUVE SOCIALE — partenaires (mur de logos) & chiffres d'impact
 * BRIEF §2/§5 : stat phare « 24% self-referral ».
 * Les logos réels seront placés dans /public/images/partners/.
 * ---------------------------------------------------------------------- */
export const partners = [
  { name: "Pro Direct", logo: "/images/partners/pro-direct.svg" },
  { name: "Rising Ballers", logo: "/images/partners/rising-ballers.svg" },
  { name: "Premier League clubs", logo: "/images/partners/premier-league.svg" },
] as const;

/** Anciens joueurs pros mis en avant (BRIEF §1). */
export const ambassadors = [
  { name: "Jérémie Aliadière", note: "Former Arsenal" },
  { name: "Anthony Gardner", note: "Former Tottenham" },
] as const;

// On n'affiche QUE des chiffres réels et vérifiés. Pas de données inventées
// pour une ONG. D'autres stats pourront être ajoutées une fois fournies.
export const impactStats = [
  {
    value: "24%",
    label: "of participants self-refer for our counselling service",
    emphasis: true,
  },
] as const;

/* -------------------------------------------------------------------------
 * 8b. TÉMOIGNAGES — RÉELS uniquement (BRIEF /impact, /keep-the-dream-alive)
 * ⚠️ Ne jamais fabriquer de citation. Laisser vide tant que Soccology n'a
 * pas fourni de témoignages réels et autorisés.
 * ---------------------------------------------------------------------- */
type Testimonial = { quote: string; name: string; role?: string };
export const testimonials: readonly Testimonial[] = [
  // TODO: ajouter des témoignages réels fournis par Soccology.
];

/* -------------------------------------------------------------------------
 * 9. PROJET PHARE — Keep The Dream Alive!
 * ---------------------------------------------------------------------- */
export const flagshipProject = {
  id: "keep-the-dream-alive",
  title: "Keep The Dream Alive!",
  href: "/keep-the-dream-alive",
  summary:
    "Our flagship programme connecting participants with the professional game — like Simon, invited to Charlton Athletic FC.",
} as const;

/* -------------------------------------------------------------------------
 * 10. RESSOURCES D'URGENCE — santé mentale UK (BRIEF §5, transversal)
 * Affichées clairement partout (footer + page /get-help). Lignes réelles.
 * ---------------------------------------------------------------------- */
export const emergencyResources = {
  intro:
    "If you or someone you know is struggling, help is available 24/7. You are not alone.",
  lines: [
    {
      name: "Samaritans",
      detail: "Call 116 123 — free, 24/7",
      href: "tel:116123",
      website: "https://www.samaritans.org",
    },
    {
      name: "Shout",
      detail: "Text SHOUT to 85258 — free, 24/7 crisis text line",
      href: "sms:85258&body=SHOUT",
      website: "https://giveusashout.org",
    },
    {
      name: "CALM",
      detail: "Call 0800 58 58 58 — Campaign Against Living Miserably, 5pm–midnight",
      href: "tel:08005858589",
      website: "https://www.thecalmzone.net",
    },
    {
      name: "Emergency",
      detail: "In immediate danger, call 999. For urgent NHS help, call 111 (option 2).",
      href: "tel:999",
      website: "https://111.nhs.uk",
    },
  ],
} as const;

/* -------------------------------------------------------------------------
 * 11. SECTIONS ACTIVÉES (réutilisabilité : activer/désactiver par client)
 * ---------------------------------------------------------------------- */
export const sections = {
  hero: true,
  hero3dBall: true, // ballon 3D (cf. SPEC-BALLON-3D.md)
  impactBanner: true,
  howWeWork: true,
  partnerLogos: true,
  audiences: true,
  flagshipProject: true,
  blogPreview: true,
  finalCta: true,
  contactForm: true,
  emergencyResources: true,
} as const;

/* -------------------------------------------------------------------------
 * 12. SEO — métadonnées propres et uniques (BRIEF §8)
 * ---------------------------------------------------------------------- */
export const seo = {
  titleTemplate: "%s · Soccology",
  defaultTitle: "Soccology — Football as a language for mental health",
  description: identity.description,
  /** Données structurées JSON-LD (Organization / NGO). */
  organization: {
    type: "NGO",
    name: identity.name,
    url: identity.url,
    /** Uniquement les profils réellement renseignés (jamais de placeholder). */
    sameAs: social
      .map((s) => s.href)
      .filter((href) => href !== "" && href !== "#"),
  },
  ogImage: "/images/og.jpg",
} as const;

/* -------------------------------------------------------------------------
 * 13. AGRÉGAT EXPORTÉ
 * ---------------------------------------------------------------------- */
export const siteConfig = {
  identity,
  nav,
  social,
  contact,
  audiences,
  methodPillars,
  aboutPage,
  homePage,
  services,
  servicesPage,
  contactPage,
  partners,
  ambassadors,
  testimonials,
  impactStats,
  flagshipProject,
  emergencyResources,
  sections,
  seo,
} as const;

export type SiteConfig = typeof siteConfig;

export default siteConfig;