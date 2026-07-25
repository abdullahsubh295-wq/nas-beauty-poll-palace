import heroImage from "@/assets/hero-beauty.jpg";
import Reveal from "@/components/Reveal";

const NewServiceSection = ({ onBookNow }: { onBookNow?: () => void }) => {
  return (
    <section className="py-20 md:py-28 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <Reveal direction="left" className="order-2 md:order-1">
          <div className="space-y-6">
            <p className="section-subtitle">✨ New at Naz Beauty Salon</p>
            <h2 className="section-title">Introducing Chemical Peels</h2>
            <p className="font-lead italic text-foreground/70">
              Clinically radiant skin — with zero downtime.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              Clinical-strength metabolic peels rev up cell turnover, even out tone, and leave
              you with that 'just came back from vacation' glow. Minimal downtime, maximum
              results.
            </p>
            <button onClick={onBookNow} className="btn-beauty inline-block hover:scale-105">
              Book Now
            </button>
          </div>
        </Reveal>
        <Reveal direction="right" delay={120} className="order-1 md:order-2">
          <div className="group relative overflow-hidden rounded-md tilt-on-hover shine-on-hover">
            <img
              src={heroImage}
              alt="Chemical peel treatment"
              className="w-full h-[400px] object-cover img-zoom"
              loading="lazy"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default NewServiceSection;
