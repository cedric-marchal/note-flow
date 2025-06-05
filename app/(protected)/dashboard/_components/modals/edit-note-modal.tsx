"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  UpdateNoteSchema,
  type UpdateNoteSchemaType,
} from "@/lib/schemas/note.schema";

import type { NoteForEdit } from "@/lib/types/note";

import { zodResolver } from "@hookform/resolvers/zod";
import { Edit3, FileText, Globe, Lock, Save, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EditNoteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  note: NoteForEdit | null;
};

export const EditNoteModal = ({
  open,
  onOpenChange,
  onSuccess,
  note,
}: EditNoteModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UpdateNoteSchemaType>({
    resolver: zodResolver(UpdateNoteSchema),
    defaultValues: {
      title: "",
      content: "",
      isPublic: false,
    },
  });

  useEffect(() => {
    if (note && open) {
      form.reset({
        title: note.title,
        content: note.content,
        isPublic: note.isPublic,
      });
    }
  }, [note, open, form]);

  const onSubmit = async (data: UpdateNoteSchemaType) => {
    if (!note) {
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/note/${note.id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || "Failed to update note");
        return;
      }

      toast.success("Note updated successfully!");
      onOpenChange(false);
      onSuccess();
    } catch {
      toast.error("An error occurred while updating the note");
    } finally {
      setIsLoading(false);
    }
  };

  if (!note) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] border-0 shadow-2xl shadow-slate-200/50 bg-white/95 backdrop-blur-sm">
        <DialogHeader className="text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/25">
            <Edit3 className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Edit Note
          </DialogTitle>
          <DialogDescription className="text-slate-600 text-base">
            Refine and improve your content to perfection
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-900 font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-600" />
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a compelling title..."
                      className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-900 font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-600" />
                    Content
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your thoughts, ideas, or insights..."
                      className="min-h-[200px] border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-200 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="bg-slate-50/50 rounded-xl border border-slate-200/60 p-6 transition-all duration-200 hover:bg-slate-50">
                  <div className="flex flex-row items-center justify-between">
                    <div className="space-y-2">
                      <FormLabel className="text-base font-medium text-slate-900 flex items-center gap-2">
                        {field.value ? (
                          <Globe className="h-4 w-4 text-green-600" />
                        ) : (
                          <Lock className="h-4 w-4 text-slate-600" />
                        )}
                        {field.value ? "Public Note" : "Private Note"}
                      </FormLabel>
                      <div className="text-sm text-slate-600">
                        {field.value
                          ? "This note will be publicly accessible via a shareable link"
                          : "This note will only be visible to you"}
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-green-600 cursor-pointer"
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter className="gap-3 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
                className="border-slate-200 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105 min-w-[140px] cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </div>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
