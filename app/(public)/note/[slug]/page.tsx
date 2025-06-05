import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import type { NoteWithUser } from "@/lib/types/note";
import { formatDistanceToNow } from "date-fns";
import { CalendarDays } from "lucide-react";
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
    <main className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-lg overflow-hidden">
          <CardHeader className="border-b p-4 sm:p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-2xl sm:text-3xl font-bold break-words">
                    {note.title}
                  </CardTitle>
                </div>
                <div className="flex-shrink-0 sm:hidden">
                  <NoteActions slug={note.slug} content={note.content} />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <Avatar className="h-6 w-6 flex-shrink-0">
                      <AvatarFallback className="text-xs">
                        {note.user.name
                          ? note.user.name.charAt(0).toUpperCase()
                          : note.user.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate">
                      {note.user.name || note.user.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      {formatDistanceToNow(new Date(note.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>

                <div className="hidden sm:block flex-shrink-0">
                  <NoteActions slug={note.slug} content={note.content} />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="prose prose-gray max-w-none prose-sm sm:prose-base">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed break-words overflow-wrap-anywhere hyphens-auto">
                {note.content}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            This note was shared publicly on NoteFlow
          </p>
        </div>
      </div>
    </main>
  );
}
