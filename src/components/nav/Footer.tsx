import Logo from "@/components/brand/Logo";

const links = [
  { label: "Penguino?", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Community", href: "/community" },
  {
    label: "GitHub",
    href: "https://github.com/Viktotovich/penguino-social-on-astro",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-snow px-6 py-12 md:px-12 xl:px-24">
      <div className="flex flex-col items-center gap-8">
        <Logo variant="dark" />
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-snow/80 hover:text-snow hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="text-sm text-snow/60">© {year} Penguino. Open source.</p>
      </div>
    </footer>
  );
}
