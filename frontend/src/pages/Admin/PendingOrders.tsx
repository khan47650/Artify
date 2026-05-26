import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const PendingOrders = () => {
    const { toast } = useToast();

    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedArtworkIndexes, setSelectedArtworkIndexes] = useState<Record<string, number>>({});
    const [previewImage, setPreviewImage] = useState("");
    const [confirmLoading, setConfirmLoading] = useState("");
    const [cancelLoading, setCancelLoading] = useState("");

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/orders");

            const pendingOrders = (data.orders || []).filter(
                (order: any) => order.orderStatus === "pending"
            );

            setOrders(pendingOrders);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to fetch orders",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleConfirm = async (id: string) => {
        try {
            setConfirmLoading(id);
            await api.put(`/orders/confirm/${id}`);

            toast({
                title: "Success",
                description: "Order confirmed successfully",
            });

            fetchOrders();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Confirm failed",
                variant: "destructive",
            });
        } finally {
            setConfirmLoading("");
        }
    };

    const handleCancel = async (id: string) => {
        try {
            setCancelLoading(id);
            await api.delete(`/orders/${id}`);

            toast({
                title: "Success",
                description: "Order cancelled successfully",
            });

            fetchOrders();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Cancel failed",
                variant: "destructive",
            });
        } finally {
            setCancelLoading("");
        }
    };

    return (
        <section>
            <div className="mb-8">
                <p className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}>
                    Admin Dashboard
                </p>

                <h1 className={`${headingFont} mt-2 text-[38px] leading-none text-[#111] lg:text-[56px]`}>
                    Pending Orders
                </h1>

                <p className={`${bodyFont} mt-3 text-[14px] text-[#6f6a63]`}>
                    Review customer payments and confirm orders.
                </p>
            </div>

            {loading ? (
                <div className="space-y-5">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="animate-pulse rounded-[30px] border border-[#e6dfd4] bg-white p-5">
                            <div className="flex flex-col gap-5 xl:flex-row">
                                <div className="h-[170px] w-full rounded-[24px] bg-[#ececec] sm:w-[230px]" />
                                <div className="grid flex-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                    {[1, 2, 3, 4, 5, 6].map((box) => (
                                        <div key={box}>
                                            <div className="h-3 w-[90px] rounded bg-[#ececec]" />
                                            <div className="mt-3 h-7 w-[150px] rounded bg-[#ececec]" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : orders.length === 0 ? (
                <div className="rounded-[30px] border border-[#e6dfd4] bg-white py-20 text-center shadow-[0_10px_30px_-22px_rgba(0,0,0,0.18)]">
                    <h2 className={`${headingFont} text-[40px] leading-none text-[#111]`}>
                        No Pending Orders
                    </h2>
                    <p className={`${bodyFont} mt-3 text-[14px] text-[#6f6a63]`}>
                        There are no pending orders right now.
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    {orders.map((order) => {
                        const selectedIndex = selectedArtworkIndexes[order._id] || 0;
                        const selectedArtwork = order.artworks?.[selectedIndex]?.artworkId;
                        const selectedSeller = order.artworks?.[selectedIndex]?.sellerId;

                        const totalPrice = order.artworks?.reduce(
                            (sum: number, item: any) =>
                                sum + Number(item.artworkId?.price || 0) * Number(item.quantity || 1),
                            0
                        );

                        return (
                            <div
                                key={order._id}
                                className="group rounded-[30px] border border-[#e6dfd4] bg-white p-5 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#d4cdc1] hover:shadow-[0_25px_60px_-20px_rgba(0,0,0,0.22)]"
                            >
                                <div className="flex flex-col gap-6 2xl:flex-row 2xl:items-center 2xl:justify-between">
                                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
                                        <div className="relative overflow-hidden rounded-[24px]">
                                            <img
                                                src={selectedArtwork?.image}
                                                alt={selectedArtwork?.name}
                                                className="h-[170px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:w-[230px]"
                                            />

                                            <span className={`${bodyFont} absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-[11px] text-white`}>
                                                Ordered Artwork
                                            </span>
                                        </div>

                                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                            <Info
                                                label="Customer Name"
                                                value={`${order.buyerId?.firstName || ""} ${order.buyerId?.lastName || ""}`}
                                            />

                                            <div>
                                                <p className={`${bodyFont} text-[11px] uppercase tracking-[0.22em] text-[#888]`}>
                                                    Artwork
                                                </p>

                                                {order.artworks?.length > 1 ? (
                                                    <select
                                                        value={selectedIndex}
                                                        onChange={(e) =>
                                                            setSelectedArtworkIndexes((prev) => ({
                                                                ...prev,
                                                                [order._id]: Number(e.target.value),
                                                            }))
                                                        }
                                                        className={`${headingFont} mt-2 w-full rounded-full border border-[#d8d2c8] bg-white px-4 py-2 text-[22px] leading-none text-[#111] outline-none`}
                                                    >
                                                        {order.artworks.map((item: any, index: number) => (
                                                            <option key={item.artworkId?._id} value={index}>
                                                                {item.artworkId?.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <h3 className={`${headingFont} mt-2 text-[24px] leading-none text-[#111]`}>
                                                        {selectedArtwork?.name || "N/A"}
                                                    </h3>
                                                )}
                                            </div>

                                            <Info
                                                label="Artist Name"
                                                value={`${selectedSeller?.firstName || ""} ${selectedSeller?.lastName || ""}`}
                                            />

                                            <Info label="Location" value={order.location || "N/A"} />

                                            <Info
                                                label="Order Date"
                                                value={new Date(order.createdAt).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            />

                                            <Info label="Total Items" value={`${order.artworks?.length || 0}`} />

                                            <Info
                                                label="Total Price"
                                                value={`$${Number(totalPrice || 0).toLocaleString()}`}
                                            />

                                            <div>
                                                <p className={`${bodyFont} text-[11px] uppercase tracking-[0.22em] text-[#888]`}>
                                                    Payment Status
                                                </p>

                                                {order.paymentReceipt ? (
                                                    <div className="mt-3">
                                                        <img
                                                            src={order.paymentReceipt}
                                                            alt="Payment Screenshot"
                                                            onMouseEnter={() => setPreviewImage(order.paymentReceipt)}
                                                            onMouseLeave={() => setPreviewImage("")}
                                                            className="h-[70px] w-[90px] cursor-zoom-in rounded-[14px] border border-[#ddd] object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />

                                                        <span className={`${bodyFont} mt-2 inline-flex rounded-full bg-[#eef7ea] px-3 py-1 text-[11px] text-[#4d8f35]`}>
                                                            Payment Uploaded
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className={`${bodyFont} mt-3 inline-flex rounded-full bg-[#f7f4ee] px-4 py-1.5 text-[12px] text-[#111]`}>
                                                        Pending
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            disabled={confirmLoading === order._id || cancelLoading === order._id}
                                            onClick={() => handleConfirm(order._id)}
                                            className={`${bodyFont} rounded-full bg-black px-6 py-3 text-[13px] text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-60`}
                                        >
                                            {confirmLoading === order._id ? "Confirming..." : "Confirm"}
                                        </button>

                                        <button
                                            disabled={confirmLoading === order._id || cancelLoading === order._id}
                                            onClick={() => handleCancel(order._id)}
                                            className={`${bodyFont} rounded-full border border-[#d8d2c8] bg-white px-6 py-3 text-[13px] text-[#111] transition hover:bg-[#f7f4ee] disabled:cursor-not-allowed disabled:opacity-60`}
                                        >
                                            {cancelLoading === order._id ? "Canceling..." : "Cancel"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {previewImage && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4 pointer-events-none">
                    <div className="rounded-[28px] bg-white p-4 shadow-2xl">
                        <img
                            src={previewImage}
                            alt="Payment Preview"
                            className="max-h-[75vh] max-w-[82vw] rounded-[22px] object-contain"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

const Info = ({ label, value }: { label: string; value: string }) => {
    return (
        <div>
            <p className={`${bodyFont} text-[11px] uppercase tracking-[0.22em] text-[#888]`}>
                {label}
            </p>

            <h3 className={`${headingFont} mt-2 text-[24px] leading-none text-[#111]`}>
                {value}
            </h3>
        </div>
    );
};

export default PendingOrders;