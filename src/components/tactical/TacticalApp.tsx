import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TacticalHeader } from "./TacticalHeader";
import { TacticalHero } from "./TacticalHero";
import { TacticalMission } from "./TacticalMission";
import { TacticalInterstitial } from "./TacticalInterstitial";
import { TacticalSolutions } from "./TacticalSolutions";
import { TacticalProcess } from "./TacticalProcess";
import { TacticalTechnology } from "./TacticalTechnology";
import { TacticalField } from "./TacticalField";
import { TacticalStats } from "./TacticalStats";
import { TacticalTestimonial } from "./TacticalTestimonial";
import { TacticalFAQ } from "./TacticalFAQ";
import { TacticalContact } from "./TacticalContact";
import { TacticalFooter } from "./TacticalFooter";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   TACTICAL APP  (Anduril-inspired design variant)
   ------------------------------------------------------------
   Self-contained composition root mounted by App.tsx when the
   Experience axis is "tactical". Reuses the SAME i18n data as the
   standard site, but in a cinematic always-dark layout with the
   scroll-driven DroneNavigator. Section order mirrors the standard
   site so the drone waypoints (top → mission → solutions →
   process → technology → field → contact) line up.
============================================================ */
export function TacticalApp() {
  // Variant-local scroll reveals. Tactical sections opt in with
  // [data-tac="up"] (rise+fade) and [data-tac="stagger"] (its children
  // marked [data-tac-item] cascade in). Disabled under reduced motion.
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to('[data-tac="progress"]', {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0 },
      });

      gsap.utils.toArray<HTMLElement>('[data-tac="up"]').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-tac="stagger"]').forEach((parent) => {
        const items = parent.querySelectorAll<HTMLElement>("[data-tac-item]");
        if (!items.length) return;
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: parent, start: "top 82%" },
          }
        );
      });

      // count-up readouts: [data-tac-count="<n>"] with optional
      // data-decimals / data-suffix / data-thousands.
      gsap.utils.toArray<HTMLElement>("[data-tac-count]").forEach((el) => {
        const target = parseFloat(el.dataset.tacCount || "0");
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const suffix = el.dataset.suffix || "";
        const thousands = el.dataset.thousands === "true";
        const fmt = (v: number) =>
          (thousands
            ? v.toLocaleString(undefined, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              })
            : v.toFixed(decimals)) + suffix;
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              v: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = fmt(obj.v);
              },
            }),
        });
      });

      // spec bars: [data-tac-bar="<percent>"]
      gsap.utils.toArray<HTMLElement>("[data-tac-bar]").forEach((bar) => {
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: (bar.dataset.tacBar || "0") + "%",
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 90%" },
          }
        );
      });

      // cinematic image wipe-in: [data-tac="reveal"] clips from the top down.
      gsap.utils.toArray<HTMLElement>('[data-tac="reveal"]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.4,
            ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      // parallax drift: [data-tac="parallax"] (oversized layer), data-speed tunes it.
      gsap.utils.toArray<HTMLElement>('[data-tac="parallax"]').forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0.1");
        gsap.fromTo(
          el,
          { yPercent: -speed * 100 },
          {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    });

    // Big photos load after first paint; recompute trigger positions when they do.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#04060a] text-white antialiased">
      {/* top scroll-progress bar */}
      <div className="fixed inset-x-0 top-0 z-[60] h-px bg-white/10">
        <div
          data-tac="progress"
          className="h-full origin-left bg-orange-500"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <TacticalHeader />

      <main>
        <TacticalHero />
        <TacticalMission />
        <TacticalInterstitial />
        <TacticalSolutions />
        <TacticalProcess />
        <TacticalTechnology />
        <TacticalField />
        <TacticalStats />
        <TacticalTestimonial />
        <TacticalFAQ />
        <TacticalContact />
      </main>

      <TacticalFooter />
    </div>
  );
}
