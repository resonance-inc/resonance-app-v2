"use client";

import * as React from "react";
import { Frame, LayoutGrid, LifeBuoy, Scale, Send, Shield } from "lucide-react";

import { NavMain } from "@/src/components/nav-main";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NavProjects } from "@/src/components/nav-projects";
import { NavSecondary } from "@/src/components/nav-secondary";
import { NavUser } from "@/src/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "Votre Espace",
      url: "#",
      icon: LayoutGrid,
      isActive: true,
      items: [
        {
          title: "Tableau de bord",
          url: "/dashboard",
        },
        {
          title: "Trouver un artistes",
          url: "/artist",
        },
        {
          title: "Trouver une collaboration",
          url: "/collaboration",
        },
        {
          title: "Proposer une collaboration",
          url: "/collaboration/new",
        },
      ],
    },
    {
      title: "Administration",
      url: "#",
      icon: Shield,
      items: [
        {
          title: "Utilisateurs",
          url: "/admin/users",
        },
        {
          title: "Vocabulaires",
          url: "/admin/vocabularies",
        },
        {
          title: "Collaborations",
          url: "/admin/collaborations",
        },
      ],
    },
    {
      title: "Légales",
      url: "#",
      icon: Scale,
      items: [
        {
          title: "Mentions légales",
          url: "/legal/legal-mentions",
        },
        {
          title: "Conditions générales",
          url: "/legal/terms-of-service",
        },
        {
          title: "Politique de confidentialité",
          url: "/legal/privacy-policy",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      title: "Contactez-nous",
      url: "/contact",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Projet 1",
      url: "#",
      icon: Frame,
    },
    {
      name: "Projet 2",
      url: "#",
      icon: Frame,
    },
    {
      name: "Projet 3",
      url: "#",
      icon: Frame,
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role?: string | null;
  };
}) {
  // Filtrer les items de navigation selon le rôle
  const navMainItems = data.navMain.filter((item) => {
    // Si c'est le panel Administration, ne l'afficher que pour les admins
    if (item.title === "Administration") {
      return user.role === "admin";
    }
    return true;
  });
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-30">
              <Image
                alt="Logo"
                src="/logo-resonance.png"
                width={200}
                height={200}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user.name,
            email: user.email,
            avatar: user.image || "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
