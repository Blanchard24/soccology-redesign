"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { siteConfig } from "@/content/site.config";

type FormValues = ContactInput;

/**
 * Formulaire de contact fonctionnel (BRIEF §4/§5).
 * Validation Zod + React Hook Form, libellés reliés (accessibilité),
 * états idle/submitting/success/error.
 *
 * Le schéma est importé depuis `lib/contact-schema` et PARTAGÉ avec la route
 * /api/contact : une seule définition, donc impossible que les règles du client
 * et du serveur divergent avec le temps.
 */
export function ContactForm() {
  const { contact } = siteConfig;
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
    // `enquiryType` est un enum : "" n'en fait pas partie, d'où le cast — il
    // représente l'état « rien de choisi » et sera rejeté par la validation,
    // ce qui est exactement le comportement voulu.
    defaultValues: {
      name: "",
      email: "",
      enquiryType: "" as FormValues["enquiryType"],
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    try {
      const res = await fetch(contact.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-sm text-accent">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-sm text-accent">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="enquiryType">Subject</Label>
        <select
          id="enquiryType"
          aria-invalid={!!errors.enquiryType}
          aria-describedby={errors.enquiryType ? "enquiry-error" : undefined}
          className="flex h-11 w-full rounded-sm border border-border bg-surface px-3 text-base text-foreground focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring aria-[invalid=true]:border-accent"
          defaultValue=""
          {...register("enquiryType")}
        >
          <option value="" disabled>
            Choose a subject…
          </option>
          {contact.enquiryTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.enquiryType && (
          <p id="enquiry-error" className="mt-1.5 text-sm text-accent">
            {errors.enquiryType.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-accent">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          {isSubmitting ? "Sending…" : "Send message"}
        </Button>

        {status === "success" && (
          <p role="status" className="inline-flex items-center gap-2 text-sm text-support">
            <Check className="h-4 w-4" aria-hidden />
            Thanks — we&apos;ll be in touch.
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="inline-flex items-center gap-2 text-sm text-accent">
            <AlertCircle className="h-4 w-4" aria-hidden />
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}