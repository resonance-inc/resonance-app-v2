"use client";

import React, { useState } from "react";
import { Eye, EyeOff, LoaderCircleIcon } from "lucide-react";
import z from "zod";
import { Controller, FieldPath, useForm } from "react-hook-form";
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
import { Field, FieldError, FieldLabel } from "../ui/field";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "../ui/stepper";

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

type SignUpFormValues = z.infer<typeof formSchema>;

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
  onSignUp: (data: SignUpFormValues) => void;
  onGoogleSignUp?: () => void;
  loading?: boolean;
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
  loading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState<string | undefined>("FRA");
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { step: 1, title: "Identité" },
    { step: 2, title: "Informations" },
  ];
  const totalSteps = steps.length;

  const stepFieldMap: Record<number, Array<FieldPath<SignUpFormValues>>> = {
    1: ["name", "email", "phoneNumber", "password", "confirmPassword"],
    2: ["country", "city", "artistType"],
  };

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      country: country ?? "",
      city: "",
      artistType: "",
    },
  });
  const { submitCount } = form.formState;

  const handleCountryChange = (
    selectedCountry: Country,
    fieldOnChange: (value: string) => void
  ) => {
    setCountry(selectedCountry.alpha3);
    fieldOnChange(selectedCountry.alpha3);
  };

  const handleNextStep = async () => {
    const fields = stepFieldMap[currentStep];
    if (!fields) {
      return;
    }
    const isValid = await form.trigger(fields);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      // Réinitialiser les erreurs des champs de l'étape suivante pour éviter l'affichage prématuré
      const nextStepFields = stepFieldMap[currentStep + 1];
      if (nextStepFields) {
        nextStepFields.forEach((field) => {
          form.clearErrors(field);
        });
      }
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStepperChange = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const isLastStep = currentStep === totalSteps;

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

            <Stepper value={currentStep} onValueChange={handleStepperChange}>
              {steps.map(({ step, title }) => (
                <StepperItem
                  key={step}
                  step={step}
                  className="not-last:flex-1 max-md:items-start"
                  disabled={step > currentStep}
                >
                  <StepperTrigger className="rounded max-md:flex-col">
                    <StepperIndicator />
                    <div className="hidden md:block text-center md:text-left">
                      <StepperTitle>{title}</StepperTitle>
                    </div>
                  </StepperTrigger>
                  {step < steps.length && (
                    <StepperSeparator className="max-md:mt-3.5 md:mx-4" />
                  )}
                </StepperItem>
              ))}
            </Stepper>

            <Form {...form}>
              <form
                className="space-y-5"
                onSubmit={form.handleSubmit(onSignUp)}
              >
                {currentStep === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field, fieldState }) => (
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
                          {(fieldState.isTouched || submitCount > 0) && (
                            <FormMessage />
                          )}
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field, fieldState }) => (
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
                          {(fieldState.isTouched || submitCount > 0) && (
                            <FormMessage />
                          )}
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field, fieldState }) => (
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
                          {(fieldState.isTouched || submitCount > 0) && (
                            <FormMessage />
                          )}
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field, fieldState }) => (
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
                          {(fieldState.isTouched || submitCount > 0) && (
                            <FormMessage />
                          )}
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field, fieldState }) => (
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
                          {(fieldState.isTouched || submitCount > 0) && (
                            <FormMessage />
                          )}
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <Controller
                      name="country"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-signin-country">
                            Votre pays
                          </FieldLabel>
                          <GlassInputWrapper>
                            <CountryDropdown
                              placeholder="Sélectionner votre pays"
                              defaultValue={country}
                              onChange={(selectedCountry) =>
                                handleCountryChange(
                                  selectedCountry,
                                  field.onChange
                                )
                              }
                            />
                          </GlassInputWrapper>
                          {(fieldState.isTouched || submitCount > 0) &&
                            fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field, fieldState }) => (
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
                          {(fieldState.isTouched || submitCount > 0) && (
                            <FormMessage />
                          )}
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="artistType"
                      render={({ field, fieldState }) => (
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
                                  <SelectItem value="LYRICIST">
                                    Parolier
                                  </SelectItem>
                                  <SelectItem value="SINGER">
                                    Chanteur
                                  </SelectItem>
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
                          {(fieldState.isTouched || submitCount > 0) && (
                            <FormMessage />
                          )}
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <div className="flex flex-col gap-3 md:flex-row md:justify-between">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      className="w-full rounded-2xl border border-border py-4 font-medium text-foreground hover:bg-foreground/5 transition-colors"
                    >
                      Étape précédente
                    </button>
                  )}
                  {isLastStep ? (
                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      {loading ? (
                        <div className="flex items-center gap-4 justify-center">
                          Inscription en cours
                          <LoaderCircleIcon
                            aria-hidden="true"
                            className="animate-spin"
                            size={16}
                          />
                        </div>
                      ) : (
                        "S'inscrire"
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Continuer
                    </button>
                  )}
                </div>
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
