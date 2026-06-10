import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const ArtistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();

  const [artist, setArtist] = useState<any>(null);
  const [artworks, setArtworks] = useState<any[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState("");

  const fetchArtistData = async () => {
    try {
      setLoading(true);

      const sellerRes = await api.get(`/users/seller/${id}`);
      setArtist(sellerRes.data.seller || null);

      const artworksRes = await api.get(`/users/seller-artworks/${id}`);

      const approvedArts = (artworksRes.data.artworks || []).filter(
        (art: any) =>
          art.approvedStatus === "approved" &&
          art.sellingStatus !== "sold"
      );

      setArtworks(approvedArts);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch artist profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchLiked = async () => {
    if (!user?.id) return;

    try {
      const { data } = await api.get(`/liked-artworks/${user.id}`);

      setLikedIds(
        (data.liked || [])
          .map((item: any) => item.artworkId?._id)
          .filter(Boolean)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArtistData();
  }, [id]);

  useEffect(() => {
    fetchLiked();
  }, [user]);

  const handleToggleLike = async (artworkId: string) => {
    if (!user?.id) {
      return toast({
        title: "Login Required",
        description: "Please login to like artworks.",
        variant: "destructive",
      });
    }

    try {
      setLikeLoading(artworkId);

      const { data } = await api.post("/liked-artworks/toggle", {
        userId: user.id,
        artworkId,
      });

      if (data.liked) {
        setLikedIds((prev) => [...prev, artworkId]);
      } else {
        setLikedIds((prev) => prev.filter((id) => id !== artworkId));
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Like action failed",
        variant: "destructive",
      });
    } finally {
      setLikeLoading("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-white text-[#1d1d1d]">
        <Navbar />
        <main className="w-full max-w-[100vw] overflow-x-hidden bg-white pt-24 pb-12">
          <div className="mx-auto w-full max-w-[1120px] overflow-hidden px-4 md:px-6">
            <div className="h-[520px] animate-pulse rounded-[26px] bg-[#ececec]" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-white text-[#1d1d1d]">
        <Navbar />
        <main className="bg-white pt-24 pb-12">
          <div className="mx-auto max-w-[1120px] px-4 md:px-6">
            <h1 className={`${headingFont} text-[46px] leading-none text-[#111]`}>
              Artist Not Found
            </h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#1d1d1d]">
      <Navbar />

      <main className="bg-white pt-24 pb-12">
        <div className="mx-auto max-w-[1120px] px-4 md:px-6">
          <Link
            to="/artists"
            className={`${bodyFont} mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8d2c8] bg-white px-4 py-2 text-[11px] text-[#111] hover:bg-[#f7f4ee]`}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Artists
          </Link>

          <section className="overflow-hidden rounded-[26px] border border-[#e6dfd4] bg-white shadow-[0_10px_28px_-22px_rgba(0,0,0,0.16)]">
            <div className="grid min-w-0 lg:grid-cols-[0.88fr_1.12fr]">
              <div className="relative flex h-[320px] items-center justify-center overflow-hidden bg-[#f7f4ee] sm:h-[400px] lg:h-[490px]">
                {artist.artistPhoto ? (
                  <img
                    src={artist.artistPhoto}
                    alt={`${artist.firstName} ${artist.lastName}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-[150px] text-[#b8b2aa]" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <span className={`${bodyFont} absolute left-3 top-3 rounded-full bg-white/95 px-2 py-1 text-[8px] uppercase tracking-[0.12em] text-black sm:left-4 sm:top-4 sm:px-3 sm:text-[9px]`}>
                  Featured Artist
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h1 className={`${headingFont} break-words text-[30px] leading-none text-white sm:text-[36px] lg:text-[42px]`}>
                    {artist.firstName} {artist.lastName}
                  </h1>


                </div>
              </div>

              <div className="min-w-0 p-4 sm:p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`${bodyFont} rounded-full bg-black px-3 py-1 text-[9px] uppercase tracking-[0.16em] text-white`}>
                    {artist.city || "Unknown City"}, {artist.country || "Unknown Country"}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 border-y border-[#eee8df] py-4">
                  <div>
                    <p className={`${headingFont} text-[30px] leading-none text-[#111]`}>
                      {artist.totalArts || 0}
                    </p>

                    <p className={`${bodyFont} mt-1 text-[10px] uppercase tracking-[0.18em] text-[#8b857d]`}>
                      Artworks
                    </p>
                  </div>

                  <div>
                    <p className={`${headingFont} text-[30px] leading-none text-[#111]`}>
                      {artist.totalSales || 0}
                    </p>

                    <p className={`${bodyFont} mt-1 text-[10px] uppercase tracking-[0.18em] text-[#8b857d]`}>
                      Sales
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#111]" />

                    <p className={`${bodyFont} text-[10px] uppercase tracking-[0.22em] text-[#777]`}>
                      Artist Introduction
                    </p>
                  </div>

                  <h2
                    className={`${headingFont} break-words text-[24px] leading-[1.25] text-[#111] sm:text-[30px]`}
                  >
                    {artist.introduction ||
                      "This artist has not added an introduction yet."}
                  </h2>

                  <div className="mt-6">
                    <a
                      href="#artist-collection"
                      className={`${bodyFont} inline-flex h-10 items-center rounded-full border border-[#d8d2c8] px-6 text-[12px] text-[#111] transition hover:bg-[#f7f4ee]`}
                    >
                      View Collection
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="artist-collection" className="mt-9">
            <div className="mb-5">
              <p className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}>
                Artist Collection
              </p>

              <h2 className={`${headingFont} mt-2 break-words text-[30px] leading-none text-[#111] sm:text-[36px]`}>
                Works by {artist.firstName} {artist.lastName}
              </h2>
            </div>

            {artworks.length === 0 ? (
              <div className="rounded-[24px] border border-[#e6dfd4] bg-white py-16 text-center">
                <h3 className={`${headingFont} text-[34px] leading-none text-[#111]`}>
                  No Artwork Found
                </h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
                {artworks.map((art) => (
                  <Link key={art._id} to={`/art/${art._id}`} className="group">
                    <div className="relative mb-3 h-[220px] overflow-hidden rounded-[20px] bg-[#ede8df]">
                      <img
                        src={art.image}
                        alt={art.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {user?.role === "buyer" && (
                        <button
                          type="button"
                          disabled={likeLoading === art._id}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleToggleLike(art._id);
                          }}
                          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 disabled:opacity-60"
                        >
                          <Heart
                            className={`h-4 w-4 ${likedIds.includes(art._id)
                              ? "fill-destructive text-destructive"
                              : "text-[#111]"
                              }`}
                          />
                        </button>
                      )}

                      <span className={`${bodyFont} absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-[9px] uppercase tracking-[0.16em] text-white`}>
                        Original
                      </span>
                    </div>

                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className={`${headingFont} break-words text-[18px] leading-none text-[#111] sm:text-[20px]`}>
                          {art.name}
                        </h3>

                        <p className={`${bodyFont} mt-1 text-[11px] text-[#7b756d]`}>
                          {art.category}
                        </p>
                      </div>

                      <p className={`${bodyFont} shrink-0 text-[12px] font-semibold text-[#111]`}>
                        ${Number(art.price).toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtistProfile;