import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FaHandshake,
  FaUserCheck,
  FaShoppingBag,
  FaStore,
  FaCopyright,
  FaCreditCard,
  FaBan,
  FaShieldAlt,
  FaUserSlash,
  FaSyncAlt,
  FaEnvelope,
} from "react-icons/fa";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const sections = [
  {
    icon: FaHandshake,
    title: "Platform Role",
    description:
      "Artify is a marketplace connecting buyers and sellers of digital artworks and creative services. We facilitate listings and communication, but artworks belong to their creators unless stated otherwise.",
  },

  {
    icon: FaUserCheck,
    title: "Account Eligibility",
    description:
      "Users must provide accurate information and keep account credentials secure. You are fully responsible for all activity under your account.",
  },

  {
    icon: FaShoppingBag,
    title: "Buyer Terms",
    points: [
      "Review artwork details and pricing before purchase.",
      "Respect artist rights and licensing limitations.",
      "Complete payments using approved checkout methods.",
    ],
  },

  {
    icon: FaStore,
    title: "Seller Terms",
    points: [
      "Provide truthful descriptions and previews.",
      "Upload only content you own or are authorized to sell.",
      "Comply with copyright and applicable laws.",
    ],
  },

  {
    icon: FaCopyright,
    title: "Intellectual Property",
    description:
      "Artists retain ownership of original content unless otherwise agreed. Buyers receive only the rights clearly granted at purchase.",
  },

  {
    icon: FaCreditCard,
    title: "Payments & Fees",
    description:
      "Payments are securely processed through trusted third-party providers. Artify may apply marketplace service fees where applicable.",
  },

  {
    icon: FaBan,
    title: "Prohibited Conduct",
    points: [
      "No fraudulent listings or impersonation.",
      "No unauthorized resale or copyright infringement.",
      "No scraping, abuse, or misuse of the platform.",
    ],
  },

  {
    icon: FaShieldAlt,
    title: "Limitation of Liability",
    description:
      "To the fullest extent permitted by law, Artify is not liable for indirect or consequential losses resulting from platform usage or user transactions.",
  },

  {
    icon: FaUserSlash,
    title: "Suspension & Termination",
    description:
      "We may suspend or permanently remove accounts that violate platform rules, laws, or safety standards.",
  },

  {
    icon: FaSyncAlt,
    title: "Changes to Terms",
    description:
      "Artify may update these Terms of Service at any time. Continued use after updates means acceptance of the revised terms.",
  },

];

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#111]">
      <Navbar />

      <main className="pt-28 pb-12">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          {/* HERO */}
          <section className="relative overflow-hidden rounded-[42px] bg-gradient-to-br from-black via-[#0d0d0d] to-[#1a1a1a] px-6 py-12 text-white shadow-[0_35px_90px_-35px_rgba(0,0,0,0.65)] md:px-10 md:py-14">
            <div className="absolute -left-20 top-0 h-[260px] w-[260px] rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -right-24 bottom-0 h-[280px] w-[280px] rounded-full bg-white/10 blur-3xl" />

            <div className="relative max-w-[780px]">
              <p
                className={`${bodyFont} text-[11px] uppercase tracking-[0.35em] text-white/55`}
              >
                Artify Marketplace
              </p>

              <h1
                className={`${headingFont} mt-5 text-[58px] leading-[0.9] tracking-[-0.03em] md:text-[90px]`}
              >
                Terms of Service
              </h1>

              <p
                className={`${bodyFont} mt-6 max-w-[650px] text-[15px] leading-8 text-white/70 md:text-[16px]`}
              >
                Welcome to Artify. By accessing or using our marketplace, you
                agree to these Terms of Service. Please read them carefully
                before buying, selling, or listing artworks on the platform.
              </p>
            </div>
          </section>

          {/* CONTENT */}
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

export default Terms;