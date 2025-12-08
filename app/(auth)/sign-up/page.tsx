"use client";

import { SignUpForm, Testimonial } from "@/src/components/auth/sign-up-form";

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
  const handleSignUp = (data: {
    name: string;
    email: string;
    phoneNumber: string;
    country: string;
    city: string;
    artistType: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log("Sign Up submitted:", data);
  };

  return (
    <div className="bg-background text-foreground">
      <SignUpForm
        heroImageSrc="background.png"
        title="Bienvenue parmi nous !"
        description="Inscrivez-vous pour découvrir nos fonctionnalités exclusives et vous connecter à d'autres artistes."
        testimonials={sampleTestimonials}
        onSignUp={handleSignUp}
      />
    </div>
  );
}
