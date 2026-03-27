import heroImage from "@/assets/hero-beauty.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="Luxury beauty skincare products"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-foreground/40" />
      <div className="relative z-10 text-center text-primary-foreground px-6 animate-fade-in">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-normal mb-4">
          Glow From Within
        </h1>
        <p className="font-body text-base md:text-lg font-light mb-2 max-w-md mx-auto">
          <strong>clean skincare born in the spa,</strong>
        </p>
        <p className="font-body text-base md:text-lg font-light mb-8 max-w-md mx-auto">
          <strong>designed for real life</strong>
        </p>
        <a href="#shop" className="inline-block px-10 py-3.5 text-xs tracking-[0.2em] uppercase font-medium border border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground transition-all duration-300">
          Shop Now
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
