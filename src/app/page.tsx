import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import MarqueeStrip from "@/components/landing/MarqueeStrip";
import ProblemSection from "@/components/landing/ProblemSection";
import DualSplit from "@/components/landing/DualSplit";
import HowItWorks from "@/components/landing/HowItWorks";
import StatsSection from "@/components/landing/StatsSection";
import WaitlistSection from "@/components/landing/WaitlistSection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <Nav />
      <Hero />
      <ProblemSection />
      <DualSplit />
      <HowItWorks />
      <StatsSection />
      <WaitlistSection />
      <Footer />
    </main>
  );
}
