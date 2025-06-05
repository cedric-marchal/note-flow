"use client";

import { Github } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export const GithubSignInButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
      });
    } catch (error: unknown) {
      console.error("Error signing in with GitHub:", error);
      toast.error("Error signing in with GitHub");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGithubSignIn}
      disabled={isLoading}
      variant="outline"
      size="lg"
      className="w-full"
    >
      <Github className="mr-2 h-4 w-4" />
      {isLoading ? "Signing in..." : "Continue with GitHub"}
    </Button>
  );
};
