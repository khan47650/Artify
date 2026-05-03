import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import picCollectors from "@/assets/for_collocters.jpg";
import picArtists from "@/assets/for_artists.jpg";
import picWorld from "@/assets/for_work.jpg";
import topDots from "/top_dots.png";

const features = [
  {
    image: picCollectors,
    title: "For Collectors",
    description: "Buy original art directly from artists you believe in.",
  },
  {
    image: picArtists,
    title: "For Artists",
    description: "Share your work globally without losing control or voice.",
  },
  {
    image: picWorld,
    title: "For the Work",
    description: "Art deserves context, care, and permanence not trends.",
  },
];

const FeaturesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative min-h-screen bg-white py-[120px] overflow-hidden" ref={ref}>
      <img
        src={topDots}
        alt=""
        className="absolute right-[110px] top-[250px] w-[130px] opacity-100 pointer-events-none"
      />

      <img
        src={topDots}
        alt=""
        className="absolute left-[28px] bottom-[110px] w-[105px] opacity-100 pointer-events-none"
      />

      <div className="mx-auto w-full max-w-[860px] px-6 relative z-10">
        <h2
          className={`font-ivy text-[38px] md:text-[46px] font-normal leading-[0.95] text-center mb-[58px] text-black transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          A Thoughtful Way to Buy, Sell,<br />
          and Share Art
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[14px] items-start justify-center">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`relative flex flex-col items-center text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: isVisible ? `${(i + 1) * 150}ms` : "0ms" }}
            >
              <div className="group relative w-full max-w-[260px] h-[245px] rounded-[18px] overflow-hidden bg-white transition-all duration-300 ease-out hover:cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]">

                <img
                  src={f.image}
                  alt={f.title}
                  className="w-full h-full object-cover rounded-[18px] transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />

              </div>

              <div className="mt-3 max-w-[230px]">
                <h3 className="font-ivy text-[18px] font-semibold leading-tight text-black">
                  {f.title}
                </h3>

                <p className="font-encode mt-2 text-[12px] leading-[1.25] text-black/55">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
