import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { FileText, Github, Zap } from "lucide-react";
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-indigo-600">NoteFlow</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Organize your thoughts, share your ideas, and collaborate
            seamlessly. The modern note-taking platform for creative minds.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-3">
            <Link href="/sign-in">
              <Github className="h-5 w-5 mr-2" />
              Get Started with GitHub
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>Rich Note Taking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create and organize your notes with a clean, intuitive
                interface. Write, edit, and format your thoughts effortlessly.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Instant Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Share your notes publicly with a single click. Generate
                shareable links and collaborate with others seamlessly.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Github className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>GitHub Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Sign in with your GitHub account for a seamless experience. No
                complex registration process required.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-500 mb-4">Already have an account?</p>
          <Button variant="outline" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
