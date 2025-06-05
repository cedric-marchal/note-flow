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

import { AlertTriangle, FileX, Trash2 } from "lucide-react";
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
      <AlertDialogContent className="border-0 shadow-2xl shadow-red-200/50 bg-white/95 backdrop-blur-sm max-w-md">
        <AlertDialogHeader className="text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-red-500/25">
            <AlertTriangle className="h-8 w-8 text-white" />
          </div>
          <AlertDialogTitle className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
            <FileX className="h-5 w-5 text-red-500" />
            Delete Note
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-600 text-base leading-relaxed">
            This action cannot be undone. This will permanently delete
            <span className="font-semibold text-slate-900 mx-1">
              "{note.title}"
            </span>
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="bg-red-50/50 rounded-xl border border-red-200/60 p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-red-900">
                Warning: This action is irreversible
              </p>
              <p className="text-sm text-red-700">
                All content, metadata, and sharing links will be permanently
                lost.
              </p>
            </div>
          </div>
        </div>

        <AlertDialogFooter className="gap-3">
          <AlertDialogCancel
            disabled={isLoading}
            className="border-slate-200 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg shadow-red-500/25 transition-all duration-300 hover:scale-105 min-w-[120px] cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Deleting...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Delete
              </div>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
