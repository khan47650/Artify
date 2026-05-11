import { FormEvent, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const Contact = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    toast({
      title: "Message ready to review",
      description: "Your note has been captured on the page.",
    });

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-white text-[#1d1d1d]">
      <Navbar />

      <main className="bg-white pt-20 pb-8">
        <div className="mx-auto max-w-[1120px] px-4 md:px-6">
          <section className="mx-auto w-full max-w-[760px]">
            <div className="mb-6 text-center">
              <h1 className={`${headingFont} text-[58px] leading-none text-[#111]`}>
                Contact
              </h1>

              <p className={`${bodyFont} mt-3 text-[14px] text-[#6f6a63]`}>
                Send us a message and we will get back to you.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[28px] border border-[#e6dfd4] bg-white p-6 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.12)] md:p-7"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className={`${bodyFont} text-[12px] uppercase tracking-[0.24em] text-[#777]`}
                  >
                    Name
                  </label>

                  <Input
                    id="contact-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your full name"
                    required
                    className={`${bodyFont} h-12 rounded-[16px] border-[#d8d2c8] bg-[#fbf7f1] px-5 text-[14px] text-[#111] placeholder:text-[#8b857d]`}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className={`${bodyFont} text-[12px] uppercase tracking-[0.24em] text-[#777]`}
                  >
                    Email
                  </label>

                  <Input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                    className={`${bodyFont} h-12 rounded-[16px] border-[#d8d2c8] bg-[#fbf7f1] px-5 text-[14px] text-[#111] placeholder:text-[#8b857d]`}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label
                    htmlFor="contact-subject"
                    className={`${bodyFont} text-[12px] uppercase tracking-[0.24em] text-[#777]`}
                  >
                    Subject
                  </label>

                  <Input
                    id="contact-subject"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    placeholder="Collector support, shipping issue, artist application..."
                    required
                    className={`${bodyFont} h-12 rounded-[16px] border-[#d8d2c8] bg-[#fbf7f1] px-5 text-[14px] text-[#111] placeholder:text-[#8b857d]`}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label
                    htmlFor="contact-message"
                    className={`${bodyFont} text-[12px] uppercase tracking-[0.24em] text-[#777]`}
                  >
                    Message
                  </label>

                  <Textarea
                    id="contact-message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Tell us what you need, which artwork you're considering, or what kind of support would help most."
                    required
                    className={`${bodyFont} min-h-[120px] resize-none rounded-[18px] border-[#d8d2c8] bg-[#fbf7f1] px-5 py-4 text-[14px] leading-5 text-[#111] placeholder:text-[#8b857d]`}
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-center">
                <Button
                  type="submit"
                  className={`${bodyFont} h-11 rounded-full bg-black px-9 text-[13px] uppercase tracking-[0.18em] text-white hover:bg-black/90`}
                >
                  Send Message
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

export default Contact;