import { useNavigate } from "react-router-dom";
import { Sparkles, Star } from "lucide-react";
import heroImage from "@/assets/hero-beauty.jpg";
import heroVideo from "@/assets/hero-salon-walkthrough-v2.mp4.asset.json";

const HeroSection = ({ onBookNow }: { onBookNow?: () => void }) => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[92vh] min-h-[620px] flex items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={heroImage}
      >
        <source src={heroVideo.url} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/55 via-foreground/40 to-foreground/70" />

      <div className="relative z-10 text-center text-primary-foreground px-6 animate-fade-in max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 bg-primary-foreground/10 backdrop-blur-sm px-4 py-1.5 text-[10px] tracking-[0.25em] uppercase mb-6">
          <Star size={11} /> Rated 4.9 by 500+ clients
        </span>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-normal mb-5 leading-[1.05]">
          Reveal Your Best Skin Today
        </h1>
        <p className="font-body text-base md:text-lg font-light mb-8 max-w-xl mx-auto text-primary-foreground/90">
          Expert facials, peels and brow artistry at Naz Beauty Salon — personalised treatments
          that leave you visibly glowing and quietly confident.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onBookNow}
            className="px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold bg-gradient-to-r from-[#e8b6a3] to-[#d9b779] text-foreground shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 rounded-full"
          >
            Book Your Appointment Now
          </button>
          <button
            onClick={() => navigate("/skin-quiz")}
            className="group inline-flex items-center gap-2 px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium border border-primary-foreground/70 text-primary-foreground rounded-full hover:bg-primary-foreground hover:text-foreground transition-all duration-300"
          >
            <Sparkles size={13} />
            Take the Free Skin Quiz
          </button>
        </div>
        <p className="mt-5 text-[11px] tracking-[0.18em] uppercase text-primary-foreground/70">
          Takes 60 seconds · No pressure · Limited slots this week
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
