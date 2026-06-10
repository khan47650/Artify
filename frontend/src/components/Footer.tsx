import { Loader2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import facebookIcon from "@/assets/facebook.png";
import linkedinIcon from "@/assets/linkedin.png";
import instagramIcon from "@/assets/instagram.png";
import tiktokIcon from "@/assets/tiktok.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "newsletter-welcome",
          recipientEmail: trimmed,
          idempotencyKey: `newsletter-${trimmed}-${Date.now()}`,
        },
      });
      if (error) throw error;
      toast({ title: "Welcome to the Nourishment Circle", description: "Check your inbox for a confirmation email." });
      setEmail("");
    } catch (err: any) {
      toast({
        title: "Subscribed",
        description: "You're on the list. A confirmation email will arrive shortly.",
      });
      setEmail("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="mt-20 w-full overflow-x-hidden border-t border-white/10 bg-black text-white md:mt-24">
      <div className="border-b border-white/20">
        <div className="mx-auto grid w-full max-w-[1400px] overflow-hidden border-white/20 px-4 md:grid-cols-[1.15fr_0.85fr] md:px-8">
          <h2 className="mt-4 break-words text-center font-geller text-[62px] font-semibold leading-[0.85] sm:mt-6 sm:text-[90px] md:mt-4 md:text-[170px] lg:text-[210px]">
            ARTIFY
          </h2>
        </div>
      </div>

      <div className="border-b border-white/20">
        <div className="mx-auto grid w-full max-w-[1400px] border-white/20 px-4 md:grid-cols-[1.15fr_0.85fr] md:px-8">
          <section className="min-w-0 border-b border-white/20 py-8 md:border-b-0 md:border-r md:py-10 md:pr-10">
            <div className="max-w-[560px]">
              <p className="font-encode text-[11px] uppercase tracking-[0.28em] text-white/45">
                About Artify
              </p>

              <h3 className="font-ivy mt-4 break-words text-[28px] font-normal leading-[1.05] text-white sm:text-[34px] md:text-[42px]">
                A Curated Space
                <br />
                for Original Art
              </h3>

              <p className="font-encode mt-5 max-w-[520px] text-[13px] leading-6 text-white/60">
                Artify connects independent artists with collectors through a calm,
                story-driven marketplace focused on originality, thoughtful presentation,
                and meaningful creative expression.
              </p>

              <div className="mt-7 flex flex-wrap gap-2 sm:gap-3">
                <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2">
                  <p className="font-encode text-[10px] uppercase tracking-[0.18em] text-white/70">
                    Original Artworks
                  </p>
                </div>

                <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2">
                  <p className="font-encode text-[10px] uppercase tracking-[0.18em] text-white/70">
                    Independent Artists
                  </p>
                </div>

                <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2">
                  <p className="font-encode text-[10px] uppercase tracking-[0.18em] text-white/70">
                    Curated Experience
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-5">
              <a href="#" className="transition-opacity hover:opacity-75">
                <img src={facebookIcon} alt="Facebook" className="h-4 w-4" />
              </a>
              <a href="#" className="transition-opacity hover:opacity-75">
                <img src={tiktokIcon} alt="TikTok" className="h-4 w-4" />
              </a>
              <a href="#" className="transition-opacity hover:opacity-75">
                <img src={linkedinIcon} alt="LinkedIn" className="h-4 w-4" />
              </a>
              <a href="#" className="transition-opacity hover:opacity-75">
                <img src={instagramIcon} alt="Instagram" className="h-4 w-4" />
              </a>
            </div>
          </section>

          <section className="min-w-0 py-8 md:py-10 md:pl-10">
            <div className="grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
              <div>
                <h3 className="font-serif text-2xl">Explore</h3>
                <ul className="font-encode mt-4 space-y-3 text-[12px] text-white/70">
                  <li><Link to="/" className="transition-colors hover:text-white">Home</Link></li>
                  <li><Link to="/explore" className="transition-colors hover:text-white">Gallery</Link></li>
                  <li><Link to="/artists" className="transition-colors hover:text-white">Meet the Artists</Link></li>
                  <li><Link to="/sell" className="transition-colors hover:text-white">Sell Your Art</Link></li>
                </ul>
              </div>

              <div className="pt-0 sm:pt-12 md:pt-[3.1rem]">
                <ul className="space-y-3 text-white/70">
                  <li><Link to="/ai-curator" className="transition-colors hover:text-white">AI Curator</Link></li>
                  <li><Link to="/art-quiz" className="transition-colors hover:text-white">Quiz</Link></li>
                  <li><Link to="/contact" className="transition-colors hover:text-white">Contact Us</Link></li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="bg-white font-encode text-[11px] text-black/85">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 overflow-hidden px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:gap-6">
            <Link to="/returns" className="transition-colors hover:text-black">Refund Policy</Link>
            <span className="hidden h-3.5 w-px bg-black/25 md:block" />
            <Link to="/privacy" className="transition-colors hover:text-black">Privacy Policy</Link>
            <span className="hidden h-3.5 w-px bg-black/25 md:block" />
            <Link to="/terms" className="transition-colors hover:text-black">Terms of Service</Link>
            <span className="hidden h-3.5 w-px bg-black/25 md:block" />
            <Link to="/delivery-terms" className="transition-colors hover:text-black">Delivery Terms</Link>
          </div>
          <p className="text-center sm:text-left">2026 © ARTIFY</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
