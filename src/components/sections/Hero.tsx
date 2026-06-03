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
        style={{ filter: "contrast(1.4) saturate(1.55) brightness(1.02)" }}
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

      {/* Darken the video and bleed into the page background below. */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            theme === "light"
              ? "linear-gradient(to bottom right, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.2) 60%, rgb(var(--page-bg)) 100%)"
              : "linear-gradient(to bottom right, rgb(var(--bg) / 0.7) 0%, rgb(var(--bg) / 0.3) 50%, rgb(var(--page-bg)) 100%)",
        }}
      />
      {/* atmospheric brand glow, off-center for asymmetry */}
      <div
        aria-hidden="true"
        className="glow pointer-events-none absolute -left-24 top-[38%] -z-[1] h-[34rem] w-[34rem]"
      />

      <div
        data-hero="content"
        className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-[1500px] grid-cols-1 items-center gap-12 px-6 pb-24 pt-28 lg:grid-cols-12 lg:gap-10 lg:px-12"
      >
        {/* LEFT — headline column (asymmetric, wider) */}
        <div className="lg:col-span-8 xl:col-span-7">
          <div
            data-hero="tag"
            className="mb-7 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.26em] text-white/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            {t.hero.tag_brand} · {t.hero.tag_country}
          </div>

          <h1
            data-hero="title"
            className="font-display text-[3.25rem] font-bold leading-[0.92] tracking-[-0.045em] text-white sm:text-7xl lg:text-[6.25rem]"
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

          <div
            data-hero="rule"
            className="mt-7 flex items-center gap-4 font-jp text-[12px] tracking-[0.22em] text-white/55"
          >
            <span className="h-px w-12 bg-orange-500" />
            {t.hero.rule_jp}
          </div>

          <p
            data-hero="paragraph"
            className="mt-7 max-w-md text-pretty text-[15px] leading-relaxed text-white/75 md:text-base"
          >
            {t.hero.paragraph}
          </p>

          <div
            data-hero="ctas"
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#solutions"
              className="group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-orange-500 px-7 py-3.5 text-[13px] font-bold tracking-[0.03em] text-white transition hover:bg-orange-400"
            >
              {t.hero.cta_primary}
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
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

        {/* RIGHT — glass telemetry HUD (asymmetric, offset to the edge) */}
        <div
          data-hero="hud-right"
          className="lg:col-span-4 lg:justify-self-end xl:col-span-3 xl:col-start-10"
        >
          <div className="glass-dark w-full max-w-sm rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-orange-400">
                {t.hero.hud_left_label}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {t.hero.hud_right_status}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
              {[
                ["COORD", t.hero.hud_left_coords],
                ["ALT", t.hero.hud_left_alt],
                ["UNIT", t.hero.hud_right_unit],
                ["AUTH", t.hero.hud_right_auth],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
                    {k}
                  </div>
                  <div className="mt-1 font-mono text-[11px] leading-tight text-white/80">
                    {v}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10">
              {t.hero.ticker.map((it) => (
                <div key={it.k} className="bg-black/40 px-3 py-2.5">
                  <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-orange-400">
                    {it.k}
                  </div>
                  <div className="mt-0.5 text-[12px] font-semibold text-white/85">
                    {it.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
