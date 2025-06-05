import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UpdateNoteSchema } from "@/lib/schemas/note.schema";
import {
  ForbiddenError,
  handleApiError,
  NotFoundError,
  UnauthorizedError,
} from "@/utils/api/handle-api-error";
import { slugify } from "@/utils/string/slugify";
import { type NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      throw new UnauthorizedError("You must be logged in to update a note");
    }

    const { id } = await params;
    const formData = await request.formData();

    const noteData = UpdateNoteSchema.parse({
      title: formData.get("title") || undefined,
      content: formData.get("content") || undefined,
      isPublic: formData.get("isPublic")
        ? formData.get("isPublic") === "true"
        : undefined,
    });

    const existingNote = await prisma.note.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        title: true,
      },
    });

    if (!existingNote) {
      throw new NotFoundError("Note not found");
    }

    if (existingNote.userId !== session.user.id) {
      throw new ForbiddenError("You don't have permission to update this note");
    }

    const updateData: Record<string, unknown> = { ...noteData };

    if (noteData.title && noteData.title !== existingNote.title) {
      const slug = slugify(noteData.title);
      const uniqueId = crypto.randomUUID();
      updateData.slug = `${slug}-${uniqueId}`;
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: updateData,
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

    return NextResponse.json(updatedNote);
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      throw new UnauthorizedError("You must be logged in to delete a note");
    }

    const { id } = await params;

    const existingNote = await prisma.note.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!existingNote) {
      throw new NotFoundError("Note not found");
    }

    if (existingNote.userId !== session.user.id) {
      throw new ForbiddenError("You don't have permission to delete this note");
    }

    await prisma.note.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Note deleted successfully" });
  } catch (error: unknown) {
    return handleApiError(error);
  }
}
