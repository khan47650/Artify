import { Link } from "react-router-dom";
import heroArt from "@/assets/Group2.png";
import topDots from "/top_dots.png";
import { useState } from "react";

const HeroSection = () => {
  const heroImages = ["/art_1.jpg", "/art_2.png", "/art_3.jpg"];

  const [activeImage, setActiveImage] = useState(heroImages[0]);

  return (
    <section id="hero-section" className="relative min-h-screen pt-[120px] pb-10 overflow-hidden bg-white flex items-center">
      <img
        src={topDots}
        alt=""
        className="absolute top-[120px] left-[44%] z-20 w-[165px] opacity-100 pointer-events-none" />
      <img
        src={topDots}
        alt=""
        className="absolute -bottom-[20px] right-[95%] z-0 w-[112px] opacity-100 pointer-events-none" />

      <div className="mx-auto w-full max-w-[1040px] px-6">
        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-7 items-center relative z-10">         {/* Main content */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h1
              className="font-ivy max-w-[400px] text-[48px] md:text-[54px] lg:text-[58px] font-normal leading-[0.98] tracking-[-0.035em] text-black"            >
              Collect Art That<br />
              Lives Beyond<br />
              Trends
            </h1>

            <div
              className="font-encode mt-5 max-w-[470px] text-black opacity-0 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <p className="text-[12px] leading-[1.25] text-black/85">
                Discover and collect original artworks from emerging and established
                artists thoughtfully curated.
              </p>
              <p className="mt-1 text-[14px] font-bold leading-[1.25] text-black">
                AI-guided recommendations curated for your space.
              </p>
              <p className="mt-4 text-[14px] leading-[1.25] text-black/85">
                Buy original art or share your work with collectors worldwide.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 opacity-0 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <a
                href="/explore"
                className="inline-flex h-[38px] min-w-[125px] items-center justify-center rounded-full bg-black px-6 text-[13px] font-medium text-white transition-colors hover:bg-black/85" >
                Explore Art
              </a>
              <a
                href="/ai-curator"
                className="inline-flex h-[38px] min-w-[175px] items-center justify-center rounded-full border border-black/60 bg-transparent px-6 text-[13px] font-medium text-black transition-colors hover:bg-black/5">
                Try AI Art Placement
              </a>
            </div>
          </div>

          {/* Hero image with decorative elements */}
          <div className="relative z-30 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>            <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full opacity-20 blur-3xl pointer-events-none"></div>

            {/* Decorative glow bottom left */}
            <div className="absolute -bottom-14 left-0 w-48 h-48 bg-gradient-to-tr from-blue-200 to-cyan-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
            {/* Main image container */}
            <div className="relative flex items-center gap-3 mx-auto md:ml-auto">

              {/* Thumbnails (LEFT SIDE) */}
              <div className="flex flex-col gap-3">
                {heroImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(image)}
                    className={`w-[48px] h-[48px] rounded-[10px] overflow-hidden border transition ${activeImage === image ? "border-black" : "border-transparent hover:border-gray-300"
                      }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}

                {/* Arrow button */}
                <Link
                  to="/explore"
                  className="w-[48px] h-[48px] flex items-center justify-center bg-black rounded-[10px]"
                >
                  <img
                    src="/arrow_up.png"
                    alt="arrow"
                    className="w-[18px] h-[18px]"
                  />
                </Link>
              </div>

              {/* Main Image */}
              <div className="relative w-[320px] h-[420px] rounded-[22px] overflow-hidden">
                <img
                  src={activeImage}
                  alt="art"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>

            {/* Wavy decoration bottom right */}
            <svg
              className="absolute -bottom-6 -right-6 w-56 h-40 opacity-50 pointer-events-none"
              viewBox="0 0 200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,60 Q50,20 100,60 T200,60"
                stroke="#f97316"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M0,80 Q50,40 100,80 T200,80"
                stroke="#fb923c"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M0,100 Q50,60 100,100 T200,100"
                stroke="#fdba74"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
