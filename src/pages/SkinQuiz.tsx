import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  description: string;
  options: string[];
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is your Main Skin Concern?",
    description:
      "At Naz Beauty Salon, we meet you where you are. Pick your biggest skin concern — but don't overthink it!",
    options: [
      "Breakouts / congestion",
      "Sensitivity / redness",
      "Dryness / dehydration",
      "Texture / dullness",
      "Anti-aging / prevention",
    ],
  },
  {
    id: 2,
    question: "How does your skin feel by midday?",
    description:
      "Think about a typical day without heavy products — how does your skin behave on its own?",
    options: [
      "Oily or shiny all over",
      "Oily in my T-zone, dry on cheeks",
      "Tight and dry",
      "Comfortable, mostly balanced",
      "Irritated or reactive",
    ],
  },
  {
    id: 3,
    question: "How often do you experience breakouts?",
    description:
      "Everyone gets the occasional spot, but how frequently do breakouts show up for you?",
    options: [
      "Rarely or never",
      "Around my period / hormonal cycles",
      "Frequently — mostly on chin & jawline",
      "Constantly across my face",
      "Only when I try new products",
    ],
  },
  {
    id: 4,
    question: "What's your current skincare routine like?",
    description:
      "No judgment here — we just want to understand where you're at so we can guide you better.",
    options: [
      "Minimal — cleanser and moisturizer",
      "Basic — a few steps, not super consistent",
      "Solid — I follow a routine morning & night",
      "Extensive — serums, actives, SPF, the works",
      "Confused — I don't know what I should be using",
    ],
  },
  {
    id: 5,
    question: "Have you had a professional facial before?",
    description:
      "This helps us tailor the intensity of your recommended treatment.",
    options: [
      "Never — this would be my first",
      "Once or twice, a while ago",
      "Occasionally — a few times a year",
      "Regularly — every month or so",
      "Yes, and I've had advanced treatments (peels, microneedling, etc.)",
    ],
  },
  {
    id: 6,
    question: "What does your ideal treatment outcome look like?",
    description:
      "Dream big — what would you love to walk away feeling or looking like?",
    options: [
      "Clear, calm skin with fewer breakouts",
      "Bright, glowy, and hydrated",
      "Smoother texture and refined pores",
      "Firmer, more youthful-looking skin",
      "Just relaxed and pampered — I need a reset",
    ],
  },
  {
    id: 7,
    question: "Do you have any skin sensitivities we should know about?",
    description:
      "This helps us recommend treatments that are safe and comfortable for you.",
    options: [
      "None that I know of",
      "I react to fragrances or certain ingredients",
      "My skin gets red easily",
      "I have eczema, rosacea, or a skin condition",
      "I'm pregnant or breastfeeding",
    ],
  },
];

interface ResultRecommendation {
  title: string;
  description: string;
  price: string;
}

function getRecommendation(answers: Record<number, string>): ResultRecommendation {
  const concern = answers[1] || "";
  if (concern.includes("Breakouts")) {
    return {
      title: "Deep Cleanse Facial",
      description:
        "A purifying treatment with extractions and antibacterial actives to clear congestion, reduce breakouts, and leave your skin feeling clean and balanced.",
      price: "From $145",
    };
  }
  if (concern.includes("Sensitivity")) {
    return {
      title: "Calm & Soothe Facial",
      description:
        "A gentle, restorative facial designed to reduce redness, strengthen your skin barrier, and bring your skin back to a state of calm comfort.",
      price: "From $155",
    };
  }
  if (concern.includes("Dryness")) {
    return {
      title: "Hydration Rescue Facial",
      description:
        "An intensely nourishing treatment that floods your skin with moisture, repairs dehydration lines, and restores a plump, dewy glow.",
      price: "From $160",
    };
  }
  if (concern.includes("Anti-aging")) {
    return {
      title: "Age-Defying Facial",
      description:
        "A results-driven treatment combining peptides, retinoids, and collagen-boosting actives to firm, smooth, and rejuvenate your skin.",
      price: "From $185",
    };
  }
  return {
    title: "Signature Glow Facial",
    description:
      "Our most popular facial — a customized treatment that exfoliates, brightens, and refines your skin texture for an unmistakable glow.",
    price: "From $150",
  };
}

const SkinQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const isIntro = currentQuestion === 0;
  const questionIndex = currentQuestion - 1;
  const totalQuestions = questions.length;
  const progress = isIntro ? 0 : Math.round((currentQuestion / totalQuestions) * 100);

  const handleSelect = (option: string) => {
    setAnswers((prev) => ({ ...prev, [questions[questionIndex].id]: option }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const currentAnswer = !isIntro ? answers[questions[questionIndex]?.id] : undefined;
  const recommendation = getRecommendation(answers);

  if (showResult) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16 md:pt-20">
          <section className="py-20 md:py-28 px-6">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <CheckCircle2 className="mx-auto h-16 w-16 text-foreground opacity-60" />
              <h1 className="section-title">Your Personalized Recommendation</h1>
              <p className="text-muted-foreground font-body leading-relaxed">
                Based on your answers, here's the treatment we think is perfect for you right now.
              </p>

              <div className="border border-border p-8 md:p-12 text-left space-y-4">
                <p className="section-subtitle">We recommend</p>
                <h2 className="text-2xl md:text-3xl font-display">{recommendation.title}</h2>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {recommendation.description}
                </p>
                <p className="text-sm tracking-[0.15em] uppercase font-medium text-foreground">
                  {recommendation.price}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button
                  onClick={() => navigate("/service-menu")}
                  className="btn-beauty-filled"
                >
                  Book This Treatment
                </button>
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers({});
                    setShowResult(false);
                  }}
                  className="btn-beauty"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 md:pt-20">
        {isIntro ? (
          <section className="py-20 md:py-32 px-6">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h1 className="font-display text-3xl md:text-5xl font-normal leading-tight">
                Not Sure What Your Skin Needs Right Now?
              </h1>
              <p className="text-muted-foreground font-body leading-relaxed max-w-lg mx-auto">
                Our Skin Check is a quick way to get clear guidance on which facial makes sense for
                your skin today — based on what's going on now, not what worked months ago.
              </p>
              <p className="text-sm text-muted-foreground font-body">
                Takes about 2 minutes. No pressure. No overthinking.
              </p>
              <div className="pt-4">
                <div className="w-16 mx-auto border-t border-foreground/30 mb-8" />
                <button onClick={() => setCurrentQuestion(1)} className="btn-beauty-filled">
                  Start the Skin Check
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section className="py-12 md:py-20 px-6">
            <div className="max-w-3xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="font-display text-lg md:text-xl tracking-wide text-foreground">
                  nas beauty paller
                </p>
                <p className="text-sm text-muted-foreground tracking-wide">
                  Question {currentQuestion}
                </p>
              </div>

              {/* Progress */}
              <div className="mb-2">
                <Progress value={progress} className="h-1.5 rounded-none bg-secondary" />
              </div>
              <p className="text-xs text-muted-foreground mb-12">{progress}%</p>

              {/* Question */}
              <div className="space-y-4 mb-10">
                <h2 className="text-2xl md:text-3xl font-display font-normal">
                  {questions[questionIndex].question}
                </h2>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {questions[questionIndex].description}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
                {questions[questionIndex].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`flex items-center gap-3 p-4 border text-left transition-all duration-200 text-sm font-body ${
                      currentAnswer === option
                        ? "border-foreground bg-foreground/5"
                        : "border-border hover:border-foreground/40"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        currentAnswer === option
                          ? "border-foreground"
                          : "border-muted-foreground/40"
                      }`}
                    >
                      {currentAnswer === option && (
                        <span className="w-2.5 h-2.5 rounded-full bg-foreground" />
                      )}
                    </span>
                    {option}
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!currentAnswer}
                  className={`btn-beauty-filled flex items-center gap-2 ${
                    !currentAnswer ? "opacity-40 cursor-not-allowed" : ""
                  }`}
                >
                  {currentQuestion === totalQuestions ? "See My Results" : "Next question"}
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SkinQuiz;
