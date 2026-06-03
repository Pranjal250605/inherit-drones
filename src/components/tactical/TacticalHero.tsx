import { useT } from "../../i18n";
import { Mono, TacButton, GhostButton, ArrowRight } from "./primitives";

/* TacticalHero (#top) — cinematic full-bleed opener: darkened drone video,
   oversized condensed headline, corner HUD telemetry readouts. This is the
   CANONICAL reference for the tactical variant's look; other sections mirror
   its spacing, type scale, mono labels, hairlines and orange accent usage. */
export function TacticalHero() {
  const { t } = useT();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        style={{ filter: "contrast(1.25) saturate(1.2) brightness(0.78)" }}
      >
        <source
          src="https://videos.pexels.com/video-files/4446375/4446375-uhd_3840_2160_25fps.mp4"
          type="video/mp4"
        />
        <source
          src="https://videos.pexels.com/video-files/4446375/4446375-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* cinematic vignette + bottom fade into the black page */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(4,6,10,0.72) 0%, rgba(4,6,10,0.40) 42%, rgba(4,6,10,0.86) 88%, #04060a 100%)",
        }}
      />
      {/* faint drifting grid for the "moving through space" feel */}
      <div
        className="grid-drift absolute inset-0 -z-10 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto w-full max-w-[1320px] px-6 lg:px-16">
        <Mono className="text-orange-400/90">
          {t.hero.tag_brand} · {t.hero.tag_country}
        </Mono>

        <h1 className="mt-7 max-w-5xl font-display text-[15vw] font-bold uppercase leading-[0.92] tracking-[-0.02em] text-white sm:text-7xl lg:text-[7.5rem]">
          <span className="block">
            {t.hero.h1_line1_pre}
            <span className="text-orange-500">{t.hero.h1_line1_emph}</span>
          </span>
          <span className="block text-white/90">
            {t.hero.h1_line2_pre}
            {t.hero.h1_line2_emph}
          </span>
        </h1>

        <div className="mt-7 flex items-center gap-4">
          <span className="h-px w-12 bg-orange-500" />
          <span className="font-jp text-[12px] tracking-[0.24em] text-white/55">
            {t.hero.rule_jp}
          </span>
        </div>

        <p className="mt-8 max-w-xl text-pretty text-[15px] leading-relaxed text-white/70 md:text-base">
          {t.hero.paragraph}
        </p>

        <div className="mt-11 flex flex-col gap-4 sm:flex-row">
          <TacButton href="#solutions">{t.hero.cta_primary}</TacButton>
          <GhostButton href="#technology">{t.hero.cta_secondary}</GhostButton>
        </div>

        {/* ticker row */}
        <div className="mt-16 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
          {t.hero.ticker.map((item) => (
            <div key={item.k} className="bg-[#04060a] px-5 py-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-orange-400">
                {item.k}
              </div>
              <div className="mt-1 text-[13px] font-semibold tracking-[0.02em] text-white/85">
                {item.v}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* corner HUD readouts */}
      <div className="pointer-events-none absolute bottom-6 left-6 hidden lg:left-16 lg:block">
        <Mono>{t.hero.hud_left_label}</Mono>
        <div className="mt-1 font-mono text-[11px] tracking-[0.16em] text-white/55">
          {t.hero.hud_left_coords}
        </div>
        <div className="font-mono text-[11px] tracking-[0.16em] text-white/55">
          {t.hero.hud_left_alt}
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-6 right-20 hidden text-right lg:block">
        <Mono>{t.hero.hud_right_unit}</Mono>
        <div className="mt-1 font-mono text-[11px] tracking-[0.16em] text-orange-400/90">
          {t.hero.hud_right_auth}
        </div>
        <div className="flex items-center justify-end gap-2 font-mono text-[11px] tracking-[0.16em] text-white/55">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500 blink" />
          {t.hero.hud_right_status}
        </div>
      </div>

      <a
        href="#mission"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/45 transition hover:text-orange-400 md:flex"
      >
        {t.hero.scroll}
        <ArrowRight className="h-3 w-3 rotate-90" />
      </a>
    </section>
  );
}
