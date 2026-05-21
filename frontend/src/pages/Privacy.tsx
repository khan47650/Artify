import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FaShieldAlt,
  FaLock,
  FaUserSecret,
  FaCookieBite,
  FaDatabase,
  FaEnvelope,
  FaUserCheck,
  FaGlobe,
} from "react-icons/fa";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const sections = [
  {
    icon: FaDatabase,
    title: "Information We Collect",
    points: [
      "Name and email address.",
      "Account login details.",
      "Payment-related information.",
      "Buying and selling activity on Artify.",
    ],
  },

  {
    icon: FaUserSecret,
    title: "How We Use Your Information",
    points: [
      "Create and manage user accounts.",
      "Process buyer and seller transactions.",
      "Improve platform experience.",
      "Send important updates and support responses.",
    ],
  },

  {
    icon: FaShieldAlt,
    title: "Data Protection",
    points: [
      "Your data is securely protected.",
      "We never sell personal information.",
      "Payments are processed through secure systems.",
    ],
  },

  {
    icon: FaCookieBite,
    title: "Cookies",
    points: [
      "Improve website performance.",
      "Remember user preferences.",
      "Analyze platform activity.",
    ],
  },

  {
    icon: FaGlobe,
    title: "Third-Party Services",
    description:
      "We may use trusted third-party providers such as payment gateways and analytics tools. These providers manage their own privacy practices independently.",
  },

  {
    icon: FaUserCheck,
    title: "User Rights",
    points: [
      "Access your personal data.",
      "Request corrections or updates.",
      "Request account deletion if applicable.",
    ],
  },

  {
    icon: FaLock,
    title: "Policy Updates",
    description:
      "Artify may update this Privacy Policy from time to time. Any updates will be published on this page.",
  },

];

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#111]">
      <Navbar />

      <main className="pt-28 pb-12">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          {/* HERO */}
          <section className="relative overflow-hidden rounded-[42px] bg-gradient-to-br from-black via-[#0d0d0d] to-[#1a1a1a] px-6 py-12 text-white shadow-[0_35px_90px_-35px_rgba(0,0,0,0.65)] md:px-10 md:py-14">
            <div className="absolute -left-20 top-0 h-[260px] w-[260px] rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -right-24 bottom-0 h-[280px] w-[280px] rounded-full bg-white/10 blur-3xl" />

            <div className="relative max-w-[760px]">
              <p
                className={`${bodyFont} text-[11px] uppercase tracking-[0.35em] text-white/55`}
              >
                Artify Marketplace
              </p>

              <h1
                className={`${headingFont} mt-5 text-[58px] leading-[0.9] tracking-[-0.03em] md:text-[90px]`}
              >
                Privacy Policy
              </h1>

              <p
                className={`${bodyFont} mt-6 max-w-[620px] text-[15px] leading-8 text-white/70 md:text-[16px]`}
              >
                At Artify, your privacy and data security are extremely
                important to us. This policy explains how we collect, use, and
                protect your personal information while using our platform.
              </p>
            </div>
          </section>

          {/* CARDS */}
          <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {sections.map((section, index) => {
              const Icon = section.icon;

              return (
                <div
                  key={index}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[32px]
                    border
                    border-[#ece4d8]
                    bg-white
                    p-6
                    shadow-[0_20px_60px_-35px_rgba(0,0,0,0.2)]
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.28)]
                  "
                >
                  <div className="absolute right-0 top-0 h-[120px] w-[120px] rounded-full bg-black/[0.03] blur-3xl transition-all duration-500 group-hover:bg-black/[0.05]" />

                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-lg">
                      <Icon className="text-[20px]" />
                    </div>

                    <h2
                      className={`${headingFont} mt-6 text-[34px] leading-none text-[#111]`}
                    >
                      {section.title}
                    </h2>

                    {section.description && (
                      <p
                        className={`${bodyFont} mt-4 text-[14px] leading-7 text-[#6e6961]`}
                      >
                        {section.description}
                      </p>
                    )}

                    {section.points && (
                      <ul className="mt-4 space-y-3">
                        {section.points.map((point, idx) => (
                          <li
                            key={idx}
                            className={`${bodyFont} flex items-start gap-3 text-[14px] leading-7 text-[#6e6961]`}
                          >
                            <span className="mt-[9px] h-2 w-2 rounded-full bg-black" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}


                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;