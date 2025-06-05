import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { GithubSignInButton } from "./github-sign-in-button";

export const SignInForm = () => {
  return (
    <div className="space-y-6">
      {/* Back to home link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <Card className="border-0 shadow-xl shadow-slate-200/50 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-8 pt-8">
          <CardTitle className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back
          </CardTitle>
          <CardDescription className="text-lg text-slate-600">
            Sign in to your account to continue your note-taking journey
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <div className="space-y-6">
            <GithubSignInButton />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500 font-medium">
                  Secure authentication
                </span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-600">
                By signing in, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <span className="text-slate-900 font-medium">
            Sign in with GitHub to get started instantly
          </span>
        </p>
      </div>
    </div>
  );
};
