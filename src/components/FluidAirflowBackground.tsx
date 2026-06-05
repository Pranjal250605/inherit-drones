import { useEffect, useRef } from "react";

/* ============================================================
   <FluidAirflowBackground/>
   ------------------------------------------------------------
   A canvas flow-field that evokes wind-tunnel airflow / autonomous
   flight paths: thousands of trail segments advected through a
   smooth, time-varying vector field. Palette is light grey/silver
   with a faint brand-orange minority, kept at very low opacity so
   it reads as abstract art behind black/orange foreground text.

   • Trails fade to transparent each frame (destination-out), so the
     canvas stays transparent and composites over any background.
   • requestAnimationFrame, no per-frame allocations in the hot loop,
     particle count scaled to the viewport, paused when the tab is
     hidden, and disabled (rendered as a single static field) under
     prefers-reduced-motion.
   • Handles devicePixelRatio (Retina) and window resize.
============================================================ */

type Particle = {
  x: number;
  y: number;
  px: number;
  py: number;
  life: number;
  orange: boolean;
};

export function FluidAirflowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let t = 0;

    const SPEED = 1.1; // px advected per frame
    const FADE = 0.02; // trail fade strength (lower = longer, denser trails)

    /* Smooth, organic vector field built from layered trig — a cheap
       stand-in for curl/Perlin noise that still flows like air currents. */
    const flowAngle = (x: number, y: number, time: number): number => {
      const s = 0.0015;
      return (
        (Math.sin(x * s + time) +
          Math.cos(y * s * 1.3 - time * 0.8) +
          Math.sin((x + y) * s * 0.6 + time * 0.5)) *
        Math.PI *
        0.9
      );
    };

    const spawn = (p: Particle): Particle => {
      p.x = Math.random() * width;
      p.y = Math.random() * height;
      p.px = p.x;
      p.py = p.y;
      p.life = 80 + Math.random() * 280;
      p.orange = Math.random() < 0.18; // faint orange minority, rest silver
      return p;
    };

    const initParticles = () => {
      const target = Math.min(700, Math.max(180, Math.round((width * height) / 5200)));
      particles = new Array(target);
      for (let i = 0; i < target; i++) particles[i] = spawn({} as Particle);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      initParticles();
    };

    const GREY = "rgba(132,137,148,0.22)";
    const ORANGE = "rgba(249,115,22,0.24)";

    const step = (fade: boolean) => {
      if (fade) {
        // erase a little of the previous frame → trails fade to transparent
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = `rgba(0,0,0,${FADE})`;
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = "source-over";
      }

      ctx.lineWidth = 1.5;
      // batch by colour to minimise state changes
      for (let pass = 0; pass < 2; pass++) {
        ctx.strokeStyle = pass === 0 ? GREY : ORANGE;
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if ((pass === 1) !== p.orange) continue;
          p.px = p.x;
          p.py = p.y;
          const a = flowAngle(p.x, p.y, t);
          p.x += Math.cos(a) * SPEED;
          p.y += Math.sin(a) * SPEED;
          p.life -= 1;
          if (
            p.life <= 0 ||
            p.x < -12 ||
            p.x > width + 12 ||
            p.y < -12 ||
            p.y > height + 12
          ) {
            spawn(p);
            continue; // don't draw the wrap/respawn jump
          }
          ctx.moveTo(p.px, p.py);
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
    };

    const tick = () => {
      t += 0.0016;
      step(true);
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduceMotion) raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    if (reduceMotion) {
      // paint one static airflow field (no animation loop)
      for (let k = 0; k < 260; k++) {
        t += 0.0016;
        step(false);
      }
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
