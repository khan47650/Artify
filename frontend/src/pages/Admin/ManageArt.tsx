import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

import art1 from "@/assets/explore_1.png";
import art2 from "@/assets/explore_2.png";
import art3 from "@/assets/explore_3.png";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const artworks = [
    {
        id: 1,
        title: "Echoes Of Blue",
        artist: "Sophia Laurent",
        image: art1,
        price: "$1,200",
    },

    {
        id: 2,
        title: "Silent Dreams",
        artist: "Ayesha Khan",
        image: art2,
        price: "$980",
    },

    {
        id: 3,
        title: "Golden Horizon",
        artist: "Omar Rashid",
        image: art3,
        price: "$2,400",
    },
];

const ManageArt = () => {
    const navigate = useNavigate();

    return (
        <section>
            {/* HEADER */}
            <div className="mb-7">
                <p
                    className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}
                >
                    Admin Dashboard
                </p>

                <h1
                    className={`${headingFont} mt-2 text-[36px] leading-none text-[#111] lg:text-[54px]`}
                >
                    Manage Art
                </h1>

                <p
                    className={`${bodyFont} mt-3 text-[13px] text-[#6f6a63]`}
                >
                    Edit, review and remove artworks from the marketplace.
                </p>
            </div>

            {/* GRID */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {artworks.map((art) => (
                    <div
                        key={art.id}
                        className="
                        group
                        overflow-hidden
                        rounded-[24px]
                        border
                        border-[#e8e1d7]
                        bg-white
                        transition-all
                        duration-500
                        hover:-translate-y-1
                        hover:border-[#d7cebf]
                        hover:shadow-[0_20px_45px_-20px_rgba(0,0,0,0.18)]
                        "
                    >
                        {/* IMAGE */}
                        <div
                            onClick={() => navigate(`/admin/art-detail/${art.id}`)}
                            className="cursor-pointer overflow-hidden"
                        >
                            <img
                                src={art.image}
                                alt={art.title}
                                className="
                                    h-[220px]
                                    w-full
                                    object-cover
                                    transition-transform
                                    duration-700
                                    group-hover:scale-[1.04]
                                    "
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="p-4">
                            <h2
                                className={`${headingFont} text-[24px] leading-none text-[#111]`}
                            >
                                {art.title}
                            </h2>

                            <p
                                className={`${bodyFont} mt-2 text-[12px] text-[#777]`}
                            >
                                {art.artist}
                            </p>

                            <p
                                className={`${bodyFont} mt-2 text-[13px] font-semibold text-[#111]`}
                            >
                                {art.price}
                            </p>

                            {/* BUTTONS */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                <button
                                    className={`${bodyFont} inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-[11px] text-white transition hover:bg-black/90`}
                                >
                                    <FaEdit />
                                    Edit
                                </button>

                                <button
                                    className={`${bodyFont} inline-flex items-center gap-2 rounded-full border border-[#d8d2c8] bg-[#f7f4ee] px-4 py-2 text-[11px] text-[#111] transition hover:bg-[#ece6dc]`}
                                >
                                    <FaTrash />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ManageArt;