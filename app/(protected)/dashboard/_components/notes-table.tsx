"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Note } from "@/lib/types/note";
import { formatDistanceToNow } from "date-fns";
import {
  Copy,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
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
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No notes found. Create your first note!
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes.map((note: Note) => (
            <TableRow key={note.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{note.title}</p>
                  <p className="text-sm text-muted-foreground truncate max-w-[300px]">
                    {note.content}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={note.isPublic ? "default" : "secondary"}>
                  {note.isPublic ? "Public" : "Private"}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(note.createdAt), {
                  addSuffix: true,
                })}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(note.updatedAt), {
                  addSuffix: true,
                })}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="cursor-pointer"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => onEditNote(note)}
                      className="cursor-pointer"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
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
                      className="text-destructive cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
