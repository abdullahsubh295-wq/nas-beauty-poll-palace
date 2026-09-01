import { useNavigate } from "react-router-dom";
import { Sparkles, Clock, ShieldCheck, Wand2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import spaImage from "@/assets/spa-interior.jpg";

const perks = [
  { icon: Clock, text: "Takes under 60 seconds" },
  { icon: Wand2, text: "Personalised treatment match" },
  { icon: ShieldCheck, text: "Free — no card, no pressure" },
];

const SkinQuizSection = () => {
  const navigate = useNavigate();

  return (
    <section id="skin-quiz" className="relative py-20 md:py-28 px-6 overflow-hidden bg-gradient-to-b from-background via-[hsl(var(--cream-dark))]/50 to-background">
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[hsl(var(--gold))]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#e8b6a3]/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <Reveal direction="left">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f7e4d8] to-[#f3e2bf] border border-[hsl(var(--gold))]/40 px-4 py-1.5 text-[10px] tracking-[0.25em] uppercase font-medium mb-5">
            <Sparkles size={12} className="text-[hsl(var(--gold))]" /> Most-loved free tool
          </span>
          <h2 className="section-title mb-4">
            Not sure what your skin needs? Find out in 60 seconds.
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-6">
            Our Skin Check Quiz reads your skin type, concerns and lifestyle, then matches you with
            the exact treatment our estheticians would recommend in person — instantly, and for free.
          </p>
          <ul className="space-y-3 mb-8">
            {perks.map((p) => (
              <li key={p.text} className="flex items-center gap-3 font-body text-sm">
                <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <p.icon size={14} className="text-[hsl(var(--gold))]" />
                </span>
                {p.text}
              </li>
            ))}
          </ul>
          <button
            onClick={() => navigate("/skin-quiz")}
            className="px-10 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-semibold bg-foreground text-background shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Start My Free Skin Quiz
          </button>
        </Reveal>

        <Reveal direction="right" delay={120}>
          <div className="relative group overflow-hidden rounded-md">
            <img
              src={spaImage}
              alt="Personalised skin consultation at Naz Beauty Salon"
              className="w-full h-[400px] md:h-[480px] object-cover img-zoom"
              loading="lazy"
              width={1200}
              height={800}
            />
            <div className="absolute inset-0 bg-foreground/25 transition-colors duration-300 group-hover:bg-foreground/35" />
            <button
              onClick={() => navigate("/skin-quiz")}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 px-7 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase font-medium bg-background/95 text-foreground hover:bg-background shadow-lg transition-all hover:-translate-y-0.5"
            >
              Take the Quiz
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default SkinQuizSection;
