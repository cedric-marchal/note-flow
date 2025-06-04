import { env } from "@/lib/env";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Dashboard | ${env.NEXT_PUBLIC_APP_NAME}`,
};

export default function DashboardPage() {
  return (
    <main className="flex-1 flex items-center justify-center min-h-screen">
      <h1>Dashboard</h1>
    </main>
  );
}
