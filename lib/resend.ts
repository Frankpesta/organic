import { Resend } from "resend";

// Lazy initialization to avoid issues during Convex analysis
let resendInstance: Resend | null = null;

export function getResend() {
  if (!resendInstance) {
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Emails will not be sent.");
      return null;
    }
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "noreply@helensbeautysecret.com";

// Email sending utility function
export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
}) {
  try {
    const resend = getResend();
    if (!resend) {
      console.warn("Resend not available, skipping email send");
      return { success: false, error: "Resend not configured" };
    }

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      react,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
}
