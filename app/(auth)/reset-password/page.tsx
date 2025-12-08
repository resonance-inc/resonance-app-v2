"use client";

import {
  ResetPasswordForm,
  Testimonial,
} from "@/src/components/auth/reset-password-form";

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
  const handleResetPassword = (data: {
    password: string;
    confirmPassword: string;
  }) => {
    console.log("Reset Password submitted:", data);
  };

  return (
    <div className="bg-background text-foreground">
      <ResetPasswordForm
        heroImageSrc="background.png"
        title="Réinitialisez votre mot de passe"
        description="Entrez votre nouveau mot de passe ci-dessous pour accéder à votre compte. Assurez-vous de choisir un mot de passe sécurisé."
        testimonials={sampleTestimonials}
        onResetPassword={handleResetPassword}
      />
    </div>
  );
}
