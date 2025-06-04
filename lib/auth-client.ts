import { createAuthClient } from "better-auth/react";
import { env } from "./env";

const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
});

export const { signIn, signOut, useSession } = authClient;
