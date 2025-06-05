"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import type { NoteForDelete } from "@/lib/types/note";

import { useState } from "react";
import { toast } from "sonner";

type DeleteNoteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  note: NoteForDelete | null;
};

export const DeleteNoteModal = ({
  open,
  onOpenChange,
  onSuccess,
  note,
}: DeleteNoteModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!note) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/note/${note.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || "Failed to delete note");
        return;
      }

      toast.success("Note deleted successfully!");
      onOpenChange(false);
      onSuccess();
    } catch {
      toast.error("An error occurred while deleting the note");
    } finally {
      setIsLoading(false);
    }
  };

  if (!note) {
    return null;
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the note
            <span className="font-semibold"> &quot;{note.title}&quot;</span> and
            remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            type="button"
            disabled={isLoading}
            className="cursor-pointer"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
