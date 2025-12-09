"use client";

import { authClient } from "@/src/lib/auth-client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  //TODO : implement sign out logic
  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
        onError: (error) => {
          console.error("Sign Out error:", error);
        },
      },
    });
  }

  return <Button onClick={handleSignOut}>Se déconnecter</Button>;
}
