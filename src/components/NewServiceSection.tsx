import heroImage from "@/assets/hero-beauty.jpg";

const NewServiceSection = ({ onBookNow }: { onBookNow?: () => void }) => {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 order-2 md:order-1">
          <p className="section-subtitle">✨ New at Nas Beauty Paller</p>
          <h2 className="section-title">Introducing Chemical Peels</h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            New at Nas Beauty Paller: Clinical-strength metabolic peels! These treatments rev up cell turnover, even out tone,
            and leave you with that 'just came back from vacation' glow. Minimal downtime, maximum results.
          </p>
          <button onClick={onBookNow} className="btn-beauty inline-block">Book Now</button>
        </div>
        <div className="order-1 md:order-2">
          <img
            src={heroImage}
            alt="Chemical peel treatment"
            className="w-full h-[400px] object-cover"
            loading="lazy"
            width={1920}
            height={1080}
          />
        </div>
      </div>
    </section>
  );
};

export default NewServiceSection;
