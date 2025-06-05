import { env } from "@/lib/env";
import { FileText, Shield, Sparkles, Zap } from "lucide-react";

import type { ReactNode } from "react";

type SignInLayoutProps = {
  children: ReactNode;
};

export const SignInLayout = ({ children }: SignInLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Section gauche - Branding */}
        <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-12 xl:px-16 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700" />
          <div className="absolute inset-0 bg-black/10" />

          {/* Floating elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl" />
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-white/10 rounded-full blur-xl" />
          <div className="absolute top-1/2 right-32 w-16 h-16 bg-white/10 rounded-full blur-xl" />

          <div className="relative z-10 mx-auto max-w-lg text-white">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">{env.NEXT_PUBLIC_APP_NAME}</h1>
            </div>

            <h2 className="text-4xl font-bold leading-tight mb-6">
              Transform your thoughts into organized notes
            </h2>

            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              Join thousands of users who have revolutionized their note-taking
              experience with our modern, intuitive platform.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Smart Organization
                  </h3>
                  <p className="text-blue-100">
                    Intelligent tagging and search capabilities to find exactly
                    what you need.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Instant Sharing
                  </h3>
                  <p className="text-blue-100">
                    Share your notes publicly with beautiful, responsive
                    layouts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Secure & Private
                  </h3>
                  <p className="text-blue-100">
                    Enterprise-grade security with granular privacy controls.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">✨</span>
                </div>
                <span className="font-medium">Trusted by 10,000+ users</span>
              </div>
              <p className="text-sm text-blue-100">
                &ldquo;NoteFlow has completely transformed how I organize my
                thoughts and collaborate with my team.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Section droite - Formulaire */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-8 lg:px-12 xl:px-16">
          <div className="mx-auto w-full max-w-md">{children}</div>

          {/* Mobile branding */}
          <div className="lg:hidden mt-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-lg font-semibold text-slate-900">
                {env.NEXT_PUBLIC_APP_NAME}
              </span>
            </div>
            <p className="text-slate-600 text-sm">
              The modern note-taking platform for creative minds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
