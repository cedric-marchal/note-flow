"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type CopyNoteButtonProps = {
  content: string;
};

export const CopyNoteButton = ({ content }: CopyNoteButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      toast.success("Note content copied to clipboard!");

      // Reset the icon after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch {
      toast.error("Failed to copy note content");
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm"
    >
      {isCopied ? (
        <>
          <Check className="h-4 w-4 text-green-600" />
          <span className="text-green-600 font-medium">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-4 w-4 text-slate-600" />
          <span className="text-slate-700">Copy</span>
        </>
      )}
    </Button>
  );
};
