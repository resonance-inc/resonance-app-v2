import { ContactCard } from "@/src/components/ui/contact-card";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="relative flex size-full min-h-screen w-full items-center justify-center p-4">
      <div className="mx-auto max-w-5xl">
        <Link href="/">
          <Button variant="link" className="my-4">
            <ArrowLeft />
            Retour à l'accueil
          </Button>
        </Link>
        <ContactCard
          title="Entrer en contact"
          description="Si vous avez des questions concernant nos services ou besoin d'aide, veuillez remplir le formulaire ici. Nous faisons de notre mieux pour répondre dans un délai d'un jour ouvrable."
          contactInfo={[
            {
              icon: MailIcon,
              label: "Adresse e-mail",
              value: "contact@resonance.dev",
            },
            {
              icon: PhoneIcon,
              label: "Téléphone",
              value: "+33 6 12 34 56 78",
            },
            {
              icon: MapPinIcon,
              label: "Où nous trouver",
              value: "Toulouse, France",
              className: "col-span-2",
            },
          ]}
        >
          <form action="" className="w-full space-y-4">
            <div className="flex flex-col gap-2">
              <Label>Votre nom</Label>
              <Input type="text" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Votre adresse e-mail</Label>
              <Input type="email" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Votre téléphone</Label>
              <Input type="phone" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Sujet</Label>
              <Input type="subject" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Message</Label>
              <Textarea />
            </div>
            <Button className="w-full" type="button">
              Envoyer le message <ArrowRight />
            </Button>
          </form>
        </ContactCard>
      </div>
    </div>
  );
}
