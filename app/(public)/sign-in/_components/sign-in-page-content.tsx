"use client";

import { useSession } from "@/lib/auth-client";
import { SessionStatus } from "./session-status";
import { SignInForm } from "./sign-in-form";

export const SignInPageContent = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  if (session) {
    return <SessionStatus />;
  }

  return <SignInForm />;
};
