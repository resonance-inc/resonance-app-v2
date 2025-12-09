"use client";

import {
  ResetPasswordForm,
  Testimonial,
} from "@/src/components/auth/reset-password-form";
import { resetPassword } from "@/src/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  const handleResetPassword = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    setLoading(true);

    await resetPassword(
      {
        newPassword: data.password,
        token: token || "",
      },
      {
        onSuccess: () => {
          router.push("reset-password/success");
          router.refresh();
        },
        onError: (error) => {
          console.error("Error:", error);

          if (error.error.code === "INVALID_TOKEN") {
            router.push("reset-password/error");
            router.refresh();
          }
        },
      }
    );
  };

  return (
    <div className="bg-background text-foreground">
      <ResetPasswordForm
        heroImageSrc="background.png"
        title="Réinitialisez votre mot de passe"
        description="Entrez votre nouveau mot de passe ci-dessous pour accéder à votre compte. Assurez-vous de choisir un mot de passe sécurisé."
        testimonials={sampleTestimonials}
        onResetPassword={handleResetPassword}
        loading={loading}
      />
    </div>
  );
}
