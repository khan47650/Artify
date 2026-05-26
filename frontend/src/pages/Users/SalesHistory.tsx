import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import {
    FaDownload,
    FaCheckCircle,
    FaChartLine,
} from "react-icons/fa";

import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const SalesHistory = () => {
    const { user } = useAuth();
    const { toast } = useToast();

    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedArtworkIndexes, setSelectedArtworkIndexes] = useState<Record<string, number>>({});

    const fetchSales = async () => {
        try {
            setLoading(true);

            const { data } = await api.get(`/orders/sales/${user?.id}`);

            setOrders(data.orders || []);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to fetch sales history",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.id) fetchSales();
    }, [user]);

    const getSellerArtworks = (order: any) => {
        return (
            order.artworks?.filter(
                (item: any) => item.sellerId?._id === user?.id || item.sellerId === user?.id
            ) || []
        );
    };

    const getOrderTotalForSeller = (order: any) => {
        return getSellerArtworks(order).reduce(
            (sum: number, item: any) =>
                sum + Number(item.artworkId?.price || 0) * Number(item.quantity || 1),
            0
        );
    };
    const totalEarnings = orders.reduce(
        (sum, order) => sum + getOrderTotalForSeller(order),
        0
    );

    const totalItemsSold = orders.reduce(
        (sum, order) => sum + getSellerArtworks(order).length,
        0
    );

    const topSale =
        orders.length > 0
            ? Math.max(...orders.map((order) => getOrderTotalForSeller(order)))
            : 0;

    const imageToBase64 = async (url: string): Promise<string | null> => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();

            return await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = () => resolve(null);
                reader.readAsDataURL(blob);
            });
        } catch {
            return null;
        }
    };

    const downloadInvoice = async (order: any) => {
        const doc = new jsPDF("p", "mm", "a4");
        const sellerArtworks = getSellerArtworks(order);
        const total = getOrderTotalForSeller(order);

        const completedDate = new Date(order.updatedAt || order.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        doc.setFillColor(17, 17, 17);
        doc.rect(0, 0, 210, 38, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(26);
        doc.text("Artify Sales Invoice", 14, 23);

        doc.setFontSize(10);
        doc.text(`Order ID: ${order._id}`, 14, 31);

        doc.setTextColor(17, 17, 17);
        doc.setFontSize(15);
        doc.text("Sale Details", 14, 52);

        doc.setFontSize(10);
        doc.text(
            `Buyer: ${order.buyerId?.firstName || ""} ${order.buyerId?.lastName || ""}`,
            14,
            62
        );
        doc.text(`Location: ${order.location || "N/A"}`, 14, 70);
        doc.text(`Sold Date: ${completedDate}`, 14, 78);
        doc.text(`Payment Method: ${order.paymentMethod || "N/A"}`, 14, 86);

        let y = 102;

        sellerArtworks.forEach((item: any, index: number) => {
            const art = item.artworkId;

            doc.setFontSize(11);
            doc.text(`${index + 1}. ${art?.name || "Artwork"}`, 14, y);

            doc.setFontSize(9);
            doc.text(`Category: ${art?.category || "N/A"}`, 18, y + 7);
            doc.text(`Qty: ${item.quantity || 1} x $${Number(art?.price || 0).toLocaleString()} = $${(
                Number(art?.price || 0) * Number(item.quantity || 1)
            ).toLocaleString()}`, 18, y + 14);

            y += 28;
        });

        doc.line(14, y, 196, y);

        doc.setFontSize(14);
        doc.text(`Total Items: ${sellerArtworks.length}`, 14, y + 12);
        doc.text(`Revenue: $${Number(total).toLocaleString()}`, 14, y + 22);

        doc.setFontSize(15);
        doc.text("Payment Receipt", 14, y + 42);

        if (order.paymentReceipt) {
            const receiptBase64 = await imageToBase64(order.paymentReceipt);

            if (receiptBase64) {
                doc.addImage(receiptBase64, "JPEG", 14, y + 48, 75, 75);
            }
        }

        doc.save(`artify-sale-invoice-${order._id}.pdf`);
    };

    return (
        <section className="w-full overflow-hidden">
            <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}>
                        Seller Dashboard
                    </p>

                    <h1 className={`${headingFont} mt-2 text-[36px] leading-none text-[#111] sm:text-[46px] lg:text-[58px]`}>
                        Sales History
                    </h1>

                    <p className={`${bodyFont} mt-3 max-w-[650px] text-[14px] leading-6 text-[#6f6a63]`}>
                        Track your sold artworks, completed transactions and earnings on Artify marketplace.
                    </p>
                </div>

                <div className="rounded-[24px] border border-[#ebe4d9] bg-gradient-to-br from-black to-[#1d1d1d] px-6 py-5 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)]">
                    <p className={`${bodyFont} text-[10px] uppercase tracking-[0.24em] text-white/60`}>
                        Total Earnings
                    </p>

                    <h3 className={`${headingFont} mt-3 text-[38px] leading-none text-white`}>
                        ${Number(totalEarnings).toLocaleString()}
                    </h3>
                </div>
            </div>

            <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[
                    ["Total Orders", orders.length],
                    ["Items Sold", totalItemsSold],
                    ["Top Sale", `$${Number(topSale).toLocaleString()}`],
                ].map(([label, value]) => (
                    <div
                        key={label}
                        className="rounded-[22px] border border-[#ebe4d9] bg-gradient-to-br from-white to-[#f8f5ef] p-4 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_-22px_rgba(0,0,0,0.22)]"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`${bodyFont} text-[10px] uppercase tracking-[0.24em] text-[#8a847c]`}>
                                    {label}
                                </p>

                                <h3 className={`${headingFont} mt-3 text-[34px] leading-none text-[#111]`}>
                                    {value}
                                </h3>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white shadow-lg">
                                <FaChartLine className="text-[14px]" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {loading ? (
                <div className="space-y-5">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="animate-pulse rounded-[28px] border border-[#ebe4d9] bg-white p-4">
                            <div className="flex gap-5">
                                <div className="h-[180px] w-[220px] rounded-[22px] bg-[#ececec]" />
                                <div className="grid flex-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                                    {[1, 2, 3, 4].map((box) => (
                                        <div key={box}>
                                            <div className="h-3 w-[90px] rounded bg-[#ececec]" />
                                            <div className="mt-3 h-7 w-[140px] rounded bg-[#ececec]" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : orders.length === 0 ? (
                <div className="rounded-[28px] border border-[#ebe4d9] bg-white py-20 text-center">
                    <h2 className={`${headingFont} text-[40px] leading-none text-[#111]`}>
                        No Sales Found
                    </h2>
                    <p className={`${bodyFont} mt-3 text-[14px] text-[#6f6a63]`}>
                        You have no sold artworks yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    {orders.map((order) => {
                        const sellerArtworks = getSellerArtworks(order);
                        const selectedIndex = selectedArtworkIndexes[order._id] || 0;
                        const selectedItem = sellerArtworks[selectedIndex];
                        const selectedArtwork = selectedItem?.artworkId;
                        const revenue = getOrderTotalForSeller(order);

                        return (
                            <div
                                key={order._id}
                                className="group overflow-hidden rounded-[28px] border border-[#ebe4d9] bg-white/90 p-4 shadow-[0_14px_35px_-24px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_55px_-24px_rgba(0,0,0,0.22)]"
                            >
                                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                                        <div className="relative overflow-hidden rounded-[22px]">
                                            <img
                                                src={selectedArtwork?.image}
                                                alt={selectedArtwork?.name}
                                                className="h-[180px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:w-[220px]"
                                            />

                                            <span className={`${bodyFont} absolute left-4 top-4 rounded-full bg-black/90 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white`}>
                                                Sold Artwork
                                            </span>
                                        </div>

                                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                                            <div className="min-w-[120px]">
                                                <p className={`${bodyFont} text-[10px] uppercase tracking-[0.2em] text-[#8a847c]`}>
                                                    Artwork
                                                </p>

                                                {sellerArtworks.length > 1 ? (
                                                    <select
                                                        value={selectedIndex}
                                                        onChange={(e) =>
                                                            setSelectedArtworkIndexes((prev) => ({
                                                                ...prev,
                                                                [order._id]: Number(e.target.value),
                                                            }))
                                                        }
                                                        className={`${headingFont} mt-2 w-full rounded-full border border-[#d8d2c8] bg-white px-4 py-2 text-[20px] leading-none text-[#111] outline-none`}
                                                    >
                                                        {sellerArtworks.map((item: any, index: number) => (
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
                                                label="Buyer Name"
                                                value={`${order.buyerId?.firstName || ""} ${order.buyerId?.lastName || ""}`}
                                            />

                                            <Info
                                                label="Sold Date"
                                                value={new Date(order.updatedAt || order.createdAt).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            />

                                            <Info label="Items Sold" value={`${sellerArtworks.length}`} />

                                            <Info label="Revenue" value={`$${Number(revenue).toLocaleString()}`} />

                                            <div>
                                                <p className={`${bodyFont} text-[10px] uppercase tracking-[0.2em] text-[#8a847c]`}>
                                                    Payment Status
                                                </p>

                                                <div className="mt-3">
                                                    <span className={`${bodyFont} inline-flex items-center gap-2 rounded-full bg-[#eef7ea] px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[#4d8f35]`}>
                                                        <FaCheckCircle />
                                                        Completed
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <button
                                            onClick={() => downloadInvoice(order)}
                                            className={`${bodyFont} inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-[12px] uppercase tracking-[0.12em] text-white transition-all duration-300 hover:scale-[1.03] hover:bg-black/90 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.45)]`}
                                        >
                                            <FaDownload />
                                            Download Invoice
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

const Info = ({ label, value }: { label: string; value: string }) => {
    return (
        <div className="min-w-[120px]">
            <p className={`${bodyFont} text-[10px] uppercase tracking-[0.2em] text-[#8a847c]`}>
                {label}
            </p>

            <h3 className={`${headingFont} mt-2 text-[24px] leading-none text-[#111]`}>
                {value}
            </h3>
        </div>
    );
};

export default SalesHistory;