const services = [
  {
    name: "Smooth Operator",
    description: "Our diamond tip microdermabrasion treatment will leave you glowing with baby soft skin.",
  },
  {
    name: "Dermaplaning",
    description: "Kiss peach fuzz and dead skin goodbye with our professional-grade dermaplane treatment.",
  },
  {
    name: "The Undecided",
    description: "Our most-booked treatment! Your Glow Giver will help you decide on the best option.",
  },
];

import Reveal from "@/components/Reveal";

const ServicesSection = ({ onBookNow }: { onBookNow?: () => void }) => {
  return (
    <section id="services" className="py-20 md:py-28 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="section-title text-center mb-16">Most-Booked Treatments</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <Reveal key={service.name} delay={i * 120} direction="up">
              <div className="text-center space-y-4 p-8 bg-background border border-border rounded-md hover-lift h-full">
                <h3 className="font-display text-xl italic">{service.name}</h3>
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
