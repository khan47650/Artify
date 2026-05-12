import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Sparkles } from "lucide-react";
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
    location: "Lahore, Pakistan",
    artworks: 24,
    collectors: 186,
    intro:
      "Ayesha Khan creates atmospheric abstract works using layered pigments, textured surfaces, and emotionally charged compositions.",
    bio:
      "Her practice explores memory, movement, silence, and the tension between softness and intensity.",
  },
  {
    id: "2",
    name: "Omar Rashid",
    image: explore2,
    specialty: "Modern Minimalism",
    location: "Karachi, Pakistan",
    artworks: 18,
    collectors: 142,
    intro:
      "Omar focuses on refined abstraction, organic movement, and balanced contemporary compositions.",
    bio:
      "His work brings together clean structure with expressive surfaces, making each piece suitable for calm modern interiors.",
  },
  {
    id: "3",
    name: "Nida Rehman",
    image: explore3,
    specialty: "Portrait & Mixed Media",
    location: "Islamabad, Pakistan",
    artworks: 31,
    collectors: 214,
    intro:
      "Nida explores human emotion through cinematic portraiture and expressive mixed-media details.",
    bio:
      "Her portraits feel intimate and mysterious, often combining shadow, texture, and symbolic details.",
  },
];

const artworks = [
  {
    id: "art-1",
    title: "Echoes of Blue",
    image: explore1,
    medium: "Acrylic on Linen",
    dimensions: "60 × 60 cm",
    price: "$980",
  },
  {
    id: "art-2",
    title: "Silent Ember",
    image: explore2,
    medium: "Mixed Media",
    dimensions: "30 × 40 in",
    price: "$1,800",
  },
  {
    id: "art-3",
    title: "Fragments of Light",
    image: explore3,
    medium: "Oil on Canvas",
    dimensions: "24 × 36 in",
    price: "$1,250",
  },
];

const ArtistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const artist = artists.find((item) => item.id === id) || artists[0];

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
            <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
              <div className="relative h-[490px] overflow-hidden">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <span
                  className={`${bodyFont} absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[9px] uppercase tracking-[0.16em] text-black`}
                >
                  Featured Artist
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h1 className={`${headingFont} text-[42px] leading-none text-white`}>
                    {artist.name}
                  </h1>

                  <p
                    className={`${bodyFont} mt-2 text-[11px] uppercase tracking-[0.2em] text-white/80`}
                  >
                    {artist.specialty}
                  </p>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`${bodyFont} rounded-full bg-black px-3 py-1 text-[9px] uppercase tracking-[0.16em] text-white`}
                  >
                    {artist.location}
                  </span>

                  <span
                    className={`${bodyFont} rounded-full border border-[#d8d2c8] px-3 py-1 text-[9px] uppercase tracking-[0.16em] text-[#6f6a63]`}
                  >
                    Contemporary Artist
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 border-y border-[#eee8df] py-4">
                  <div>
                    <p className={`${headingFont} text-[30px] leading-none text-[#111]`}>
                      {artist.artworks}
                    </p>

                    <p
                      className={`${bodyFont} mt-1 text-[10px] uppercase tracking-[0.18em] text-[#8b857d]`}
                    >
                      Artworks
                    </p>
                  </div>

                  <div>
                    <p className={`${headingFont} text-[30px] leading-none text-[#111]`}>
                      {artist.collectors}
                    </p>

                    <p
                      className={`${bodyFont} mt-1 text-[10px] uppercase tracking-[0.18em] text-[#8b857d]`}
                    >
                      Collectors
                    </p>
                  </div>

                  <div>
                    <p className={`${headingFont} text-[30px] leading-none text-[#111]`}>
                      4.9
                    </p>

                    <p
                      className={`${bodyFont} mt-1 text-[10px] uppercase tracking-[0.18em] text-[#8b857d]`}
                    >
                      Rating
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#111]" />

                    <p
                      className={`${bodyFont} text-[10px] uppercase tracking-[0.22em] text-[#777]`}
                    >
                      Artist Introduction
                    </p>
                  </div>

                  <h2 className={`${headingFont} text-[24px] leading-[1.05] text-[#111]`}>
                    Visual stories shaped through texture, emotion, and atmosphere.
                  </h2>

                  <p
                    className={`${bodyFont} mt-4 text-[13px] leading-6 text-[#6f6a63]`}
                  >
                    {artist.intro}
                  </p>

                  <p
                    className={`${bodyFont} mt-3 text-[13px] leading-6 text-[#6f6a63]`}
                  >
                    {artist.bio}
                  </p>

                  <div className="mt-5">
                    <button
                      className={`${bodyFont} inline-flex h-10 items-center rounded-full border border-[#d8d2c8] px-6 text-[12px] text-[#111] hover:bg-[#f7f4ee]`}
                    >
                      View Collection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-9">
            <div className="mb-5">
              <p className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}>
                Artist Collection
              </p>

              <h2 className={`${headingFont} mt-2 text-[36px] leading-none text-[#111]`}>
                Works by {artist.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
              {artworks.map((art, index) => (
                <Link key={art.id} to={`/art/${art.id}`} className="group">
                  <div className="relative mb-3 h-[220px] overflow-hidden rounded-[20px] bg-[#ede8df]">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <button
                      type="button"
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90"
                    >
                      <Heart className="h-4 w-4 text-[#111]" />
                    </button>

                    {index === 0 && (
                      <span
                        className={`${bodyFont} absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-[9px] uppercase tracking-[0.16em] text-white`}
                      >
                        Original
                      </span>
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className={`${headingFont} text-[20px] leading-none text-[#111]`}>
                        {art.title}
                      </h3>

                      <p className={`${bodyFont} mt-1 text-[11px] text-[#7b756d]`}>
                        {art.medium} · {art.dimensions}
                      </p>
                    </div>

                    <p className={`${bodyFont} text-[12px] font-semibold text-[#111]`}>
                      {art.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtistProfile;