"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Link from "next/link";
import { Input } from "../ui/input";
import PhoneNumberInput from "./phone-number-input";
import { Country, CountryDropdown } from "./country-dropdown";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";

const formSchema = z
  .object({
    name: z.string().min(1, "Le nom de profil est requis"),
    email: z
      .string()
      .min(1, "Votre adresse e-mail est obligatoire.")
      .email("Veuillez saisir une adresse e-mail valide."),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\.])[A-Za-z\d@$!%*?&\.]/,
        "Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial"
      ),
    confirmPassword: z
      .string()
      .min(1, "La confirmation du mot de passe est requise"),
    phoneNumber: z.string().min(1, "Le numéro de téléphone est requis"),
    country: z.string().min(1, "Le pays est requis"),
    city: z.string().min(1, "La ville est requise"),
    artistType: z.string().min(1, "Le type d'artiste est requis"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

// --- TYPE DEFINITIONS ---

export interface Testimonial {
  avatarSrc: string;
  name: string;
  handle: string;
  text: string;
}

interface SignUpFormProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  heroImageSrc?: string;
  testimonials?: Testimonial[];
  onSignUp: (data: z.infer<typeof formSchema>) => void;
  onGoogleSignUp?: () => void;
}

// --- SUB-COMPONENTS ---

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-violet-400/70 focus-within:bg-violet-500/10">
    {children}
  </div>
);

const TestimonialCard = ({
  testimonial,
  delay,
}: {
  testimonial: Testimonial;
  delay: string;
}) => (
  <div
    className={`animate-testimonial ${delay} flex items-start gap-3 rounded-3xl bg-card/40 dark:bg-zinc-800/40 backdrop-blur-xl border border-white/10 p-5 w-64`}
  >
    <Image
      src={testimonial.avatarSrc}
      className="h-10 w-10 object-cover rounded-2xl"
      alt="avatar"
      width={40}
      height={40}
    />
    <div className="text-sm leading-snug">
      <p className="flex items-center gap-1 font-medium">{testimonial.name}</p>
      <p className="text-muted-foreground">{testimonial.handle}</p>
      <p className="mt-1 text-foreground/80">{testimonial.text}</p>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

export const SignUpForm: React.FC<SignUpFormProps> = ({
  title = (
    <span className="font-light text-foreground tracking-tighter">Welcome</span>
  ),
  description = "Access your account and continue your journey with us",
  heroImageSrc,
  testimonials = [],
  onSignUp,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState<string | undefined>("FRA");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      country: "",
      city: "",
      artistType: "",
    },
  });

  const handleCountryChange = (selectedCountry: Country) => {
    setCountry(selectedCountry.alpha3);
  };

  return (
    <div className="flex flex-col md:flex-row font-geist w-dvw">
      {/* Left column: sign-in form */}
      <section className="flex-1 flex items-center justify-center p-8 ">
        <div className="w-full max-w-xl">
          <div className="flex flex-col gap-6">
            <h1 className="animate-element animate-delay-100 text-4xl md:text-5xl font-semibold leading-tight">
              {title}
            </h1>
            <p className="animate-element animate-delay-200 text-muted-foreground">
              {description}
            </p>

            <Form {...form}>
              <form
                className="space-y-5"
                onSubmit={form.handleSubmit(onSignUp)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {/* Nom complet */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-muted-foreground">
                          Votre nom complet
                        </FormLabel>
                        <FormControl>
                          <GlassInputWrapper>
                            <Input
                              placeholder="Entrer votre nom complet"
                              {...field}
                              className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
                            />
                          </GlassInputWrapper>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Adresse e-mail */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-muted-foreground">
                          Votre adresse e-mail
                        </FormLabel>
                        <FormControl>
                          <GlassInputWrapper>
                            <Input
                              placeholder="Entrer votre adresse e-mail"
                              {...field}
                              className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
                            />
                          </GlassInputWrapper>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Numéro de téléphone */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-muted-foreground">
                        Votre numéro de téléphone
                      </FormLabel>
                      <FormControl>
                        <GlassInputWrapper>
                          <PhoneNumberInput
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </GlassInputWrapper>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Pays */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-muted-foreground">
                        Votre pays de résidence
                      </FormLabel>
                      <FormControl>
                        <GlassInputWrapper>
                          <CountryDropdown
                            {...field}
                            placeholder="Sélectionner votre pays"
                            defaultValue={country}
                            onChange={handleCountryChange}
                          />
                        </GlassInputWrapper>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Ville */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-muted-foreground">
                        Votre ville de résidence
                      </FormLabel>
                      <FormControl>
                        <GlassInputWrapper>
                          <Input
                            placeholder="Entrer votre ville"
                            {...field}
                            className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
                          />
                        </GlassInputWrapper>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Type d'artiste */}
                <FormField
                  control={form.control}
                  name="artistType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-muted-foreground">
                        Quels type d'artiste êtes-vous ?
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full rounded-xl">
                            <SelectValue placeholder="Sélectionner votre type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Types d'artiste</SelectLabel>
                              <SelectItem value="LYRICIST">Parolier</SelectItem>
                              <SelectItem value="SINGER">Chanteur</SelectItem>
                              <SelectItem value="COMPOSER">
                                Compositeur
                              </SelectItem>
                              <SelectItem value="BEATMAKER">
                                Beatmaker
                              </SelectItem>
                              <SelectItem value="PRODUCER">
                                Producteur
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {/* Mot de passe */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-muted-foreground">
                          Votre mot de passe
                        </FormLabel>
                        <FormControl>
                          <GlassInputWrapper>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Entrer votre mot de passe"
                              {...field}
                              className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-3 flex items-center"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                              ) : (
                                <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                              )}
                            </button>
                          </GlassInputWrapper>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Confirmation du mot de passe */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-muted-foreground">
                          Confirmez votre mot de passe
                        </FormLabel>
                        <FormControl>
                          <GlassInputWrapper>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Entrer votre mot de passe"
                              {...field}
                              className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-3 flex items-center"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                              ) : (
                                <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                              )}
                            </button>
                          </GlassInputWrapper>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <button
                  type="submit"
                  className="animate-element animate-delay-600 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  S'inscrire
                </button>
              </form>
            </Form>

            <p className="animate-element animate-delay-900 text-center text-sm text-muted-foreground">
              Déjà inscrit sur la plateforme ?{" "}
              <Link
                href="/sign-in"
                className="text-violet-400 hover:underline transition-colors"
              >
                Connectez-vous ici.
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Right column: hero image + testimonials */}
      {heroImageSrc && (
        <section className="hidden md:block flex-1 relative p-4">
          <div
            className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImageSrc})` }}
          ></div>
          {testimonials.length > 0 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-8 w-full justify-center">
              <TestimonialCard
                testimonial={testimonials[0]}
                delay="animate-delay-1000"
              />
              {testimonials[1] && (
                <div className="hidden xl:flex">
                  <TestimonialCard
                    testimonial={testimonials[1]}
                    delay="animate-delay-1200"
                  />
                </div>
              )}
              {testimonials[2] && (
                <div className="hidden 2xl:flex">
                  <TestimonialCard
                    testimonial={testimonials[2]}
                    delay="animate-delay-1400"
                  />
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
};
