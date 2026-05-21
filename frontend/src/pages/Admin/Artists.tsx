import { useEffect, useState } from "react";
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

import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import ArtworkDialog from "@/components/ArtworkDialog";
import DeleteArtworkDialog from "@/components/DeleteArtworkDialog";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const Artists = () => {
    const { toast } = useToast();

    const [artists, setArtists] = useState<any[]>([]);
    const [collections, setCollections] = useState<any[]>([]);
    const [selectedArtist, setSelectedArtist] = useState<any>(null);

    const [loading, setLoading] = useState(true);
    const [collectionLoading, setCollectionLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState("");

    const [selectedArtwork, setSelectedArtwork] = useState<any>(null);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const fetchArtists = async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/users/sellers");
            setArtists(data.sellers || []);
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

    const fetchCollections = async (artist: any) => {
        try {
            setSelectedArtist(artist);
            setCollectionLoading(true);

            const { data } = await api.get(`/users/seller-artworks/${artist._id}`);
            setCollections(data.artworks || []);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to fetch collections",
                variant: "destructive",
            });
        } finally {
            setCollectionLoading(false);
        }
    };

    useEffect(() => {
        fetchArtists();
    }, []);

    const handleToggleStatus = async (artist: any) => {
        try {
            setActionLoading(artist._id);

            const nextStatus = artist.accountStatus === "freeze" ? "active" : "freeze";

            await api.put(`/users/seller-status/${artist._id}`, {
                accountStatus: nextStatus,
            });

            toast({
                title: "Success",
                description:
                    nextStatus === "freeze"
                        ? "Seller account frozen successfully"
                        : "Seller account unfrozen successfully",
            });

            fetchArtists();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Status update failed",
                variant: "destructive",
            });
        } finally {
            setActionLoading("");
        }
    };

    const handleUpdateArtwork = async (formData: any) => {
        try {
            setSaveLoading(true);

            await api.put(`/artworks/${selectedArtwork._id}`, formData);

            toast({
                title: "Success",
                description: "Artwork updated successfully",
            });

            setEditOpen(false);
            setSelectedArtwork(null);

            if (selectedArtist) fetchCollections(selectedArtist);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Artwork update failed",
                variant: "destructive",
            });
        } finally {
            setSaveLoading(false);
        }
    };

    const handleDeleteArtwork = async () => {
        try {
            setDeleteLoading(true);

            await api.delete(`/artworks/${selectedArtwork._id}`);

            toast({
                title: "Success",
                description: "Artwork deleted successfully",
            });

            setDeleteOpen(false);
            setSelectedArtwork(null);

            if (selectedArtist) fetchCollections(selectedArtist);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Artwork delete failed",
                variant: "destructive",
            });
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <>
            <section>
                {!selectedArtist ? (
                    <>
                        <div className="mb-6">
                            <p className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}>
                                Admin Dashboard
                            </p>

                            <h1 className={`${headingFont} mt-2 text-[34px] leading-none text-[#111] lg:text-[52px]`}>
                                Artists
                            </h1>

                            <p className={`${bodyFont} mt-3 text-[13px] text-[#6f6a63]`}>
                                Manage seller accounts and their collections.
                            </p>
                        </div>

                        {loading ? (
                            <div className="grid gap-4 xl:grid-cols-2">
                                {[1, 2, 3, 4].map((item) => (
                                    <div
                                        key={item}
                                        className="animate-pulse overflow-hidden rounded-[28px] border border-[#e6dfd4] bg-white"
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            <div className="h-[240px] bg-[#ececec] md:w-[260px]" />
                                            <div className="flex-1 p-5">
                                                <div className="h-8 w-[50%] rounded bg-[#ececec]" />
                                                <div className="mt-3 h-4 w-[45%] rounded bg-[#ececec]" />
                                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                                    {[1, 2, 3, 4].map((box) => (
                                                        <div key={box} className="h-[75px] rounded-[18px] bg-[#ececec]" />
                                                    ))}
                                                </div>
                                                <div className="mt-5 flex gap-3">
                                                    <div className="h-10 w-36 rounded-full bg-[#ececec]" />
                                                    <div className="h-10 w-28 rounded-full bg-[#ececec]" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : artists.length === 0 ? (
                            <div className="flex min-h-[240px] items-center justify-center rounded-[28px] border border-dashed border-[#d8d2c8] bg-white">
                                <h2 className={`${headingFont} text-[40px] text-[#111]`}>No Artists Found</h2>
                            </div>
                        ) : (
                            <div className="grid gap-4 xl:grid-cols-2">
                                {artists.map((artist) => {
                                    const frozen = artist.accountStatus === "freeze";

                                    return (
                                        <div
                                            key={artist._id}
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
                                                <div className="relative md:w-[260px]">
                                                    <img
                                                        src={artist.artistPhoto || "https://via.placeholder.com/400x400.png?text=Artist"}
                                                        alt={`${artist.firstName || ""} ${artist.lastName || ""}`}
                                                        className="
                                                            h-[240px]
                                                            w-full
                                                            object-cover
                                                            transition-transform
                                                            duration-700
                                                            group-hover:scale-105
                                                            "
                                                    />

                                                    <span className={`${bodyFont} absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-[10px] text-white`}>
                                                        Seller Account
                                                    </span>

                                                    {frozen && (
                                                        <span className={`${bodyFont} absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-[10px] text-white`}>
                                                            Frozen
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex flex-1 flex-col justify-between p-5">
                                                    <div>
                                                        <h2 className={`${headingFont} text-[30px] leading-none text-[#111]`}>
                                                            {artist.firstName} {artist.lastName}
                                                        </h2>

                                                        <p className={`${bodyFont} mt-2 text-[12px] text-[#777]`}>
                                                            {artist.email}
                                                        </p>

                                                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                                            <Info
                                                                icon={<FaMapMarkerAlt />}
                                                                label="Location"
                                                                value={`${artist.city || "N/A"}, ${artist.country || ""}`}
                                                            />

                                                            <Info
                                                                icon={<FaPalette />}
                                                                label="Arts"
                                                                value={String(artist.totalArts || 0)}
                                                            />

                                                            <Info
                                                                icon={<FaUserAlt />}
                                                                label="Joined"
                                                                value={new Date(artist.createdAt).toLocaleDateString("en-US", {
                                                                    month: "long",
                                                                    year: "numeric",
                                                                })}
                                                            />

                                                            <Info
                                                                icon={<FaPalette />}
                                                                label="Sales"
                                                                value={String(artist.totalSales || 0)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mt-5 flex flex-wrap gap-3">
                                                        <button
                                                            onClick={() => fetchCollections(artist)}
                                                            className={`${bodyFont} inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[12px] text-white transition hover:bg-black/90`}
                                                        >
                                                            <FaEye />
                                                            View Collections
                                                        </button>

                                                        <button
                                                            onClick={() => handleToggleStatus(artist)}
                                                            disabled={actionLoading === artist._id}
                                                            className={`${bodyFont} inline-flex items-center gap-2 rounded-full border border-[#d8d2c8] bg-[#f7f4ee] px-5 py-2.5 text-[12px] text-[#111] transition hover:bg-[#ece6dc] disabled:opacity-60`}
                                                        >
                                                            {frozen ? (
                                                                <>
                                                                    <FaLockOpen />
                                                                    {actionLoading === artist._id && artist.accountStatus === "freeze"
                                                                        ? "Unfreezing..."
                                                                        : "Unfreeze"}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <FaLock />
                                                                    {actionLoading === artist._id && artist.accountStatus === "active"
                                                                        ? "Freezing..."
                                                                        : "Freeze"}
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <button
                                    onClick={() => {
                                        setSelectedArtist(null);
                                        setCollections([]);
                                    }}
                                    className={`${bodyFont} mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8d2c8] bg-white px-5 py-2 text-[12px] text-[#111] hover:bg-[#f7f4ee]`}
                                >
                                    <FaArrowLeft />
                                    Back To Artists
                                </button>

                                <p className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}>
                                    Artist Collections
                                </p>

                                <h1 className={`${headingFont} mt-2 text-[38px] leading-none text-[#111]`}>
                                    {selectedArtist.firstName} {selectedArtist.lastName}
                                </h1>
                            </div>
                        </div>

                        {collectionLoading ? (
                            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="animate-pulse overflow-hidden rounded-[28px] border border-[#e6dfd4] bg-white">
                                        <div className="h-[260px] bg-[#ececec]" />
                                        <div className="p-5">
                                            <div className="h-8 w-[65%] rounded bg-[#ececec]" />
                                            <div className="mt-3 h-4 w-[30%] rounded bg-[#ececec]" />
                                            <div className="mt-5 flex gap-3">
                                                <div className="h-10 w-24 rounded-full bg-[#ececec]" />
                                                <div className="h-10 w-24 rounded-full bg-[#ececec]" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : collections.length === 0 ? (
                            <div className="flex min-h-[240px] items-center justify-center rounded-[28px] border border-dashed border-[#d8d2c8] bg-white">
                                <h2 className={`${headingFont} text-[40px] text-[#111]`}>No Artwork Found</h2>
                            </div>
                        ) : (
                            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                {collections.map((art) => (
                                    <div
                                        key={art._id}
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
                                                alt={art.name}
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
                                            <h2 className={`${headingFont} text-[28px] leading-none text-[#111]`}>
                                                {art.name}
                                            </h2>

                                            <p className={`${bodyFont} mt-2 text-[13px] text-[#777]`}>
                                                ${art.price}
                                            </p>

                                            <div className="mt-5 flex gap-3">
                                                <button
                                                    onClick={() => {
                                                        setSelectedArtwork(art);
                                                        setEditOpen(true);
                                                    }}
                                                    className={`${bodyFont} inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[12px] text-white transition hover:bg-black/90`}
                                                >
                                                    <FaEdit />
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setSelectedArtwork(art);
                                                        setDeleteOpen(true);
                                                    }}
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
                        )}
                    </>
                )}
            </section>

            <ArtworkDialog
                open={editOpen}
                artwork={selectedArtwork}
                loading={saveLoading}
                onClose={() => {
                    setEditOpen(false);
                    setSelectedArtwork(null);
                }}
                onSave={handleUpdateArtwork}
            />

            <DeleteArtworkDialog
                open={deleteOpen}
                loading={deleteLoading}
                onClose={() => {
                    setDeleteOpen(false);
                    setSelectedArtwork(null);
                }}
                onConfirm={handleDeleteArtwork}
            />
        </>
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
                <p className={`${bodyFont} text-[10px] uppercase tracking-[0.22em]`}>
                    {label}
                </p>
            </div>

            <h3 className={`${headingFont} mt-2 text-[22px] leading-none text-[#111]`}>
                {value}
            </h3>
        </div>
    );
};

export default Artists;