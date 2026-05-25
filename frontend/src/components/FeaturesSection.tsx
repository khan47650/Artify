import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import picCollectors from "@/assets/for_collocters.jpg";
import picArtists from "@/assets/for_artists.jpg";
import picWorld from "@/assets/for_work.jpg";
import topDots from "/top_dots.png";

const features = [
  {
    image: picCollectors,
    eyebrow: "Collectors",
    title: "Discover Art With Meaning",
    description:
      "Explore original artworks from real artists, understand the story behind each piece, and collect with confidence.",
  },
  {
    image: picArtists,
    eyebrow: "Artists",
    title: "Share Your Creative Voice",
    description:
      "Artify gives artists a clean space to present their work, build trust, and reach people who value originality.",
  },
  {
    image: picWorld,
    eyebrow: "Marketplace",
    title: "Built Around Care",
    description:
      "Every artwork deserves context, visibility, and a thoughtful experience from discovery to collection.",
  },
];

const FeaturesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#F5F5F5] py-[105px]"
    >
      <img
        src={topDots}
        alt=""
        className="pointer-events-none absolute right-[80px] top-[135px] w-[120px] opacity-70"
      />

      <img
        src={topDots}
        alt=""
        className="pointer-events-none absolute -left-8 bottom-[80px] w-[115px] opacity-60"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1040px] px-6">
        <div className="mx-auto mb-[54px] max-w-[680px] text-center">
          <p
            className={`font-encode text-[11px] uppercase tracking-[0.32em] text-black/45 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
          >
            Why Artify
          </p>

          <h2
            className={`font-ivy mt-4 text-[40px] font-normal leading-[0.95] text-black md:text-[52px] transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
          >
            A More Thoughtful Way
            <br />
            to Experience Art
          </h2>

          <p
            className={`font-encode mx-auto mt-5 max-w-[560px] text-[13px] leading-6 text-black/60 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
          >
            Artify connects collectors and artists through a calm, curated, and
            story-driven marketplace designed for original digital art.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={`group overflow-hidden rounded-[26px] border border-black/10 bg-white shadow-[0_18px_45px_-35px_rgba(0,0,0,0.35)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_28px_65px_-38px_rgba(0,0,0,0.45)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
                }`}
              style={{
                transitionDelay: isVisible ? `${(index + 1) * 140}ms` : "0ms",
              }}
            >
              <div className="relative h-[245px] overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                <span className="font-encode absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-black">
                  {feature.eyebrow}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-ivy text-[25px] font-normal leading-none text-black">
                  {feature.title}
                </h3>

                <p className="font-encode mt-3 text-[12px] leading-5 text-black/55">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;