import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import explore1 from "@/assets/explore_1.png";
import explore2 from "@/assets/explore_2.png";
import explore3 from "@/assets/explore_3.png";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const artists = [
  {
    id: "1",
    name: "Ayesha Khan",
    image: explore1,
    specialty: "Abstract Expressionism",
    intro:
      "Blending layered textures and atmospheric tones into emotionally driven contemporary artworks.",
    artworks: 24,
  },
  {
    id: "2",
    name: "Omar Rashid",
    image: explore2,
    specialty: "Modern Minimalism",
    intro:
      "Focused on bold contrasts, organic movement, and refined contemporary compositions.",
    artworks: 18,
  },
  {
    id: "3",
    name: "Nida Rehman",
    image: explore3,
    specialty: "Portrait & Mixed Media",
    intro:
      "Exploring human emotion through cinematic portraiture and expressive visual storytelling.",
    artworks: 31,
  },
  {
    id: "4",
    name: "Hamza Ali",
    image: explore2,
    specialty: "Conceptual Art",
    intro:
      "Creating immersive visual narratives inspired by silence, memory, and urban culture.",
    artworks: 15,
  },
  {
    id: "5",
    name: "Sophia Laurent",
    image: explore1,
    specialty: "Fine Art Textures",
    intro:
      "Contemporary artist known for rich surfaces, layered pigments, and timeless palettes.",
    artworks: 28,
  },
  {
    id: "6",
    name: "Danish Noor",
    image: explore3,
    specialty: "Dark Aesthetic",
    intro:
      "Crafting moody and atmospheric pieces with dramatic light and emotional intensity.",
    artworks: 21,
  },
];

const Artists = () => {
  return (
    <div className="min-h-screen bg-white text-[#1d1d1d]">
      <Navbar />

      <main className="bg-white pt-24 pb-12">
        <div className="mx-auto max-w-[1120px] px-4 md:px-6">
          <div className="mb-7">
            <p className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}>
              Featured Creators
            </p>

            <h1 className={`${headingFont} mt-2 text-[52px] leading-none text-[#111]`}>
              Artists
            </h1>

            <p className={`${bodyFont} mt-3 max-w-xl text-[14px] leading-5 text-[#6f6a63]`}>
              Meet the creators behind the curated collection and discover their signature visual language.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {artists.map((artist) => (
              <Link
                key={artist.id}
                to={`/artist/${artist.id}`}
                className="group"
              >
                <div className="overflow-hidden rounded-[22px] border border-[#ece6dc] bg-white shadow-[0_8px_24px_-18px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-[255px] overflow-hidden">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                    <span
                      className={`${bodyFont} absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[9px] uppercase tracking-[0.15em] text-black`}
                    >
                      Featured Artist
                    </span>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h2 className={`${headingFont} text-[28px] leading-none text-white`}>
                        {artist.name}
                      </h2>

                      <p
                        className={`${bodyFont} mt-1.5 text-[11px] uppercase tracking-[0.18em] text-white/75`}
                      >
                        {artist.specialty}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4">
                    <p
                      className={`${bodyFont} line-clamp-2 text-[12px] leading-5 text-[#6f6a63]`}
                    >
                      {artist.intro}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p
                          className={`${bodyFont} text-[10px] uppercase tracking-[0.18em] text-[#8b857d]`}
                        >
                          Artworks
                        </p>

                        <p
                          className={`${headingFont} mt-1 text-[24px] leading-none text-[#111]`}
                        >
                          {artist.artworks}
                        </p>
                      </div>

                      <span
                        className={`${bodyFont} inline-flex h-9 items-center rounded-full bg-black px-4 text-[11px] text-white transition group-hover:bg-[#222]`}
                      >
                        View Profile
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Artists;