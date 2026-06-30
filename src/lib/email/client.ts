import { Resend } from "resend";

/**
 * Resend email client singleton.
 * Requires RESEND_API_KEY environment variable.
 * In development, if the key is not set, email sending will be skipped with a console warning.
 */
export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
