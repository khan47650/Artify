import {
    FaEdit,
    FaTrash,
    FaPlus,
    FaPalette,
} from "react-icons/fa";

import art1 from "@/assets/explore_1.png";
import art2 from "@/assets/explore_2.png";
import art3 from "@/assets/explore_3.png";

import { useAuth } from "@/contexts/AuthContext";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const artworks = [
    {
        id: 1,
        title: "Echoes Of Blue",
        price: "$420",
        category: "Abstract",
        image: art1,
        status: "Pending",
    },

    {
        id: 2,
        title: "Silent Nature",
        price: "$590",
        category: "Landscape",
        image: art2,
        status: "Sold",
    },

    {
        id: 3,
        title: "Golden Shadows",
        price: "$760",
        category: "Modern",
        image: art3,
        status: "Pending",
    },
];

const MyArtwork = () => {
    const { user } = useAuth();

    return (
        <section className="w-full overflow-hidden">
            {/* HEADER */}
            <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p
                        className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}
                    >
                        Seller Dashboard
                    </p>

                    <h1
                        className={`${headingFont} mt-2 text-[36px] leading-none text-[#111] sm:text-[46px] lg:text-[58px]`}
                    >
                        My Artwork
                    </h1>

                    <p
                        className={`${bodyFont} mt-3 max-w-[620px] text-[14px] leading-6 text-[#6f6a63]`}
                    >
                        Manage your uploaded artworks, pricing and collections on Artify
                        marketplace.
                    </p>
                </div>

                {/* ADD BUTTON */}
                <button
                    className={`
            ${bodyFont}
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-full
            bg-black
            px-6
            py-3
            text-[13px]
            text-white
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:bg-black/90
            hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.45)]
          `}
                >
                    <FaPlus />
                    Add New Artwork
                </button>
            </div>

            {/* STATS */}
            {/* STATS */}
            <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                    ["Total Arts", "12"],
                    ["Not Verified", "03"],
                    ["Pending", "02"],
                    ["Sold", "02"],
                ].map(([label, value]) => (
                    <div
                        key={label}
                        className="
        rounded-[22px]
        border
        border-[#ebe4d9]
        bg-gradient-to-br
        from-white
        to-[#f8f5ef]
        p-4
        shadow-[0_10px_30px_-22px_rgba(0,0,0,0.18)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_18px_45px_-22px_rgba(0,0,0,0.22)]
      "
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p
                                    className={`${bodyFont} text-[10px] uppercase tracking-[0.24em] text-[#8a847c]`}
                                >
                                    {label}
                                </p>

                                <h3
                                    className={`${headingFont} mt-3 text-[34px] leading-none text-[#111]`}
                                >
                                    {value}
                                </h3>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white shadow-lg">
                                <FaPalette className="text-[14px]" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ARTWORK GRID */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {artworks.map((art) => (
                    <div
                        key={art.id}
                        className="
              group
              overflow-hidden
              rounded-[26px]
              border
              border-[#ebe4d9]
              bg-white/90
              backdrop-blur-xl
              shadow-[0_14px_35px_-24px_rgba(0,0,0,0.18)]
              transition-all
              duration-500
              hover:-translate-y-1.5
              hover:shadow-[0_22px_50px_-22px_rgba(0,0,0,0.22)]
            "
                    >
                        {/* IMAGE */}
                        <div className="relative overflow-hidden">
                            <img
                                src={art.image}
                                alt={art.title}
                                className="
                  h-[220px]
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
                            />

                            {/* CATEGORY */}
                            <span
                                className={`${bodyFont} absolute left-4 top-4 rounded-full bg-black/90 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-md`}
                            >
                                {art.category}
                            </span>

                            {/* STATUS */}
                            <span
                                className={`
                  ${bodyFont}
                  absolute
                  right-4
                  top-4
                  rounded-full
                  px-3
                  py-1
                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                  backdrop-blur-md
                  ${art.status === "Pending"
                                        ? "bg-[#fff1d8] text-[#bb7c00]"
                                        : "bg-[#ece8ff] text-[#5e4ed6]"
                                    }
                `}
                            >
                                {art.status}
                            </span>
                        </div>

                        {/* CONTENT */}
                        <div className="p-4">
                            <div className="min-w-0">
                                <h2
                                    className={`${headingFont} truncate text-[26px] leading-none text-[#111]`}
                                >
                                    {art.title}
                                </h2>

                                <p
                                    className={`${bodyFont} mt-2 line-clamp-2 text-[13px] leading-5 text-[#777]`}
                                >
                                    Uploaded by {user?.firstName || "Artist"}{" "}
                                    {user?.lastName || ""}
                                </p>
                            </div>

                            {/* FOOTER */}
                            <div className="mt-5 flex items-center justify-between">
                                <div>
                                    <p
                                        className={`${bodyFont} text-[10px] uppercase tracking-[0.18em] text-[#8a847c]`}
                                    >
                                        Price
                                    </p>

                                    <h3
                                        className={`${headingFont} mt-1 text-[24px] leading-none text-[#111]`}
                                    >
                                        {art.price}
                                    </h3>
                                </div>

                                {/* ACTIONS */}
                                <div className="flex items-center gap-2">
                                    {/* EDIT */}
                                    <button
                                        className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-black
                      text-white
                      transition-all
                      duration-300
                      hover:scale-105
                      hover:bg-black/90
                    "
                                    >
                                        <FaEdit className="text-[13px]" />
                                    </button>

                                    {/* DELETE */}
                                    <button
                                        className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#ddd6ca]
                      bg-white
                      text-[#111]
                      transition-all
                      duration-300
                      hover:scale-105
                      hover:bg-[#f7f4ee]
                    "
                                    >
                                        <FaTrash className="text-[13px]" />
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

export default MyArtwork;