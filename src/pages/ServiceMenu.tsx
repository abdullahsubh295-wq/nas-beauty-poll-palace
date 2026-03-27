import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import BookingDialog from "@/components/BookingDialog";
import { Clock } from "lucide-react";

const services = [
  {
    category: "Signature Facials",
    items: [
      {
        name: "Smooth Operator",
        description: "Our diamond tip microdermabrasion facial will leave you glowing with baby soft skin. Perfect for tackling uneven texture, dullness, and fine lines.",
        duration: "60 min",
        price: "$120",
      },
      {
        name: "Dermaplaning",
        description: "Kiss peach fuzz and dead skin goodbye with our professional-grade dermaplane facial. Reveals a smooth, luminous complexion instantly.",
        duration: "45 min",
        price: "$95",
      },
      {
        name: "The Undecided",
        description: "Our most-booked facial! Your Glow Giver will assess your skin and customize the perfect treatment just for you.",
        duration: "60 min",
        price: "$110",
      },
    ],
  },
  {
    category: "Advanced Treatments",
    items: [
      {
        name: "Chemical Peel",
        description: "Clinical-strength metabolic peels that rev up cell turnover, even out tone, and leave you with a radiant vacation glow. Minimal downtime.",
        duration: "45 min",
        price: "$150",
      },
      {
        name: "HydraGlow Facial",
        description: "A multi-step treatment that deeply cleanses, exfoliates, extracts, and hydrates skin with antioxidants, peptides, and hyaluronic acid.",
        duration: "75 min",
        price: "$175",
      },
      {
        name: "LED Light Therapy",
        description: "Harness the power of light to reduce inflammation, stimulate collagen, and accelerate healing. A non-invasive boost for any skin concern.",
        duration: "30 min",
        price: "$85",
      },
    ],
  },
  {
    category: "Brows & Lashes",
    items: [
      {
        name: "Brow Lamination",
        description: "Transform unruly brows into perfectly styled arches that stay in place for weeks. Includes shaping and tinting.",
        duration: "45 min",
        price: "$75",
      },
      {
        name: "Lash Lift & Tint",
        description: "Get the look of lash extensions without the maintenance. A semi-permanent lift and tint that opens up your eyes beautifully.",
        duration: "60 min",
        price: "$95",
      },
    ],
  },
];

const ServiceMenu = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onBookNow={() => setBookingOpen(true)} />
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <section className="py-20 md:py-28 bg-secondary text-center px-6">
          <p className="section-subtitle mb-3">Nas Beauty Paller</p>
          <h1 className="font-display text-4xl md:text-5xl font-normal mb-4">Service Menu</h1>
          <p className="text-muted-foreground font-body max-w-lg mx-auto">
            From signature facials to advanced treatments, every service is designed to help you glow from within.
          </p>
        </section>

        {/* Services */}
        <section className="py-16 md:py-24 px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            {services.map((category) => (
              <div key={category.category}>
                <h2 className="font-display text-2xl md:text-3xl mb-8 text-center">{category.category}</h2>
                <div className="space-y-6">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="border border-border p-6 md:p-8 hover:shadow-md transition-shadow duration-300 group"
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <h3 className="font-display text-xl italic">{item.name}</h3>
                          <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-xl">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-4 pt-1">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                              <Clock size={12} /> {item.duration}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-row md:flex-col items-center md:items-end gap-3">
                          <span className="font-display text-xl">{item.price}</span>
                          <button
                            onClick={() => setBookingOpen(true)}
                            className="btn-beauty text-[10px] whitespace-nowrap"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-foreground text-primary-foreground text-center px-6">
          <h2 className="font-display text-3xl mb-4">Not sure which treatment is right for you?</h2>
          <p className="font-body text-primary-foreground/70 mb-8 max-w-md mx-auto">
            Take our quick Skin Check Quiz and we'll recommend the perfect treatment for your skin type.
          </p>
          <a href="/" className="inline-block px-10 py-3.5 text-xs tracking-[0.2em] uppercase font-medium border border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground transition-all duration-300">
            Take the Quiz
          </a>
        </section>
      </main>
      <Footer />
      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
};

export default ServiceMenu;
