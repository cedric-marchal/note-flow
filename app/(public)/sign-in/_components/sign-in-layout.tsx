import { env } from "@/lib/env";

import type { ReactNode } from "react";

type SignInLayoutProps = {
  children: ReactNode;
};

export const SignInLayout = ({ children }: SignInLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Section gauche - Branding */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-8 bg-muted/50">
        <div className="mx-auto max-w-md">
          <h1 className="text-3xl font-bold tracking-tight">
            {env.NEXT_PUBLIC_APP_NAME}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Organisez vos notes et idées de manière efficace avec notre
            plateforme intuitive.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-primary rounded-full" />
              <span className="text-sm text-muted-foreground">
                Synchronisation en temps réel
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-primary rounded-full" />
              <span className="text-sm text-muted-foreground">
                Interface moderne et intuitive
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-primary rounded-full" />
              <span className="text-sm text-muted-foreground">
                Sécurisé et fiable
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section droite - Formulaire */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};
