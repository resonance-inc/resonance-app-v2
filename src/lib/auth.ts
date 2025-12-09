import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { resend } from "./resend";
import { VerifyEmail } from "../components/emails/verify-email";
import { ChangeEmailRequest } from "../components/emails/change-email-request";
import { admin } from "better-auth/plugins";
import { ResetPasswordEmail } from "../components/emails/reset-password-email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      try {
        const { error } = await resend.emails.send({
          from:
            process.env.RESEND_FROM_EMAIL ||
            "RESONANCE <no-reply@christopher-marie-angelique.fr>",
          to: user.email,
          subject: "RESONANCE - Réinitialisation de votre mot de passe",
          react: ResetPasswordEmail({ url }),
        });

        if (error) {
          console.error("❌ Erreur Resend:", error);
          throw error;
        }
      } catch (error) {
        console.error(
          "❌ Erreur lors de l'envoi de l'email de réinitialisation:",
          error
        );
        throw error;
      }
    },
  },
  emailVerification: {
    sendOnSignUp: true,

    sendVerificationEmail: async ({ user, url }) => {
      try {
        await resend.emails.send({
          from:
            process.env.RESEND_FROM_EMAIL ||
            "RESONANCE <no-reply@christopher-marie-angelique.fr>",
          to: user.email,
          subject: "RESONANCE - Vérification de votre adresse e-mail",
          react: VerifyEmail({ url }),
        });
      } catch (error) {
        console.error(
          "Erreur lors de l'envoi de l'email de vérification :",
          error
        );
      }
    },
  },
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url }) => {
        await resend.emails.send({
          from:
            process.env.RESEND_FROM_EMAIL ||
            "RESONANCE <no-reply@christopher-marie-angelique.fr>",
          to: user.email,
          subject: "RESONANCE - Confirmez le changement d'adresse email",
          react: ChangeEmailRequest({
            url,
            currentEmail: user.email,
            newEmail,
          }),
        });
      },
    },
    additionalFields: {
      phoneNumber: {
        type: "string",
        required: false,
      },
      country: {
        type: "string",
        required: true,
      },
      city: {
        type: "string",
        required: true,
      },
      artistType: {
        type: "string",
        required: true,
      },
    },
  },
  plugins: [
    admin({
      defaultRole: "user",
      defaultBanReason: "ACCOUNT_DISABLED",
    }),
  ],
});
