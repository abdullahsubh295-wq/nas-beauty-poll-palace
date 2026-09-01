import { Star, BadgeCheck } from "lucide-react";
import Reveal from "@/components/Reveal";

const testimonials = [
  {
    name: "Ayesha K.",
    text: "My skin has never looked this clear. The team explained everything and never pushed extras — I've already booked my next three facials.",
  },
  {
    name: "Hina R.",
    text: "The chemical peel gave me that 'just back from vacation' glow before my wedding. Worth every rupee and then some.",
  },
  {
    name: "Sana M.",
    text: "Calm, spotless and genuinely professional. I did the skin quiz first and the recommendation was spot on.",
  },
  {
    name: "Maryam A.",
    text: "Brow lamination here is on another level. Six weeks later and they still look shaped and full.",
  },
  {
    name: "Zoya T.",
    text: "I struggled with breakouts for years. Three visits in, my texture is smoother and my confidence is back.",
  },
  {
    name: "Fatima S.",
    text: "Booking took thirty seconds and they reminded me on WhatsApp. Little details like that show they care.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-28 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="section-subtitle text-center mb-3">Verified client reviews</p>
          <h2 className="section-title text-center mb-3">Loved by 500+ glowing clients</h2>
          <p className="text-center text-muted-foreground font-body max-w-xl mx-auto mb-14">
            Real words from real appointments — this is what walking out of Naz Beauty Salon feels like.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80} direction="up">
              <div className="h-full flex flex-col gap-4 p-7 bg-background border border-border rounded-md hover-lift">
                <div className="flex items-center gap-1 text-[hsl(var(--gold))]">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-muted-foreground font-body text-sm leading-relaxed flex-1">
                  “{t.text}”
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="font-display text-sm">{t.name}</span>
                  <span className="flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                    <BadgeCheck size={12} className="text-[hsl(var(--gold))]" /> Verified
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
