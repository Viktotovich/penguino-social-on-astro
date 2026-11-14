type ButtonProps = {
  href: string;
  cta: string;
  isPrimary: boolean;
};

export default function AnchorButton({ href, cta, isPrimary }: ButtonProps) {
  const baseClasses =
    "rounded-full px-6 inline-flex h-12 items-center justify-center font-semibold transition-shadow duration-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring w-full sm:w-auto";
  const primaryClasses = "bg-ink text-snow";
  const secondaryClasses = "bg-ice text-ink";
  return (
    <a
      href={href}
      className={`${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`}
    >
      {cta}
    </a>
  );
}
