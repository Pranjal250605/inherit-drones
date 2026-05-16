import { ArrowDown, ArrowRight, Dot, JpAnno, Tag } from "../primitives";
import { useT } from "../../i18n";
import { useTheme } from "../../theme";

export function Hero() {
  const { t } = useT();
  const { theme } = useTheme();

  return (
    <section
      id="top"
      data-theme="dark"
      className="relative isolate min-h-[100svh] overflow-hidden grain bg-bg text-fg"
    >
      {/*
        Primary: Pexels #4446375 "Flying Drone in Cloudy Sky" by Grisha Grishkoff (4K).
        Visible drone in frame against a cinematic cloudscape — the look you'd recognise
        from edify.jp's hero, but with the drone the brief calls for.
        Fallback chain: 1080p of same → edify's cloudscape → drone-eye above clouds.
      */}
      <video
        data-hero="video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
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

      {/* Top-to-bottom fade darkens the video and bleeds into whatever the
          outer page bg is (--page-bg). Active for the dark + blueprint themes
          where the page below is itself dark; skipped in light mode so the
          cloudy video isn't masked by an overlay that fades to white. */}
      {theme !== "light" && (
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgb(var(--bg) / 0.70) 0%, rgb(var(--bg) / 0.30) 50%, rgb(var(--page-bg)) 100%)",
          }}
        />
      )}

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-fg/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-fg/20 to-transparent" />

      <div
        data-hero="hud-left"
        className="pointer-events-none absolute left-4 top-28 z-10 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-fg/45 md:left-10 lg:block"
      >
        <div className="flex items-center gap-2">
          <Dot /> {t.hero.hud_left_label}
        </div>
        <div className="mt-2 grid gap-1">
          <div>{t.hero.hud_left_coords}</div>
          <div>{t.hero.hud_left_alt}</div>
        </div>
      </div>

      <div
        data-hero="hud-right"
        className="pointer-events-none absolute right-4 top-28 z-10 hidden text-right font-mono text-[10px] uppercase tracking-[0.22em] text-fg/45 md:right-10 lg:block"
      >
        <div>{t.hero.hud_right_unit}</div>
        <div className="mt-2 grid gap-1">
          <div>{t.hero.hud_right_auth}</div>
          <div className="text-orange-400/80">{t.hero.hud_right_status}</div>
        </div>
      </div>

      <div
        data-hero="content"
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px] flex-col items-center justify-center px-6 pt-28 text-center lg:px-10"
      >
        <div data-hero="tag">
          <Tag live className="mb-8">
            <JpAnno>{t.hero.tag_brand}</JpAnno>
            <span className="text-fg/25">·</span>
            <span>{t.hero.tag_country}</span>
          </Tag>
        </div>

        <h1
          data-hero="title"
          className="mx-auto max-w-4xl font-display text-5xl font-light leading-[1.1] tracking-[-0.025em] text-balance md:text-6xl"
        >
          <span className="block">
            {t.hero.h1_line1_pre}
            <span className="italic font-light text-orange-400">
              {t.hero.h1_line1_emph}
            </span>
          </span>
          <span className="block">
            {t.hero.h1_line2_pre}
            <span className="italic font-light">{t.hero.h1_line2_emph}</span>
          </span>
        </h1>

        <div
          data-hero="rule"
          className="mt-4 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-fg/35"
        >
          <span className="h-px w-8 bg-fg/20" />
          <span>{t.hero.rule_jp}</span>
          <span className="h-px w-8 bg-fg/20" />
        </div>

        <p
          data-hero="paragraph"
          className="mx-auto mt-8 max-w-lg text-pretty text-sm leading-relaxed text-muted md:text-base"
        >
          {t.hero.paragraph}
        </p>

        <div
          data-hero="ctas"
          className="mt-12 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#solutions"
            className="group inline-flex items-center gap-3 whitespace-nowrap bg-fg px-5 py-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bg transition hover:bg-orange-400 cut-corner-sm"
          >
            <span className="text-orange-500 group-hover:text-bg">[</span>
            {t.hero.cta_primary}
            <span className="text-orange-500 group-hover:text-bg">]</span>
            <ArrowRight className="h-3 w-3" />
          </a>
          <a
            href="#technology"
            className="inline-flex items-center gap-2 whitespace-nowrap border border-fg/20 bg-fg/[0.04] px-5 py-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-fg backdrop-blur-md transition hover:border-orange-400/60 hover:text-orange-400"
          >
            {t.hero.cta_secondary}
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>

        <div
          data-hero="ticker"
          className="mt-16 grid grid-cols-2 gap-x-10 gap-y-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/35 md:grid-cols-4"
        >
          {t.hero.ticker.map((item) => (
            <div key={item.k} className="text-left">
              <div className="text-fg/60">{item.k}</div>
              <div>{item.v}</div>
            </div>
          ))}
        </div>
      </div>

      <a
        data-hero="scroll"
        href="#mission"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-fg/40">
          {t.hero.scroll}
        </div>
        <ArrowDown className="bob mx-auto mt-2 h-4 w-4 text-fg/70" />
      </a>
    </section>
  );
}
