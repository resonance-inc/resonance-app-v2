import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

function ResetPasswordError() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              Réinitialisation de votre mot de passe{" "}
              <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-4xl md:text-6xl max-w-2xl tracking-tighter text-center font-regular">
              Une erreur est survenue lors de la réinitialisation de votre mot
              de passe.
            </h1>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Il semblerait qu'une erreur soit survenue pendant le processus de
              réinitialisation. Veuillez réessayer ou contacter notre support si
              le problème persiste.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Link href="/contact">
              <Button size="lg" className="gap-4" variant="outline">
                Contacter le support <PhoneCall className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/forgot-password">
              <Button size="lg" className="gap-4">
                Recommencer <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ResetPasswordError };
