import type {
  Note as PrismaNote,
  User as PrismaUser,
} from "@/lib/generated/prisma";

export type Note = Pick<
  PrismaNote,
  "id" | "title" | "slug" | "content" | "isPublic" | "createdAt" | "updatedAt"
>;

export type NoteWithUser = Note & {
  user: Pick<PrismaUser, "name" | "email">;
};

export type NoteForEdit = Pick<
  PrismaNote,
  "id" | "title" | "content" | "isPublic"
>;

export type NoteForDelete = Pick<PrismaNote, "id" | "title">;
