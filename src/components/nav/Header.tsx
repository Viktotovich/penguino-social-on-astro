"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

//Components
import NavLinkWithCB from "./NavLinkWithCB";
import NavLink from "./NavLink";

export default function Header({ pathname }: { pathname: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Penguino?", href: "/about" },
    { label: "Resources", href: "/resources" },
    { label: "Community", href: "/community" },
    { label: "Join now", href: "/register" },
  ];

  return (
    <header className="bg-primary-500 absolute z-1 w-full">
      <div className="flex items-center justify-between px-6 py-6 md:px-12 xl:px-24">
        <a href="/">
          <div className="text-xl font-bold text-white hover:cursor-pointer">
            Logo
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-8 md:flex">
          {links.map((link) => (
            <NavLink href={link.href} key={link.label} pathname={pathname}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          className="rounded hover:cursor-pointer hover:bg-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X size={24} className="hover:invert" />
          ) : (
            <Menu size={24} className="hover:invert" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="h-full space-y-2 px-6 pb-4 md:hidden">
          {links.map((link) => (
            <NavLinkWithCB
              key={link.href}
              href={link.href}
              pathname={pathname}
              cb={() => {
                setMobileOpen(false);
              }}
            >
              {link.label}
            </NavLinkWithCB>
          ))}
        </nav>
      )}
    </header>
  );
}
