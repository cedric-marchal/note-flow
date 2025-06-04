import { env } from "./env";
import { prisma } from "./prisma";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { slugify } from "@/utils/string/slugify";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },
  user: {
    additionalFields: {
      slug: {
        type: "string",
        required: true,
        input: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user: Record<string, unknown>) => {
          const userName = user.name as string;
          const uniqueId = crypto.randomUUID().slice(0, 8);

          const baseSlug = slugify(userName);
          const uniqueSlug = `${baseSlug}-${uniqueId}`;

          return {
            data: {
              ...user,
              slug: uniqueSlug,
            },
          };
        },
      },
    },
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  secret: env.BETTER_AUTH_SECRET,
});
