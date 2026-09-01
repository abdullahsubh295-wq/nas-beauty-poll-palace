import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingDialog from "@/components/BookingDialog";
import Reveal from "@/components/Reveal";
import MapSection from "@/components/MapSection";
import { Award, HeartHandshake, Leaf, Sparkles } from "lucide-react";
import treatmentRoom from "@/assets/about-treatment-room.jpg";
import spaImage from "@/assets/spa-interior.jpg";

const values = [
  {
    icon: Award,
    title: "Clinically Trained Hands",
    desc: "Every treatment is performed by licensed estheticians with advanced facial and peel certification.",
  },
  {
    icon: Leaf,
    title: "Clean, Skin-First Products",
    desc: "Medical-grade, cruelty-free formulations chosen for results — never for hype.",
  },
  {
    icon: HeartHandshake,
    title: "Zero-Pressure Consults",
    desc: "We recommend only what your skin actually needs, and tell you honestly when it needs nothing.",
  },
  {
    icon: Sparkles,
    title: "Visible Results, Every Visit",
    desc: "Personalized plans with progress tracking so your glow keeps compounding month after month.",
  },
];

const About = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar onBookNow={() => setBookingOpen(true)} />
      <main className="pt-24 md:pt-32">
        {/* Hero */}
        <section className="px-6 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <Reveal direction="left">
              <p className="section-subtitle mb-3">About Naz Beauty Salon</p>
              <h1 className="font-display text-4xl md:text-5xl font-normal leading-tight mb-5">
                Skin care that feels personal, results that feel permanent
              </h1>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                Naz Beauty Salon was built on one belief: confident skin should never come from
                guesswork. Since day one, we have combined clinical expertise with the calm of a
                true retreat — so you leave lighter, brighter and genuinely looked after.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed mb-8">
                From your first consultation to your fifth follow-up, every treatment is mapped to
                your skin — not to a menu.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setBookingOpen(true)} className="btn-beauty-filled">
                  Book Your Appointment Now
                </button>
                <button onClick={() => navigate("/skin-quiz")} className="btn-beauty">
                  Take the Free Skin Quiz
                </button>
              </div>
            </Reveal>
            <Reveal direction="right" delay={120}>
              <div className="overflow-hidden rounded-md group">
                <img
                  src={treatmentRoom}
                  alt="Inside the Naz Beauty Salon treatment room"
                  className="w-full h-[420px] object-cover img-zoom"
                  width={1600}
                  height={1000}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-secondary py-14 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { n: "500+", l: "Happy Clients" },
              { n: "4.9★", l: "Average Rating" },
              { n: "12+", l: "Signature Treatments" },
              { n: "8 yrs", l: "Of Glow-Giving" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 90} direction="up">
                <p className="font-display text-3xl md:text-4xl">{s.n}</p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mt-2">
                  {s.l}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <p className="section-subtitle text-center mb-3">Why clients stay with us</p>
              <h2 className="section-title text-center mb-14">
                The standard behind every appointment
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 100} direction="up">
                  <div className="h-full p-7 bg-background border border-border rounded-md hover-lift">
                    <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center mb-5">
                      <v.icon size={18} className="text-[hsl(var(--gold))]" />
                    </div>
                    <h3 className="font-display text-lg mb-2">{v.title}</h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 px-6 bg-secondary">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <Reveal direction="left" className="order-2 md:order-1">
              <div className="overflow-hidden rounded-md group">
                <img
                  src={spaImage}
                  alt="Calm treatment space at Naz Beauty Salon"
                  className="w-full h-[400px] object-cover img-zoom"
                  loading="lazy"
                  width={1200}
                  height={800}
                />
              </div>
            </Reveal>
            <Reveal direction="right" className="order-1 md:order-2">
              <p className="section-subtitle mb-3">Our promise</p>
              <h2 className="section-title mb-5">A calm room, a clear plan, real change</h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                We keep our schedule intentionally small so no one is rushed. You get a full skin
                analysis, a treatment tailored on the spot, and a simple home routine you will
                actually follow.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed mb-8">
                That is why most of our calendar fills with returning clients and their referrals —
                and why weekend slots go fast.
              </p>
              <button onClick={() => setBookingOpen(true)} className="btn-beauty-filled">
                Claim Your Slot This Week
              </button>
            </Reveal>
          </div>
        </section>

        <MapSection />
      </main>
      <Footer />
      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
};

export default About;
