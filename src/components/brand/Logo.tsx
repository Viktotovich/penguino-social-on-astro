import logoMark from "@/assets/brand/logo-mark.svg";
import logoMarkInverse from "@/assets/brand/logo-mark-inverse.svg";

type LogoProps = { variant?: "light" | "dark" };

export default function Logo({ variant = "light" }: LogoProps) {
  const mark = variant === "dark" ? logoMarkInverse.src : logoMark.src;
  const wordmarkClass = variant === "dark" ? "text-snow" : "text-ink";

  return (
    <a
      href="/"
      aria-label="Penguino home"
      className="inline-flex items-center gap-3"
    >
      <img src={mark} alt="" width={32} height={32} />
      <span className={`font-display text-xl font-extrabold ${wordmarkClass}`}>
        {`{penguino}`}
      </span>
    </a>
  );
}
