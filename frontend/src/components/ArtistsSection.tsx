import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import api from "@/lib/api";

const ArtistsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTopArtists = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/users/sellers");

      const topArtists = (data.sellers || [])
        .filter((artist: any) => artist.accountStatus !== "freeze")
        .sort((a: any, b: any) => Number(b.totalSales || 0) - Number(a.totalSales || 0))
        .slice(0, 3);

      setArtists(topArtists);
    } catch (error) {
      console.log(error);
      setArtists([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopArtists();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-white py-[90px]"
    >
      <div className="mx-auto w-full max-w-[1240px] px-10">
        <h2
          className={`font-ivy text-center text-[34px] font-normal leading-none text-black transition-all duration-700 md:text-[40px] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
        >
          The Artists Behind the Work
        </h2>

        <p
          className={`font-encode mx-auto mt-2 mb-8 max-w-[620px] text-center text-[11px] leading-[1.25] text-black/55 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          style={{ transitionDelay: isVisible ? "100ms" : "0ms" }}
        >
          Meet top-selling creators shaping Artify through original collections,
          expressive visual language, and meaningful artistic stories.
        </p>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-[10px] bg-[#F5F5F5]"
              >
                <div className="h-[270px] bg-[#e5e5e5]" />
                <div className="px-5 py-4">
                  <div className="mx-auto h-4 w-[80%] rounded bg-[#e5e5e5]" />
                  <div className="mx-auto mt-3 h-5 w-[45%] rounded bg-[#e5e5e5]" />
                  <div className="mx-auto mt-2 h-3 w-[35%] rounded bg-[#e5e5e5]" />
                </div>
              </div>
            ))}
          </div>
        ) : artists.length === 0 ? (
          <div
            className={`rounded-[18px] border border-black/10 bg-[#F5F5F5] px-6 py-16 text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
              <FaUserCircle className="text-[28px]" />
            </div>

            <h3 className="font-ivy mt-5 text-[34px] font-normal leading-none text-black">
              Artists Coming Soon
            </h3>

            <p className="font-encode mx-auto mt-3 max-w-[520px] text-[13px] leading-6 text-black/55">
              Once sellers publish approved artworks and start making sales,
              top artists will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {artists.map((artist, index) => (
              <Link
                key={artist._id}
                to={`/artist/${artist._id}`}
                className="group"
              >
                <article
                  className={`overflow-hidden rounded-[10px] bg-[#F5F5F5] text-center transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                    }`}
                  style={{
                    transitionDelay: isVisible ? `${(index + 1) * 150}ms` : "0ms",
                  }}
                >
                  <div className="flex h-[270px] items-center justify-center overflow-hidden rounded-t-[10px] bg-[#ece7df]">
                    {artist.artistPhoto ? (
                      <img
                        src={artist.artistPhoto}
                        alt={`${artist.firstName} ${artist.lastName}`}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                      />
                    ) : (
                      <FaUserCircle className="text-[115px] text-[#b8b2aa]" />
                    )}
                  </div>

                  <div className="px-5 py-4">
                    <p className="font-ivy line-clamp-2 text-[14px] font-normal leading-[1.15] text-black">
                      {artist.introduction ||
                        "Creating original artworks with a personal visual language and thoughtful artistic expression."}
                    </p>

                    <h3 className="font-ivy mt-3 text-[14px] font-semibold leading-tight text-black">
                      {artist.firstName} {artist.lastName}
                    </h3>

                    <p className="font-encode mt-1 text-[10px] leading-tight text-black/55">
                      {artist.totalSales || 0} Sales · {artist.totalArts || 0} Artworks
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-3 flex justify-center">
          <Link
            to="/artists"
            className="font-encode rounded-full bg-black px-7 py-3 text-[12px] font-semibold text-white transition-colors hover:bg-black/80"
          >
            Explore Artist Profiles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArtistsSection;