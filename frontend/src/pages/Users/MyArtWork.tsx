import { useEffect, useState } from "react";
import {
    FaEdit,
    FaTrash,
    FaPlus,
    FaPalette,
} from "react-icons/fa";

import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

import ArtworkDialog from "@/components/ArtworkDialog";
import DeleteArtworkDialog from "@/components/DeleteArtworkDialog";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const MyArtwork = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const isFrozen = user?.accountStatus === "freeze";

    const [loading, setLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [artworks, setArtworks] = useState<any[]>([]);

    const [stats, setStats] = useState({
        totalArts: 0,
        notVerified: 0,
        pending: 0,
        sold: 0,
    });

    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [selectedArtwork, setSelectedArtwork] = useState<any>(null);

    const fetchArtworks = async () => {
        try {
            setLoading(true);

            const { data } = await api.get(`/artworks/user/${user?.id}`);

            setArtworks(data.artworks || []);
        } catch (error: any) {
            toast({
                title: "Error",
                description:
                    error.response?.data?.message || "Failed to fetch artworks",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const { data } = await api.get(`/artworks/stats/${user?.id}`);

            setStats(data);
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user?.id) {
            fetchArtworks();
            fetchStats();
        }
    }, [user]);

    const handleAddArtwork = async (formData: any) => {
        try {
            setSaveLoading(true);

            await api.post("/artworks", {
                ...formData,
                userId: user?.id,
            });

            toast({
                title: "Success",
                description: "Artwork added successfully",
            });

            setDialogOpen(false);

            fetchArtworks();
            fetchStats();
        } catch (error: any) {
            toast({
                title: "Error",
                description:
                    error.response?.data?.message || "Artwork add failed",
                variant: "destructive",
            });
        } finally {
            setSaveLoading(false);
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

            setDialogOpen(false);
            setSelectedArtwork(null);

            fetchArtworks();
            fetchStats();
        } catch (error: any) {
            toast({
                title: "Error",
                description:
                    error.response?.data?.message || "Artwork update failed",
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

            setDeleteDialogOpen(false);
            setSelectedArtwork(null);

            fetchArtworks();
            fetchStats();
        } catch (error: any) {
            toast({
                title: "Error",
                description:
                    error.response?.data?.message || "Artwork delete failed",
                variant: "destructive",
            });
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <>
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
                            Manage your uploaded artworks, pricing and collections on Artify marketplace.
                        </p>
                    </div>

                    <button
                        disabled={isFrozen}
                        onClick={() => {
                            if (isFrozen) return;

                            setSelectedArtwork(null);
                            setDialogOpen(true);
                        }}
                        className={`${bodyFont}
                                inline-flex items-center justify-center gap-2 rounded-full
                                bg-black px-6 py-3 text-[13px] text-white transition-all duration-300
                                hover:scale-[1.02] hover:bg-black/90 
                                disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                        <FaPlus />
                        Add New Artwork
                    </button>
                </div>

                {/* STATS */}
                <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                        ["Total Arts", stats.totalArts],
                        ["Not Verified", stats.notVerified],
                        ["Pending", stats.pending],
                        ["Sold", stats.sold],
                    ].map(([label, value]) => (
                        <div
                            key={String(label)}
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

                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                                    <FaPalette className="text-[14px]" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* LOADING */}
                {loading ? (
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="animate-pulse overflow-hidden rounded-[26px] border border-[#ebe4d9] bg-white"
                            >
                                <div className="h-[220px] w-full bg-[#ececec]" />

                                <div className="p-4">
                                    <div className="h-8 w-[70%] rounded bg-[#ececec]" />
                                    <div className="mt-3 h-4 w-[50%] rounded bg-[#ececec]" />

                                    <div className="mt-6 flex items-center justify-between">
                                        <div className="h-8 w-20 rounded bg-[#ececec]" />

                                        <div className="flex gap-2">
                                            <div className="h-10 w-10 rounded-full bg-[#ececec]" />
                                            <div className="h-10 w-10 rounded-full bg-[#ececec]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : artworks.length === 0 ? (
                    <div className="flex min-h-[260px] items-center justify-center rounded-[26px] border border-dashed border-[#d8d2c8] bg-white">
                        <h2 className={`${headingFont} text-[42px] text-[#111]`}>
                            No Artwork Found
                        </h2>
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {artworks.map((art) => (
                            <div
                                key={art._id}
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
                                        alt={art.name}
                                        className="h-[220px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    <span
                                        className={`${bodyFont} absolute left-4 top-4 rounded-full bg-black/90 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white`}
                                    >
                                        {art.category}
                                    </span>

                                    <span
                                        className={`${bodyFont}
                                                    absolute right-4 top-4 rounded-full px-3 py-1 text-[10px]
                                                    uppercase tracking-[0.18em]
                                                    ${art.sellingStatus === "sold"
                                                ? "bg-[#ece8ff] text-[#5e4ed6]"
                                                : "bg-[#fff1d8] text-[#bb7c00]"
                                            }`}
                                    >
                                        {art.sellingStatus}
                                    </span>
                                    {art.approvedStatus !== "approved" && (
                                        <span
                                            className={`${bodyFont}
                                            absolute bottom-4 left-4 rounded-full
                                            bg-[#fff4d6]
                                            px-3 py-1
                                            text-[10px]
                                            uppercase
                                            tracking-[0.18em]
                                            text-[#b67a00]
                                            shadow-sm`}
                                        >
                                            Not Verified
                                        </span>
                                    )}
                                </div>

                                {/* CONTENT */}
                                <div className="p-4">
                                    <h2
                                        className={`${headingFont} truncate text-[26px] leading-none text-[#111]`}
                                    >
                                        {art.name}
                                    </h2>

                                    <p
                                        className={`${bodyFont} mt-2 line-clamp-2 text-[13px] leading-5 text-[#777]`}
                                    >
                                        {art.description}
                                    </p>

                                    <div className="mt-5 flex items-center justify-between gap-4">
                                        <div>
                                            <p
                                                className={`${bodyFont} text-[10px] uppercase tracking-[0.18em] text-[#8a847c]`}
                                            >
                                                Price
                                            </p>

                                            <h3
                                                className={`${headingFont} mt-1 text-[24px] leading-none text-[#111]`}
                                            >
                                                ${art.price}
                                            </h3>
                                            <div>
                                                <p className={`${bodyFont} text-[10px] uppercase tracking-[0.18em] text-[#8a847c]`}>
                                                    Quantity
                                                </p>

                                                <h3 className={`${headingFont} mt-1 text-[24px] leading-none text-[#111]`}>
                                                    {art.quantity || 0}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                disabled={isFrozen}
                                                onClick={() => {
                                                    if (isFrozen) return;

                                                    setSelectedArtwork(art);
                                                    setDialogOpen(true);
                                                }}
                                                className={`flex h-10 w-10 items-center justify-center rounded-full ${isFrozen
                                                    ? "cursor-not-allowed bg-[#bdbdbd] text-white opacity-60"
                                                    : "bg-black text-white"
                                                    }`}
                                            >
                                                <FaEdit className="text-[13px]" />
                                            </button>

                                            <button
                                                disabled={isFrozen}
                                                onClick={() => {
                                                    if (isFrozen) return;

                                                    setSelectedArtwork(art);
                                                    setDeleteDialogOpen(true);
                                                }}
                                                className={`flex h-10 w-10 items-center justify-center rounded-full border ${isFrozen
                                                    ? "cursor-not-allowed border-[#ddd] bg-[#efefef] text-[#999] opacity-60"
                                                    : "border-[#ddd6ca] bg-white text-[#111]"
                                                    }`}
                                            >
                                                <FaTrash className="text-[13px]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* ADD / EDIT DIALOG */}
            <ArtworkDialog
                open={dialogOpen}
                onClose={() => {
                    setDialogOpen(false);
                    setSelectedArtwork(null);
                }}
                artwork={selectedArtwork}
                loading={saveLoading}
                onSave={(data: any) => {
                    if (selectedArtwork) {
                        handleUpdateArtwork(data);
                    } else {
                        handleAddArtwork(data);
                    }
                }}
            />

            {/* DELETE DIALOG */}
            <DeleteArtworkDialog
                open={deleteDialogOpen}
                loading={deleteLoading}
                onClose={() => {
                    setDeleteDialogOpen(false);
                    setSelectedArtwork(null);
                }}
                onConfirm={handleDeleteArtwork}
            />
        </>
    );
};

export default MyArtwork;