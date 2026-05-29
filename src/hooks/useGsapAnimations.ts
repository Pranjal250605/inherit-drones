import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapAnimations(): void {
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      document.body.classList.add("no-anim");
      return;
    }

    const ctx = gsap.context(() => {
      /* ===== HERO ENTRANCE TIMELINE ===== */
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(
          '[data-hero="tag"]',
          { y: 16 },
          { opacity: 1, y: 0, duration: 0.7 }
        )
        .fromTo(
          '[data-hero="title"] > span',
          { y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.14,
          },
          "-=0.5"
        )
        .fromTo(
          '[data-hero="rule"]',
          { scaleX: 0.3 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.8,
            transformOrigin: "center",
          },
          "-=0.6"
        )
        .fromTo(
          '[data-hero="paragraph"]',
          { y: 14 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          '[data-hero="ctas"] > *',
          { y: 12 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .fromTo(
          '[data-hero="ticker"] > *',
          { y: 10 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
          "-=0.3"
        )
        .fromTo(
          '[data-hero="hud-left"]',
          { x: -24 },
          { opacity: 1, x: 0, duration: 0.9 },
          "-=0.8"
        )
        .fromTo(
          '[data-hero="hud-right"]',
          { x: 24 },
          { opacity: 1, x: 0, duration: 0.9 },
          "<"
        )
        .to('[data-hero="scroll"]', { opacity: 1, duration: 0.4 }, "-=0.2");

      /* ===== HERO PARALLAX ===== */
      gsap.to('[data-hero="video"]', {
        yPercent: 14,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: "#top",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to('[data-hero="content"]', {
        yPercent: -8,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#top",
          start: "top top",
          end: "bottom 30%",
          scrub: true,
        },
      });

      /* ===== SECTION-ENTER ORANGE LINE SWEEP ===== */
      gsap.utils.toArray<HTMLElement>('[data-anim="sweep"]').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, opacity: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });

      /* ===== TITLE REVEALS (slide up) ===== */
      gsap.utils
        .toArray<HTMLElement>('[data-anim="title-up"]')
        .forEach((el) => {
          gsap.fromTo(
            el,
            { y: 44 },
            {
              opacity: 1,
              y: 0,
              duration: 1.4,
              ease: "power4.out",
              scrollTrigger: { trigger: el, start: "top 86%" },
            }
          );
        });

      /* ===== STAGGERED CHILD REVEALS ===== */
      gsap.utils
        .toArray<HTMLElement>('[data-anim="stagger"]')
        .forEach((parent) => {
          const items = parent.querySelectorAll<HTMLElement>("[data-anim-item]");
          gsap.fromTo(
            items,
            { y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power2.out",
              stagger: 0.1,
              scrollTrigger: { trigger: parent, start: "top 80%" },
            }
          );
        });

      /* ===== SPEC BAR WIDTH ===== */
      gsap.utils.toArray<HTMLElement>("[data-bar]").forEach((bar) => {
        const value = parseFloat(bar.dataset.bar || "0");
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: value + "%",
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 90%" },
          }
        );
      });

      /* ===== STATS COUNT-UP ===== */
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = parseFloat(el.dataset.count || "0");
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const suffix = el.dataset.suffix || "";
        const thousands = el.dataset.thousands === "true";
        const fmt = (v: number): string => {
          if (thousands)
            return v.toLocaleString(undefined, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            });
          return v.toFixed(decimals);
        };
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: target,
              duration: 2.0,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = fmt(obj.v) + suffix;
              },
            });
          },
        });
      });

      /* ===== PROCESS SPINE: scrubbed scale ===== */
      gsap.utils.toArray<HTMLElement>('[data-anim="spine"]').forEach((spine) => {
        gsap.to(spine, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: spine,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.6,
          },
        });
      });

      /* ===== SCROLL PROGRESS BAR =====
         Thin orange line at top of viewport that scales from 0 to 1 as the
         user scrolls the whole page. Driven by scrub:0 for instant tracking. */
      gsap.to('[data-anim="scroll-progress"]', {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: 0,
        },
      });

      /* ===== FIELD CASE IMAGE WIPE-REVEAL =====
         Each field-case image area starts clipped from the right; as the
         card enters viewport, the clip retracts, wiping the image in like a
         shutter. Paired with a faint orange "scan line" that crosses just
         before the reveal completes. */
      gsap.utils
        .toArray<HTMLElement>('[data-anim="img-reveal"]')
        .forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.2,
              ease: "power3.inOut",
              scrollTrigger: { trigger: el, start: "top 85%" },
            }
          );
        });

      /* ===== PROCESS SPINE NODES POP-IN =====
         As the orange spine scrubs down past each phase, that phase's node
         marker pops in with a back-out spring and a brief orange flash. */
      gsap.utils.toArray<HTMLElement>('[data-anim="node"]').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0, rotation: -90 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(2.2)",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      });

      /* ===== STATS COUNT-COMPLETION PUNCH =====
         When each stat's count-up finishes, scale-pop the number to draw
         the eye after the animation lands. */
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el,
              { scale: 1 },
              {
                scale: 1.08,
                duration: 0.3,
                delay: 1.9,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut",
              }
            );
          },
        });
      });

      /* ===== CARD STAGGER WITH 3D DEPTH =====
         Cards lift in with a slight rotateX + rotateY so they feel like
         physical objects landing into place, not flat divs fading. */
      gsap.utils
        .toArray<HTMLElement>('[data-anim="card-stagger"]')
        .forEach((parent) => {
          const items = parent.querySelectorAll<HTMLElement>("[data-anim-item]");
          if (!items.length) return;
          parent.style.perspective = "1600px";
          gsap.fromTo(
            items,
            { y: 56, rotateX: 7, rotateY: -3 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              duration: 1.3,
              ease: "power4.out",
              stagger: 0.14,
              scrollTrigger: { trigger: parent, start: "top 82%" },
            }
          );
        });

      /* ===== PARALLAX (scrubbed, subtle vertical drift) =====
         Put on an oversized element (e.g. an <img> with scale-110) inside an
         overflow-hidden wrapper. data-speed tunes intensity (default 0.12). */
      gsap.utils.toArray<HTMLElement>('[data-anim="parallax"]').forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0.12");
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

      /* ===== MASKED REVEAL (clip-path wipe upward) =====
         For large media / display type. Content is clipped from the bottom,
         then the mask retracts as the element scrolls into view. */
      gsap.utils.toArray<HTMLElement>('[data-anim="reveal"]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0 0 0)", y: 28 },
          {
            clipPath: "inset(0% 0 0 0)",
            y: 0,
            duration: 1.3,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      /* ===== WORD-BY-WORD HEADLINE REVEAL =====
         Splits a heading's [data-word] spans and lifts them in sequence —
         a refined, Fujitaka-style display reveal. */
      gsap.utils.toArray<HTMLElement>('[data-anim="words"]').forEach((el) => {
        const words = el.querySelectorAll<HTMLElement>("[data-word]");
        if (!words.length) return;
        gsap.fromTo(
          words,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.0,
            ease: "power4.out",
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      /* ===== HEADER SCROLL-VELOCITY KICK =====
         When the user scrolls fast, the logo lockup gets a quick skewY pulse
         then settles — gives the page a tactile, "physics is real" feel
         without ever obstructing interaction. */
      const logo = document.querySelector<HTMLElement>("[data-anim='logo']");
      if (logo) {
        let lastY = window.scrollY;
        let raf = 0;
        const tick = () => {
          const cur = window.scrollY;
          const delta = Math.max(-30, Math.min(30, cur - lastY));
          lastY = cur;
          gsap.to(logo, {
            skewY: delta * 0.25,
            duration: 0.4,
            ease: "power3.out",
          });
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
      }
    });

    return () => ctx.revert();
  }, []);
}
