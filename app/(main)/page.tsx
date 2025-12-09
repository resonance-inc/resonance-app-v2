import SignOutButton from "@/src/components/auth/sign-out-button";
import { ModeToggle } from "@/src/components/ui/mode-toggle";

export default function HomePage() {
  return (
    <div>
      <h1>Hello World</h1>
      <ModeToggle />
      <SignOutButton />
    </div>
  );
}
