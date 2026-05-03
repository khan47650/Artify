import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import artist1 from "@/assets/artis_behind_1.png";
import artist2 from "@/assets/artist_behind_2.png";
import artist3 from "@/assets/artist_behind_3.png";

interface FeaturedArtist {
  id: string;
  image: string;
  name: string;
  bio: string;
  href: string;
}

const blockedArtistNames = new Set(["abc"]);
const abdulRafayAiImages = [
  "/WhatsApp%20Image%202026-04-12%20at%2012.55.17%20AM2.jpeg",
  "/6.jpeg",
  "/WhatsApp%20Image%202026-04-12%20at%2012.55.17%20AM1.jpeg",
];

const artists = [
  {
    image: artist1,
    bio: "My work is about restraint — what remains after movement fades.",
    name: "Jade Fadolaumi",
    category: "Abstract Artist",
  },
  {
    image: artist2,
    bio: "I paint faces as landscapes shaped by memory and silence.",
    name: "Yvadney Davis",
    category: "Portrait / Figurative Artist",
  },
  {
    image: artist3,
    bio: "I’m interested in texture as a form of emotional language.",
    name: "Jessica Brilli",
    category: "Experimental / Mixed Media",
  },
];

const ArtistsSection = () => {
  const { ref, isVisible } = useScrollAnimation();


  return (
    <section className="relative min-h-screen bg-white py-[90px] overflow-hidden" ref={ref}>
      <div className="mx-auto w-full max-w-[820px] px-6">
        <h2
          className={`font-ivy text-[34px] md:text-[40px] font-normal leading-none text-center text-black transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          The Artists Behind the Work
        </h2>

        <p
          className={`font-encode mx-auto mt-2 mb-8 max-w-[620px] text-center text-[11px] leading-[1.25] text-black/55 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          style={{ transitionDelay: isVisible ? "100ms" : "0ms" }}
        >
          Meet the voices shaping our collections. Each artist brings a distinct perspective, process, and way of seeing the world.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {artists.map((artist, i) => (
            <article
              key={artist.name}
              className={`overflow-hidden rounded-[10px] bg-[#F5F5F5] text-center transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: isVisible ? `${(i + 1) * 150}ms` : "0ms" }}
            >
              <div className="h-[235px] overflow-hidden rounded-t-[10px]">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.05]"
                />
              </div>

              <div className="px-5 py-4">
                <p className="font-ivy text-[14px] font-normal leading-[1.15] text-black">
                  {artist.bio}
                </p>

                <h3 className="font-ivy mt-3 text-[14px] font-semibold leading-tight text-black">
                  {artist.name}
                </h3>

                <p className="font-encode mt-1 text-[10px] leading-tight text-black/55">
                  {artist.category}
                </p>
              </div>
            </article>
          ))}
        </div>

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
