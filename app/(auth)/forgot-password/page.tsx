"use client";

import {
  ForgotPasswordForm,
  Testimonial,
} from "@/src/components/auth/forgot-password-form";
import { Button } from "@/src/components/ui/button";
import { requestPasswordReset } from "@/src/lib/auth-client";
import { CircleX, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/57.jpg",
    name: "Sarah Chen",
    handle: "@sarahdigital",
    text: "Amazing platform! The user experience is seamless and the features are exactly what I needed.",
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/64.jpg",
    name: "Marcus Johnson",
    handle: "@marcustech",
    text: "This service has transformed how I work. Clean design, powerful features, and excellent support.",
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "David Martinez",
    handle: "@davidcreates",
    text: "I've tried many platforms, but this one stands out. Intuitive, reliable, and genuinely helpful for productivity.",
  },
];

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleForgotPassword = async (data: { email: string }) => {
    setLoading(true);

    await requestPasswordReset(
      {
        email: data.email,
        redirectTo: "/reset-password",
      },
      {
        onSuccess: () => {
          router.push("forgot-password/success");
          router.refresh();
        },
        onError: (error) => {
          console.error("Error:", error);

          // Message d'erreur
          toast.custom((t) => (
            <div className="w-full rounded-md border bg-background px-4 py-3 text-foreground shadow-lg sm:w-var(--width)">
              <div className="flex gap-2">
                <div className="flex grow gap-3">
                  <CircleX
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-red-500"
                    size={16}
                  />
                  <div className="flex grow justify-between gap-12">
                    <p className="text-sm">
                      Un problème est survenu lors de l'envoi de l'email,
                      veuillez réesayer
                    </p>
                  </div>
                </div>
                <Button
                  aria-label="Close banner"
                  className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
                  onClick={() => toast.dismiss(t)}
                  variant="ghost"
                >
                  <XIcon
                    aria-hidden="true"
                    className="opacity-60 transition-opacity group-hover:opacity-100"
                    size={16}
                  />
                </Button>
              </div>
            </div>
          ));

          setLoading(false);
        },
      }
    );
  };

  return (
    <div className="bg-background text-foreground">
      <ForgotPasswordForm
        heroImageSrc="background.png"
        title="Mot de passe oublié ?"
        description="Pas de souci ! Entrez votre adresse e-mail ci-dessous et nous vous enverrons un lien pour réinitialiser votre mot de passe."
        testimonials={sampleTestimonials}
        onForgotPassword={handleForgotPassword}
        loading={loading}
      />
    </div>
  );
}
