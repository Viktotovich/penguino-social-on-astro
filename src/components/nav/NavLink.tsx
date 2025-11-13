import { cn } from "@/lib/utils";

type NavLinkProps = {
  pathname: string;
  href: string;
  children: React.ReactNode;
};

export default function NavLink({ pathname, href, children }: NavLinkProps) {
  return (
    <>
      <a
        href={href}
        className={cn(
          "text-white p-2 rounded-sm hover:cursor-pointer transition duration-300 hover:bg-white hover:text-primary-500",
          pathname === href && "bg-white text-primary-500"
        )}
      >
        {children}
      </a>
    </>
  );
}
