import { useState } from "react";
import {
    FaUserAlt,
    FaMapMarkerAlt,
    FaPalette,
    FaEye,
    FaLock,
    FaLockOpen,
    FaArrowLeft,
    FaEdit,
    FaTrash,
} from "react-icons/fa";

import artist1 from "@/assets/explore_1.png";
import artist2 from "@/assets/explore_2.png";
import artist3 from "@/assets/explore_3.png";

import art1 from "@/assets/explore_1.png";
import art2 from "@/assets/explore_2.png";
import art3 from "@/assets/explore_3.png";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const artists = [
    {
        id: 1,
        name: "Sophia Laurent",
        email: "sophia@example.com",
        location: "Paris, France",
        totalArts: 18,
        totalSales: "$4,200",
        joined: "12 Jan 2026",
        image: artist1,
        frozen: false,
    },

    {
        id: 2,
        name: "Omar Rashid",
        email: "omar@example.com",
        location: "Lahore, Pakistan",
        totalArts: 12,
        totalSales: "$2,900",
        joined: "04 Feb 2026",
        image: artist2,
        frozen: true,
    },

    {
        id: 3,
        name: "Ayesha Khan",
        email: "ayesha@example.com",
        location: "Dubai, UAE",
        totalArts: 26,
        totalSales: "$7,500",
        joined: "18 March 2026",
        image: artist3,
        frozen: false,
    },
];

const collections = [
    {
        id: 1,
        title: "Echoes Of Blue",
        image: art1,
        price: "$1,200",
    },

    {
        id: 2,
        title: "Silent Dreams",
        image: art2,
        price: "$980",
    },

    {
        id: 3,
        title: "Golden Horizon",
        image: art3,
        price: "$2,400",
    },
];

const Artists = () => {
    const [selectedArtist, setSelectedArtist] = useState<any>(null);

    return (
        <section>
            {!selectedArtist ? (
                <>
                    {/* HEADER */}
                    <div className="mb-6">
                        <p
                            className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}
                        >
                            Admin Dashboard
                        </p>

                        <h1
                            className={`${headingFont} mt-2 text-[34px] leading-none text-[#111] lg:text-[52px]`}
                        >
                            Artists
                        </h1>

                        <p
                            className={`${bodyFont} mt-3 text-[13px] text-[#6f6a63]`}
                        >
                            Manage seller accounts and their collections.
                        </p>
                    </div>

                    {/* GRID */}
                    <div className="grid gap-4 xl:grid-cols-2">
                        {artists.map((artist) => (
                            <div
                                key={artist.id}
                                className="
                  group
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-[#e6dfd4]
                  bg-white
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:shadow-[0_20px_50px_-18px_rgba(0,0,0,0.16)]
                "
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* IMAGE */}
                                    <div className="relative md:w-[260px]">
                                        <img
                                            src={artist.image}
                                            alt={artist.name}
                                            className="
                        h-[240px]
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                      "
                                        />

                                        <span
                                            className={`${bodyFont} absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-[10px] text-white`}
                                        >
                                            Seller Account
                                        </span>

                                        {artist.frozen && (
                                            <span
                                                className={`${bodyFont} absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-[10px] text-white`}
                                            >
                                                Frozen
                                            </span>
                                        )}
                                    </div>

                                    {/* CONTENT */}
                                    <div className="flex flex-1 flex-col justify-between p-5">
                                        <div>
                                            <h2
                                                className={`${headingFont} text-[30px] leading-none text-[#111]`}
                                            >
                                                {artist.name}
                                            </h2>

                                            <p
                                                className={`${bodyFont} mt-2 text-[12px] text-[#777]`}
                                            >
                                                {artist.email}
                                            </p>

                                            {/* INFO */}
                                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                                <Info
                                                    icon={<FaMapMarkerAlt />}
                                                    label="Location"
                                                    value={artist.location}
                                                />

                                                <Info
                                                    icon={<FaPalette />}
                                                    label="Arts"
                                                    value={String(artist.totalArts)}
                                                />

                                                <Info
                                                    icon={<FaUserAlt />}
                                                    label="Joined"
                                                    value={artist.joined}
                                                />

                                                <Info
                                                    icon={<FaPalette />}
                                                    label="Sales"
                                                    value={artist.totalSales}
                                                />
                                            </div>
                                        </div>

                                        {/* BUTTONS */}
                                        <div className="mt-5 flex flex-wrap gap-3">
                                            <button
                                                onClick={() => setSelectedArtist(artist)}
                                                className={`${bodyFont} inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[12px] text-white transition hover:bg-black/90`}
                                            >
                                                <FaEye />
                                                View Collections
                                            </button>

                                            <button
                                                className={`${bodyFont} inline-flex items-center gap-2 rounded-full border border-[#d8d2c8] bg-[#f7f4ee] px-5 py-2.5 text-[12px] text-[#111] transition hover:bg-[#ece6dc]`}
                                            >
                                                {artist.frozen ? (
                                                    <>
                                                        <FaLockOpen />
                                                        Unfreeze
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaLock />
                                                        Freeze
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    {/* COLLECTION HEADER */}
                    <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <button
                                onClick={() => setSelectedArtist(null)}
                                className={`${bodyFont} mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8d2c8] bg-white px-5 py-2 text-[12px] text-[#111] hover:bg-[#f7f4ee]`}
                            >
                                <FaArrowLeft />
                                Back To Artists
                            </button>

                            <p
                                className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}
                            >
                                Artist Collections
                            </p>

                            <h1
                                className={`${headingFont} mt-2 text-[38px] leading-none text-[#111]`}
                            >
                                {selectedArtist.name}
                            </h1>
                        </div>
                    </div>

                    {/* COLLECTIONS */}
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {collections.map((art) => (
                            <div
                                key={art.id}
                                className="
                  group
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-[#e6dfd4]
                  bg-white
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:shadow-[0_20px_50px_-18px_rgba(0,0,0,0.16)]
                "
                            >
                                <div className="overflow-hidden">
                                    <img
                                        src={art.image}
                                        alt={art.title}
                                        className="
                      h-[260px]
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                                    />
                                </div>

                                <div className="p-5">
                                    <h2
                                        className={`${headingFont} text-[28px] leading-none text-[#111]`}
                                    >
                                        {art.title}
                                    </h2>

                                    <p
                                        className={`${bodyFont} mt-2 text-[13px] text-[#777]`}
                                    >
                                        {art.price}
                                    </p>

                                    <div className="mt-5 flex gap-3">
                                        <button
                                            className={`${bodyFont} inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[12px] text-white transition hover:bg-black/90`}
                                        >
                                            <FaEdit />
                                            Edit
                                        </button>

                                        <button
                                            className={`${bodyFont} inline-flex items-center gap-2 rounded-full border border-[#d8d2c8] bg-[#f7f4ee] px-5 py-2.5 text-[12px] text-[#111] transition hover:bg-[#ece6dc]`}
                                        >
                                            <FaTrash />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

const Info = ({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) => {
    return (
        <div className="rounded-[18px] border border-[#ece6dc] bg-[#faf8f4] p-3">
            <div className="flex items-center gap-2 text-[#777]">
                {icon}

                <p
                    className={`${bodyFont} text-[10px] uppercase tracking-[0.22em]`}
                >
                    {label}
                </p>
            </div>

            <h3
                className={`${headingFont} mt-2 text-[22px] leading-none text-[#111]`}
            >
                {value}
            </h3>
        </div>
    );
};

export default Artists;