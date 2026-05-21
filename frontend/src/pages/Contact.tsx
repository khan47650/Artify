import { FormEvent, useState } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPaperPlane,
} from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post("/contact-messages", formData);

      toast({
        title: "Message Sent",
        description: data.message || "We will get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Message send failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#1d1d1d]">
      <Navbar />

     <main className="pt-28 pb-20">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <section className="grid gap-6 xl:gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
            <div className="relative overflow-hidden rounded-[38px] bg-gradient-to-br from-black via-[#0f0f0f] to-[#1c1c1c] p-5 text-white shadow-[0_35px_90px_-30px_rgba(0,0,0,0.65)] ring-1 ring-white/10 md:p-6">
              <div className="absolute -right-20 -top-20 h-[220px] w-[220px] rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-24 -left-20 h-[260px] w-[260px] rounded-full bg-white/10 blur-3xl" />

              <div className="relative">
                <p className={`${bodyFont} text-[11px] uppercase tracking-[0.3em] text-white/55`}>
                  Artify Support
                </p>

                <h1 className={`${headingFont} mt-5 text-[52px] leading-[0.92] tracking-[-0.03em] md:text-[72px]`}>
                  Contact Us
                </h1>

                <p className={`${bodyFont} mt-4 max-w-[430px] text-[15px] leading-7 text-white/65`}>
                  Need help with an artwork, artist account, collection, or order?
                  Send us a message and our team will reply soon.
                </p>

                <div className="mt-7 space-y-3">
                  <InfoItem
                    icon={<FaEnvelope />}
                    title="Email"
                    value="artifyofficial1122@gmail.com"
                  />
                  <InfoItem
                    icon={<FaPhoneAlt />}
                    title="Support"
                    value="Available for marketplace queries"
                  />
                  <InfoItem
                    icon={<FaMapMarkerAlt />}
                    title="Marketplace"
                    value="Digital art, collectors and artists"
                  />
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[38px] border border-[#ece5db] bg-white/90 p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.18)] backdrop-blur-xl md:p-6"
            >
              <div className="mb-5">
                <p className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#8a847c]`}>
                  Send Message
                </p>

                <h2 className={`${headingFont} mt-2 text-[38px] leading-none text-[#111]`}>
                  Let’s Talk
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Name">
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Your full name"
                    required
                    className={`${bodyFont} h-12 rounded-full border-[#d8d2c8] bg-[#f6f3ed] px-5 transition-all duration-300 focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5`}
                  />
                </Field>

                <Field label="Email">
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="you@example.com"
                    required
                    className={`${bodyFont} h-12 rounded-full border-[#d8d2c8] bg-[#f6f3ed] px-5 transition-all duration-300 focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5`}
                  />
                </Field>

                <div className="md:col-span-2">
                  <Field label="Subject">
                    <Input
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, subject: e.target.value }))
                      }
                      placeholder="How can we help?"
                      required
                      className={`${bodyFont} h-12 rounded-full border-[#d8d2c8] bg-[#f6f3ed] px-5 transition-all duration-300 focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5`}
                    />
                  </Field>
                </div>

                <div className="md:col-span-2">
                  <Field label="Message">
                    <Textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, message: e.target.value }))
                      }
                      placeholder="Write your message here..."
                      required
                      className={`${bodyFont} min-h-[120px] resize-none rounded-[28px] border-[#d8d2c8] bg-[#f6f3ed] px-5 py-4 transition-all duration-300 focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5`}
                    />
                  </Field>
                </div>
              </div>

              <div className="mt-5">
                <Button
                  disabled={loading}
                  type="submit"
                  className={`${bodyFont} h-12 w-full rounded-full bg-black px-10 text-[13px] uppercase tracking-[0.2em] text-white shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-black/90 hover:shadow-[0_25px_55px_-20px_rgba(0,0,0,0.7)] disabled:opacity-60 md:w-auto`}
                >
                  <FaPaperPlane className="mr-2" />
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <label className={`${bodyFont} text-[11px] uppercase tracking-[0.22em] text-[#777]`}>
      {label}
    </label>
    {children}
  </div>
);

const InfoItem = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) => (
  <div className="group flex items-center gap-4 rounded-[24px] border border-white/10 bg-gradient-to-r from-white/8 to-white/5 px-4 py-3 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
      {icon}
    </div>

    <div>
      <p className={`${bodyFont} text-[11px] uppercase tracking-[0.22em] text-white/50`}>
        {title}
      </p>

      <h3 className={`${bodyFont} mt-1 text-[14px] font-semibold text-white`}>
        {value}
      </h3>
    </div>
  </div>
);

export default Contact;