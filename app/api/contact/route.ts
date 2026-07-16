import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema } from "@/lib/contact-schema";

/**
 * POST /api/contact — réception du formulaire de contact (BRIEF §5).
 *
 * Revalide TOUJOURS côté serveur avec le même schéma que le client : la
 * validation navigateur est du confort pour l'utilisateur, pas une garantie.
 * Un `curl` contourne React Hook Form, jamais cette route.
 *
 * ⚠️ LIVRAISON NON BRANCHÉE — c'est volontaire, pas un oubli :
 * `contact.email` n'a pas encore été fourni par le client et aucun fournisseur
 * (Resend / Formspree) n'est configuré. En attendant, la demande est validée
 * puis journalisée côté serveur pour ne pas être perdue en démo.
 * TODO(client): fournir l'adresse de destination + la clé du fournisseur, puis
 * remplacer le `console.info` ci-dessous par l'envoi réel.
 */
export async function POST(request: Request) {
  let payload: unknown;

  // Un corps non-JSON ne doit pas remonter en 500 : c'est une requête invalide.
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const result = contactSchema.safeParse(payload);

  if (!result.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed.",
        // Erreurs par champ — exploitables telles quelles par le client.
        fieldErrors: z.flattenError(result.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  const enquiry = result.data;

  // TODO(client): remplacer par l'envoi réel (Resend/Formspree) vers contact.email.
  // Journalisé sans le message pour éviter de déverser des données personnelles
  // sensibles (santé mentale) dans les logs d'hébergement.
  console.info(
    `[contact] new enquiry — type: ${enquiry.enquiryType}, from: ${enquiry.email}`,
  );

  return NextResponse.json({ ok: true });
}
