import heroImage from "@/assets/hero-beauty.jpg";
import heroVideo from "@/assets/hero-salon-walkthrough-v2.mp4.asset.json";

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
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
      <div className="absolute inset-0 bg-foreground/45" />
      <div className="relative z-10 text-center text-primary-foreground px-6 animate-fade-in">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-normal mb-6">
          Glow From Within
        </h1>
        <p className="font-lead italic text-lg md:text-2xl font-light mb-2 max-w-xl mx-auto">
          Clean skincare, born in the spa —
        </p>
        <p className="font-lead italic text-lg md:text-2xl font-light mb-10 max-w-xl mx-auto">
          designed for real life.
        </p>
        <a
          href="/service-menu"
          className="inline-block px-10 py-3.5 text-xs tracking-[0.2em] uppercase font-medium border border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
        >
          Book Your Glow
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
