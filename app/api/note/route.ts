import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CreateNoteSchema } from "@/lib/schemas/note.schema";
import {
  BadRequestError,
  handleApiError,
  UnauthorizedError,
} from "@/utils/api/handle-api-error";
import { slugify } from "@/utils/string/slugify";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      throw new UnauthorizedError("You must be logged in to view notes");
    }

    const notes = await prisma.note.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        isPublic: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(notes);
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      throw new UnauthorizedError("You must be logged in to create a note");
    }

    const formData = await request.formData();

    const noteData = CreateNoteSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      isPublic: formData.get("isPublic") === "true",
    });

    const slug = slugify(noteData.title);

    const uniqueId = crypto.randomUUID();
    const uniqueSlug = `${slug}-${uniqueId}`;

    const existingNote = await prisma.note.findUnique({
      where: {
        slug: uniqueSlug,
      },
      select: {
        id: true,
      },
    });

    if (existingNote) {
      throw new BadRequestError("Note with this title already exists");
    }

    const note = await prisma.note.create({
      data: {
        title: noteData.title,
        slug: uniqueSlug,
        content: noteData.content,
        isPublic: noteData.isPublic,
        userId: session.user.id,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        isPublic: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
