import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

type DashboardHeaderProps = {
  onCreateNote: () => void;
};

export const DashboardHeader = ({ onCreateNote }: DashboardHeaderProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-8 shadow-lg shadow-slate-200/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Your Notes</h1>
            <p className="text-slate-600">Organize your thoughts and ideas</p>
          </div>
        </div>

        <Button
          type="button"
          onClick={onCreateNote}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 transition-all duration-300 px-6 py-3 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Create New Note
        </Button>
      </div>
    </div>
  );
};
