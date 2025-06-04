import { env } from "@/lib/env";

import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-16 bg-primary w-full flex items-center justify-between px-4">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image
            src="https://avatar.vercel.sh/1"
            alt={`${env.NEXT_PUBLIC_APP_NAME} logo`}
            width={100}
            height={100}
            className="rounded-full w-10 h-10"
          />
        </Link>
      </div>
      <p className="text-primary-foreground">
        &copy; {currentYear} {env.NEXT_PUBLIC_APP_NAME}. All rights reserved.
      </p>
    </footer>
  );
};
