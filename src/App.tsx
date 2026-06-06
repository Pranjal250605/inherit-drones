import { useGsapAnimations } from "./hooks/useGsapAnimations";
import { useLenis } from "./hooks/useLenis";
import { Header } from "./components/sections/Header";
import { Hero } from "./components/sections/Hero";
import { TrustStrip } from "./components/sections/TrustStrip";
import { Promo } from "./components/sections/Promo";
import { News } from "./components/sections/News";
import { Mission } from "./components/sections/Mission";
import { Solutions } from "./components/sections/Solutions";
import { Process } from "./components/sections/Process";
import { Technology } from "./components/sections/Technology";
import { UseCases } from "./components/sections/UseCases";
import { Testimonial } from "./components/sections/Testimonial";
import { Instagram } from "./components/sections/Instagram";
import { FAQ } from "./components/sections/FAQ";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";
import { SettingsDock } from "./components/SettingsDock";
import { useExperience } from "./experience";
import { TacticalApp } from "./components/tactical/TacticalApp";

import { GlobalBackground } from "./components/GlobalBackground";
import { FluidAirflowBackground } from "./components/FluidAirflowBackground";

export default function App() {
  const { experience } = useExperience();

  // Hooks must run unconditionally; the standard-variant scroll animations are
  // a no-op when the tactical tree is mounted (none of their target attributes
  // are present), so it is safe to always call the hook.
  useGsapAnimations();
  useLenis();

  if (experience === "tactical") {
    return (
      <>
        <TacticalApp />
        <SettingsDock />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-fg relative">
      <FluidAirflowBackground />
      <GlobalBackground />
      {/* Film-grain texture over the whole page — felt, not seen. */}
      <div className="grain" aria-hidden="true" />
      {/* Top-of-viewport scroll progress bar — scales horizontally from 0 to 1
          across the page's full scroll range. Sits above the Header (z-[60]). */}
      <div
        data-anim="scroll-progress"
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-orange-500"
        style={{ transform: "scaleX(0)" }}
      />
      <Header />
      <main>
        <Hero />
        <Promo />
        <TrustStrip />
        <News />
        <Mission />
        <Solutions />
        <Process />
        <Technology />
        <UseCases />
        <Testimonial />
        <Instagram />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <SettingsDock />
    </div>
  );
}
