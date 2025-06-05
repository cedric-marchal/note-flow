"use client";

import type { Note, NoteForDelete, NoteForEdit } from "@/lib/types/note";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { DashboardHeader } from "./dashboard-header";
import { CreateNoteModal } from "./modals/create-note-modal";
import { DeleteNoteModal } from "./modals/delete-note-modal";
import { EditNoteModal } from "./modals/edit-note-modal";
import { NotesTable } from "./notes-table";

export const DashboardContent = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedNoteForEdit, setSelectedNoteForEdit] =
    useState<NoteForEdit | null>(null);
  const [selectedNoteForDelete, setSelectedNoteForDelete] =
    useState<NoteForDelete | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      const response = await fetch("/api/note");

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const data = await response.json();
      setNotes(data);
    } catch {
      toast.error("Failed to load notes");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleCreateNote = () => {
    setCreateModalOpen(true);
  };

  const handleEditNote = (note: Note) => {
    const noteForEdit: NoteForEdit = {
      id: note.id,
      title: note.title,
      content: note.content,
      isPublic: note.isPublic,
    };
    setSelectedNoteForEdit(noteForEdit);
    setEditModalOpen(true);
  };

  const handleDeleteNote = (note: Note) => {
    const noteForDelete: NoteForDelete = {
      id: note.id,
      title: note.title,
    };
    setSelectedNoteForDelete(noteForDelete);
    setDeleteModalOpen(true);
  };

  const handleToggleVisibility = async (note: Note) => {
    try {
      const formData = new FormData();
      formData.append("isPublic", (!note.isPublic).toString());

      const response = await fetch(`/api/note/${note.id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || "Failed to update note visibility");
        return;
      }

      toast.success(`Note is now ${!note.isPublic ? "public" : "private"}`);
      fetchNotes();
    } catch {
      toast.error("An error occurred while updating note visibility");
    }
  };

  const handleModalSuccess = () => {
    fetchNotes();
    setSelectedNoteForEdit(null);
    setSelectedNoteForDelete(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader onCreateNote={handleCreateNote} />
      <NotesTable
        notes={notes}
        onEditNote={handleEditNote}
        onDeleteNote={handleDeleteNote}
        onToggleVisibility={handleToggleVisibility}
      />

      <CreateNoteModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={handleModalSuccess}
      />

      <EditNoteModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onSuccess={handleModalSuccess}
        note={selectedNoteForEdit}
      />

      <DeleteNoteModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onSuccess={handleModalSuccess}
        note={selectedNoteForDelete}
      />
    </div>
  );
};
