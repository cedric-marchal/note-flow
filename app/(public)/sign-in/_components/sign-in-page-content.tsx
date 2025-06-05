"use client";

import { useSession } from "@/lib/auth-client";
import { FileText } from "lucide-react";
import { SessionStatus } from "./session-status";
import { SignInForm } from "./sign-in-form";

export const SignInPageContent = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="h-8 w-8 text-blue-600 animate-pulse" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Loading...
          </h3>
          <p className="text-slate-600">
            Please wait while we prepare your experience
          </p>
        </div>
      </div>
    );
  }

  if (session) {
    return <SessionStatus />;
  }

  return <SignInForm />;
};
