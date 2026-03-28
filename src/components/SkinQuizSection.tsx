import { useNavigate } from "react-router-dom";
import spaImage from "@/assets/spa-interior.jpg";

const SkinQuizSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="section-subtitle">Not Sure Which Treatment to Book?</p>
          <h2 className="section-title">Take our quick Skin Check Quiz</h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            Take our easy and quick Skin Check Quiz for calm, personalized treatment guidance — no pressure, no stress.
          </p>
          <button onClick={() => navigate("/skin-quiz")} className="btn-beauty inline-block">
            Take the Skin Check Quiz
          </button>
        </div>
        <div className="relative">
          <img
            src={spaImage}
            alt="Beauty spa interior"
            className="w-full h-[400px] md:h-[500px] object-cover"
            loading="lazy"
            width={1200}
            height={800}
          />
          <button
            onClick={() => navigate("/skin-quiz")}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2.5 text-xs tracking-[0.2em] uppercase font-medium bg-primary-foreground/90 text-foreground hover:bg-primary-foreground transition-all"
          >
            Take the Quiz
          </button>
        </div>
      </div>
    </section>
  );
};

export default SkinQuizSection;
