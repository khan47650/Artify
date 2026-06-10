import splashGif from "@/assets/splash_gif.gif";

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black">
      <img
        src={splashGif}
        alt=""
        className="absolute inset-0 h-full w-full object-contain md:object-cover"
      />

      <h1 className="relative z-10 font-geller text-[32px] font-semibold tracking-[-0.04em] text-white sm:text-[50px] md:text-[70px] lg:text-[90px]">
        ARTIFY
      </h1>
    </div>
  );
};

export default SplashScreen;