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

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-28 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-center mb-16">Most-Booked Treatments</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.name}
              className="text-center space-y-4 p-8 bg-background border border-border hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="font-display text-xl italic">{service.name}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {service.description}
              </p>
              <a href="#" className="btn-beauty text-[10px] inline-block mt-2">
                Book Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
