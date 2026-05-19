import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import ArtworkDialog from "@/components/ArtworkDialog";
import DeleteArtworkDialog from "@/components/DeleteArtworkDialog";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const ManageArt = () => {
    const { toast } = useToast();

    const [artworks, setArtworks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 8;

    const [selectedArtwork, setSelectedArtwork] = useState<any>(null);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const fetchArtworks = async () => {
        try {
            setLoading(true);
            const { data } = await api.get(`/artworks?page=${page}&limit=${limit}`);
            setArtworks(data.artworks || []);
            setTotalPages(data.totalPages || 1);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to fetch artworks",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArtworks();
    }, [page]);

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
            fetchArtworks();
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
            fetchArtworks();
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
                {/* HEADER */}
                <div className="mb-7">
                    <p className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}>
                        Admin Dashboard
                    </p>

                    <h1 className={`${headingFont} mt-2 text-[36px] leading-none text-[#111] lg:text-[54px]`}>
                        Manage Art
                    </h1>

                    <p className={`${bodyFont} mt-3 text-[13px] text-[#6f6a63]`}>
                        Edit, review and remove artworks from the marketplace.
                    </p>
                </div>

                {/* GRID */}
                {loading ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="animate-pulse overflow-hidden rounded-[24px] border border-[#e8e1d7] bg-white">
                                <div className="h-[220px] w-full bg-[#ececec]" />
                                <div className="p-4">
                                    <div className="h-7 w-[70%] rounded bg-[#ececec]" />
                                    <div className="mt-3 h-4 w-[50%] rounded bg-[#ececec]" />
                                    <div className="mt-3 h-4 w-[40%] rounded bg-[#ececec]" />
                                    <div className="mt-4 flex gap-2">
                                        <div className="h-9 w-20 rounded-full bg-[#ececec]" />
                                        <div className="h-9 w-20 rounded-full bg-[#ececec]" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : artworks.length === 0 ? (
                    <div className="flex min-h-[240px] items-center justify-center rounded-[24px] border border-dashed border-[#d8d2c8] bg-white">
                        <h2 className={`${headingFont} text-[38px] text-[#111]`}>No Artwork Found</h2>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                            {artworks.map((art) => (
                                <div
                                    key={art._id}
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
                                    <div className="relative cursor-pointer overflow-hidden">
                                        <img
                                            src={art.image}
                                            alt={art.name}
                                            className="
                                                h-[220px]
                                                w-full
                                                object-cover
                                                transition-transform
                                                duration-700
                                                group-hover:scale-[1.04]
                                                "
                                        />

                                        <span
                                            className={`${bodyFont} absolute left-4 top-4 rounded-full bg-black/90 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white`}
                                        >
                                            {art.category || "No Category"}
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
                                                Unverified
                                            </span>
                                        )}
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-4">
                                        <h2 className={`${headingFont} text-[24px] leading-none text-[#111]`}>
                                            {art.name}
                                        </h2>

                                        <p className={`${bodyFont} mt-2 text-[12px] text-[#777]`}>
                                            {art.userId?.firstName || "Artist"} {art.userId?.lastName || ""}
                                        </p>

                                        <p className={`${bodyFont} mt-2 text-[12px] uppercase tracking-[0.16em] text-[#8a847c]`}>
                                            {art.category}
                                        </p>

                                        <p className={`${bodyFont} mt-2 text-[13px] font-semibold text-[#111]`}>
                                            ${art.price}
                                        </p>

                                        {/* BUTTONS */}
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedArtwork(art);
                                                    setEditOpen(true);
                                                }}
                                                className={`${bodyFont} inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-[11px] text-white transition hover:bg-black/90`}
                                            >
                                                <FaEdit />
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setSelectedArtwork(art);
                                                    setDeleteOpen(true);
                                                }}
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

                        {/* PAGINATION */}
                        {totalPages > 1 && (
                            <div className="mt-8 flex items-center justify-center gap-2">
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage((p) => p - 1)}
                                    className={`${bodyFont} rounded-full border border-[#d8d2c8] px-4 py-2 text-[12px] disabled:cursor-not-allowed disabled:opacity-50`}
                                >
                                    Prev
                                </button>

                                {Array.from({ length: totalPages }).map((_, index) => {
                                    const pageNumber = index + 1;

                                    return (
                                        <button
                                            key={pageNumber}
                                            onClick={() => setPage(pageNumber)}
                                            className={`${bodyFont} h-9 w-9 rounded-full text-[12px] ${page === pageNumber
                                                ? "bg-black text-white"
                                                : "border border-[#d8d2c8] bg-white text-[#111]"
                                                }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                })}

                                <button
                                    disabled={page === totalPages}
                                    onClick={() => setPage((p) => p + 1)}
                                    className={`${bodyFont} rounded-full border border-[#d8d2c8] px-4 py-2 text-[12px] disabled:cursor-not-allowed disabled:opacity-50`}
                                >
                                    Next
                                </button>
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

export default ManageArt;