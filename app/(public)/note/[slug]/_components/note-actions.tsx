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
    <div className="flex items-center gap-2 flex-wrap justify-end">
      <div className="flex items-center gap-2">
        <CopyLinkButton slug={slug} />
        <CopyNoteButton content={content} />
      </div>
      <div className="h-6 w-px bg-border mx-1 hidden sm:block" />
      <Badge variant="default">Public</Badge>
    </div>
  );
};
