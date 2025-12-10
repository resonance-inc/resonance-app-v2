"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  const faqItems = [
    {
      id: "item-1",
      question: "Comment fonctionne RESONANCE ?",
      answer:
        "RESONANCE est une plateforme qui connecte les artistes, producteurs, ingénieurs du son et autres professionnels amateurs de la musique. Créez votre profil, parcourez les talents disponibles, et collaborez sur des projets musicaux en toute simplicité.",
    },
    {
      id: "item-2",
      question: "Qui peut rejoindre la plateforme ?",
      answer:
        "RESONANCE est ouverte à tous les passionnés de musique : artistes (chanteurs, rappeurs, musiciens), producteurs, beatmakers, ingénieurs du son, auteurs-compositeurs, et graphistes. Que vous débutiez ou ayez déjà de l'expérience, vous êtes les bienvenus.",
    },
    {
      id: "item-3",
      question: "La plateforme est-elle gratuite ?",
      answer:
        "Oui, l'inscription et l'accès aux fonctionnalités de base sont entièrement gratuits. Vous pouvez créer votre profil, rechercher des collaborateurs et échanger avec d'autres membres sans frais. Des fonctionnalités premium seront disponibles prochainement.",
    },
    {
      id: "item-4",
      question: "Comment trouver des collaborateurs pour mon projet ?",
      answer:
        "Utilisez nos filtres de recherche avancés pour trouver des profils correspondant à vos besoins : type d'artiste, genre musical, localisation, et disponibilité. Vous pouvez ensuite les contacter directement via notre messagerie intégrée.",
    },
    {
      id: "item-5",
      question: "Comment protéger mes créations et mes droits d'auteur ?",
      answer:
        "Nous vous recommandons de toujours établir des accords clairs avec vos collaborateurs avant de partager vos créations. RESONANCE facilite la mise en relation, mais la gestion des droits d'auteur reste de la responsabilité des créateurs. Pensez à déposer vos œuvres auprès des organismes compétents.",
    },
    {
      id: "item-6",
      question: "Puis-je collaborer avec des artistes d'autres pays ?",
      answer:
        "Absolument ! RESONANCE est une plateforme internationale. Vous pouvez collaborer avec des talents du monde entier grâce à nos outils de communication en ligne et à distance.",
    },
    {
      id: "item-7",
      question: "Comment puis-je mettre en avant mon profil ?",
      answer:
        "Complétez votre profil avec vos compétences, vos réalisations passées, et ajoutez des échantillons de votre travail (démos, portfolio). Un profil complet et professionnel augmente vos chances d'être contacté pour des collaborations.",
    },
    {
      id: "item-8",
      question: "Que faire si j'ai un problème avec un collaborateur ?",
      answer:
        "Contactez notre équipe de support via la page contact. Nous sommes là pour vous aider à résoudre les conflits et garantir une expérience positive pour tous les membres de la communauté RESONANCE.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            Foire aux questions (FAQ)
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            Découvrez des réponses rapides et complètes aux questions courantes
            sur notre plateforme, nos services et nos fonctionnalités.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <Link href="/">
            <Button variant="link" className="my-4">
              <ArrowLeft />
              Retour à l'accueil
            </Button>
          </Link>
          <Accordion
            type="single"
            collapsible
            className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0"
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-dashed"
              >
                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-base">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="text-muted-foreground mt-6 px-8">
            Vous ne trouvez pas ce que vous cherchez ? Contactez notre{" "}
            <Link
              href="/contact"
              className="text-primary font-medium hover:underline"
            >
              équipe support
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
