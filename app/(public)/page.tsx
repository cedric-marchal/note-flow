import { env } from "@/lib/env";

import type { Metadata } from "next";
import type { WebSite, WithContext } from "schema-dts";

import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: `Home | ${env.NEXT_PUBLIC_APP_NAME}`,
  description: "Your personal note-taking app with privacy controls",
  keywords: ["notes", "writing", "privacy", "productivity"],
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/`,
  },
  openGraph: {
    type: "website",
    title: `Home | ${env.NEXT_PUBLIC_APP_NAME}`,
    description: "Your personal note-taking app with privacy controls",
    url: `${env.NEXT_PUBLIC_BASE_URL}/`,
    siteName: env.NEXT_PUBLIC_APP_NAME,
    images: [
      {
        url: "/images/open-graph.jpg",
        width: 1200,
        height: 630,
        alt: `Default Open Graph - ${env.NEXT_PUBLIC_APP_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Home | ${env.NEXT_PUBLIC_APP_NAME}`,
    description: "Your personal note-taking app with privacy controls",
    images: {
      url: "/images/open-graph.jpg",
      width: 1200,
      height: 630,
      alt: `Default Open Graph - ${env.NEXT_PUBLIC_APP_NAME}`,
    },
  },
};

export default function HomePage() {
  const schemaOrg: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: env.NEXT_PUBLIC_APP_NAME,
    description: "Your personal note-taking app with privacy controls",
    url: `${env.NEXT_PUBLIC_BASE_URL}/`,
    publisher: {
      "@type": "Organization",
      name: env.NEXT_PUBLIC_APP_NAME,
      url: env.NEXT_PUBLIC_BASE_URL,
    },
  };

  return (
    <main className="flex-1 flex items-center justify-center min-h-screen">
      <h1>Hello World</h1>

      <Script
        id="schema-org-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaOrg),
        }}
      />
    </main>
  );
}
