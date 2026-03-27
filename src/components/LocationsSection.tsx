import spaImage from "@/assets/spa-interior.jpg";

const LocationsSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="section-subtitle text-center mb-3">Glowing skin is only a click away</p>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="relative group overflow-hidden">
            <img
              src={spaImage}
              alt="Nas Beauty Paller Location 1"
              className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              width={1200}
              height={800}
            />
            <div className="absolute inset-0 bg-foreground/30 flex flex-col items-center justify-center text-primary-foreground">
              <h3 className="font-display text-2xl mb-2">Downtown Studio</h3>
              <p className="text-sm font-body mb-4">Enjoy premium beauty services at our flagship location.</p>
              <a href="#" className="text-xs tracking-[0.15em] uppercase border border-primary-foreground px-6 py-2 hover:bg-primary-foreground hover:text-foreground transition-all">
                Peek Inside
              </a>
            </div>
          </div>
          <div className="relative group overflow-hidden">
            <img
              src={spaImage}
              alt="Nas Beauty Paller Location 2"
              className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              width={1200}
              height={800}
            />
            <div className="absolute inset-0 bg-foreground/30 flex flex-col items-center justify-center text-primary-foreground">
              <h3 className="font-display text-2xl mb-2">Uptown Boutique</h3>
              <p className="text-sm font-body mb-4">Enjoy clean skincare at our second location.</p>
              <a href="#" className="text-xs tracking-[0.15em] uppercase border border-primary-foreground px-6 py-2 hover:bg-primary-foreground hover:text-foreground transition-all">
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
