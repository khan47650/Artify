import { ArrowRight, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import topDots from "/top_dots.png";
import api from "@/lib/api";

const ArtworksGrid = () => {
  const { ref, isVisible } = useScrollAnimation();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [artworks, setArtworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLatestArtworks = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/artworks?page=1&limit=4");

      const approvedArtworks = (data.artworks || []).filter(
        (art: any) =>
          art.approvedStatus === "approved" &&
          art.sellingStatus !== "sold" &&
          art.userId?.accountStatus !== "freeze"
      );

      setArtworks(approvedArtworks.slice(0, 4));
    } catch (error) {
      console.log(error);
      setArtworks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestArtworks();
  }, []);

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 440,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-white pt-[105px] pb-[90px]"
    >
      <img
        src={topDots}
        alt=""
        className="pointer-events-none absolute left-[40px] top-[110px] z-0 w-[110px]"
      />

      <img
        src={topDots}
        alt=""
        className="pointer-events-none absolute right-[120px] top-[180px] z-20 w-[125px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 pt-[70px]">
        <div
          className={`mb-8 text-left transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          <h2 className="font-ivy text-[34px] font-normal leading-none text-black">
            Artworks Available Now
          </h2>

          <p className="font-encode mt-2 text-[12px] text-black/55">
            Latest approved artworks from Artify artists.
          </p>
        </div>

        <div className="relative">
          {loading ? (
            <div className="flex gap-5 overflow-hidden pb-4">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="min-w-[420px] animate-pulse rounded-[14px] bg-[#f5f5f5] p-3"
                >
                  <div className="flex gap-4">
                    <div className="h-[135px] w-[150px] rounded-[14px] bg-[#e5e5e5]" />

                    <div className="flex-1">
                      <div className="h-6 w-[90px] rounded-full bg-[#e5e5e5]" />
                      <div className="mt-3 h-5 w-[70%] rounded bg-[#e5e5e5]" />
                      <div className="mt-3 h-12 w-full rounded bg-[#e5e5e5]" />
                      <div className="mt-4 h-12 w-[80%] rounded bg-[#e5e5e5]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : artworks.length === 0 ? (
            <div
              className={`rounded-[20px] border border-black/10 bg-[#f5f5f5] p-8 text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                <Crown className="h-5 w-5" />
              </div>

              <h3 className="font-ivy mt-4 text-[30px] font-normal leading-none text-black">
                Curated Artworks Coming Soon
              </h3>

              <p className="font-encode mx-auto mt-3 max-w-[520px] text-[13px] leading-6 text-black/55">
                Approved artworks will appear here once artists start publishing
                their collections. Until then, explore categories, artists, and AI
                recommendations.
              </p>
            </div>
          ) : (
            <>
              <div
                ref={scrollRef}
                className="scrollbar-hide flex gap-5 overflow-x-auto pb-4 pr-12"
              >
                {artworks.map((art, index) => (
                  <Link
                    to={`/art/${art._id}`}
                    key={art._id}
                    className={`min-w-[420px] rounded-[14px] bg-[#f5f5f5] p-3 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_18px_40px_-28px_rgba(0,0,0,0.35)] ${isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                      }`}
                    style={{
                      transitionDelay: isVisible
                        ? `${(index + 1) * 150}ms`
                        : "0ms",
                    }}
                  >
                    <div className="flex gap-4">
                      <div className="relative h-[135px] w-[150px] shrink-0 overflow-hidden rounded-[14px]">
                        <img
                          src={art.image}
                          alt={art.name}
                          className="h-full w-full rounded-[14px] object-cover transition-transform duration-500 hover:scale-105"
                        />

                        <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#f5a400] text-white">
                          <Crown className="h-3.5 w-3.5" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="mb-2 inline-flex rounded-full border border-black/30 px-3 py-1 font-encode text-[10px]">
                          {art.category || "Original Artwork"}
                        </div>

                        <h3 className="font-ivy text-[18px] font-semibold leading-tight text-black">
                          {art.name}
                        </h3>

                        <p className="font-encode mt-1 line-clamp-3 text-[11px] leading-[1.35] text-black/55">
                          {art.description || "A newly added artwork from Artify."}
                        </p>

                        <div className="font-encode mt-4 grid grid-cols-[65px_1fr] gap-y-1 text-[11px] text-black/70">
                          <span>Artist:</span>
                          <span>
                            {art.userId?.firstName || "Artist"}{" "}
                            {art.userId?.lastName || ""}
                          </span>

                          <span>Medium:</span>
                          <span>{art.category || "Digital Art"}</span>

                          <span>Price:</span>
                          <span>${Number(art.price || 0).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {artworks.length > 2 && (
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white transition hover:bg-black/85"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/explore"
            className="font-encode rounded-full bg-black px-7 py-3 text-[12px] font-semibold text-white transition hover:bg-black/85"
          >
            View all artworks
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArtworksGrid;