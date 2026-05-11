import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Heart, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import explore1 from "@/assets/explore_1.png";
import explore2 from "@/assets/explore_2.png";
import explore3 from "@/assets/explore_3.png";
import truckIcon from "@/assets/truck.png";
import returnIcon from "@/assets/return.png";
import signatureIcon from "@/assets/signature.png";
import { useCartDrawer } from "@/contexts/CartDrawerContext";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const artwork = {
  id: "explore-1",
  image: explore1,
  title: "Echoes of Blue",
  artist: "Ayesha Khan",
  price: 980,
  medium: "Acrylic on Linen",
  dimensions: "60 × 60 cm",
  year: 2024,
  style: "Abstract",
};

const recommended = [
  { id: "explore-2", image: explore2, title: "Quiet Visions", artist: "Danish Noor", price: 42000 },
  { id: "explore-3", image: explore3, title: "Ashes in Bloom", artist: "Nida Rehman", price: 52000 },
  { id: "explore-4", image: explore1, title: "Weight of Silence", artist: "Hamza Ali", price: 38000 },
];

const reviews = [
  {
    name: "Jasper",
    time: "2 Weeks ago",
    image: explore2,
    text: "Got this to keep my husband warm on these chilly lake fall days. He loves it a lot and it is pretty warm.",
  },
  {
    name: "Elena",
    time: "3 Days ago",
    image: explore3,
    text: "Great quality, warm and super comfy. Got the XL, just okay, large but good fit for comfort.",
  },
];

const ArtDetail = () => {
  const [activeTab, setActiveTab] = useState<"about" | "reviews">("reviews");
  const navigate = useNavigate();
  const { openCart } = useCartDrawer();

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#1d1d1d]">
      <Navbar />

      <main className="pt-20 pb-14">
        <div className="mx-auto max-w-[1120px] px-4 md:px-6">
          <p className={`${bodyFont} mb-4 text-[11px] text-[#777]`}>
            Home / Collection / Abstract & Experimental / Detail
          </p>

          <section className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <div className="relative h-[650px] overflow-hidden rounded-[4px] bg-[#ede8df]">
                <span className={`${bodyFont} absolute left-3 top-3 z-10 rounded-[2px] bg-white px-2 py-1 text-[9px] text-black`}>
                  Original
                </span>
                <img src={artwork.image} alt={artwork.title} className="h-full w-full object-cover" />
              </div>

              <div className="mt-3 flex rounded-full border-[5px] border-black bg-white p-[3px]">
                <button
                  onClick={() => setActiveTab("about")}
                  className={`${bodyFont} flex-1 rounded-full py-2 text-[12px] ${activeTab === "about" ? "bg-black text-white" : "text-black"
                    }`}
                >
                  About {artwork.title}
                </button>

                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`${bodyFont} flex-1 rounded-full py-2 text-[12px] ${activeTab === "reviews" ? "bg-black text-white" : "text-black"
                    }`}
                >
                  Reviews
                </button>
              </div>

              {activeTab === "about" ? (
                <div className="mt-5">
                  <h2 className={`${headingFont} text-[21px] leading-none`}>
                    A quiet reflection of depth, movement, and atmosphere.
                  </h2>

                  <p className={`${bodyFont} mt-3 text-[13px] leading-6 text-[#6f6a63]`}>
                    “Echoes of Blue” blends layered textures and delicate abstraction into a calm visual rhythm,
                    making it ideal for refined interiors and collectors seeking a timeless statement piece.
                  </p>

                  <h3 className={`${headingFont} mt-7 text-[20px] leading-none`}>Artist Note</h3>

                  <p className={`${bodyFont} mt-3 text-[13px] leading-6 text-[#6f6a63]`}>
                    This work explores silence, distance, and memory through washed pigments, textured surfaces,
                    and soft transitions.
                  </p>
                </div>
              ) : (
                <div className="mt-4">
                  <div className="rounded-[3px] bg-[#f1f0ee] p-6">
                    <div className="flex items-center justify-between gap-8">
                      <div>
                        <p className={`${headingFont} text-[42px] leading-none`}>
                          4.5<span className={`${bodyFont} text-[18px] text-[#8b857d]`}> /5</span>
                        </p>
                        <p className={`${bodyFont} mt-3 text-[12px] text-[#777]`}>(25 new reviews)</p>
                      </div>

                      <div className={`${bodyFont} flex-1 space-y-2 text-[12px]`}>
                        {[5, 4, 3, 2, 1].map((item, index) => (
                          <div key={item} className="flex items-center gap-2">
                            <span className="text-[#ff9d00]">★</span>
                            <div className="h-1.5 flex-1 rounded-full bg-white">
                              <div className="h-1.5 rounded-full bg-black" style={{ width: `${90 - index * 16}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    {reviews.map((review) => (
                      <div key={review.name} className="rounded-[16px] border border-[#eee8df] bg-white p-5">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <img src={review.image} alt={review.name} className="h-9 w-9 rounded-full object-cover" />
                            <div>
                              <h4 className={`${bodyFont} text-[13px] font-semibold`}>{review.name}</h4>
                              <div className="flex gap-0.5 text-[#ff9d00]">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-current" />
                                ))}
                              </div>
                            </div>
                          </div>

                          <p className={`${bodyFont} text-[10px] text-[#777]`}>{review.time}</p>
                        </div>

                        <p className={`${bodyFont} mt-4 text-[12px] leading-5 text-[#6f6a63]`}>
                          {review.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="pt-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className={`${headingFont} text-[40px] leading-none text-[#111]`}>
                    {artwork.title}
                  </h1>

                  <div className={`${bodyFont} mt-1 flex items-center gap-2 text-[12px] text-[#5f5a54]`}>
                    <span className="tracking-[1px] text-[#f5a000]">★★★★★</span>
                    <span>5.0 (2 Reviews)</span>
                  </div>
                </div>

                <span className={`${bodyFont} mt-1 rounded-[2px] bg-black px-3 py-1 text-[9px] text-white`}>
                  Original
                </span>
              </div>

              <p className={`${headingFont} mt-3 text-[28px] leading-none text-[#111]`}>
                ${artwork.price.toLocaleString()}
              </p>

              <div className={`${bodyFont} mt-5 grid grid-cols-2 border border-[#111] text-center text-[13px] text-[#111]`}>
                <div className="border-r border-[#111] py-3">{artwork.medium}</div>
                <div className="py-3">{artwork.dimensions}</div>
              </div>

              <Button
                onClick={openCart}
                className={`${bodyFont} mt-5 h-11 w-full rounded-full bg-black text-[13px] text-white hover:bg-black/90`}
              >
                Add to Cart
              </Button>

              <div className="mt-5 border-t border-[#eee8df] pt-5">
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <img src={truckIcon} alt="Shipping" className="mt-1 h-6 w-6 object-contain" />
                    <div>
                      <h3 className={`${headingFont} text-[24px] leading-none text-[#111]`}>
                        Worldwide Shipping
                      </h3>
                      <p className={`${bodyFont} mt-1 text-[12px] leading-4 text-[#7b756d]`}>
                        Carefully packaged and fully insured for global delivery.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <img src={returnIcon} alt="Returns" className="mt-1 h-6 w-6 object-contain" />
                    <div>
                      <h3 className={`${headingFont} text-[24px] leading-none text-[#111]`}>
                        Easy Returns
                      </h3>
                      <p className={`${bodyFont} mt-1 text-[12px] leading-4 text-[#7b756d]`}>
                        7-day return window if the artwork arrives damaged.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <img src={signatureIcon} alt="Certificate" className="mt-1 h-6 w-6 object-contain" />
                    <div>
                      <h3 className={`${headingFont} text-[24px] leading-none text-[#111]`}>
                        Certificate of Authenticity
                      </h3>
                      <p className={`${bodyFont} mt-1 text-[12px] leading-4 text-[#7b756d]`}>
                        Signed and issued by the artist.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-[#eee8df] pt-5">
                <h3 className={`${headingFont} text-[24px] leading-none text-[#111]`}>
                  Sustainability
                </h3>

                <ul className={`${bodyFont} mt-3 space-y-2 text-[12px] text-[#6f6a63]`}>
                  <li>◎ Ethically sourced materials</li>
                  <li>◎ Low-impact pigments</li>
                  <li>◎ Studio-based, small-batch creation</li>
                </ul>
              </div>

              <div className="mt-5 border-t border-[#eee8df]">
                <button className={`${headingFont} flex w-full items-center justify-between py-4 text-left text-[24px] leading-none text-[#111]`}>
                  Artwork Details
                  <span className={`${bodyFont} text-[18px]`}>+</span>
                </button>
              </div>

              <div className="border-t border-[#eee8df]">
                <button className={`${headingFont} flex w-full items-center justify-between py-4 text-left text-[24px] leading-none text-[#111]`}>
                  Placement Guidance
                  <span className={`${bodyFont} text-[18px]`}>+</span>
                </button>
              </div>
            </aside>
          </section>

          <section className="mt-12">
            <h2 className={`${headingFont} mb-5 text-[25px] leading-none`}>Recommended Art</h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {recommended.map((art, index) => (
                <Link key={art.id} to={`/art/${art.id}`} className="group">
                  <div className="relative mb-3 aspect-[1.05] overflow-hidden rounded-[18px] bg-[#ede8df]">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    <button
                      type="button"
                      className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/85 shadow-sm"
                    >
                      <Heart className="h-3.5 w-3.5 text-[#1d1d1d]" />
                    </button>

                    {index === 0 && (
                      <span className={`${bodyFont} absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[9px] uppercase`}>
                        Sold out
                      </span>
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className={`${headingFont} text-[20px] leading-none`}>{art.title}</h3>
                      <p className={`${bodyFont} mt-1 text-[12px] text-[#7b756d]`}>{art.artist}</p>
                    </div>
                    <p className={`${bodyFont} text-[13px] font-semibold`}>${art.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtDetail;