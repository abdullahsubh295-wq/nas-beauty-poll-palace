import { MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";

const MAP_EMBED =
  "https://www.google.com/maps?q=Naz+Beauty+Parlour&ll=33.77032,72.35341&z=18&output=embed";
const MAP_LINK =
  "https://www.google.com/maps/place/Naz+Beauty+Parlour/@33.7706785,72.3533345,19.81z/data=!4m6!3m5!1s0x38df19b768a3bd81:0xa8bf68e5bdf4230e!8m2!3d33.77032!4d72.35341";

const MapSection = () => {
  return (
    <section id="locations" className="py-20 md:py-28 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="section-subtitle text-center mb-3">Visit Us</p>
          <h2 className="section-title text-center mb-4">Find Naz Beauty Salon</h2>
          <p className="text-center text-muted-foreground font-body text-sm max-w-xl mx-auto mb-12">
            Step into our serene studio for a personalized beauty experience. We can't wait to welcome you.
          </p>
        </Reveal>

        <Reveal direction="zoom">
          <div className="relative rounded-lg overflow-hidden shadow-xl border border-border bg-background group">
            <iframe
              title="Naz Beauty Parlour location"
              src={MAP_EMBED}
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="w-full h-[380px] md:h-[480px] block"
            />
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-5 left-5 inline-flex items-center gap-2 bg-background/95 backdrop-blur px-5 py-3 rounded-md shadow-lg text-xs tracking-[0.15em] uppercase font-medium text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
            >
              <MapPin size={14} />
              Get Directions
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default MapSection;
