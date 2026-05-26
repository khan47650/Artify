import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Link } from "react-router-dom";

const artworks = [
  { fileName: "WhatsApp Image 2026-04-12 at 12.55.17 AM0.jpeg", className: "left-[6%] top-[27%] h-[54px] w-[54px]" },
  { fileName: "WhatsApp Image 2026-04-12 at 12.55.17 AM4.jpeg", className: "left-[20%] top-[12%] h-[56px] w-[56px]" },
  { fileName: "WhatsApp Image 2026-04-12 at 12.55.17 AM3.jpeg", className: "left-[10%] top-[50%] h-[58px] w-[58px]" },
  { fileName: "WhatsApp Image 2026-04-12 at 12.55.17 AM1.jpeg", className: "right-[23%] top-[12%] h-[56px] w-[56px]" },
  { fileName: "6.jpeg", className: "right-[15%] top-[50%] h-[58px] w-[58px]" },
  { fileName: "WhatsApp Image 2026-04-12 at 12.55.17 AM2.jpeg", className: "left-[24%] top-[74%] h-[48px] w-[48px]" },
  { fileName: "WhatsApp Image 2026-04-12 at 12.55.17 AM.jpeg", className: "right-[25%] top-[74%] h-[48px] w-[48px]" },
  {
    fileName: "WhatsApp Image 2026-04-12 at 12.55.17 AM5.jpeg",
    className: "right-[7%] top-[30%] h-[54px] w-[54px]",
  },
];

const toPublicImagePath = (fileName: string) => `/${encodeURIComponent(fileName).replace(/%2F/g, "/")}`;

const StartGuide = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#ececec] py-[90px]" ref={ref}>
      <div className="mx-auto w-full max-w-[1040px] px-6 relative z-10 min-h-[420px]">
        <div className="pointer-events-none absolute right-0 top-[12%] hidden md:grid grid-cols-8 gap-3 opacity-45">
          {Array.from({ length: 32 }).map((_, idx) => (
            <span key={`rt-${idx}`} className="h-1.5 w-1.5 rounded-full bg-[#c6c6c6]" />
          ))}
        </div>

        <div className="pointer-events-none absolute left-0 bottom-[8%] hidden md:grid grid-cols-8 gap-3 opacity-45">
          {Array.from({ length: 32 }).map((_, idx) => (
            <span key={`lb-${idx}`} className="h-1.5 w-1.5 rounded-full bg-[#c6c6c6]" />
          ))}
        </div>

        {/* Scattered Images */}
        {artworks.map((art, i) => (
          <div
            key={i}
            className={`absolute hidden overflow-hidden rounded-2xl shadow-sm md:block ${art.className} transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            style={{
              transitionDelay: isVisible ? `${i * 80}ms` : "0ms",
            }}
          >
            <img
              src={toPublicImagePath(art.fileName)}
              alt="artwork"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>
        ))}

        {/* Center Content */}
        <div className="relative z-20 mx-auto flex min-h-[420px] max-w-[520px] flex-col items-center justify-center text-center">
          <div className="mb-3 grid w-full grid-cols-3 gap-2 md:hidden">
            {artworks.slice(0, 3).map((art, i) => (
              <div
                key={`mobile-${i}`}
                className={`aspect-square overflow-hidden rounded-lg transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                style={{ transitionDelay: isVisible ? `${120 + i * 80}ms` : "0ms" }}
              >
                <img
                  src={toPublicImagePath(art.fileName)}
                  alt="artwork"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
            ))}
          </div>

          <h2
            className={`font-ivy text-[34px] md:text-[40px] font-normal leading-none text-black mb-2 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
          >
            Not Sure Where to Start?
          </h2>
          <p
            className={`font-encode max-w-[430px] text-[12px] leading-[1.25] text-black/55 mb-7 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
          >
            Let our AI guide you to artworks that fit your space, light, and the way you want to live with art.
          </p>
          <Link
            to="/art-quiz"
            className={`font-encode inline-block rounded-full bg-black px-7 py-3 text-[12px] font-semibold text-white hover:bg-gray-800 transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
          >
            Find Art for My Space
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StartGuide;
