import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { FaCheckCircle, FaDownload } from "react-icons/fa";

import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";


const UserConfirmOrders = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtworkIndexes, setSelectedArtworkIndexes] = useState<
    Record<string, number>
  >({});

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(
        `/orders/confirmed/${user?.id}/${user?.role}`
      );

      setOrders(data.orders || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to fetch confirmed orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id && user?.role) {
      fetchOrders();
    }
  }, [user]);


  const getOrderTotal = (order: any) => {
    return (
      order.artworks?.reduce(
        (sum: number, item: any) =>
          sum + Number(item.artworkId?.price || 0) * Number(item.quantity || 1),
        0
      ) || 0
    );
  };

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

    const total = getOrderTotal(order);

    const completedDate = new Date(
      order.updatedAt || order.createdAt
    ).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    doc.setFillColor(17, 17, 17);
    doc.rect(0, 0, 210, 38, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.text("Artify Invoice", 14, 23);

    doc.setFontSize(10);
    doc.text(`Order ID: ${order._id}`, 14, 31);

    doc.setTextColor(17, 17, 17);

    doc.setFontSize(15);
    doc.text("Order Details", 14, 52);

    doc.setFontSize(10);
    doc.text(
      `Buyer: ${order.buyerId?.firstName || ""} ${order.buyerId?.lastName || ""
      }`,
      14,
      62
    );
    doc.text(`Location: ${order.location || "N/A"}`, 14, 70);
    doc.text(`Completed Date: ${completedDate}`, 14, 78);
    doc.text(`Payment Method: ${order.paymentMethod || "N/A"}`, 14, 86);

    let y = 105;

    order.artworks?.forEach((item: any, index: number) => {
      const art = item.artworkId;
      const seller = item.sellerId;

      doc.setFontSize(11);
      doc.text(`${index + 1}. ${art?.name || "Artwork"}`, 14, y);

      doc.setFontSize(9);
      doc.text(
        `Artist: ${seller?.firstName || ""} ${seller?.lastName || ""}`,
        18,
        y + 7
      );
      doc.text(`Category: ${art?.category || "N/A"}`, 18, y + 14);
      doc.text(
        `Qty: ${item.quantity || 1} x $${Number(art?.price || 0).toLocaleString()} = $${(
          Number(art?.price || 0) * Number(item.quantity || 1)
        ).toLocaleString()}`,
        18,
        y + 21
      );

      y += 34;
    });

    doc.line(14, y, 196, y);

    doc.setFontSize(14);
    doc.text(`Total Items: ${order.artworks?.length || 0}`, 14, y + 12);
    doc.text(`Total Amount: $${Number(total).toLocaleString()}`, 14, y + 22);

    doc.setFontSize(15);
    doc.text("Payment Receipt", 14, y + 42);

    if (order.paymentReceipt) {
      const receiptBase64 = await imageToBase64(order.paymentReceipt);

      if (receiptBase64) {
        doc.addImage(receiptBase64, "JPEG", 14, y + 48, 75, 75);
      } else {
        doc.setFontSize(10);
        doc.text("Payment receipt image could not be loaded.", 14, y + 50);
      }
    } else {
      doc.setFontSize(10);
      doc.text("No payment receipt available.", 14, y + 50);
    }

    doc.save(`artify-invoice-${order._id}.pdf`);
  };

  return (
    <section>
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}>
            User Dashboard
          </p>

          <h1 className={`${headingFont} mt-2 text-[38px] leading-none text-[#111] lg:text-[56px]`}>
            Confirm Orders
          </h1>

          <p className={`${bodyFont} mt-3 text-[14px] text-[#6f6a63]`}>
            Your successfully completed and confirmed orders.
          </p>
        </div>

      </div>

      {loading ? (
        <div className="space-y-5">
          {[1, 2, 3].map((item) => (
            <div key={item} className="animate-pulse rounded-[30px] border border-[#e6dfd4] bg-white p-5">
              <div className="flex flex-col gap-5 xl:flex-row">
                <div className="h-[180px] w-full rounded-[24px] bg-[#ececec] sm:w-[240px]" />
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
            No Confirmed Orders
          </h2>

          <p className={`${bodyFont} mt-3 text-[14px] text-[#6f6a63]`}>
            No confirmed orders found for selected filter.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => {
            const selectedIndex = selectedArtworkIndexes[order._id] || 0;
            const selectedArtwork = order.artworks?.[selectedIndex]?.artworkId;
            const selectedSeller = order.artworks?.[selectedIndex]?.sellerId;
            const total = getOrderTotal(order);

            return (
              <div
                key={order._id}
                className="
                  group rounded-[30px] border border-[#e6dfd4] bg-white p-5
                  shadow-[0_10px_30px_-22px_rgba(0,0,0,0.18)]
                  transition-all duration-500 hover:-translate-y-1.5
                  hover:border-[#d4cdc1] hover:shadow-[0_25px_60px_-20px_rgba(0,0,0,0.22)]
                "
              >
                <div className="flex flex-col gap-6 2xl:flex-row 2xl:items-center 2xl:justify-between">
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
                    <div className="relative overflow-hidden rounded-[24px]">
                      <img
                        src={selectedArtwork?.image}
                        alt={selectedArtwork?.name}
                        className="h-[180px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:w-[240px]"
                      />

                      <span className={`${bodyFont} absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-[11px] text-white`}>
                        Completed Order
                      </span>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
                        label={user?.role === "buyer" ? "Artist" : "Buyer"}
                        value={
                          user?.role === "buyer"
                            ? `${selectedSeller?.firstName || ""} ${selectedSeller?.lastName || ""}`
                            : `${order.buyerId?.firstName || ""} ${order.buyerId?.lastName || ""}`
                        }
                      />

                      <Info label="Location" value={order.location || "N/A"} />

                      <Info
                        label="Completed Date"
                        value={new Date(order.updatedAt || order.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      />

                      <Info label="Total Items" value={`${order.artworks?.length || 0}`} />

                      <Info label="Total Amount" value={`$${Number(total).toLocaleString()}`} />

                      <div>
                        <p className={`${bodyFont} text-[11px] uppercase tracking-[0.22em] text-[#888]`}>
                          Payment Proof
                        </p>

                        <div className="mt-3 flex items-center gap-3">
                          <img
                            src={order.paymentReceipt}
                            alt="Payment Screenshot"
                            className="h-[70px] w-[90px] rounded-[14px] border border-[#ddd] object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                          <span className={`${bodyFont} inline-flex items-center gap-2 rounded-full bg-[#eef7ea] px-4 py-1.5 text-[11px] text-[#4d8f35]`}>
                            <FaCheckCircle />
                            Payment Verified
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => downloadInvoice(order)}
                      className={`${bodyFont} inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-[13px] text-white transition hover:bg-black/90`}
                    >
                      <FaDownload />
                      Invoice
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

export default UserConfirmOrders;