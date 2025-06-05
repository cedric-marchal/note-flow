"use client";

import { Badge } from "@/components/ui/badge";
import { CopyLinkButton } from "./copy-link-button";
import { CopyNoteButton } from "./copy-note-button";

type NoteActionsProps = {
  slug: string;
  content: string;
};

export const NoteActions = ({ slug, content }: NoteActionsProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <CopyLinkButton slug={slug} />
        <CopyNoteButton content={content} />
      </div>
      <div className="h-6 w-px bg-slate-200" />
      <Badge
        variant="secondary"
        className="bg-green-100 text-green-700 border-green-200 font-medium px-3 py-1 text-xs"
      >
        Public
      </Badge>
    </div>
  );
};
