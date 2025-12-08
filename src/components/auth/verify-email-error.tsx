import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

function VerifyEmailError() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              Inscription à notre plateforme <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-4xl md:text-6xl max-w-2xl tracking-tighter text-center font-regular">
              Une erreur est survenue lors de la vérification de votre adresse
              e-mail
            </h1>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Nous sommes désolés, mais une erreur est survenue lors de la
              vérification de votre adresse e-mail. Veuillez réessayer en
              cliquant sur le lien de vérification dans l'e-mail que nous vous
              avons envoyé. Si le problème persiste, n'hésitez pas à contacter
              notre support pour obtenir de l'aide.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Link href="/contact">
              <Button size="lg" className="gap-4" variant="outline">
                Contacter le support <PhoneCall className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/sign-in">
              <Button size="lg" className="gap-4">
                Se connecter <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { VerifyEmailError };
