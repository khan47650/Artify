import artNew from "@/assets/ai_curator_new.png";
import galleryInterior from "@/assets/gallery-interior.jpg";
import artMixedMedia from "@/assets/potraits.jpg";
import heroArt from "@/assets/stillness.jpg";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import leftOrangeLines from "@/assets/left_orange_lines.png";

const pickedArtworks = [
  {
    id: "1",
    image: artNew,
    title: "New Arrivals",
    description: "Fresh artworks and recently added creative pieces.",
  },
  {
    id: "2",
    image: artMixedMedia,
    title: "Abstract & Experimental",
    description: "Bold forms, layered emotions, and expressive visual ideas.",
  },
  {
    id: "3",
    image: heroArt,
    title: "Portraits & Identity",
    description: "Human stories, character, memory, and personal expression.",
  },
  {
    id: "4",
    image: galleryInterior,
    title: "Stillness & Minimalism",
    description: "Calm compositions for refined and quiet spaces.",
  },
];

const CuratorPicks = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white pt-[110px] pb-[70px] md:pt-[135px] md:pb-[90px]"
    >
      <img
        src={leftOrangeLines}
        alt=""
        className="pointer-events-none absolute left-0 top-[70px] w-[120px] md:top-[95px] md:w-[130px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 md:px-10">
        <div className="mb-7 md:mb-10">
          <p
            className={`font-encode text-[10px] uppercase tracking-[0.3em] text-black/40 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
          >
            Curated Discovery
          </p>

          <h2
            className={`font-ivy mt-3 text-left text-[32px] font-normal leading-none text-black transition-all duration-700 md:text-[44px] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
          >
            AI + Curator Picks
          </h2>

          <p
            className={`font-encode mt-3 max-w-[650px] text-[12px] leading-5 text-black/55 transition-all duration-700 md:text-[14px] md:leading-6 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            style={{ transitionDelay: isVisible ? "100ms" : "0ms" }}
          >
            Explore curated directions that help visitors understand different
            moods, styles, and collecting paths before browsing the marketplace.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-7 md:grid-cols-4 md:gap-4">
          {pickedArtworks.map((art, index) => (
            <article
              key={art.id}
              className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              style={{
                transitionDelay: isVisible ? `${(index + 1) * 120}ms` : "0ms",
              }}
            >
              <div className="group h-[125px] overflow-hidden rounded-[16px] bg-white shadow-[0_12px_35px_-28px_rgba(0,0,0,0.45)] sm:h-[160px] md:h-[190px] md:rounded-[18px]">
                <img
                  src={art.image}
                  alt={art.title}
                  className="h-full w-full rounded-[18px] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
              </div>

              <h3 className="font-ivy mt-3 text-center text-[14px] font-semibold leading-tight text-black md:text-[18px]">
                {art.title}
              </h3>

              <p className="font-encode mx-auto mt-2 max-w-[230px] text-center text-[11px] leading-4 text-black/50 md:text-[12px] md:leading-5">
                {art.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratorPicks;