"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signOut, useSession } from "@/lib/auth-client";
import { LogOut } from "lucide-react";

export function SessionStatus() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">Chargement...</div>
        </CardContent>
      </Card>
    );
  }

  if (!session) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/sign-in";
          },
        },
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Connecté
        </CardTitle>
        <CardDescription className="text-center">
          Vous êtes déjà connecté à votre compte
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={session.user.image || ""}
              alt={session.user.name || ""}
            />
            <AvatarFallback>
              {session.user.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{session.user.name}</p>
            <p className="text-sm text-muted-foreground truncate">
              {session.user.email}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => (window.location.href = "/dashboard")}
            className="flex-1"
          >
            Aller au Dashboard
          </Button>
          <Button onClick={handleSignOut} variant="outline" size="icon">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
