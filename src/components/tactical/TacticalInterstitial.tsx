import { useT } from "../../i18n";
import { Mono, Photo } from "./primitives";
import { PHOTOS } from "./photos";

/* Full-bleed cinematic break between sections — a wide aerial that parallaxes
   under one off-center statement. Edge-to-edge by design (escapes the section
   max-width) to give the scroll a breath of pure image, Anduril-style. */
export function TacticalInterstitial() {
  const { t } = useT();
  const horizon = t.mission.pillars[2];

  return (
    <section className="relative w-full">
      <Photo
        src={PHOTOS.hiroshimaAerial}
        alt="Aerial view over the Setouchi inland sea"
        speed={0.16}
        className="h-[62vh] min-h-[380px] w-full sm:h-[72vh]"
      />

      {/* off-center overlay: anchored bottom-left, never centered */}
      <div className="pointer-events-none absolute inset-0">
        <div className="mx-auto flex h-full max-w-[1240px] items-end px-6 pb-14 lg:px-16 lg:pb-20">
          <div data-tac="up" className="max-w-2xl">
            <Mono className="text-orange-400">{t.mission.subtitle_jp}</Mono>
            <p className="mt-5 font-display text-[1.75rem] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
              {horizon.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
