import { Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useLikedArtworks } from "../contexts/LikedContext";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const Liked = () => {
  const { likedItems, totalLiked, removeLike, clearLikes } = useLikedArtworks();

  return (
    <div className="min-h-screen bg-white text-[#1d1d1d]">
      <Navbar />

      <main className="bg-white pt-24 pb-12">
        <div className="mx-auto max-w-[1120px] px-4 md:px-6">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className={`${bodyFont} text-[12px] uppercase tracking-[0.28em] text-[#777]`}>
                Your Collection
              </p>

              <h1 className={`${headingFont} mt-3 text-[54px] leading-none text-[#111]`}>
                Liked Artworks
              </h1>

              <p className={`${bodyFont} mt-3 text-[14px] text-[#6f6a63]`}>
                {totalLiked} artwork{totalLiked === 1 ? "" : "s"} saved from curated picks and gallery.
              </p>
            </div>

            {totalLiked > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={clearLikes}
                className={`${bodyFont} h-10 rounded-full border-[#d8d2c8] bg-white px-7 text-[14px] text-[#111] hover:bg-[#f7f4ee]`}
              >
                Clear all
              </Button>
            )}
          </div>

          {likedItems.length === 0 ? (
            <div className="rounded-[28px] border border-[#e6dfd4] bg-white p-10 text-center shadow-[0_10px_30px_-20px_rgba(0,0,0,0.12)]">
              <Heart className="mx-auto h-11 w-11 text-[#777]" />

              <h2 className={`${headingFont} mt-5 text-[34px] leading-none text-[#111]`}>
                No liked artworks yet
              </h2>

              <p className={`${bodyFont} mx-auto mt-3 max-w-md text-[14px] leading-6 text-[#6f6a63]`}>
                Tap the heart on Curator Picks or gallery cards and they will appear here.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/"
                  className={`${bodyFont} rounded-full bg-black px-7 py-2.5 text-[13px] text-white hover:bg-black/90`}
                >
                  Browse home
                </Link>

                <Link
                  to="/explore"
                  className={`${bodyFont} rounded-full border border-[#d8d2c8] bg-white px-7 py-2.5 text-[13px] text-[#111] hover:bg-[#f7f4ee]`}
                >
                  Explore art
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
              {likedItems.map((item) => (
                <article key={item.id} className="group">
                  <div className="relative mb-3 h-[235px] overflow-hidden rounded-[20px] bg-[#ede8df] shadow-sm">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 hover:cursor-pointer"
                    />

                    <span className={`${bodyFont} absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-[10px] text-white`}>
                      {item.source}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className={`${headingFont} truncate text-[21px] leading-none text-[#111]`}>
                        {item.title}
                      </h3>

                      <p className={`${bodyFont} mt-1 truncate text-[12px] text-[#7b756d]`}>
                        {item.artist}
                      </p>

                      <p className={`${bodyFont} mt-1 text-[13px] font-semibold text-[#111]`}>
                        {item.price}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeLike(item.id)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d8d2c8] bg-white text-[#111] transition hover:bg-[#f7f4ee]"
                      aria-label="Remove liked artwork"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="mt-3">
                    {item.href ? (
                      <Link
                        to={item.href}
                        className={`${bodyFont} inline-flex h-9 items-center rounded-full bg-black px-5 text-[12px] text-white hover:bg-black/90`}
                      >
                        View artwork
                      </Link>
                    ) : (
                      <span className={`${bodyFont} inline-flex h-9 items-center rounded-full border border-[#d8d2c8] px-5 text-[12px] text-[#6f6a63]`}>
                        Gallery item
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Liked;