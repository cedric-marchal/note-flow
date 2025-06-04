import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const navLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Sign in",
      href: "/sign-in",
    },
  ];

  return (
    <header className="h-16 bg-primary w-full flex items-center justify-between px-4">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image
            src="https://avatar.vercel.sh/1"
            alt="NoteFlow logo"
            width={100}
            height={100}
            className="rounded-full w-10 h-10"
          />
        </Link>
      </div>

      <nav className="text-primary-foreground">
        <ul className="flex items-center gap-4">
          {navLinks.map((link: { label: string; href: string }) => (
            <li
              key={link.href}
              className="text-sm font-medium text-primary-foreground"
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
