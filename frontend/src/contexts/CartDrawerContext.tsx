import { createContext, useContext, useState, ReactNode } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import explore1 from "@/assets/explore_1.png";
import explore2 from "@/assets/explore_2.png";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const cartItems = [
  { id: "1", image: explore1, title: "Echoes of Blue", artist: "Rhea Kim", price: 980, tag: "Original" },
  { id: "2", image: explore2, title: "Ethereal Motion", artist: "Sophia Laurent", price: 1800, tag: "Limited Offer" },
];

type CartDrawerContextType = {
  openCart: () => void;
  closeCart: () => void;
};

const CartDrawerContext = createContext<CartDrawerContextType | null>(null);

export const CartDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tax = 60;
  const total = subtotal + tax;

  return (
    <CartDrawerContext.Provider value={{ openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false) }}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-[999] bg-black/65">
          <button className="absolute inset-0" onClick={() => setIsOpen(false)} />

          <aside className="relative ml-auto flex h-full w-full max-w-[380px] flex-col bg-[#fbfaf7] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e6dfd4] px-5 py-4">
              <h1 className={`${headingFont} text-[28px] leading-none text-[#111]`}>Your Cart</h1>
              <button onClick={() => setIsOpen(false)}><X className="h-5 w-5" /></button>
            </div>

            <div className="flex-1 space-y-7 overflow-y-auto px-5 py-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <img src={item.image} alt={item.title} className="h-[84px] w-[84px] object-cover" />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className={`${headingFont} text-[18px] leading-none text-[#111]`}>{item.title}</h3>
                        <p className={`${bodyFont} mt-1 text-[11px] text-[#6f6a63]`}>By {item.artist}</p>
                      </div>

                      <span className={`${bodyFont} rounded-[2px] bg-black px-2 py-1 text-[8px] text-white`}>
                        {item.tag}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex h-8 w-[86px] items-center justify-between border border-[#111] px-3">
                        <button className={`${bodyFont}`}>−</button>
                        <span className={`${bodyFont} text-[12px]`}>1</span>
                        <button className={`${bodyFont}`}>+</button>
                      </div>

                      <p className={`${headingFont} text-[20px] leading-none text-[#111]`}>
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#e6dfd4] bg-[#f1f0ee] px-5 py-4">
              <div className={`${bodyFont} space-y-2 text-[12px] text-[#111]`}>
                <div className="flex justify-between">
                  <span>Total ({cartItems.length} items)</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate("/checkout");
                }}
                className={`${bodyFont} mt-4 flex h-11 w-full items-center justify-between rounded-full bg-black px-5 text-[13px] text-white`}
              >
                <span>Checkout | ${total.toLocaleString()}</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">→</span>
              </button>

              <p className={`${bodyFont} mt-3 text-center text-[10px] text-[#111]`}>
                Get it now before it sells out.
              </p>
            </div>
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