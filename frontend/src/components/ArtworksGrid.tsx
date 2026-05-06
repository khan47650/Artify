import { ArrowRight, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import topDots from "/top_dots.png";
import artWork1 from "@/assets/art_work_1.jpg";
import artWork2 from "@/assets/art_work_2.jpg";

interface ArtworkCard {
  id: string;
  title: string;
  artist: string;
  image: string;
  description: string;
  edition: string;
  medium: string;
  price: string;
  badge: string;
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

const artworks = [
  {
    id: "1",
    image: artWork1,
    title: "Alex Moore",
    badge: "Featured Artist",
    description:
      "Creating immersive digital compositions that explore identity, emotion, and abstraction through color and form.",
    edition: "2 of 8",
    medium: "Digital - Mixed Media",
    price: "$1,200",
  },
  {
    id: "2",
    image: artWork2,
    title: "Daniel Cruz",
    badge: "Fragments of Light",
    description:
      "A limited digital piece exploring movement, light, and layered emotion in a contemporary digital form.",
    edition: "1 of 5",
    medium: "Digital - 3D",
    price: "$1,750",
  },
];

const ArtworksGrid = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative min-h-screen bg-white pt-[105px] pb-[90px] overflow-hidden" ref={ref}>
      <img src={topDots} alt="" className="absolute left-[40px] top-[110px] w-[110px] pointer-events-none z-0" />
      <img src={topDots} alt="" className="absolute right-[120px] top-[180px] w-[125px] pointer-events-none z-20" />

      <div className="mx-auto w-full max-w-[1100px] px-6 pt-[70px] relative z-10">
        <div
          className={`mb-8 text-left transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="font-ivy text-[34px] font-normal leading-none text-black">
            Artworks Available Now
          </h2>
          <p className="font-encode mt-2 text-[12px] text-black/55">
            Original works, ready to be lived with.
          </p>
        </div>

        <div className="relative">
          <div className="flex gap-5 overflow-x-auto pb-4 pr-10">
            {artworks.map((art, i) => (
              <div
                key={art.id}
                className={`min-w-[420px] rounded-[14px] bg-[#f5f5f5] p-3 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: isVisible ? `${(i + 1) * 150}ms` : "0ms" }}
              >
                <div className="flex gap-4">
                  <div className="relative h-[135px] w-[150px] shrink-0 overflow-hidden rounded-[14px]">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="h-full w-full rounded-[14px] object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#f5a400] text-white">
                      <Crown className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="mb-2 inline-flex rounded-full border border-black/30 px-3 py-1 font-encode text-[10px]">
                      {art.badge}
                    </div>

                    <h3 className="font-ivy text-[18px] font-semibold leading-tight text-black">
                      {art.title}
                    </h3>

                    <p className="font-encode mt-1 text-[11px] leading-[1.25] text-black/55">
                      {art.description}
                    </p>

                    <div className="font-encode mt-4 grid grid-cols-[65px_1fr] gap-y-1 text-[11px] text-black/70">
                      <span>Edition:</span><span>{art.edition}</span>
                      <span>Medium:</span><span>{art.medium}</span>
                      <span>Price:</span><span>{art.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="absolute right-0 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/explore"
            className="font-encode rounded-full bg-black px-7 py-3 text-[12px] font-semibold text-white"
          >
            View all artworks
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArtworksGrid;
