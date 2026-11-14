import { cn } from "@/lib/utils";
import type React from "react";

type NavLinkProps = {
  pathname: string;
  href: string;
  children: React.ReactNode;
  cb: () => void;
  className?: string;
};

export default function NavLinkWithCB({
  pathname,
  href,
  children,
  cb,
  className,
}: NavLinkProps) {
  return (
    <>
      <a
        href={href}
        className={cn(
          "block w-full py-2 text-white",
          pathname === href && "underline",
          className
        )}
        onClick={cb}
      >
        {children}
      </a>
    </>
  );
}
