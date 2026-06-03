import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0,
      });
    };

    const onTick = () => {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      
      gsap.set(ring, {
        x: ringX,
        y: ringY,
      });
    };

    const onMouseEnter = () => setHovered(true);
    const onMouseLeave = () => setHovered(false);

    window.addEventListener("mousemove", onMouseMove);
    gsap.ticker.add(onTick);

    const updateInteractiveElements = () => {
      const interactives = document.querySelectorAll("a, button, input, select, [data-magnetic]");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });
    };

    updateInteractiveElements();
    const observer = new MutationObserver(updateInteractiveElements);
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial position
    gsap.set([cursor, ring], { x: mouseX, y: mouseY });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(onTick);
      observer.disconnect();
      const interactives = document.querySelectorAll("a, button, input, select, [data-magnetic]");
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  // Don't render anything on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <>
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500 transition-all duration-300 ease-out ${
          hovered ? "scale-[1.5] bg-orange-500/10 opacity-100" : "scale-100 bg-transparent opacity-40"
        }`}
      />
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 transition-all duration-200 ease-out ${
          hovered ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      />
    </>
  );
}
