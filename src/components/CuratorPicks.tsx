import artRose from "@/assets/new_arrivals.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";
import artMixedMedia from "@/assets/potraits.jpg";
// import artWatercolor from "@/assets/art-watercolor.jpg";
import heroArt from "@/assets/stillness.jpg";
// import { useEffect, useMemo, useState } from "react";
// import { useLikedArtworks } from "@/contexts/LikedContext";
// import { useCart } from "@/contexts/CartContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
// import { supabase } from "@/integrations/supabase/client";
// import { Button } from "@/components/ui/button";
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
// import { Heart, ShoppingCart } from "lucide-react";
// import { Link } from "react-router-dom";
import leftOrangeLines from "@/assets/left_orange_lines.png";

interface PickedArtwork {
  id: string;
  image: string;
  title: string;
  artist: string;
  price: string;
  href?: string;
  createdAt?: string;
}

const blockedArtistNames = new Set(["abc"]);
const blockedArtworkTitles = new Set(["abc", "mona lisa", "monalisa"]);

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();

const pickedArtworks = [
  { id: "1", image: artRose, title: "New Arrivals" },
  { id: "2", image: artMixedMedia, title: "Abstract & Experimental" },
  { id: "3", image: heroArt, title: "Portraits & Identity" },
  { id: "4", image: galleryInterior, title: "Stillness & Minimalism" },
];

const CuratorPicks = () => {
  const { ref, isVisible } = useScrollAnimation();
  // const { isLiked, toggleLike } = useLikedArtworks();
  // const { addToCart, removeFromCart, isInCart } = useCart();
  // const [listedPicks, setListedPicks] = useState<PickedArtwork[]>([]);

  return (
    <section className="relative min-h-screen bg-white pt-[110px] md:pt-[140px] pb-[60px] md:pb-[90px] overflow-hidden" ref={ref}>
      <img
        src={leftOrangeLines}
        alt=""
        className="absolute left-0 top-[70px] md:top-[95px] w-[120px] md:w-[130px] pointer-events-none"
      />

      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 relative z-10">
        <h2
          className={`font-ivy text-[30px] md:text-[42px] font-normal leading-none text-left text-black transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          AI + Curator Picks...
        </h2>

        <p
          className={`font-encode mt-2 md:mt-3 mb-6 md:mb-9 max-w-[650px] text-[11px] md:text-[14px] leading-[1.25] text-black/55 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          style={{ transitionDelay: isVisible ? "100ms" : "0ms" }}
        >
          Each collection is shaped by theme, emotion, and material curated to help you discover with intention.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-6 md:gap-4">
          {pickedArtworks.map((art, i) => (
            <div
              key={art.id}
              className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: isVisible ? `${(i + 1) * 120}ms` : "0ms" }}
            >
              <div className="group h-[125px] sm:h-[160px] md:h-[190px] overflow-hidden rounded-[16px] md:rounded-[18px] bg-white">
                <img
                  src={art.image}
                  alt={art.title}
                  className="h-full w-full rounded-[18px] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05] hover:cursor-pointer"
                />
              </div>

              <h3 className="font-ivy mt-2 md:mt-3 text-center text-[13px] md:text-[18px] font-semibold leading-tight text-black">
                {art.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratorPicks;
