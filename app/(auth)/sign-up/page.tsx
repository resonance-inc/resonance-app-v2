"use client";

import { SignUpForm, Testimonial } from "@/src/components/auth/sign-up-form";
import { Button } from "@/src/components/ui/button";
import { signUp } from "@/src/lib/auth-client";
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

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSignUp(data: {
    name: string;
    email: string;
    phoneNumber: string;
    country: string;
    city: string;
    artistType: string;
    password: string;
    confirmPassword: string;
  }) {
    setLoading(true);

    await signUp.email(
      {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        country: data.country,
        city: data.city,
        artistType: data.artistType,
        password: data.password,
      },
      {
        onSuccess: () => {
          router.push("/verify-email");
          router.refresh();
        },
        onError: (error) => {
          console.error("Sign Up error:", error);

          // Message d'erreur général pour toutes les autres erreurs
          toast.custom((t) => (
            <div className="w-full rounded-md border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800 px-4 py-3 text-foreground shadow-lg sm:w-var(--width)">
              <div className="flex gap-2">
                <div className="flex grow gap-3">
                  <CircleX
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-red-500"
                    size={16}
                  />
                  <div className="flex grow flex-col gap-1">
                    <p className="text-sm font-medium">Erreur de connexion</p>
                    <p className="text-sm text-muted-foreground">
                      Une erreur s'est produite lors de la connexion. Veuillez
                      réessayer ultérieurement.
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
  }

  return (
    <div className="bg-background text-foreground">
      <SignUpForm
        heroImageSrc="background.png"
        title="Bienvenue parmi nous !"
        description="Inscrivez-vous pour découvrir nos fonctionnalités exclusives et vous connecter à d'autres artistes."
        testimonials={sampleTestimonials}
        onSignUp={handleSignUp}
        loading={loading}
      />
    </div>
  );
}
