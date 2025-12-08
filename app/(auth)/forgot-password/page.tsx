"use client";

import {
  ForgotPasswordForm,
  Testimonial,
} from "@/src/components/auth/forgot-password-form";

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
  const handleForgotPassword = (data: { email: string }) => {
    console.log("Forgot Password submitted:", data);
  };

  return (
    <div className="bg-background text-foreground">
      <ForgotPasswordForm
        heroImageSrc="background.png"
        title="Mot de passe oublié ?"
        description="Pas de souci ! Entrez votre adresse e-mail ci-dessous et nous vous enverrons un lien pour réinitialiser votre mot de passe."
        testimonials={sampleTestimonials}
        onForgotPassword={handleForgotPassword}
      />
    </div>
  );
}
