import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CuratorPicks from "@/components/CuratorPicks";
import ArtworksGrid from "@/components/ArtworksGrid";
import StartGuide from "@/components/StartGuide";
import ArtistsSection from "@/components/ArtistsSection";
import BlogSection from "@/components/BlogSection";
import ShareWorkSection from "@/components/ShareWorkSection";
import CollectConfidence from "@/components/CollectConfidence";
import Footer from "@/components/Footer";

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <HeroSection />
      <FeaturesSection />
      <CuratorPicks />
      <ArtworksGrid />
      <StartGuide />
      <ArtistsSection />
      <BlogSection />
      <ShareWorkSection />
      <CollectConfidence />
      <Footer />

      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-[999] flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-black/85 ${showScrollTop
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-5 opacity-0"
          }`}
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Index;