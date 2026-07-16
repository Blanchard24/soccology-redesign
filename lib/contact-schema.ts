import { z } from "zod";
import { contact } from "@/content/site.config";

/**
 * Schéma du formulaire de contact — SOURCE UNIQUE, partagée client ↔ serveur.
 *
 * Le client (ContactForm) et la route API (/api/contact) valident avec le MÊME
 * schéma : la validation navigateur est du confort, jamais une garantie. Une
 * requête forgée passe par la même porte.
 *
 * `enquiryType` est un enum dérivé de `contact.enquiryTypes` : ajouter un type
 * dans site.config.ts suffit, ici il n'y a rien à toucher (BRIEF §9).
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.email("Please enter a valid email address."),
  enquiryType: z.enum(contact.enquiryTypes, {
    error: "Please choose a subject.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (10+ characters).")
    .max(5000, "Please keep your message under 5000 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;
