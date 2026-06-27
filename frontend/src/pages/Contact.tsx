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
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#fbfaf7] text-[#1d1d1d]">
      <Navbar />

      <main className="w-full max-w-[100vw] overflow-x-hidden pt-20 pb-10 md:pt-24 md:pb-14">
        <div className="mx-auto w-full max-w-[900px] px-4 md:px-6">
          <form
            onSubmit={handleSubmit}
            className="min-w-0 rounded-[28px] md:rounded-[38px] overflow-hidden relative p-6 sm:p-8 md:p-10"
            style={{
              backgroundImage: "url('/contact_bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/65" />

            <div className="relative z-10">
              <div className="mb-4">
                <p className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-white/60`}>
                  Send Message
                </p>
                <h2 className={`${headingFont} mt-1 break-words text-[30px] leading-none text-white sm:text-[36px]`}>
                  Let's Talk!
                </h2>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Name" dark>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Your Name"
                    required
                    className={`${bodyFont} h-11 rounded-full border-white/15 bg-white/10 px-5 text-white placeholder:text-white/40 transition-all duration-300 focus:border-white/30 focus:bg-white/15 focus:ring-0`}
                  />
                </Field>

                <Field label="E-mail" dark>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    placeholder="you@example.com"
                    required
                    className={`${bodyFont} h-11 rounded-full border-white/15 bg-white/10 px-5 text-white placeholder:text-white/40 transition-all duration-300 focus:border-white/30 focus:bg-white/15 focus:ring-0`}
                  />
                </Field>

                <div className="md:col-span-2">
                  <Field label="Subject" dark>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                      placeholder="How can we help you?"
                      required
                      className={`${bodyFont} h-11 rounded-full border-white/15 bg-white/10 px-5 text-white placeholder:text-white/40 transition-all duration-300 focus:border-white/30 focus:bg-white/15 focus:ring-0`}
                    />
                  </Field>
                </div>

                <div className="md:col-span-2">
                  <Field label="Message" dark>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      placeholder="Write your message here......"
                      required
                      className={`${bodyFont} min-h-[90px] resize-none rounded-[20px] border-white/15 bg-white/10 px-5 py-3 text-white placeholder:text-white/40 transition-all duration-300 focus:border-white/30 focus:bg-white/15 focus:ring-0`}
                    />
                  </Field>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <Button
                  disabled={loading}
                  type="submit"
                  className={`${bodyFont} h-11 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm px-10 text-[13px] uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-[2px] hover:bg-black/70 disabled:opacity-60`}
                >
                  <FaPaperPlane className="mr-2" />
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Field = ({
  label,
  children,
  dark = false,
}: {
  label: string;
  children: React.ReactNode;
  dark?: boolean;
}) => (
  <div className="space-y-2">
    <label className={`${bodyFont} text-[11px] uppercase tracking-[0.22em] ${dark ? "text-white/55" : "text-[#777]"}`}>
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
  <div className="group flex min-w-0 items-center gap-3 rounded-[20px] border border-white/10 bg-gradient-to-r from-white/8 to-white/5 px-3 py-3 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 sm:gap-4 sm:rounded-[24px] sm:px-4">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
      {icon}
    </div>

    <div className="min-w-0">
      <p className={`${bodyFont} text-[11px] uppercase tracking-[0.22em] text-white/50`}>
        {title}
      </p>

      <h3 className={`${bodyFont} mt-1 break-words text-[13px] font-semibold text-white sm:text-[14px]`}>
        {value}
      </h3>
    </div>
  </div>
);

export default Contact;