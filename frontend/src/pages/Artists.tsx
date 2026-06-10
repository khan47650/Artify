import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaUserCircle } from "react-icons/fa";

import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const Artists = () => {
  const { toast } = useToast();

  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArtists = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/users/sellers");

      const activeSellers = (data.sellers || []).filter(
        (seller: any) => seller.accountStatus !== "freeze"
      );

      setArtists(activeSellers);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch artists",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-white text-[#1d1d1d]">
      <Navbar />
      <main className="w-full max-w-[100vw] overflow-x-hidden bg-white pt-24 pb-12">
        <div className="mx-auto w-full max-w-[1120px] overflow-hidden px-4 md:px-6">
          <div className="mb-7">
            <p className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}>
              Featured Creators
            </p>

            <h1 className={`${headingFont} mt-2 break-words text-[38px] leading-none text-[#111] sm:text-[44px] md:text-[52px]`}>
              Artists
            </h1>

            <p className={`${bodyFont} mt-3 max-w-xl text-[14px] leading-5 text-[#6f6a63]`}>
              Meet the creators behind the curated collection and discover their signature visual language.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="animate-pulse overflow-hidden rounded-[22px] border border-[#ece6dc] bg-white">
                  <div className="h-[255px] bg-[#ececec]" />
                  <div className="p-4">
                    <div className="h-5 w-[70%] rounded bg-[#ececec]" />
                    <div className="mt-3 h-4 w-full rounded bg-[#ececec]" />
                    <div className="mt-4 h-8 w-[40%] rounded bg-[#ececec]" />
                  </div>
                </div>
              ))}
            </div>
          ) : artists.length === 0 ? (
            <div className="rounded-[28px] border border-[#ece6dc] bg-white py-20 text-center">
              <h2 className={`${headingFont} break-words text-[30px] leading-none text-[#111] sm:text-[38px]`}>
                No Artists Found
              </h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
              {artists.map((artist) => (
                <Link
                  key={artist._id}
                  to={`/artist/${artist._id}`}
                  className="group"
                >
                  <div className="overflow-hidden rounded-[22px] border border-[#ece6dc] bg-white shadow-[0_8px_24px_-18px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-1">
                    <div className="relative flex h-[220px] items-center justify-center overflow-hidden bg-[#f7f4ee] sm:h-[255px]">
                      {artist.artistPhoto ? (
                        <img
                          src={artist.artistPhoto}
                          alt={`${artist.firstName} ${artist.lastName}`}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <FaUserCircle className="text-[110px] text-[#b8b2aa]" />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                      <span className={`${bodyFont} absolute left-3 top-3 rounded-full bg-white/95 px-2 py-1 text-[8px] uppercase tracking-[0.12em] text-black sm:left-4 sm:top-4 sm:px-3 sm:text-[9px]`}>
                        Featured Artist
                      </span>

                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h2 className={`${headingFont} break-words text-[24px] leading-none text-white sm:text-[28px]`}>
                          {artist.firstName} {artist.lastName}
                        </h2>

                        <p className={`${bodyFont} mt-1.5 text-[11px] uppercase tracking-[0.18em] text-white/75`}>
                          Contemporary Artist
                        </p>
                      </div>
                    </div>

                    <div className="bg-white p-4">
                      <p className={`${bodyFont} line-clamp-2 text-[12px] leading-5 text-[#6f6a63]`}>
                        {artist.introduction || "No introduction added yet."}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className={`${bodyFont} text-[10px] uppercase tracking-[0.18em] text-[#8b857d]`}>
                            Artworks
                          </p>

                          <p className={`${headingFont} mt-1 text-[24px] leading-none text-[#111]`}>
                            {artist.totalArts || 0}
                          </p>
                        </div>

                        <span className={`${bodyFont} inline-flex h-9 shrink-0 items-center rounded-full bg-black px-4 text-[11px] text-white transition group-hover:bg-[#222]`}>
                          View Profile
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Artists;