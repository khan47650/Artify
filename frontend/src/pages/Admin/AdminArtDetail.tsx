import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaStar,
} from "react-icons/fa";

import art1 from "@/assets/explore_1.png";
import truckIcon from "@/assets/truck.png";
import returnIcon from "@/assets/return.png";
import signatureIcon from "@/assets/signature.png";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const reviews = [
  {
    name: "Jasper",
    time: "2 Weeks ago",
    text: "Amazing texture and premium quality artwork.",
  },

  {
    name: "Elena",
    time: "5 Days ago",
    text: "Looks beautiful in my living room interior.",
  },
];

const artwork = {
  title: "Echoes Of Blue",
  artist: "Sophia Laurent",
  image: art1,
  price: "$1,200",
  medium: "Acrylic on Canvas",
  dimensions: "60 × 60 cm",
};

const AdminArtDetail = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<
    "about" | "reviews"
  >("about");

  return (
    <div className="min-h-screen bg-[#fbfaf7]">
      <main className="px-4 py-8 md:px-6">
        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className={`${bodyFont} mb-6 inline-flex items-center gap-2 rounded-full border border-[#d8d2c8] bg-white px-5 py-2 text-[12px] text-[#111] hover:bg-[#f7f4ee]`}
        >
          <FaArrowLeft />
          Back
        </button>

        <section className="grid gap-6 xl:grid-cols-[1fr_0.92fr]">
          {/* LEFT */}
          <div>
            <div className="overflow-hidden rounded-[30px] border border-[#e6dfd4] bg-white">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="h-[650px] w-full object-cover"
              />
            </div>

            {/* TABS */}
            <div className="mt-4 flex rounded-full border-[5px] border-black bg-white p-[3px]">
              <button
                onClick={() => setActiveTab("about")}
                className={`${bodyFont} flex-1 rounded-full py-2 text-[12px] ${
                  activeTab === "about"
                    ? "bg-black text-white"
                    : "text-black"
                }`}
              >
                About Artwork
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
                className={`${bodyFont} flex-1 rounded-full py-2 text-[12px] ${
                  activeTab === "reviews"
                    ? "bg-black text-white"
                    : "text-black"
                }`}
              >
                Reviews
              </button>
            </div>

            {/* ABOUT */}
            {activeTab === "about" ? (
              <div className="mt-5 rounded-[28px] border border-[#e6dfd4] bg-white p-6">
                <h2
                  className={`${headingFont} text-[30px] leading-none text-[#111]`}
                >
                  Premium Abstract Collection
                </h2>

                <p
                  className={`${bodyFont} mt-4 text-[13px] leading-6 text-[#6f6a63]`}
                >
                  This artwork reflects calm textures,
                  emotional depth and layered abstract
                  movement for modern interiors.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Info
                    label="Artist"
                    value={artwork.artist}
                  />

                  <Info
                    label="Medium"
                    value={artwork.medium}
                  />

                  <Info
                    label="Dimensions"
                    value={artwork.dimensions}
                  />

                  <Info
                    label="Price"
                    value={artwork.price}
                  />
                </div>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.name}
                    className="rounded-[24px] border border-[#e6dfd4] bg-white p-5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3
                          className={`${headingFont} text-[24px] leading-none`}
                        >
                          {review.name}
                        </h3>

                        <div className="mt-2 flex gap-1 text-[#f5a000]">
                          {Array.from({ length: 5 }).map(
                            (_, i) => (
                              <FaStar key={i} />
                            )
                          )}
                        </div>
                      </div>

                      <p
                        className={`${bodyFont} text-[11px] text-[#777]`}
                      >
                        {review.time}
                      </p>
                    </div>

                    <p
                      className={`${bodyFont} mt-4 text-[13px] leading-6 text-[#6f6a63]`}
                    >
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <aside>
            <div className="rounded-[30px] border border-[#e6dfd4] bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1
                    className={`${headingFont} text-[48px] leading-none text-[#111]`}
                  >
                    {artwork.title}
                  </h1>

                  <p
                    className={`${bodyFont} mt-2 text-[13px] text-[#777]`}
                  >
                    by {artwork.artist}
                  </p>
                </div>

                <span
                  className={`${bodyFont} rounded-full bg-black px-4 py-1 text-[10px] text-white`}
                >
                  Live
                </span>
              </div>

              <p
                className={`${headingFont} mt-5 text-[34px] leading-none`}
              >
                {artwork.price}
              </p>

              {/* ACTIONS */}
              <div className="mt-6 flex gap-3">
                <button
                  className={`${bodyFont} inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-[13px] text-white hover:bg-black/90`}
                >
                  <FaEdit />
                  Edit Artwork
                </button>

                <button
                  className={`${bodyFont} inline-flex items-center gap-2 rounded-full border border-[#d8d2c8] bg-[#f7f4ee] px-6 py-3 text-[13px] text-[#111] hover:bg-[#ece6dc]`}
                >
                  <FaTrash />
                  Delete
                </button>
              </div>

              {/* FEATURES */}
              <div className="mt-7 space-y-5 border-t border-[#eee8df] pt-6">
                <Feature
                  icon={truckIcon}
                  title="Worldwide Shipping"
                  text="Carefully packaged and insured delivery."
                />

                <Feature
                  icon={returnIcon}
                  title="Easy Returns"
                  text="7-day return support available."
                />

                <Feature
                  icon={signatureIcon}
                  title="Authenticity"
                  text="Official artist signed certificate."
                />
              </div>

              {/* FOOTER BOX */}
              <div className="mt-7 rounded-[24px] bg-[#f7f4ee] p-5">
                <h3
                  className={`${headingFont} text-[26px] leading-none`}
                >
                  Admin Notes
                </h3>

                <p
                  className={`${bodyFont} mt-3 text-[13px] leading-6 text-[#6f6a63]`}
                >
                  This artwork is currently active and
                  visible in the marketplace.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
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
    <div className="rounded-[20px] bg-[#faf8f4] p-4">
      <p
        className={`${bodyFont} text-[10px] uppercase tracking-[0.22em] text-[#777]`}
      >
        {label}
      </p>

      <h3
        className={`${headingFont} mt-3 text-[24px] leading-none text-[#111]`}
      >
        {value}
      </h3>
    </div>
  );
};

const Feature = ({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) => {
  return (
    <div className="flex gap-4">
      <img
        src={icon}
        alt={title}
        className="mt-1 h-6 w-6 object-contain"
      />

      <div>
        <h3
          className={`${headingFont} text-[24px] leading-none text-[#111]`}
        >
          {title}
        </h3>

        <p
          className={`${bodyFont} mt-2 text-[12px] leading-5 text-[#6f6a63]`}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default AdminArtDetail;