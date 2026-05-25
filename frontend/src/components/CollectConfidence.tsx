import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import topDots from "/top_dots.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

import certificateIcon from "@/assets/cirtificate_authenticity.png";
import directArtistIcon from "@/assets/direct_artist.png";
import shieldIcon from "@/assets/shield.png";
import worldIcon from "@/assets/world.png";
import curatedIcon from "@/assets/curated_section.png";

const trustItems = [
  {
    icon: certificateIcon,
    title: "Certificate of Authenticity",
    description:
      "Every artwork includes a signed certificate issued by the artist, ensuring provenance and originality.",
  },
  {
    icon: directArtistIcon,
    title: "Direct Artist Collaboration",
    description:
      "We work directly with artists not intermediaries, no mass reproduction.",
  },
  {
    icon: shieldIcon,
    title: "Secure Payments",
    description:
      "All transactions are protected with industry standard encryption and trusted payment providers.",
  },
  {
    icon: worldIcon,
    title: "Worldwide Shipping",
    description:
      "Carefully packaged and fully insured delivery to collectors around the world.",
  },
  {
    icon: curatedIcon,
    title: "Curated Selection",
    description:
      "Every artwork is reviewed to maintain quality, originality, and integrity across the platform.",
  },
];

const cardClasses =
  "rounded-2xl md:rounded-3xl bg-background px-3 md:px-6 py-3 md:py-7 text-center shadow-sm";

const CollectConfidence = () => {
  const { ref, isVisible } = useScrollAnimation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const showJoinCard = !user || user.role === "admin";

  const handleJoinCircle = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role === "admin") {
      return;
    }
  };

  return (
    <section className="relative min-h-screen bg-[#F5F5F5] py-[70px] overflow-hidden" ref={ref}>
      <img
        src={topDots}
        alt=""
        className="absolute right-[110px] top-[55px] w-[120px] pointer-events-none"
      />

      <img
        src={topDots}
        alt=""
        className="absolute left-[20px] bottom-[130px] w-[110px] pointer-events-none"
      />

      <div className="mx-auto w-full max-w-[980px] px-6 text-center relative z-10">
        <h2
          className={`font-ivy text-[36px] md:text-[42px] font-normal leading-none text-black transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          Collect With Confidence
        </h2>

        <p
          className={`font-encode mx-auto mt-2 max-w-[520px] text-[12px] leading-[1.25] text-black/55 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          style={{ transitionDelay: isVisible ? "80ms" : "0ms" }}
        >
          Every artwork is handled with care, transparency, and respect for both artist and collector.
        </p>

        <div className="mt-9">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trustItems.slice(0, 3).map((item, i) => (
              <div
                key={item.title}
                className={`rounded-[14px] bg-white px-7 py-7 text-center transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                style={{ transitionDelay: isVisible ? `${(i + 1) * 110}ms` : "0ms" }}
              >
                <img src={item.icon} alt="" className="mx-auto h-[32px] w-[32px] object-contain" />

                <h3 className="font-ivy mt-4 text-[18px] font-semibold leading-tight text-black">
                  {item.title}
                </h3>

                <p className="font-encode mt-2 text-[12px] leading-[1.25] text-black/55">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-4 grid w-full grid-cols-1 md:w-[68%] md:grid-cols-2 gap-4">
            {trustItems.slice(3).map((item, i) => (
              <div
                key={item.title}
                className={`rounded-[14px] bg-white px-7 py-7 text-center transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                style={{ transitionDelay: isVisible ? `${(i + 4) * 110}ms` : "0ms" }}
              >
                <img src={item.icon} alt="" className="mx-auto h-[32px] w-[32px] object-contain" />

                <h3 className="font-ivy mt-4 text-[18px] font-semibold leading-tight text-black">
                  {item.title}
                </h3>

                <p className="font-encode mt-2 text-[12px] leading-[1.25] text-black/55">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {showJoinCard && (
          <div className="mt-[70px] px-4">
            {/* white outer card */}
            <div className=" bg-white p-3 md:p-4 shadow-sm">

              {/* black inner card */}
              <div className="rounded-[30px] bg-black px-8 py-8 text-white overflow-hidden relative">
                <div
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{
                    backgroundImage:
                      "linear-gradient(#151515 2px, transparent 2px), linear-gradient(90deg, #151515 2px, transparent 2px)",
                    backgroundSize: "130px 58px",
                  }}
                />

                <div className="relative z-10 flex items-center justify-between gap-6">
                  <div className="text-left">
                    <h3 className="font-ivy text-[34px] font-normal leading-none text-white">
                      Stay Connected to the Art World
                    </h3>
                    <p className="font-encode mt-2 text-[12px] text-white/45">
                      New collections, artist stories, and exhibitions delivered thoughtfully.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleJoinCircle}
                    className="font-encode shrink-0 rounded-full bg-white px-7 py-3 text-[12px] font-semibold text-black transition-colors hover:bg-white/85"
                  >
                    Join the Circle
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CollectConfidence;
