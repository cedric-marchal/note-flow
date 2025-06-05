import { env } from "@/lib/env";
import { DashboardContent } from "./_components/dashboard-content";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Dashboard | ${env.NEXT_PUBLIC_APP_NAME}`,
  description: "Manage your notes and ideas",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <main className="container mx-auto py-8 px-4 space-y-8">
        <DashboardContent />
      </main>
    </div>
  );
}
