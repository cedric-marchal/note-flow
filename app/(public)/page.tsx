import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import {
  ArrowRight,
  FileText,
  Github,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await import("next/headers").then((mod) => mod.headers()),
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 backdrop-blur-sm rounded-full border border-blue-200/60 mb-8">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Modern Note-Taking Platform
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl font-bold text-slate-900 mb-8 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              NoteFlow
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your thoughts into organized, shareable notes. Experience
            the future of note-taking with our intuitive platform designed for
            creative minds and productive teams.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 transition-all duration-300"
            >
              <Link href="/sign-in" className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                Get Started with GitHub
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="text-lg px-8 py-4 border-slate-200 hover:bg-slate-50 transition-all duration-300"
            >
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything you need to organize your thoughts
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful features designed to make note-taking effortless and
              collaboration seamless.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-slate-900">
                  Rich Note Taking
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-slate-600 leading-relaxed">
                  Create and organize your notes with a clean, intuitive
                  interface. Write, edit, and format your thoughts effortlessly
                  with our modern editor.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/25">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-slate-900">
                  Instant Sharing
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-slate-600 leading-relaxed">
                  Share your notes publicly with a single click. Generate
                  beautiful, shareable links and collaborate with others
                  seamlessly.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/25">
                  <Github className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-slate-900">
                  GitHub Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-slate-600 leading-relaxed">
                  Sign in with your GitHub account for a seamless experience. No
                  complex registration process required - just one click to
                  start.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Additional Features */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                Built for modern workflows
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Secure & Private
                    </h4>
                    <p className="text-slate-600">
                      Your notes are protected with enterprise-grade security.
                      Control who sees what with granular privacy settings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Team Collaboration
                    </h4>
                    <p className="text-slate-600">
                      Share notes with your team, get feedback, and collaborate
                      in real-time. Perfect for remote teams and creative
                      projects.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Smart Organization
                    </h4>
                    <p className="text-slate-600">
                      Intelligent tagging and search capabilities help you find
                      exactly what you're looking for, when you need it.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl shadow-blue-500/25">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold">
                    Ready to get started?
                  </h4>
                  <p className="text-blue-100">
                    Join thousands of users who have transformed their
                    note-taking experience with NoteFlow.
                  </p>
                  <Button
                    asChild
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-blue-50 font-medium"
                  >
                    <Link href="/sign-in">Start for Free</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-slate-200/60 p-12 max-w-4xl mx-auto shadow-xl shadow-slate-200/50">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Already have an account?
            </h3>
            <p className="text-slate-600 mb-8 text-lg">
              Welcome back! Sign in to continue your note-taking journey.
            </p>
            <Button
              variant="outline"
              asChild
              size="lg"
              className="text-lg px-8 py-4 border-slate-300 hover:bg-slate-50 transition-all duration-300"
            >
              <Link href="/sign-in">Sign In to Your Account</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
