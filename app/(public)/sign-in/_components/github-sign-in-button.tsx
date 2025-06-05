"use client";

import { ArrowRight, Github } from "lucide-react";
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
      type="button"
      onClick={handleGithubSignIn}
      disabled={isLoading}
      size="lg"
      className="w-full h-12 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white shadow-lg shadow-slate-900/25 transition-all duration-300 group cursor-pointer"
    >
      <div className="flex items-center justify-center gap-3">
        <Github className="h-5 w-5" />
        <span className="font-medium">
          {isLoading ? "Signing in..." : "Continue with GitHub"}
        </span>
        {!isLoading && (
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        )}
        {isLoading && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        )}
      </div>
    </Button>
  );
};
