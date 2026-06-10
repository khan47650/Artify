import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

import truckIcon from "@/assets/truck.png";
import returnIcon from "@/assets/return.png";
import signatureIcon from "@/assets/signature.png";

import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useCartDrawer } from "@/contexts/CartDrawerContext";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const ArtDetail = () => {
  const { id } = useParams();

  const { toast } = useToast();
  const { user } = useAuth();
  const { openCart } = useCartDrawer();

  const [activeTab, setActiveTab] =
    useState<"about" | "reviews">("about");

  const [artwork, setArtwork] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [recommended, setRecommended] = useState<any[]>([]);

  const [reviewText, setReviewText] = useState("");

  const [loading, setLoading] = useState(true);

  const fetchArtwork = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(
        `/artworks?page=1&limit=100`
      );

      const foundArtwork = data.artworks.find(
        (item: any) => item._id === id
      );

      setArtwork(foundArtwork);

      const recommendedArts = data.artworks
        .filter((item: any) => item._id !== id)
        .slice(0, 3);

      setRecommended(recommendedArts);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Failed to fetch artwork",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await api.get(`/reviews/${id}`);

      setReviews(data.reviews || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArtwork();
    fetchReviews();
  }, [id]);

  const handleAddReview = async () => {
    if (!reviewText.trim()) {
      return toast({
        title: "Review required",
        description: "Please write your review.",
        variant: "destructive",
      });
    }

    try {
      await api.post("/reviews", {
        artworkId: id,
        userId: user?.id,
        review: reviewText,
      });

      setReviewText("");

      fetchReviews();

      toast({
        title: "Success",
        description: "Review added successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Failed to add review",
        variant: "destructive",
      });
    }
  };

  if (loading || !artwork) {
    return (
      <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#fbfaf7] text-[#1d1d1d]">
        <Navbar />

        <div className="mx-auto max-w-[1120px] px-4 pt-24">
          <div className="animate-pulse">
            <div className="h-[600px] rounded-[20px] bg-[#ececec]" />
          </div>
        </div>

        <Footer />
      </div>
    );
  };

  const handleAddToCart = async () => {
    if (!user?.id) {
      return toast({
        title: "Login required",
        description: "Please login as buyer to add artwork to cart.",
        variant: "destructive",
      });
    }

    try {
      const { data } = await api.post("/cart", {
        userId: user.id,
        artworkId: artwork._id,
      });

      toast({
        title: "Added to cart",
        description: data.message || "Artwork added to cart.",
      });

      openCart();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Add to cart failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#fbfaf7] text-[#1d1d1d]">
      <Navbar />

      <main className="w-full max-w-[100vw] overflow-x-hidden pt-20 pb-14">
        <div className="mx-auto w-full max-w-[1120px] overflow-hidden px-4 md:px-6">
          <p className={`${bodyFont} mb-4 text-[11px] text-[#777]`}>
            Home / Explore / Detail
          </p>

          <section className="grid min-w-0 gap-5 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <div className="relative h-[320px] overflow-hidden rounded-[4px] bg-[#ede8df] sm:h-[450px] lg:h-[650px]">
                <img
                  src={artwork.image}
                  alt={artwork.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-3 flex w-full rounded-full border-[3px] border-black bg-white p-[3px] sm:border-[5px]">
                <button
                  onClick={() => setActiveTab("about")}
                  className={`${bodyFont} flex-1 rounded-full py-2 text-[12px] ${activeTab === "about"
                    ? "bg-black text-white"
                    : "text-black"
                    }`}
                >
                  About
                </button>

                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`${bodyFont} flex-1 rounded-full py-2 text-[12px] ${activeTab === "reviews"
                    ? "bg-black text-white"
                    : "text-black"
                    }`}
                >
                  Reviews
                </button>
              </div>

              {activeTab === "about" ? (
                <div className="mt-5">
                  <p
                    className={`${bodyFont} text-[14px] leading-7 text-[#6f6a63]`}
                  >
                    {artwork.description}
                  </p>
                </div>
              ) : (
                <div className="mt-5">
                  {/* REVIEW INPUT */}

                  {user && (
                    <div className="overflow-hidden rounded-[18px] border border-[#ece6dc] bg-white p-4 sm:p-5">
                      <textarea
                        value={reviewText}
                        onChange={(e) =>
                          setReviewText(e.target.value)
                        }
                        placeholder="Write your review..."
                        className={`${bodyFont} h-[120px] w-full min-w-0 resize-none rounded-[16px] border border-[#ece6dc] bg-[#faf8f4] p-4 text-[13px] outline-none`}
                      />

                      <Button
                        onClick={handleAddReview}
                        className={`${bodyFont} mt-4 rounded-full bg-black px-6 text-[13px] text-white hover:bg-black/90`}
                      >
                        Submit Review
                      </Button>
                    </div>
                  )}

                  {/* REVIEWS */}

                  <div className="mt-5 space-y-4">
                    {reviews.length === 0 ? (
                      <div className="rounded-[16px] border border-[#eee8df] bg-white p-5 text-center">
                        <p
                          className={`${bodyFont} text-[13px] text-[#777]`}
                        >
                          No reviews yet.
                        </p>
                      </div>
                    ) : (
                      reviews.map((review) => (
                        <div
                          key={review._id}
                          className="rounded-[16px] border border-[#eee8df] bg-white p-5"
                        >
                          <div className="flex items-center gap-3">
                            {review.userId?.artistPhoto ? (
                              <img
                                src={review.userId.artistPhoto}
                                alt="user"
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-[#ececec]" />
                            )}

                            <div>
                              <h4
                                className={`${bodyFont} text-[13px] font-semibold`}
                              >
                                {review.userId?.firstName}{" "}
                                {review.userId?.lastName}
                              </h4>

                              <p
                                className={`${bodyFont} text-[10px] text-[#777]`}
                              >
                                {new Date(
                                  review.createdAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          <p
                            className={`${bodyFont} mt-4 text-[13px] leading-6 text-[#6f6a63]`}
                          >
                            {review.review}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <aside className="min-w-0 pt-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1
                    className={`${headingFont} break-words text-[30px] leading-none text-[#111] sm:text-[36px] lg:text-[40px]`}
                  >
                    {artwork.name}
                  </h1>

                  <p
                    className={`${bodyFont} mt-2 text-[13px] text-[#6f6a63]`}
                  >
                    {artwork.userId?.firstName}{" "}
                    {artwork.userId?.lastName}
                  </p>
                </div>
              </div>

              <p
                className={`${headingFont} mt-3 break-words text-[24px] leading-none text-[#111] sm:text-[28px]`}
              >
                ${Number(artwork.price).toLocaleString()}
              </p>

              <div
                className={`${bodyFont} mt-5 grid grid-cols-1 border border-[#111] text-center text-[13px] text-[#111] sm:grid-cols-2`}
              >
                <div className="border-b border-[#111] py-3 sm:border-b-0 sm:border-r">
                  {artwork.category}
                </div>

                <div className="py-3">
                  {artwork.dimensions || "Artwork"}
                </div>
              </div>

              {user?.role === "buyer" && (
                <Button
                  onClick={handleAddToCart}
                  className={`${bodyFont} mt-5 h-11 w-full rounded-full bg-black text-[13px] text-white hover:bg-black/90`}
                >
                  Add to Cart
                </Button>
              )}

              <div className="mt-5 border-t border-[#eee8df] pt-5">
                <div className="space-y-5">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <img
                      src={truckIcon}
                      alt="Shipping"
                      className="mt-1 h-6 w-6 object-contain"
                    />

                    <div>
                      <h3
                        className={`${headingFont} text-[24px] leading-none text-[#111]`}
                      >
                        Worldwide Shipping
                      </h3>

                      <p
                        className={`${bodyFont} mt-1 text-[12px] leading-4 text-[#7b756d]`}
                      >
                        Carefully packaged and fully insured.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <img
                      src={returnIcon}
                      alt="Returns"
                      className="mt-1 h-6 w-6 object-contain"
                    />

                    <div>
                      <h3
                        className={`${headingFont} text-[24px] leading-none text-[#111]`}
                      >
                        Easy Returns
                      </h3>

                      <p
                        className={`${bodyFont} mt-1 text-[12px] leading-4 text-[#7b756d]`}
                      >
                        Return support for damaged deliveries.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <img
                      src={signatureIcon}
                      alt="Certificate"
                      className="mt-1 h-6 w-6 object-contain"
                    />

                    <div>
                      <h3
                        className={`${headingFont} break-words text-[20px] leading-none text-[#111] sm:text-[24px]`}
                      >
                        Authentic Artwork
                      </h3>

                      <p
                        className={`${bodyFont} mt-1 text-[12px] leading-4 text-[#7b756d]`}
                      >
                        Verified and approved by Artify.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 overflow-hidden rounded-[26px] border border-[#eee8df] bg-white p-4 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.22)] sm:p-6">
                <p
                  className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#8a847c]`}
                >
                  Collector Assurance
                </p>

                <h3
                  className={`${headingFont} mt-3 break-words text-[24px] leading-none text-[#111] sm:text-[30px]`}
                >
                  Buy with confidence
                </h3>

                <p
                  className={`${bodyFont} mt-3 text-[13px] leading-6 text-[#6f6a63]`}
                >
                  Every artwork listed on Artify is reviewed before appearing in the
                  marketplace. Your purchase is handled through a trusted process
                  designed for collectors and artists.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[18px] bg-[#f7f4ee] p-4">
                    <h4
                      className={`${bodyFont} text-[12px] font-semibold uppercase tracking-[0.18em] text-[#111]`}
                    >
                      Verified
                    </h4>

                    <p
                      className={`${bodyFont} mt-2 text-[12px] leading-5 text-[#7b756d]`}
                    >
                      Approved artwork from Artify.
                    </p>
                  </div>

                  <div className="rounded-[18px] bg-[#f7f4ee] p-4">
                    <h4
                      className={`${bodyFont} text-[12px] font-semibold uppercase tracking-[0.18em] text-[#111]`}
                    >
                      Secure
                    </h4>

                    <p
                      className={`${bodyFont} mt-2 text-[12px] leading-5 text-[#7b756d]`}
                    >
                      Safe buying experience.
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-[18px] bg-black p-5 text-white">
                  <p
                    className={`${bodyFont} text-[11px] uppercase tracking-[0.22em] text-white/60`}
                  >
                    Artify Protection
                  </p>

                  <h4
                    className={`${headingFont} mt-2 break-words text-[22px] leading-none sm:text-[26px]`}
                  >
                    Trusted Marketplace
                  </h4>

                  <p
                    className={`${bodyFont} mt-3 text-[12px] leading-6 text-white/75`}
                  >
                    Secure artwork approval, verified artists, and premium collector
                    experience for every purchase.
                  </p>
                </div>
              </div>
            </aside>
          </section>

          {/* RECOMMENDED */}

          <section className="mt-12">
            <h2
              className={`${headingFont} mb-5 break-words text-[22px] leading-none sm:text-[25px]`}
            >
              Recommended Art
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {recommended.map((art: any) => (
                <Link
                  key={art._id}
                  to={`/art/${art._id}`}
                  className="group"
                >
                  <div className="relative mb-3 aspect-[1.05] overflow-hidden rounded-[18px] bg-[#ede8df]">
                    <img
                      src={art.image}
                      alt={art.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <button
                      type="button"
                      className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/85 shadow-sm"
                    >
                      <Heart className="h-3.5 w-3.5 text-[#1d1d1d]" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3
                        className={`${headingFont} break-words text-[18px] leading-none sm:text-[20px]`}
                      >
                        {art.name}
                      </h3>

                      <p
                        className={`${bodyFont} mt-1 text-[12px] text-[#7b756d]`}
                      >
                        {art.userId?.firstName}{" "}
                        {art.userId?.lastName}
                      </p>
                    </div>

                    <p
                      className={`${bodyFont} shrink-0 text-[13px] font-semibold`}
                    >
                      ${Number(art.price).toLocaleString()}
                    </p>
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