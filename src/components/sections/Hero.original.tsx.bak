import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight } from "../primitives";
import { useT } from "../../i18n";
import { useTheme } from "../../theme";

export function Hero() {
  const { t } = useT();
  const { theme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.55;
    }
  }, []);

  return (
    <section
      id="top"
      data-theme="dark"
      className="relative isolate min-h-[100svh] overflow-hidden bg-bg text-fg"
    >
      {/* ── background video ── */}
      <video
        ref={videoRef}
        data-hero="video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        style={{ filter: "contrast(1.4) saturate(1.55) brightness(1.02)" }}
      >
        <source
          src="https://videos.pexels.com/video-files/9165100/9165100-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* ── strong gradient overlay for text legibility ── */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            theme === "light"
              ? "linear-gradient(170deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.55) 70%, rgb(var(--page-bg)) 100%)"
              : "linear-gradient(170deg, rgb(var(--bg) / 0.6) 0%, rgb(var(--bg) / 0.3) 35%, rgb(var(--bg) / 0.6) 70%, rgb(var(--page-bg)) 100%)",
        }}
      />

      {/* ── content: pushed to lower-third for cinematic framing ── */}
      <div
        data-hero="content"
        className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1500px] flex-col justify-end px-6 pb-32 pt-28 lg:px-12"
      >
        <div className="max-w-3xl">
          {/* Tag */}
          <div
            data-hero="tag"
            className="mb-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.26em] text-white/60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            {t.hero.tag_brand} · {t.hero.tag_country}
          </div>

          {/* Headline — the single dominant element */}
          <h1
            data-hero="title"
            className="font-display text-[2.75rem] font-bold leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-[5.5rem]"
          >
            <span className="block">
              {t.hero.h1_line1_pre}
              <span className="text-orange-400">{t.hero.h1_line1_emph}</span>
            </span>
            <span className="block text-white/90">
              {t.hero.h1_line2_pre}
              {t.hero.h1_line2_emph}
            </span>
          </h1>

          {/* Short description — one line of context */}
          <p
            data-hero="paragraph"
            className="mt-8 max-w-md text-pretty text-[15px] leading-relaxed text-white/65"
          >
            {t.hero.paragraph}
          </p>

          {/* Single clear CTA row */}
          <div data-hero="ctas" className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#solutions"
              className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full border border-white/30 px-7 py-3.5 text-[13px] font-bold tracking-[0.03em] text-white backdrop-blur-md transition duration-300 hover:border-white/45 hover:brightness-110"
              style={{
                background:
                  "linear-gradient(135deg, rgba(249,115,22,0.82) 0%, rgba(234,88,12,0.68) 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -10px 24px -12px rgba(0,0,0,0.35), 0 12px 34px -10px rgba(249,115,22,0.55)",
              }}
            >
              {/* glassy top sheen */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent"
              />
              <span className="relative z-10">{t.hero.cta_primary}</span>
              <ArrowRight className="relative z-10 h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#technology"
              className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-medium tracking-[0.04em] text-white/85 backdrop-blur-sm transition hover:border-white/50 hover:text-white"
            >
              {t.hero.cta_secondary}
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* ── scroll indicator ── */}
      <a
        data-hero="scroll"
        href="#mission"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          {t.hero.scroll}
        </div>
        <ArrowDown className="bob mx-auto mt-2 h-4 w-4 text-white/70" />
      </a>
    </section>
  );
}
