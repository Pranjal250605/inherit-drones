import { useEffect, useRef } from "react";
import { Mono, SectionFrame, SectionLabel } from "../primitives";
import { useT } from "../../i18n";
import {
  INSTAGRAM_PROFILE_URL,
  INSTAGRAM_SHORTCODES,
} from "../../data/instagram";

function InstagramGlyph({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Instagram() {
  const { t, lang } = useT();
  const gridRef = useRef<HTMLDivElement>(null);

  // The embed.js loader transforms <blockquote class="instagram-media">
  // elements into iframes. It auto-runs on first load, but on subsequent
  // re-renders (e.g. language switch) we need to call process() again so
  // any not-yet-transformed blockquotes get picked up.
  useEffect(() => {
    if (!INSTAGRAM_SHORTCODES.some(Boolean)) return;
    const tryProcess = () => window.instgrm?.Embeds.process();
    tryProcess();
    // The script may load after this effect fires the first time; retry once.
    const t1 = window.setTimeout(tryProcess, 800);
    const t2 = window.setTimeout(tryProcess, 2400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [lang]);

  return (
    <SectionFrame
      id="instagram"
      /* Lift above the GlobalBackground mix-blend-multiply overlay (z-40): a
         blend layer over cross-origin iframes renders unreliably (blank) on
         the white light/blueprint backgrounds, hiding the embeds. */
      className="relative z-[41] isolate bg-bg py-24 md:py-32"
    >
      <div className="mx-auto max-w-[93.75rem] px-6 lg:px-10">
        <header className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>{t.instagram.tag}</SectionLabel>
            <h2
              data-anim="title-up"
              className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-[-0.015em] text-fg md:text-5xl"
            >
              {t.instagram.h2_pre}
              {t.instagram.h2_emph}
            </h2>
            <div className="mt-5 font-jp text-[11px] tracking-[0.05em] text-fg/50">
              {t.instagram.subtitle_jp}
            </div>
            <p className="mt-6 max-w-md text-pretty text-sm leading-loose text-muted">
              {t.instagram.lead}
            </p>
          </div>

          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-fg/60 transition hover:text-orange-500"
          >
            <InstagramGlyph className="h-4 w-4" />
            <span>{t.instagram.handle}</span>
          </a>
        </header>

        <div
          ref={gridRef}
          data-anim="card-stagger"
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {INSTAGRAM_SHORTCODES.map((shortcode, i) => (
            <div key={i} data-anim-item>
              {shortcode ? (
                <EmbedTile shortcode={shortcode} />
              ) : (
                <PlaceholderTile
                  index={i + 1}
                  title={t.instagram.placeholder_title}
                  body={t.instagram.placeholder_body}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-fg/10 pt-6 sm:flex-row sm:items-center">
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-orange-500"
          >
            <Mono>{t.instagram.handle}</Mono>
          </a>
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-fg/60 transition hover:text-orange-500"
          >
            {t.instagram.follow}
          </a>
        </div>
      </div>
    </SectionFrame>
  );
}

function EmbedTile({ shortcode }: { shortcode: string }) {
  const url = `https://www.instagram.com/p/${shortcode}/`;
  return (
    <div className="card-lift relative overflow-hidden rounded-2xl border border-fg/10 bg-white p-1 shadow-sm transition hover:border-orange-300 hover:shadow-lg">
      <blockquote
        // Re-key blockquote on shortcode so React re-mounts after lang switch.
        key={shortcode}
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          margin: 0,
          minWidth: "260px",
          padding: 0,
          width: "100%",
        }}
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500 hover:text-orange-500"
        >
          View on Instagram → {shortcode}
        </a>
      </blockquote>
    </div>
  );
}

function PlaceholderTile({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  const code = `IG.${String(index).padStart(2, "0")}`;
  return (
    <div className="relative aspect-square overflow-hidden border border-dashed border-fg/15 bg-fg/[0.02] p-6">
      <div className="relative flex h-full flex-col">
        <Mono className="text-fg/30">{code}</Mono>
        <div className="mt-auto">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg/70">
            {title}
          </div>
          <p className="mt-3 max-w-xs text-[12px] leading-relaxed text-fg/45">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}
