import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Upload,
  CreditCard,
  MapPin,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const Cart = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [items, setItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);

  const [location, setLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"easypaisa" | "jazzcash">(
    "easypaisa"
  );
  const [paymentReceipt, setPaymentReceipt] = useState("");

  const fetchCart = async () => {
    if (!user?.id || user.role !== "buyer") {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.get(`/cart/${user.id}`);

      setItems(data.cartItems || []);
      setTotalPrice(data.totalPrice || 0);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch cart",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const removeFromCart = async (id: string) => {
    try {
      await api.delete(`/cart/${id}`);
      fetchCart();

      toast({
        title: "Removed",
        description: "Artwork removed from cart.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Remove failed",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      await api.put(`/cart/${id}/quantity`, { quantity });
      fetchCart();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Quantity update failed",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    if (!user?.id) return;

    try {
      await api.delete(`/cart/clear/${user.id}`);
      setItems([]);
      setTotalPrice(0);

      toast({
        title: "Cleared",
        description: "Cart cleared successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Clear cart failed",
        variant: "destructive",
      });
    }
  };

  const handleReceiptUpload = (file?: File) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPaymentReceipt(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handlePlaceOrder = async () => {
    if (!user?.id) {
      return toast({
        title: "User missing",
        description: "Please login as buyer.",
        variant: "destructive",
      });
    }

    if (!location.trim()) {
      return toast({
        title: "Address required",
        description: "Please enter your delivery address.",
        variant: "destructive",
      });
    }

    if (!paymentReceipt) {
      return toast({
        title: "Receipt required",
        description: "Please upload your payment receipt.",
        variant: "destructive",
      });
    }

    try {
      setOrderLoading(true);

      const { data } = await api.post("/orders", {
        buyerId: user.id,
        location,
        paymentMethod,
        paymentReceipt,
      });

      toast({
        title: "Order Placed",
        description: data.message || "Your order has been placed successfully.",
      });

      setItems([]);
      setTotalPrice(0);
      setLocation("");
      setPaymentReceipt("");
      setPaymentMethod("easypaisa");
    } catch (error: any) {
      toast({
        title: "Order Failed",
        description: error.response?.data?.message || "Order place failed",
        variant: "destructive",
      });
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#111]">
      <Navbar />

      <main className="pt-28 pb-16">
        <div className="mx-auto max-w-[1180px] px-4 md:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p
                className={`${bodyFont} text-[12px] uppercase tracking-[0.28em] text-[#777]`}
              >
                Buyer Cart
              </p>

              <h1
                className={`${headingFont} mt-3 text-[56px] leading-none text-[#111]`}
              >
                Your Cart
              </h1>

              <p className={`${bodyFont} mt-3 text-[14px] text-[#6f6a63]`}>
                {items.length === 0
                  ? "Your cart is empty."
                  : `${items.length} artwork${items.length > 1 ? "s" : ""
                  } in your cart.`}
              </p>
            </div>

            <Link
              to="/explore"
              className={`${bodyFont} inline-flex items-center gap-2 rounded-full border border-[#d8d2c8] bg-white px-5 py-2.5 text-[13px] text-[#111] hover:bg-[#f7f4ee]`}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Continue Shopping
            </Link>
          </div>

          {loading ? (
            <div className="space-y-5">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-[28px] border border-[#e6dfd4] bg-white p-5"
                >
                  <div className="flex gap-5">
                    <div className="h-[130px] w-[110px] rounded-[20px] bg-[#ececec]" />
                    <div className="flex-1">
                      <div className="h-8 w-[45%] rounded bg-[#ececec]" />
                      <div className="mt-3 h-4 w-[30%] rounded bg-[#ececec]" />
                      <div className="mt-5 h-6 w-[20%] rounded bg-[#ececec]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-[34px] border border-[#e6dfd4] bg-white p-12 text-center shadow-[0_20px_60px_-35px_rgba(0,0,0,0.2)]">
              <ShoppingBag className="mx-auto h-14 w-14 text-[#777]" />

              <h2
                className={`${headingFont} mt-6 text-[40px] leading-none text-[#111]`}
              >
                No artworks in cart
              </h2>

              <p
                className={`${bodyFont} mx-auto mt-3 max-w-md text-[14px] leading-6 text-[#6f6a63]`}
              >
                Discover original artworks and add your favorite pieces to cart.
              </p>

              <Button
                asChild
                className={`${bodyFont} mt-7 rounded-full bg-black px-8 text-[13px] text-white hover:bg-black/90`}
              >
                <Link to="/explore">Browse Artworks</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_390px]">
              <div className="space-y-5">
                {items.map((item) => {
                  const art = item.artworkId;

                  return (
                    <div
                      key={item._id}
                      className="rounded-[28px] border border-[#e6dfd4] bg-white p-5 shadow-[0_18px_50px_-35px_rgba(0,0,0,0.2)]"
                    >
                      <div className="flex gap-5">
                        <Link to={`/art/${art._id}`} className="shrink-0">
                          <div className="h-[135px] w-[115px] overflow-hidden rounded-[22px] bg-[#ede8df]">
                            <img
                              src={art.image}
                              alt={art.name}
                              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                          </div>
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                          <div>
                            <Link to={`/art/${art._id}`}>
                              <h3
                                className={`${headingFont} truncate text-[30px] leading-none text-[#111]`}
                              >
                                {art.name}
                              </h3>
                            </Link>

                            <p
                              className={`${bodyFont} mt-2 text-[13px] text-[#7b756d]`}
                            >
                              By {art.userId?.firstName || "Artist"}{" "}
                              {art.userId?.lastName || ""}
                            </p>

                            <p
                              className={`${bodyFont} mt-2 inline-flex rounded-full bg-[#f7f4ee] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#111]`}
                            >
                              {art.category}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item._id, Number(item.quantity || 1) - 1)}
                              disabled={Number(item.quantity || 1) <= 1}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d8d2c8] bg-white disabled:opacity-40"
                            >
                              -
                            </button>

                            <span className={`${bodyFont} min-w-[28px] text-center text-[14px] text-[#111]`}>
                              {item.quantity || 1}
                            </span>

                            <button
                              onClick={() => updateQuantity(item._id, Number(item.quantity || 1) + 1)}
                              disabled={Number(item.quantity || 1) >= Number(art.quantity || 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d8d2c8] bg-white disabled:opacity-40"
                            >
                              +
                            </button>

                            <span className={`${bodyFont} ml-2 text-[12px] text-[#777]`}>
                              Available: {art.quantity || 0}
                            </span>
                          </div>
                          <p
                            className={`${headingFont} mt-4 text-[26px] leading-none text-[#111]`}
                          >
                            ${Number(Number(art.price) * Number(item.quantity || 1)).toLocaleString()}
                          </p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d8d2c8] bg-white text-[#111] hover:bg-[#f7f4ee]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <aside className="h-fit rounded-[32px] border border-[#e6dfd4] bg-white p-6 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.2)]">
                <p
                  className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}
                >
                  Manual Payment
                </p>

                <h2
                  className={`${headingFont} mt-2 text-[36px] leading-none text-[#111]`}
                >
                  Checkout
                </h2>

                <div className="mt-5 grid gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("easypaisa")}
                    className={`${bodyFont} rounded-[20px] border p-4 text-left transition ${paymentMethod === "easypaisa"
                      ? "border-black bg-black text-white"
                      : "border-[#e6dfd4] bg-[#fbfaf7] text-[#111]"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-4 w-4" />
                      <div>
                        <p className="text-[13px] font-semibold">EasyPaisa</p>
                        <p className="mt-1 text-[12px] opacity-75">
                          03052367703
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("jazzcash")}
                    className={`${bodyFont} rounded-[20px] border p-4 text-left transition ${paymentMethod === "jazzcash"
                      ? "border-black bg-black text-white"
                      : "border-[#e6dfd4] bg-[#fbfaf7] text-[#111]"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-4 w-4" />
                      <div>
                        <p className="text-[13px] font-semibold">JazzCash</p>
                        <p className="mt-1 text-[12px] opacity-75">
                          03052367703
                        </p>
                      </div>
                    </div>
                  </button>
                </div>

                <div className={`${bodyFont} mt-5 space-y-3 text-[14px]`}>
                  <div className="flex justify-between text-[#6f6a63]">
                    <span>Items</span>
                    <span>{items.length}</span>
                  </div>

                  <div className="flex justify-between text-[#6f6a63]">
                    <span>Subtotal</span>
                    <span>${Number(totalPrice).toLocaleString()}</span>
                  </div>
                </div>

                <Separator className="my-5" />

                <div className="flex items-center justify-between">
                  <span
                    className={`${bodyFont} text-[14px] uppercase tracking-[0.18em] text-[#777]`}
                  >
                    Total
                  </span>

                  <span
                    className={`${headingFont} text-[34px] leading-none text-[#111]`}
                  >
                    ${Number(totalPrice).toLocaleString()}
                  </span>
                </div>

                <div className="mt-5">
                  <label
                    className={`${bodyFont} mb-2 flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-[#777]`}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    Location / Address
                  </label>

                  <textarea
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your delivery address..."
                    className={`${bodyFont} h-[95px] w-full resize-none rounded-[20px] border border-[#d8d2c8] bg-[#fbfaf7] p-4 text-[13px] outline-none focus:border-black`}
                  />
                </div>

                <div className="mt-4">
                  <label
                    className={`${bodyFont} mb-2 flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-[#777]`}
                  >
                    <Upload className="h-3.5 w-3.5" />
                    Payment Receipt
                  </label>

                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-[22px] border border-dashed border-[#d8d2c8] bg-[#fbfaf7] p-5 text-center transition hover:bg-[#f7f4ee]">
                    {paymentReceipt ? (
                      <img
                        src={paymentReceipt}
                        alt="Receipt"
                        className="max-h-[150px] rounded-[16px] object-contain"
                      />
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-[#777]" />
                        <p className={`${bodyFont} mt-3 text-[13px] text-[#6f6a63]`}>
                          Upload payment receipt
                        </p>
                      </>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleReceiptUpload(e.target.files?.[0])}
                    />
                  </label>
                </div>

                <Button
                  disabled={orderLoading}
                  className={`${bodyFont} mt-6 h-12 w-full rounded-full bg-black text-[13px] uppercase tracking-[0.16em] text-white hover:bg-black/90 disabled:opacity-60`}
                  onClick={handlePlaceOrder}
                >
                  {orderLoading ? "Placing Order..." : "Place Order"}
                </Button>

                <Button
                  variant="outline"
                  className={`${bodyFont} mt-3 h-12 w-full rounded-full border-[#d8d2c8] bg-white text-[13px] text-[#111] hover:bg-[#f7f4ee]`}
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;