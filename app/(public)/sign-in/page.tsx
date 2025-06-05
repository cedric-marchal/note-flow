import { env } from "@/lib/env";

import type { Metadata } from "next";
import type { WebSite, WithContext } from "schema-dts";

import Script from "next/script";

import { SignInLayout } from "./_components/sign-in-layout";
import { SignInPageContent } from "./_components/sign-in-page-content";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: `Sign In | ${env.NEXT_PUBLIC_APP_NAME}`,
  description: "Sign in to your account to continue",
  keywords: ["sign in", "login", "account", "authentication"],
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/sign-in`,
  },
  openGraph: {
    type: "website",
    title: `Sign In | ${env.NEXT_PUBLIC_APP_NAME}`,
    description: "Sign in to your account to continue",
    url: `${env.NEXT_PUBLIC_BASE_URL}/sign-in`,
    siteName: env.NEXT_PUBLIC_APP_NAME,
    images: [
      {
        url: "/images/open-graph.jpg",
        width: 1200,
        height: 630,
        alt: `${env.NEXT_PUBLIC_APP_NAME} Open Graph `,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Sign In | ${env.NEXT_PUBLIC_APP_NAME}`,
    description: "Sign in to your account to continue",
    images: {
      url: "/images/open-graph.jpg",
      width: 1200,
      height: 630,
      alt: `${env.NEXT_PUBLIC_APP_NAME} Open Graph `,
    },
  },
};

export default function SignInPage() {
  const schemaOrg: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: env.NEXT_PUBLIC_APP_NAME,
    description: "Sign in to your account to continue",
    url: `${env.NEXT_PUBLIC_BASE_URL}/sign-in`,
    publisher: {
      "@type": "Organization",
      name: env.NEXT_PUBLIC_APP_NAME,
      url: env.NEXT_PUBLIC_BASE_URL,
    },
  };

  return (
    <>
      <SignInLayout>
        <SignInPageContent />
      </SignInLayout>

      <Script
        id="schema-org-sign-in"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaOrg),
        }}
      />
    </>
  );
}
