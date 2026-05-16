import { useGsapAnimations } from "./hooks/useGsapAnimations";
import { Header } from "./components/sections/Header";
import { Hero } from "./components/sections/Hero";
import { TrustStrip } from "./components/sections/TrustStrip";
import { Mission } from "./components/sections/Mission";
import { Solutions } from "./components/sections/Solutions";
import { Process } from "./components/sections/Process";
import { Technology } from "./components/sections/Technology";
import { UseCases } from "./components/sections/UseCases";
import { Stats } from "./components/sections/Stats";
import { Testimonial } from "./components/sections/Testimonial";
import { FAQ } from "./components/sections/FAQ";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";

export default function App() {
  useGsapAnimations();

  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Top-of-viewport scroll progress bar — scales horizontally from 0 to 1
          across the page's full scroll range. Sits above the Header (z-[60]). */}
      <div
        data-anim="scroll-progress"
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-orange-500"
        style={{ transform: "scaleX(0)" }}
      />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Mission />
        <Solutions />
        <Process />
        <Technology />
        <UseCases />
        <Stats />
        <Testimonial />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
