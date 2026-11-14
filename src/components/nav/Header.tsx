"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

//Components
import Logo from "@/components/brand/Logo";
import NavLinkWithCB from "./NavLinkWithCB";
import NavLink from "./NavLink";
import AuthService from "@/lib/auth/auth-service";

export default function Header({
  pathname,
  user,
}: {
  pathname: string;
  user: { name: string; image?: string | null } | null;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Penguino?", href: "/about" },
    { label: "Resources", href: "/resources" },
    { label: "Community", href: "/community" },
  ];

  return (
    <header className="bg-primary-500 absolute z-1 w-full">
      <div className="flex items-center justify-between px-6 py-6 md:px-12 xl:px-24">
        <Logo variant="dark" />

        {/* Desktop Navigation */}
        <nav className="hidden space-x-8 md:flex">
          {user ? (
            links.map((link) => (
              <NavLink href={link.href} key={link.label} pathname={pathname}>
                {link.label}
              </NavLink>
            ))
          ) : (
            <>
              {links.map((link) => (
                <NavLink href={link.href} key={link.label} pathname={pathname}>
                  {link.label}
                </NavLink>
              ))}
              <NavLink href="/login" pathname={pathname}>
                Log in
              </NavLink>
              <NavLink href="/register" pathname={pathname}>
                Join now
              </NavLink>
            </>
          )}
        </nav>

        {/* Account Menu Button */}
        {user && (
          <div className="relative">
            <button
              className="rounded-full size-9 hover:cursor-pointer hover:bg-white/20"
              aria-label="Account menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {user.image ? (
                <img src={user.image} alt="" className="rounded-full size-9" />
              ) : (
                <span className="rounded-full size-9 bg-ice text-ink font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </button>
            {menuOpen && (
              <div className="absolute right-6 mt-2 rounded-lg bg-snow p-2 shadow-md">
                <p className="text-ink font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                  {user.name.slice(1)}
                </p>
                <button
                  className="text-primary-500 font-semibold hover:underline"
                  onClick={async () => {
                    await new AuthService().signOut();
                    window.location.href = "/";
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}

        {/* Hamburger */}
        <button
          className="size-12 inline-flex items-center justify-center rounded hover:cursor-pointer hover:bg-white md:hidden"
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
      <nav className="h-full space-y-2 px-6 pb-4 md:hidden">
        {links.map((link) => (
          <NavLinkWithCB
            key={link.href}
            href={link.href}
            pathname={pathname}
            cb={() => {
              setMobileOpen(false);
            }}
            className="flex h-12 items-center"
          >
            <span className="flex h-12 items-center">{link.label}</span>
          </NavLinkWithCB>
        ))}
        {user && (
          <NavLinkWithCB
            href="/"
            pathname={pathname}
            cb={() => {
              setMobileOpen(false);
            }}
            className="flex h-12 items-center"
          >
            Sign out
          </NavLinkWithCB>
        )}
      </nav>
    </header>
  );
}
