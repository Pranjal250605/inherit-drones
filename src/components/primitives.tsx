import type { ReactNode, SVGProps } from "react";

/* ============================================================
   Atoms / Primitives
   Industrial / instrumentation design system
============================================================ */

type WithChildren = { children: ReactNode; className?: string };

export function Mono({ children, className = "" }: WithChildren) {
  return (
    <span
      className={
        "font-mono text-[10.5px] uppercase tracking-[0.22em] text-fg/45 " +
        className
      }
    >
      {children}
    </span>
  );
}

export function JpAnno({ children, className = "" }: WithChildren) {
  return (
    <span
      className={
        "font-jp text-[10.5px] tracking-[0.08em] text-fg/35 " + className
      }
    >
      {children}
    </span>
  );
}

type DotProps = { active?: boolean; className?: string };
export function Dot({ active = true, className = "" }: DotProps) {
  return (
    <span
      className={
        "inline-block h-1.5 w-1.5 " +
        (active ? "bg-orange-500" : "bg-fg/30") +
        " " +
        className
      }
    />
  );
}

type BracketLProps = { className?: string };
export function BracketL({ className = "h-2 w-2" }: BracketLProps) {
  return (
    <svg viewBox="0 0 8 8" fill="none" className={className}>
      <path d="M0 0H4M0 0V4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

type TagProps = {
  children: ReactNode;
  className?: string;
  live?: boolean;
};

export function Tag({ children, className = "", live = false }: TagProps) {
  return (
    <span
      className={
        "relative inline-flex items-center gap-2 whitespace-nowrap border border-fg/15 bg-fg/[0.03] px-2.5 py-1 " +
        "font-mono text-[10px] uppercase tracking-[0.22em] text-fg/60 " +
        className
      }
    >
      <BracketL className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 text-fg/40" />
      <BracketL className="absolute -bottom-[3px] -right-[3px] h-1.5 w-1.5 rotate-180 text-fg/40" />
      {live && <Dot />}
      {children}
    </span>
  );
}

type CornerBracketsProps = {
  size?: number;
  color?: string;
  inset?: number;
};
export function CornerBrackets({
  size = 10,
  color = "rgba(255,255,255,0.25)",
  inset = 0,
}: CornerBracketsProps) {
  const positions = [
    "top-0 left-0",
    "top-0 right-0 rotate-90",
    "bottom-0 left-0 -rotate-90",
    "bottom-0 right-0 rotate-180",
  ];
  return (
    <div className="pointer-events-none absolute inset-0">
      {positions.map((p, i) => (
        <svg
          key={i}
          className={"absolute " + p}
          width={size}
          height={size}
          viewBox="0 0 12 12"
          fill="none"
          style={{ margin: inset, color }}
        >
          <path d="M0 0H6M0 0V6" stroke="currentColor" strokeWidth="1" />
        </svg>
      ))}
    </div>
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

/** Section wrapper with corner + markers and a top sweep line that animates in. */
export function SectionFrame({
  id,
  children,
  className = "",
}: SectionFrameProps) {
  return (
    <section id={id} className={"relative " + className}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
        <div
          data-anim="sweep"
          className="h-full w-full bg-gradient-to-r from-transparent via-orange-500/80 to-transparent"
        />
      </div>
      <div className="pointer-events-none absolute left-3 top-3 text-fg/15 md:left-6 md:top-6">
        <Plus />
      </div>
      <div className="pointer-events-none absolute right-3 top-3 text-fg/15 md:right-6 md:top-6">
        <Plus />
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 text-fg/15 md:bottom-6 md:left-6">
        <Plus />
      </div>
      <div className="pointer-events-none absolute bottom-3 right-3 text-fg/15 md:bottom-6 md:right-6">
        <Plus />
      </div>
      {children}
    </section>
  );
}

/** Hover-revealed monospace bracket title wrapper */
export function BracketTitle({ children, className = "" }: WithChildren) {
  return (
    <span className={"group/bt relative inline-flex items-center " + className}>
      <span className="bracket-l mr-2 inline-block font-mono text-orange-400/80 opacity-0 transition group-hover/bt:opacity-100">
        [
      </span>
      {children}
      <span className="bracket-r ml-2 inline-block font-mono text-orange-400/80 opacity-0 transition group-hover/bt:opacity-100">
        ]
      </span>
    </span>
  );
}
