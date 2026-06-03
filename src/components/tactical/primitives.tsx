import type { ReactNode } from "react";

/* ============================================================
   TACTICAL DESIGN PRIMITIVES  (Anduril-inspired)
   ------------------------------------------------------------
   The cinematic dark variant paints with EXPLICIT colors, not the
   theme tokens — it is intentionally always dark:
     • page / panels : #04060a, black, white/[0.04] fills
     • text          : white, white/55 (muted), white/35 (faint)
     • hairlines      : white/10
     • the ONE accent : orange-500  (data values, active state, glow)
   Type language: huge thin condensed display headings + monospace
   micro-labels with wide tracking. Every section is generously
   padded and framed with hairline + corner index marks.
   Reuse these atoms so all tactical sections stay cohesive.
============================================================ */

/* Monospace micro-label — the technical caption used everywhere. */
export function Mono({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={
        "font-mono text-[10px] uppercase tracking-[0.32em] text-white/40 " +
        className
      }
    >
      {children}
    </span>
  );
}

/* Section eyebrow: an orange index + tracked label, e.g. "02 / Solutions".
   Accepts the "NN / Label" strings already present in the i18n dict. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const parts = children.split(" / ");
  const num = parts.length === 2 ? parts[0] : null;
  const label = parts.length === 2 ? parts[1] : children;
  return (
    <div className={"flex items-center gap-3 " + className}>
      <span className="h-px w-8 bg-orange-500" />
      <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/70">
        {num && <span className="mr-2 text-orange-500">{num}</span>}
        {label}
      </span>
    </div>
  );
}

/* Full-bleed section shell. Anduril-style restraint: NO visible frame, NO
   corner marks — content floats in black with very generous vertical rhythm
   so each section reads as one calm idea. (`index` is accepted but no longer
   rendered, kept optional so existing call sites stay valid.) */
export function TSection({
  id,
  children,
  className = "",
}: {
  id?: string;
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      data-tac-section={id}
      className={
        "relative scroll-mt-24 px-6 py-32 sm:py-40 lg:px-16 " + className
      }
    >
      <div className="mx-auto w-full max-w-[1240px]">{children}</div>
    </section>
  );
}

/* Standard section header: quiet eyebrow + room. Keeps headlines consistent
   in scale and spacing across the variant. Pass the headline as children. */
export function SectionHead({
  eyebrow,
  jp,
  lead,
  children,
  className = "",
}: {
  eyebrow: string;
  jp?: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-tac="up" className={"max-w-3xl " + className}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-8 font-display text-[2.5rem] font-bold uppercase leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
        {children}
      </h2>
      {jp && (
        <div className="mt-6 font-jp text-[12px] tracking-[0.24em] text-white/40">
          {jp}
        </div>
      )}
      {lead && (
        <p className="mt-7 max-w-xl text-pretty text-[17px] leading-relaxed text-white/55">
          {lead}
        </p>
      )}
    </div>
  );
}

/* Solid orange CTA. */
export function TacButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={
        "group inline-flex items-center gap-2.5 whitespace-nowrap bg-orange-500 px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-black transition hover:bg-orange-400 " +
        className
      }
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
    </a>
  );
}

/* Hairline ghost CTA. */
export function GhostButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={
        "group inline-flex items-center gap-2.5 whitespace-nowrap border border-white/20 px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white/80 transition hover:border-orange-500 hover:text-white " +
        className
      }
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
    </a>
  );
}

export function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

/* Faint corner brackets — drawn on cards/panels for the HUD feel. */
export function Brackets({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={"pointer-events-none absolute inset-0 " + className}
    >
      <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-orange-500/60" />
      <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-orange-500/60" />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-orange-500/60" />
      <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-orange-500/60" />
    </span>
  );
}

/* ------------------------------------------------------------
   Photo — the standard cinematic image treatment for the variant.
   • clip-path wipe-in on scroll       (frame: data-tac="reveal")
   • slow parallax drift on scroll     (layer: data-tac="parallax")
   • gentle hover zoom + brightness     (img: CSS transform only)
   Parallax lives on an oversized inner LAYER (GSAP owns its transform)
   while the hover zoom lives on the <img> (CSS owns its transform), so
   the two never fight over the same transform. Size/aspect is set by the
   caller via `className` on the frame (e.g. "aspect-[4/5]" or "h-[60vh]").
------------------------------------------------------------ */
export function Photo({
  src,
  alt,
  className = "",
  speed = 0.1,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  eager?: boolean;
}) {
  return (
    <div
      data-tac="reveal"
      className={"group relative overflow-hidden bg-white/[0.04] " + className}
    >
      <div
        data-tac="parallax"
        data-speed={String(speed)}
        className="absolute inset-x-0 -top-[14%] h-[128%] will-change-transform"
      >
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover brightness-[0.82] saturate-[1.05] transition-[transform,filter] duration-[1200ms] ease-out group-hover:scale-[1.05] group-hover:brightness-100"
        />
      </div>
      {/* legibility + brand wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04060a]/75 via-[#04060a]/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-gradient-to-tr from-orange-500/15 to-transparent" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  );
}

/* ------------------------------------------------------------
   DroneGlyph — top-down quadcopter. Used by the scroll navigator
   and as decoration. When `spinning`, rotor discs blur-spin.
------------------------------------------------------------ */
export function DroneGlyph({
  className = "h-12 w-12",
  spinning = true,
}: {
  className?: string;
  spinning?: boolean;
}) {
  const rotorClass = spinning ? "rotor" : "rotor-idle";
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* arms (X frame) */}
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <line x1="50" y1="50" x2="22" y2="22" />
        <line x1="50" y1="50" x2="78" y2="22" />
        <line x1="50" y1="50" x2="22" y2="78" />
        <line x1="50" y1="50" x2="78" y2="78" />
      </g>
      {/* rotor discs */}
      {[
        [22, 22],
        [78, 22],
        [22, 78],
        [78, 78],
      ].map(([cx, cy], i) => (
        <g key={i} style={{ transformBox: "fill-box", transformOrigin: "center" }} className={rotorClass}>
          <circle cx={cx} cy={cy} r="16" fill="rgb(249 115 22 / 0.08)" />
          <circle
            cx={cx}
            cy={cy}
            r="16"
            stroke="rgb(249 115 22 / 0.55)"
            strokeWidth="1.5"
          />
          {/* two blades */}
          <line
            x1={cx - 14}
            y1={cy}
            x2={cx + 14}
            y2={cy}
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1={cx}
            y1={cy - 14}
            x2={cx}
            y2={cy + 14}
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      ))}
      {/* central body */}
      <rect
        x="40"
        y="40"
        width="20"
        height="20"
        rx="4"
        fill="#04060a"
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle cx="50" cy="50" r="3.4" fill="rgb(249 115 22)" />
    </svg>
  );
}
