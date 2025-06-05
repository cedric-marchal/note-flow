"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Note } from "@/lib/types/note";
import { truncateString } from "@/utils/string/truncate-string";
import { formatDistanceToNow } from "date-fns";
import {
  Calendar,
  Clock,
  Copy,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type NotesTableProps = {
  notes: Note[];
  onEditNote: (note: Note) => void;
  onDeleteNote: (note: Note) => void;
  onToggleVisibility: (note: Note) => void;
};

export const NotesTable = ({
  notes,
  onEditNote,
  onDeleteNote,
  onToggleVisibility,
}: NotesTableProps) => {
  const [isTogglingVisibility, setIsTogglingVisibility] = useState<
    string | null
  >(null);

  const handleCopyNote = async (note: Note) => {
    try {
      await navigator.clipboard.writeText(note.content);
      toast.success("Note content copied to clipboard");
    } catch {
      toast.error("Failed to copy note content");
    }
  };

  const handleCopyLink = async (note: Note) => {
    try {
      const url = `${window.location.origin}/note/${note.slug}`;
      await navigator.clipboard.writeText(url);
      toast.success("Note link copied to clipboard");
    } catch {
      toast.error("Failed to copy note link");
    }
  };

  const handleToggleVisibility = async (note: Note) => {
    setIsTogglingVisibility(note.id);

    try {
      onToggleVisibility(note);
    } finally {
      setIsTogglingVisibility(null);
    }
  };

  if (notes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FileText className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          No notes yet
        </h3>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">
          Get started by creating your first note. Organize your thoughts and
          share your ideas with the world.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note: Note) => (
        <Card
          key={note.id}
          className="group border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 text-lg leading-tight line-clamp-2 mb-2">
                  {truncateString(note.title, 30)}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={note.isPublic ? "default" : "secondary"}
                    className={`text-xs font-medium ${
                      note.isPublic
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {note.isPublic ? "Public" : "Private"}
                  </Badge>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 p-0 cursor-pointer"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => onEditNote(note)}
                    className="cursor-pointer"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Note
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleCopyNote(note)}
                    className="cursor-pointer"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Content
                  </DropdownMenuItem>
                  {note.isPublic && (
                    <DropdownMenuItem
                      onClick={() => handleCopyLink(note)}
                      className="cursor-pointer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Copy Link
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => handleToggleVisibility(note)}
                    disabled={isTogglingVisibility === note.id}
                    className="cursor-pointer"
                  >
                    {note.isPublic ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-2" />
                        Make Private
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Make Public
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDeleteNote(note)}
                    className="text-red-600 cursor-pointer focus:text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Note
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-4">
              <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                {note.content}
              </p>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {formatDistanceToNow(new Date(note.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>
                    Updated{" "}
                    {formatDistanceToNow(new Date(note.updatedAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
