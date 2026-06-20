import * as React from "react";
import { resend } from "./client";
// import * as Sentry from "@sentry/nextjs"; // TODO Phase 4: Integrate Sentry

export interface SendEmailOptions<T> {
  to: string;
  subject: string;
  template: React.ComponentType<T>;
  props: T;
}

export async function sendEmail<T>({ to, subject, template: Template, props }: SendEmailOptions<T>) {
  if (!resend) {
    console.warn(`[Email Skipped] Missing RESEND_API_KEY. Would have sent "${subject}" to ${to}`);
    return { success: false, error: "Missing RESEND_API_KEY" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "YAD Cambodia <noreply@yadcambodia.org>", // Update with verified domain
      to,
      subject,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      react: React.createElement(Template as any, props as any),
    });

    if (error) {
      console.error("[Email Error]", error);
      // Sentry.captureException(error, { extra: { to, subject } });
      return { success: false, error: error.message };
    }

    return { success: true, data };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const error = err instanceof Error ? err : new Error("Unknown email error");
    console.error("[Email Exception]", error);
    // Sentry.captureException(error, { extra: { to, subject } });
    return { success: false, error: error.message };
  }
}

