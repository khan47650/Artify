import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import art1 from "@/assets/explore_1.png";
import art2 from "@/assets/explore_2.png";
import art3 from "@/assets/explore_3.png";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const artworks = [
  {
    id: 1,
    title: "Echoes Of Blue",
    price: "$420",
    category: "Abstract",
    image: art1,
  },

  {
    id: 2,
    title: "Silent Nature",
    price: "$590",
    category: "Landscape",
    image: art2,
  },

  {
    id: 3,
    title: "Golden Shadows",
    price: "$760",
    category: "Modern",
    image: art3,
  },
];

const ArtistCollections = () => {
  return (
    <section>
      {/* HEADER */}
      <div className="mb-8">
        <p
          className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}
        >
          Artist Collections
        </p>

        <h1
          className={`${headingFont} mt-2 text-[40px] leading-none text-[#111] lg:text-[58px]`}
        >
          Sophia Laurent Arts
        </h1>

        <p
          className={`${bodyFont} mt-3 text-[14px] text-[#6f6a63]`}
        >
          Manage artist artworks, edits and removals.
        </p>
      </div>

      {/* ARTS */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {artworks.map((art) => (
          <div
            key={art.id}
            className="
              group
              overflow-hidden
              rounded-[30px]
              border
              border-[#e6dfd4]
              bg-white
              transition-all
              duration-500
              hover:-translate-y-1.5
              hover:shadow-[0_25px_60px_-20px_rgba(0,0,0,0.18)]
            "
          >
            {/* IMAGE */}
            <div className="relative overflow-hidden">
              <img
                src={art.image}
                alt={art.title}
                className="
                  h-[320px]
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />

              <span
                className={`${bodyFont} absolute left-5 top-5 rounded-full bg-black px-4 py-1.5 text-[11px] text-white`}
              >
                {art.category}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-5">
              <h2
                className={`${headingFont} text-[32px] leading-none text-[#111]`}
              >
                {art.title}
              </h2>

              <p
                className={`${bodyFont} mt-3 text-[14px] text-[#777]`}
              >
                Premium Artwork Collection
              </p>

              <div className="mt-5 flex items-center justify-between">
                <h3
                  className={`${headingFont} text-[28px] leading-none text-[#111]`}
                >
                  {art.price}
                </h3>

                <div className="flex items-center gap-2">
                  <button
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition hover:bg-black/90"
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d8d2c8] bg-white text-[#111] transition hover:bg-[#f7f4ee]"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtistCollections;