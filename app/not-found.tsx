import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowLeft,
  FileText,
  Home,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  const suggestions = [
    {
      icon: Home,
      title: "Go Home",
      description: "Return to the homepage",
      href: "/",
      primary: true,
    },
    {
      icon: FileText,
      title: "Browse Notes",
      description: "Explore public notes",
      href: "/dashboard",
      primary: false,
    },
    {
      icon: Search,
      title: "Search",
      description: "Find what you're looking for",
      href: "/#features",
      primary: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error illustration */}
          <div className="relative mb-12">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
              <AlertTriangle className="h-16 w-16 text-slate-400" />

              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-200 rounded-full opacity-60" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-purple-200 rounded-full opacity-40" />
            </div>

            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-blue-500" />
              <span className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                404
              </span>
              <Sparkles className="h-5 w-5 text-purple-500" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Oops! Page not found
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-lg mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved. Let&apos;s get you back on track.
            </p>
          </div>

          {/* Action cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {suggestions.map((suggestion) => (
              <Card
                key={suggestion.href}
                className={`group border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 ${
                  suggestion.primary ? "ring-2 ring-blue-500/20" : ""
                }`}
              >
                <CardHeader className="text-center pb-2">
                  <div
                    className={`mx-auto w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 ${
                      suggestion.primary
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25"
                        : "bg-slate-100"
                    }`}
                  >
                    <suggestion.icon
                      className={`h-6 w-6 ${
                        suggestion.primary ? "text-white" : "text-slate-600"
                      }`}
                    />
                  </div>
                </CardHeader>
                <CardContent className="text-center pt-0 pb-6">
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {suggestion.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {suggestion.description}
                  </p>
                  <Button
                    asChild
                    variant={suggestion.primary ? "default" : "outline"}
                    size="sm"
                    className={
                      suggestion.primary
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25"
                        : "border-slate-200 hover:bg-slate-50"
                    }
                  >
                    <Link href={suggestion.href}>{suggestion.title}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Back link */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              asChild
              className="text-slate-600 hover:text-slate-900"
            >
              <Link
                href="javascript:history.back()"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go back to previous page
              </Link>
            </Button>
          </div>

          {/* Help section */}
          <div className="mt-16 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <h3 className="font-semibold text-slate-900 mb-2">
              Still need help?
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              If you believe this is an error, please contact our support team.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
