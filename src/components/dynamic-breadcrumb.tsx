"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import { Fragment } from "react";

// Mapping des routes vers des labels personnalisés
const routeLabels: Record<string, string> = {
  dashboard: "Tableau de bord",
  artist: "Artistes",
  collaboration: "Collaborations",
  "my-account": "Mon compte",
  admin: "Administration",
  users: "Utilisateurs",
  vocabularies: "Vocabulaires",
  legal: "Légales",
  "legal-mentions": "Mentions légales",
  "terms-of-service": "Conditions générales",
  "privacy-policy": "Politique de confidentialité",
  support: "Support",
  contact: "Contact",
  new: "Nouveau",
};

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  // Générer les segments du chemin
  const segments = pathname
    .split("/")
    .filter((segment) => segment !== "" && segment !== "(main)");

  // Si on est à la racine, afficher "Accueil"
  if (segments.length === 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Accueil</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Lien vers l'accueil */}
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />

        {/* Segments dynamiques */}
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = "/" + segments.slice(0, index + 1).join("/");
          const label =
            routeLabels[segment] ||
            segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <Fragment key={segment + index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
