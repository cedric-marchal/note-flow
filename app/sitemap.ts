import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";

import type { Note as PrismaNote } from "@/lib/generated/prisma";
import type { MetadataRoute } from "next";

type PublicNote = Pick<PrismaNote, "slug" | "updatedAt">;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publicNotes = await prisma.note.findMany({
    where: {
      isPublic: true,
    },
    select: {
      slug: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${env.NEXT_PUBLIC_BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${env.NEXT_PUBLIC_BASE_URL}/sign-in`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const noteRoutes: MetadataRoute.Sitemap = publicNotes.map(
    (note: PublicNote) => ({
      url: `${env.NEXT_PUBLIC_BASE_URL}/note/${note.slug}`,
      lastModified: note.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  return [...routes, ...noteRoutes];
}
