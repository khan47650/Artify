import { useEffect, useState } from "react";

import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const UserPendingOrders = () => {
  const { user } = useAuth();

  const { toast } = useToast();

  const [orders, setOrders] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const [cancelLoading, setCancelLoading] = useState(false);

  const [selectedArtworkIndexes, setSelectedArtworkIndexes] = useState<
    Record<string, number>
  >({});

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(
        `/orders/pending/${user?.id}/${user?.role}`
      );

      setOrders(data.orders || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to fetch orders",
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

  const handleCancelOrder = async () => {
    if (!selectedOrder?._id) return;

    try {
      setCancelLoading(true);

      await api.delete(`/orders/${selectedOrder._id}`);

      toast({
        title: "Success",
        description: "Order cancelled successfully",
      });

      setCancelDialogOpen(false);

      setSelectedOrder(null);

      fetchOrders();
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Cancel order failed",
        variant: "destructive",
      });
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <section>
      {/* HEADER */}

      <div className="mb-8">
        <p
          className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}
        >
          User Dashboard
        </p>

        <h1
          className={`${headingFont} mt-2 text-[38px] leading-none text-[#111] lg:text-[56px]`}
        >
          My Pending Orders
        </h1>

        <p className={`${bodyFont} mt-3 text-[14px] text-[#6f6a63]`}>
          Track all your pending artwork orders.
        </p>
      </div>

      {/* LOADING */}

      {loading ? (
        <div className="space-y-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-[30px] border border-[#e6dfd4] bg-white p-5"
            >
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
        /* EMPTY */

        <div className="rounded-[30px] border border-[#e6dfd4] bg-white py-20 text-center shadow-[0_10px_30px_-22px_rgba(0,0,0,0.18)]">
          <h2
            className={`${headingFont} text-[40px] leading-none text-[#111]`}
          >
            No Pending Orders
          </h2>

          <p className={`${bodyFont} mt-3 text-[14px] text-[#6f6a63]`}>
            You currently have no pending orders.
          </p>
        </div>
      ) : (
        /* ORDERS */

        <div className="space-y-5">
          {orders.map((order) => {
            const selectedIndex =
              selectedArtworkIndexes[order._id] || 0;

            const selectedArtwork =
              order.artworks?.[selectedIndex]?.artworkId;

            const selectedSeller =
              order.artworks?.[selectedIndex]?.sellerId;

            const totalPrice = order.artworks?.reduce(
              (sum: number, item: any) =>
                sum + Number(item.artworkId?.price || 0),
              0
            );

            return (
              <div
                key={order._id}
                className="
                  group
                  rounded-[30px]
                  border
                  border-[#e6dfd4]
                  bg-white
                  p-5
                  shadow-[0_10px_30px_-22px_rgba(0,0,0,0.18)]
                  transition-all
                  duration-500
                  hover:-translate-y-1.5
                  hover:shadow-[0_25px_60px_-20px_rgba(0,0,0,0.22)]
                  hover:border-[#d4cdc1]
                "
              >
                <div className="flex flex-col gap-6 2xl:flex-row 2xl:items-center 2xl:justify-between">
                  {/* LEFT SIDE */}

                  <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
                    {/* IMAGE */}

                    <div className="relative overflow-hidden rounded-[24px]">
                      <img
                        src={selectedArtwork?.image}
                        alt={selectedArtwork?.name}
                        className="
                          h-[170px]
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-105
                          sm:w-[230px]
                        "
                      />

                      <span
                        className={`${bodyFont} absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-[11px] text-white`}
                      >
                        Pending Order
                      </span>
                    </div>

                    {/* INFO */}

                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      {/* ARTWORK */}

                      <div>
                        <p
                          className={`${bodyFont} text-[11px] uppercase tracking-[0.22em] text-[#888]`}
                        >
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
                            {order.artworks.map(
                              (item: any, index: number) => (
                                <option
                                  key={item.artworkId?._id}
                                  value={index}
                                >
                                  {item.artworkId?.name}
                                </option>
                              )
                            )}
                          </select>
                        ) : (
                          <h3
                            className={`${headingFont} mt-2 text-[24px] leading-none text-[#111]`}
                          >
                            {selectedArtwork?.name || "N/A"}
                          </h3>
                        )}
                      </div>

                      {/* SELLER / BUYER */}

                      <Info
                        label={
                          user?.role === "buyer"
                            ? "Seller Name"
                            : "Buyer Name"
                        }
                        value={
                          user?.role === "buyer"
                            ? `${selectedSeller?.firstName || ""} ${selectedSeller?.lastName || ""
                            }`
                            : `${order.buyerId?.firstName || ""} ${order.buyerId?.lastName || ""
                            }`
                        }
                      />

                      {/* DATE */}

                      <Info
                        label="Order Date"
                        value={new Date(
                          order.createdAt
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      />

                      {/* ITEMS */}

                      <Info
                        label="Total Items"
                        value={`${order.artworks?.length || 0}`}
                      />

                      {/* PRICE */}

                      <Info
                        label="Total Price"
                        value={`$${Number(
                          totalPrice || 0
                        ).toLocaleString()}`}
                      />

                      {/* STATUS */}

                      <div>
                        <p
                          className={`${bodyFont} text-[11px] uppercase tracking-[0.22em] text-[#888]`}
                        >
                          Status
                        </p>

                        <span
                          className={`${bodyFont} mt-3 inline-flex rounded-full bg-[#f7f4ee] px-4 py-1.5 text-[12px] text-[#111]`}
                        >
                          Pending
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ACTION */}

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);

                        setCancelDialogOpen(true);
                      }}
                      className={`${bodyFont} rounded-full border border-red-200 bg-red-50 px-6 py-3 text-[13px] text-red-600 transition hover:bg-red-100`}
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CANCEL DIALOG */}

      {cancelDialogOpen && selectedOrder && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-[430px] rounded-[30px] bg-white p-6 shadow-2xl">
            <p
              className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#888]`}
            >
              Confirm Action
            </p>

            <h2
              className={`${headingFont} mt-3 text-[38px] leading-none text-[#111]`}
            >
              Cancel Order?
            </h2>

            <p
              className={`${bodyFont} mt-4 text-[14px] leading-6 text-[#6f6a63]`}
            >
              Are you sure you want to cancel this order for{" "}
              <span className="font-semibold text-[#111]">
                {selectedOrder.artworks?.length > 1
                  ? `${selectedOrder.artworks.length} artworks`
                  : selectedOrder.artworks?.[0]?.artworkId?.name}
              </span>
              ?
            </p>

            <div className="mt-6 flex gap-3">
              <button
                disabled={cancelLoading}
                onClick={() => {
                  setCancelDialogOpen(false);

                  setSelectedOrder(null);
                }}
                className={`${bodyFont} h-11 flex-1 rounded-full border border-[#d8d2c8] bg-white text-[13px] text-[#111] disabled:opacity-60`}
              >
                No
              </button>

              <button
                disabled={cancelLoading}
                onClick={handleCancelOrder}
                className={`${bodyFont} h-11 flex-1 rounded-full bg-red-600 text-[13px] text-white disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {cancelLoading ? "Canceling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const Info = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div>
      <p
        className={`${bodyFont} text-[11px] uppercase tracking-[0.22em] text-[#888]`}
      >
        {label}
      </p>

      <h3
        className={`${headingFont} mt-2 text-[24px] leading-none text-[#111]`}
      >
        {value}
      </h3>
    </div>
  );
};

export default UserPendingOrders;