import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type DashboardHeaderProps = {
  onCreateNote: () => void;
};

export const DashboardHeader = ({ onCreateNote }: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
        <p className="text-muted-foreground">Manage your notes and ideas</p>
      </div>
      <Button
        type="button"
        onClick={onCreateNote}
        className="flex items-center gap-2 cursor-pointer"
      >
        <Plus className="h-4 w-4" />
        New Note
      </Button>
    </div>
  );
};
