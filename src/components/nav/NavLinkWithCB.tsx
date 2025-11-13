import { cn } from "@/lib/utils";
import type React from "react";

type NavLinkProps = {
  pathname: string;
  href: string;
  children: React.ReactNode;
  cb: () => void;
};

export default function NavLinkWithCB({
  pathname,
  href,
  children,
  cb,
}: NavLinkProps) {
  return (
    <>
      <a
        href={href}
        className={cn(
          "block w-full py-2 text-white",
          pathname === href && "underline"
        )}
        onClick={cb}
      >
        {children}
      </a>
    </>
  );
}
