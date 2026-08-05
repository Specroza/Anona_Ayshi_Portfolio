// Endpoint for the `send-contact-email` Supabase Edge Function.
//
// Set VITE_CONTACT_FUNCTION_URL in your environment to:
//   https://<your-project-ref>.supabase.co/functions/v1/send-contact-email
//
// When it is not set, the contact form falls back to opening the visitor's
// email client with the message prefilled.
export const contactFunctionUrl: string =
  (import.meta.env["VITE_CONTACT_FUNCTION_URL"] as string | undefined) ?? "";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export async function sendContactMessage(payload: ContactPayload): Promise<void> {
  const response = await fetch(contactFunctionUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? "Could not send your message. Please try again.");
  }
}
