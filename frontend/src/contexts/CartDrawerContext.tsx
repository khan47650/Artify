import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { X, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

type CartDrawerContextType = {
  openCart: () => void;
  closeCart: () => void;
  refreshCart: () => void;
};

const CartDrawerContext = createContext<CartDrawerContextType | null>(null);

export const CartDrawerProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCart = async () => {
    if (!user?.id || user.role !== "buyer") {
      setCartItems([]);
      setTotalPrice(0);
      return;
    }

    try {
      const { data } = await api.get(`/cart/${user.id}`);
      setCartItems(data.cartItems || []);
      setTotalPrice(data.totalPrice || 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const removeItem = async (id: string) => {
    try {
      await api.delete(`/cart/${id}`);
      fetchCart();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Remove failed",
        variant: "destructive",
      });
    }
  };

  return (
    <CartDrawerContext.Provider
      value={{
        openCart: () => {
          setIsOpen(true);
          fetchCart();
        },
        closeCart: () => setIsOpen(false),
        refreshCart: fetchCart,
      }}
    >
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-[999] bg-black/65">
          <button className="absolute inset-0" onClick={() => setIsOpen(false)} />

          <aside className="relative ml-auto flex h-full w-full max-w-[410px] flex-col bg-[#fbfaf7] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e6dfd4] px-5 py-4">
              <div>
                <h1 className={`${headingFont} text-[30px] leading-none text-[#111]`}>
                  Your Cart
                </h1>
                <p className={`${bodyFont} mt-1 text-[12px] text-[#777]`}>
                  {cartItems.length} item{cartItems.length === 1 ? "" : "s"} added
                </p>
              </div>

              <button onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <h2 className={`${headingFont} text-[34px] leading-none text-[#111]`}>
                    Cart is empty
                  </h2>
                  <p className={`${bodyFont} mt-3 text-[13px] text-[#777]`}>
                    Add artwork from explore page.
                  </p>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/explore");
                    }}
                    className={`${bodyFont} mt-6 rounded-full bg-black px-6 py-2.5 text-[13px] text-white`}
                  >
                    Browse Artworks
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => {
                    const art = item.artworkId;

                    return (
                      <div key={item._id} className="flex items-start gap-4">
                        <Link
                          to={`/art/${art._id}`}
                          onClick={() => setIsOpen(false)}
                          className="shrink-0"
                        >
                          <img
                            src={art.image}
                            alt={art.name}
                            className="h-[92px] w-[92px] rounded-[18px] object-cover"
                          />
                        </Link>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className={`${headingFont} text-[22px] leading-none text-[#111]`}>
                                {art.name}
                              </h3>
                              <p className={`${bodyFont} mt-1 text-[12px] text-[#6f6a63]`}>
                                By {art.userId?.firstName || "Artist"} {art.userId?.lastName || ""}
                              </p>
                              <p className={`${bodyFont} mt-1 text-[11px] uppercase tracking-[0.18em] text-[#999]`}>
                                {art.category}
                              </p>
                            </div>

                            <button
                              onClick={() => removeItem(item._id)}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ddd6ca] bg-white text-[#111]"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <p className={`${headingFont} mt-3 text-[22px] leading-none text-[#111]`}>
                            ${Number(art.price).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-[#e6dfd4] bg-[#f1f0ee] px-5 py-4">
                <div className={`${bodyFont} space-y-2 text-[12px] text-[#111]`}>
                  <div className="flex justify-between">
                    <span>Total ({cartItems.length} items)</span>
                    <span>${Number(totalPrice).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/cart");
                  }}
                  className={`${bodyFont} mt-4 flex h-11 w-full items-center justify-between rounded-full bg-black px-5 text-[13px] text-white`}
                >
                  <span>View Cart</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">
                    →
                  </span>
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </CartDrawerContext.Provider>
  );
};

export const useCartDrawer = () => {
  const context = useContext(CartDrawerContext);
  if (!context) throw new Error("useCartDrawer must be used inside CartDrawerProvider");
  return context;
};