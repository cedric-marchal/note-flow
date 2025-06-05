import { z } from "zod";

export const CreateNoteSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(10000, "Content must be less than 10000 characters"),
  isPublic: z.boolean(),
});

export type CreateNoteSchemaType = z.infer<typeof CreateNoteSchema>;

export const UpdateNoteSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters")
    .optional(),
  content: z
    .string()
    .min(1, "Content is required")
    .max(10000, "Content must be less than 10000 characters")
    .optional(),
  isPublic: z.boolean().optional(),
});

export type UpdateNoteSchemaType = z.infer<typeof UpdateNoteSchema>;

export const DeleteNoteSchema = z.object({
  id: z.string().min(1, "Note ID is required"),
});

export type DeleteNoteSchemaType = z.infer<typeof DeleteNoteSchema>;

export const ToggleNoteVisibilitySchema = z.object({
  id: z.string().min(1, "Note ID is required"),
  isPublic: z.boolean(),
});

export type ToggleNoteVisibilitySchemaType = z.infer<
  typeof ToggleNoteVisibilitySchema
>;
