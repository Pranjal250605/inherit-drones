import type { ReactNode, SVGProps } from "react";

/* ============================================================
   Shared UI atoms (Fujitaka redesign)
============================================================ */

type WithChildren = { children: ReactNode; className?: string };

export function Mono({ children, className = "" }: WithChildren) {
  return (
    <span
      className={
        "font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-fg/55 " +
        className
      }
    >
      {children}
    </span>
  );
}

/** Fujitaka signature: four orange forward-slash ticks "////" used as a
    section eyebrow. Punchy, brand-colored, sits above the heading. */
export function TickMark({ className = "h-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 12"
      className={"w-auto text-orange-500 " + className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3 12 9 0h3.4L9.4 12zM11 12 17 0h3.4l-3 12zM19 12 25 0h3.4l-3 12zM27 12 33 0h3.4l-3 12z" />
    </svg>
  );
}

/** Filled circular arrow button — the corner CTA on Fujitaka cards. */
export function RoundArrow({
  className = "",
  size = "h-10 w-10",
}: {
  className?: string;
  size?: string;
}) {
  return (
    <span
      className={
        "grid shrink-0 place-items-center rounded-full bg-orange-500 text-white transition group-hover:bg-orange-400 " +
        size +
        " " +
        className
      }
    >
      <ArrowRight className="h-4 w-4" />
    </span>
  );
}

type PlusProps = SVGProps<SVGSVGElement> & { color?: string };
export function Plus({
  className = "h-3 w-3",
  color = "currentColor",
  ...rest
}: PlusProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke={color}
      strokeWidth="1"
      className={className}
      {...rest}
    >
      <path d="M6 1V11M1 6H11" />
    </svg>
  );
}

export function ArrowRight({
  className = "h-4 w-4",
  ...rest
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      className={className}
      {...rest}
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export function ArrowDown({
  className = "h-4 w-4",
  ...rest
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      className={className}
      {...rest}
    >
      <path d="M12 5v14M5 13l7 7 7-7" />
    </svg>
  );
}

type SectionFrameProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

/** Plain section wrapper. (The old instrumentation frame — corner markers +
    orange sweep line — was removed in the Fujitaka redesign.) */
export function SectionFrame({
  id,
  children,
  className = "",
}: SectionFrameProps) {
  return (
    <section id={id} className={"relative " + className}>
      {children}
    </section>
  );
}

/** Fujitaka-style eyebrow: the orange "////" tick motif followed by a bold,
    high-contrast label. Accepts a "NN / Label" string; the number renders as a
    small orange index, the label as a punchy tracked small-cap. */
export function SectionLabel({
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
      <TickMark />
      <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-fg/80">
        {num && (
          <span className="mr-2 font-mono text-orange-500">{num}</span>
        )}
        {label}
      </span>
    </div>
  );
}
