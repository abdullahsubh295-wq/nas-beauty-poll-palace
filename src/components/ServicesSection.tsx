import Reveal from "@/components/Reveal";
import { Sparkles, Scissors, Wand2 } from "lucide-react";

const services = [
  {
    name: "Smooth Operator",
    description: "Our diamond tip microdermabrasion treatment will leave you glowing with baby soft skin.",
    lead: "Resurface. Refine. Reveal.",
    icon: Sparkles,
  },
  {
    name: "Dermaplaning",
    description: "Kiss peach fuzz and dead skin goodbye with our professional-grade dermaplane treatment.",
    lead: "Silk-smooth in 45 minutes.",
    icon: Scissors,
  },
  {
    name: "The Undecided",
    description: "Our most-booked treatment! Your Glow Giver will help you decide on the best option.",
    lead: "A facial, tailored to you.",
    icon: Wand2,
  },
];

const ServicesSection = ({ onBookNow }: { onBookNow?: () => void }) => {
  return (
    <section id="services" className="py-20 md:py-28 px-6 bg-secondary relative overflow-hidden">
      {/* Ambient gold blooms */}
      <span aria-hidden className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[hsl(var(--gold)/0.12)] blur-3xl float-slow" />
      <span aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[hsl(var(--accent)/0.35)] blur-3xl float-slow" style={{ animationDelay: "-2s" }} />

      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <p className="section-subtitle text-center mb-3">Our Signature Rituals</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="section-title text-center mb-4">Most-Booked Treatments</h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="font-lead text-center italic text-muted-foreground max-w-xl mx-auto mb-16">
            Curated experiences designed to reveal your most radiant self — hand-crafted by our certified estheticians.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <Reveal key={service.name} delay={i * 140} direction={i === 1 ? "up" : i === 0 ? "left" : "right"}>
              <div className="group relative text-center space-y-4 p-8 pt-10 bg-background border border-border rounded-md hover-3d h-full shine-on-hover">
                <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-[hsl(var(--cream))] to-[hsl(var(--cream-dark))] ring-1 ring-[hsl(var(--gold)/0.4)] shadow-inner transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <service.icon size={22} className="text-[hsl(var(--gold))]" />
                </div>
                <h3 className="font-display text-xl italic">{service.name}</h3>
                <p className="font-lead italic text-foreground/70">{service.lead}</p>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {service.description}
                </p>
                <button onClick={onBookNow} className="btn-beauty text-[10px] inline-block mt-2 hover:scale-105">
                  Book Now
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
