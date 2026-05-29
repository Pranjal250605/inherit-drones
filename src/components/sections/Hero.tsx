import { ArrowDown, ArrowRight } from "../primitives";
import { useT } from "../../i18n";
import { useTheme } from "../../theme";

export function Hero() {
  const { t } = useT();
  const { theme } = useTheme();

  return (
    <section
      id="top"
      data-theme="dark"
      className="relative isolate min-h-[100svh] overflow-hidden bg-bg text-fg"
    >
      <video
        data-hero="video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        style={{
          filter: "contrast(1.4) saturate(1.55) brightness(1.02)",
        }}
      >
        <source
          src="https://videos.pexels.com/video-files/4446375/4446375-uhd_3840_2160_25fps.mp4"
          type="video/mp4"
        />
        <source
          src="https://videos.pexels.com/video-files/4446375/4446375-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
        <source
          src="https://videos.pexels.com/video-files/36295077/15391252_3840_2160_30fps.mp4"
          type="video/mp4"
        />
        <source
          src="https://videos.pexels.com/video-files/33785467/33785467-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Darken the video and bleed into the page background below. In light mode
          the page is white, so the hero fades cleanly from the dark video into
          the white site. */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            theme === "light"
              ? "linear-gradient(to bottom, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.14) 32%, rgba(0,0,0,0.30) 52%, rgba(0,0,0,0.12) 74%, rgb(var(--page-bg)) 100%)"
              : "linear-gradient(to bottom, rgb(var(--bg) / 0.58) 0%, rgb(var(--bg) / 0.20) 40%, rgb(var(--bg) / 0.34) 55%, rgb(var(--bg) / 0.18) 75%, rgb(var(--page-bg)) 100%)",
        }}
      />

      <div
        data-hero="content"
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col items-center justify-center px-6 text-center lg:px-12"
      >
        <div
          data-hero="tag"
          className="mb-8 font-jp text-[12px] tracking-[0.3em] text-white/70"
        >
          {t.hero.tag_brand} · {t.hero.tag_country}
        </div>

        <h1
          data-hero="title"
          className="mx-auto max-w-5xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-balance sm:text-5xl md:text-7xl"
        >
          <span className="block">
            {t.hero.h1_line1_pre}
            <span className="text-orange-400">{t.hero.h1_line1_emph}</span>
          </span>
          <span className="block">
            {t.hero.h1_line2_pre}
            {t.hero.h1_line2_emph}
          </span>
        </h1>

        <div
          data-hero="rule"
          className="mt-6 flex items-center justify-center gap-3 font-jp text-[11px] tracking-[0.25em] text-white/45"
        >
          {t.hero.rule_jp}
        </div>

        <p
          data-hero="paragraph"
          className="mx-auto mt-8 max-w-md text-pretty text-[15px] leading-relaxed text-white/75 md:text-base"
        >
          {t.hero.paragraph}
        </p>

        <div
          data-hero="ctas"
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#solutions"
            className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-orange-500 px-7 py-3.5 text-[13px] font-bold tracking-[0.03em] text-white transition hover:bg-orange-400"
          >
            {t.hero.cta_primary}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <a
            href="#technology"
            className="group inline-flex items-center gap-2.5 whitespace-nowrap px-2 py-3 text-[13px] font-medium tracking-[0.04em] text-white/80 transition hover:text-white"
          >
            {t.hero.cta_secondary}
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      <a
        data-hero="scroll"
        href="#mission"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <div className="font-jp text-[10px] tracking-[0.35em] text-white/40">
          {t.hero.scroll}
        </div>
        <ArrowDown className="bob mx-auto mt-2 h-4 w-4 text-white/70" />
      </a>
    </section>
  );
}
