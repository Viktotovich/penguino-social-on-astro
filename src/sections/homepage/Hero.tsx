//Components
import Tick from "@/components/ui/Tick";
import AnchorButton from "@/components/buttons/AnchorButton";

export default function Hero() {
  return (
    <section className="flex flex-col items-center px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-24 xl:px-24">
      <h1 className="max-w-[25ch] font-display font-extrabold text-center text-ink text-3xl md:text-5xl">
        The last entrepreneurial platform you would ever need.{" "}
        <span className="bg-linear-to-r from-tide to-aurora bg-[length:100%_3px] bg-bottom bg-no-repeat">
          FREE
        </span>
      </h1>
      <p className="max-w-[55ch] text-center text-base text-muted-foreground">
        Penguino is the place to build long lasting connections with likeminded
        individuals, get advice, and build life-long partnerships
      </p>

      <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
        <AnchorButton cta="Join Now" href="/register" isPrimary={true} />
        <AnchorButton
          cta="See the community"
          href="/community"
          isPrimary={false}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row">
        <Tick para="Easy to use" />
        <Tick para="Telegram community" />
        <Tick para="50+ members" />
      </div>
    </section>
  );
}
