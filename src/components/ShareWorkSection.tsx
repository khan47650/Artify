import shareYourWorkImage from "@/assets/share_your_work.png";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import orangeLines from "@/assets/left_orange_lines.png";
import topDots from "/top_dots.png";

const ShareWorkSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative bg-white pt-[90px] md:pt-[140px] pb-[60px] md:pb-[120px] overflow-hidden" ref={ref}>
      <div className="mx-auto w-full max-w-[1180px] px-0 md:px-0">
        <div className="relative bg-white">
          <img
            src={orangeLines}
            alt=""
            className="pointer-events-none absolute -left-[35px] top-[8px] md:-left-[90px] md:top-[-10%] z-20 w-[110px] md:w-[165px]"
          />

          <img
            src={topDots}
            alt=""
            className="pointer-events-none absolute bottom-[190px] right-[20px] md:top-[90%] md:left-[540px] z-0 w-[90px] md:w-[150px]"
          />

          <div className="grid items-center gap-8 md:gap-[100px] lg:grid-cols-[580px_1fr]">
            <div
              className={`relative transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
            >
              <div className="relative overflow-hidden rounded-[14px]">
                <img
                  src={shareYourWorkImage}
                  alt="Person viewing artwork in a gallery"
                  className="h-[260px] w-full md:h-[360px] md:w-[580px] object-cover"
                />
              </div>
            </div>

            <div
             className={`px-5 md:px-0 max-w-[470px] transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
              style={{ transitionDelay: isVisible ? "180ms" : "0ms" }}
            >
              <h2 className="font-ivy text-[36px] md:text-[50px] font-normal leading-[0.95] tracking-[-0.02em] text-black">
                Share Your Work
                <br />
                With Collectors
              </h2>

              <p className="font-encode mt-4 md:mt-6 max-w-[430px] text-[12px] md:text-[15px] leading-[1.35] md:leading-[1.45] text-black/55">
                Join as an independent artist and reach global buyers. Share your work with collectors who value originality, process, and intention.
              </p>

              <a
                href="/sell"
                className="font-encode mt-6 md:mt-12 inline-flex items-center justify-center rounded-full bg-black px-7 md:px-8 py-3 text-[12px] font-semibold text-white transition-colors hover:bg-black/85"
              >
                Start Selling on Artify
              </a>

              <p className="font-encode mt-3 text-[10px] md:text-[11px] leading-5 text-black/55">
                <span className="font-medium text-black/72">Note:</span> Applications are reviewed to maintain curatorial quality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareWorkSection;
