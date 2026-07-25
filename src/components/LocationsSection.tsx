import spaImage from "@/assets/spa-interior.jpg";
import Reveal from "@/components/Reveal";

const locations = [
  {
    name: "Downtown Studio",
    tagline: "Our flagship sanctuary in the heart of the city.",
    cta: "Peek Inside",
  },
  {
    name: "Uptown Boutique",
    tagline: "Intimate treatments in an elevated boutique setting.",
    cta: "Book Appointment",
  },
];

const LocationsSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 px-6 relative overflow-hidden">
      <span aria-hidden className="pointer-events-none absolute top-10 right-10 w-72 h-72 rounded-full bg-[hsl(var(--gold)/0.10)] blur-3xl float-slow" />

      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <p className="section-subtitle text-center mb-3">Visit Naz Beauty</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="section-title text-center mb-4">Two Sanctuaries. One Standard of Glow.</h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="font-lead italic text-center text-muted-foreground max-w-2xl mx-auto">
            Step into a space where every detail — from lighting to linens — was designed to make
            you feel utterly cared for.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 mt-14">
          {locations.map((loc, i) => (
            <Reveal key={loc.name} delay={i * 160} direction={i === 0 ? "left" : "right"}>
              <div className="relative group overflow-hidden rounded-md tilt-on-hover">
                <img
                  src={spaImage}
                  alt={`Naz Beauty Salon — ${loc.name}`}
                  className="w-full h-[350px] object-cover img-zoom"
                  loading="lazy"
                  width={1200}
                  height={800}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/25 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 text-primary-foreground px-6 text-center">
                  <h3 className="font-display text-2xl mb-2 transition-transform duration-500 group-hover:-translate-y-1">
                    {loc.name}
                  </h3>
                  <p className="font-lead italic text-sm mb-4 max-w-xs">{loc.tagline}</p>
                  <a
                    href="#"
                    className="text-xs tracking-[0.2em] uppercase border border-primary-foreground/80 px-6 py-2 hover:bg-primary-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
                  >
                    {loc.cta}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
