import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import type { NoteWithUser } from "@/lib/types/note";
import { formatDistanceToNow } from "date-fns";
import { CalendarDays, FileText } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NoteActions } from "./_components/note-actions";

type PublicNotePageProps = {
  params: Promise<{ slug: string }>;
};

async function getPublicNote(slug: string): Promise<NoteWithUser | null> {
  try {
    const note = await prisma.note.findFirst({
      where: {
        slug,
        isPublic: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        isPublic: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return note;
  } catch (error) {
    console.error("Error fetching public note:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PublicNotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = await getPublicNote(slug);

  if (!note) {
    return {
      title: "Note Not Found",
      description: "The requested note could not be found.",
    };
  }

  return {
    title: note.title,
    description:
      note.content.slice(0, 160) + (note.content.length > 160 ? "..." : ""),
    openGraph: {
      title: note.title,
      description:
        note.content.slice(0, 160) + (note.content.length > 160 ? "..." : ""),
      type: "article",
      publishedTime: note.createdAt.toISOString(),
      modifiedTime: note.updatedAt.toISOString(),
      authors: [note.user.name || note.user.email],
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description:
        note.content.slice(0, 160) + (note.content.length > 160 ? "..." : ""),
    },
  };
}

export default async function PublicNotePage({ params }: PublicNotePageProps) {
  const { slug } = await params;
  const note = await getPublicNote(slug);

  if (!note) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header with subtle background */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h1 className="text-sm font-medium text-slate-900">NoteFlow</h1>
              <p className="text-xs text-slate-500">Public Note</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Note card */}
          <Card className="border-0 shadow-xl shadow-slate-200/50 bg-white/90 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-white to-slate-50/50 p-8">
              <div className="space-y-6">
                {/* Title and actions */}
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0 space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight break-words">
                      {note.title}
                    </h1>
                  </div>
                  <div className="flex-shrink-0">
                    <NoteActions slug={note.slug} content={note.content} />
                  </div>
                </div>

                {/* Author and metadata */}
                <div className="flex items-center gap-6 text-slate-600">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                        {note.user.name
                          ? note.user.name.charAt(0).toUpperCase()
                          : note.user.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-slate-900">
                        {note.user.name || note.user.email}
                      </p>
                      <p className="text-sm text-slate-500">Author</p>
                    </div>
                  </div>

                  <div className="h-8 w-px bg-slate-200" />

                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-slate-400" />
                    <span className="text-sm">
                      Published{" "}
                      {formatDistanceToNow(new Date(note.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <article className="prose prose-slate max-w-none prose-lg">
                <div className="text-slate-700 leading-relaxed whitespace-pre-wrap break-words font-[system-ui] text-base sm:text-lg">
                  {note.content}
                </div>
              </article>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-slate-200/60">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-sm text-slate-600 font-medium">
                Shared publicly on NoteFlow
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
