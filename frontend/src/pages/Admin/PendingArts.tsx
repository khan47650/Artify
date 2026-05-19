import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const PendingArts = () => {
    const { toast } = useToast();

    const [artworks, setArtworks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState("");

    const fetchPendingArtworks = async () => {
        try {
            setLoading(true);

            const { data } = await api.get("/artworks/pending");

            setArtworks(data.artworks || []);
        } catch (error: any) {
            toast({
                title: "Error",
                description:
                    error.response?.data?.message || "Failed to fetch pending artworks",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingArtworks();
    }, []);

    const handleApprove = async (id: string) => {
        try {
            setActionLoading(id);

            await api.put(`/artworks/approve/${id}`);

            toast({
                title: "Success",
                description: "Artwork approved successfully",
            });

            fetchPendingArtworks();
        } catch (error: any) {
            toast({
                title: "Error",
                description:
                    error.response?.data?.message || "Artwork approval failed",
                variant: "destructive",
            });
        } finally {
            setActionLoading("");
        }
    };

    const handleReject = async (id: string) => {
        try {
            setActionLoading(id);

            await api.delete(`/artworks/reject/${id}`);

            toast({
                title: "Success",
                description: "Artwork rejected successfully",
            });

            fetchPendingArtworks();
        } catch (error: any) {
            toast({
                title: "Error",
                description:
                    error.response?.data?.message || "Artwork reject failed",
                variant: "destructive",
            });
        } finally {
            setActionLoading("");
        }
    };

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
                    Pending Arts
                </h1>

                <p
                    className={`${bodyFont} mt-3 text-[13px] text-[#6f6a63]`}
                >
                    Review and approve pending artworks submitted by artists.
                </p>
            </div>

            {/* GRID */}
            {loading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="animate-pulse overflow-hidden rounded-[24px] border border-[#e8e1d7] bg-white"
                        >
                            <div className="h-[220px] w-full bg-[#ececec]" />

                            <div className="p-4">
                                <div className="h-7 w-[70%] rounded bg-[#ececec]" />
                                <div className="mt-3 h-4 w-[50%] rounded bg-[#ececec]" />
                                <div className="mt-3 h-4 w-[35%] rounded bg-[#ececec]" />

                                <div className="mt-4 flex gap-2">
                                    <div className="h-9 w-24 rounded-full bg-[#ececec]" />
                                    <div className="h-9 w-24 rounded-full bg-[#ececec]" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : artworks.length === 0 ? (
                <div className="flex min-h-[240px] items-center justify-center rounded-[24px] border border-dashed border-[#d8d2c8] bg-white">
                    <h2 className={`${headingFont} text-[38px] text-[#111]`}>
                        No Artwork Found
                    </h2>
                </div>
            ) : (
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
                            <div className="overflow-hidden">
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
                            </div>

                            {/* CONTENT */}
                            <div className="p-4">
                                <h2
                                    className={`${headingFont} text-[24px] leading-none text-[#111]`}
                                >
                                    {art.name}
                                </h2>

                                <p
                                    className={`${bodyFont} mt-2 text-[12px] text-[#777]`}
                                >
                                    {art.userId?.firstName || "Artist"} {art.userId?.lastName || ""}
                                </p>

                                <p
                                    className={`${bodyFont} mt-2 text-[13px] font-semibold text-[#111]`}
                                >
                                    ${art.price}
                                </p>

                                {/* BUTTONS */}
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleApprove(art._id)}
                                        disabled={actionLoading === art._id}
                                        className={`${bodyFont} inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-[11px] text-white transition hover:bg-black/90 disabled:opacity-60`}
                                    >
                                        <FaCheck />
                                        {actionLoading === art._id ? "Approving..." : "Approve"}
                                    </button>

                                    <button
                                        onClick={() => handleReject(art._id)}
                                        disabled={actionLoading === art._id}
                                        className={`${bodyFont} inline-flex items-center gap-2 rounded-full border border-[#d8d2c8] bg-[#f7f4ee] px-4 py-2 text-[11px] text-[#111] transition hover:bg-[#ece6dc] disabled:opacity-60`}
                                    >
                                        <FaTimes />
                                        {actionLoading === art._id ? "Rejecting..." : "Reject"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default PendingArts;