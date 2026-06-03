import { useEffect, useRef } from "react";
import { useT } from "../../i18n";
import { Mono, TacButton, GhostButton, ArrowRight } from "./primitives";

/* TacticalHero (#top) — cinematic full-bleed opener. Anduril-style restraint:
   a darkened drone film, one oversized statement, one supporting line, two
   actions. No ticker, no corner telemetry, no grid — just air and image.
   This is the CANONICAL reference for the variant's calm, sparse tone. */
export function TacticalHero() {
  const { t } = useT();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.55;
    }
  }, []);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pb-28"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        style={{ filter: "contrast(1.15) saturate(1.05) brightness(0.7)" }}
      >
        <source
          src="https://videos.pexels.com/video-files/9165100/9165100-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* deep cinematic fade — heavier at the bottom so type sits in calm black */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(4,6,10,0.55) 0%, rgba(4,6,10,0.15) 35%, rgba(4,6,10,0.75) 80%, #04060a 100%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-16">
        <Mono className="text-white/55">
          {t.hero.tag_brand} · {t.hero.tag_country}
        </Mono>

        <h1 className="mt-8 max-w-4xl font-display text-[3.25rem] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-7xl lg:text-[6.5rem]">
          <span className="block">
            {t.hero.h1_line1_pre}
            <span className="text-orange-500">{t.hero.h1_line1_emph}</span>
          </span>
          <span className="block">
            {t.hero.h1_line2_pre}
            {t.hero.h1_line2_emph}
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <TacButton href="#solutions">{t.hero.cta_primary}</TacButton>
          <GhostButton href="#technology">{t.hero.cta_secondary}</GhostButton>
        </div>
      </div>

      <a
        href="#mission"
        className="group absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 transition hover:text-orange-400 md:flex"
      >
        {t.hero.scroll}
        <ArrowRight className="h-3 w-3 rotate-90" />
      </a>
    </section>
  );
}
