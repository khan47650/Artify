import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import mainImage from "@/assets/form_the_studio.jpg";
import leftImage1 from "@/assets/form_the_studio_1.jpg";
import leftImage2 from "@/assets/form_the_studio_2.jpg";
import leftImage3 from "@/assets/form_the_studio_3.jpg";


const leftCards = [
  {
    image: leftImage1,
    title: "Inside the Studio: Where Silence Becomes Form",
    note: "(Artist studio visit / feature story)",
  },
  {
    image: leftImage2,
    title: "How to Begin Collecting Art Without Chasing Trends",
    note: "(Collector education — very high trust)",
  },
  {
    image: leftImage3,
    title: "Living With Art: How Space Changes Meaning",
    note: "",
  },
];

const rightStories = [
  {
    title: "Living With Art: How Space Changes Meaning",
    note: "(Art placement / emotional connection)",
  },
  {
    title: "The Language of Texture: Why Material Matters",
    note: "(Process + craft insight)",
  },
  {
    title: "How to Begin Collecting Art Without Chasing Trends",
    note: "(Collector education — very high trust)",
  },
  {
    title: "Inside the Studio: Where Silence Becomes Form",
    note: "(Artist studio visit)",
  },
  {
    title: "Inside the Studio: Where Silence Becomes Form",
    note: "(Artist studio visit)",
  },
];

const BlogSection = () => {
  const { ref, isVisible } = useScrollAnimation();


  return (
    <section className="relative bg-white pt-[90px] md:pt-[95px] pb-[40px] md:pb-[45px]" ref={ref}>
     <div className="mx-auto w-full max-w-[1080px] px-3 md:px-6">
        <div
          className={`relative overflow-hidden rounded-[22px] md:rounded-[34px] bg-[#050505] px-4 md:px-10 py-5 md:py-7 text-white transition-all duration-700  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(#151515 2px, transparent 2px), linear-gradient(90deg, #151515 2px, transparent 2px)",
              backgroundSize: "150px 82px",
            }}
          />

          <div className="relative z-10">
            <header className="mb-4 md:mb-5 text-center">
              <h2 className="font-ivy text-[30px] md:text-[46px] font-normal leading-[0.92] text-white">
                From the Studio &amp; Beyond
              </h2>
             <p className="font-encode mx-auto mt-2 max-w-[260px] md:max-w-none text-[9px] md:text-[12px] leading-[1.25] text-white/45">
                Stories, insights, and perspectives that explore how art is made, collected, and lived with.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-[150px_520px_220px] gap-5 items-start justify-center">
              <aside className="hidden md:block space-y-4">
                {leftCards.map((card) => (
                  <article key={card.title}>
                    <div className="group h-[92px] overflow-hidden rounded-[8px]">
                      <img src={card.image} alt={card.title} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]" />
                    </div>
                    <h3 className="font-ivy mt-2 text-[13px] italic leading-[1.1] text-white">
                      {card.title}
                    </h3>
                    {card.note && (
                      <p className="font-encode mt-1 text-[10px] leading-tight text-white/35">
                        {card.note}
                      </p>
                    )}
                  </article>
                ))}
              </aside>

              <article>
                <div className="group h-[230px] w-full md:h-[330px] md:w-[520px] overflow-hidden rounded-[14px] md:rounded-[16px]">
                  <img src={mainImage} alt="From the studio" className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                </div>
                <h3 className="font-ivy mt-3 text-[12px] md:text-[14px] italic leading-tight text-white">
                  Emerging Voices and the Evolution of Contemporary Artistic Practice
                </h3>
                <p className="font-encode mt-1 text-[10px] text-white/35">
                  (Artist discovery / cultural depth)
                </p>
              </article>

             <aside className="hidden md:block space-y-6 pt-1">
                {rightStories.map((story, index) => (
                  <article key={`${story.title}-${index}`}>
                    <h3 className="font-ivy text-[13px] italic leading-[1.15] text-white">
                      {story.title}
                    </h3>
                    <p className="font-encode mt-1 text-[10px] leading-tight text-white/35">
                      {story.note}
                    </p>
                  </article>
                ))}
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
