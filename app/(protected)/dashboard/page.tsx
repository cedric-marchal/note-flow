import { env } from "@/lib/env";
import { DashboardContent } from "./_components/dashboard-content";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Dashboard | ${env.NEXT_PUBLIC_APP_NAME}`,
  description: "Manage your notes and ideas",
};

export default function DashboardPage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <DashboardContent />
    </main>
  );
}
