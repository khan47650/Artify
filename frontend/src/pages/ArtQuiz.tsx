import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Wand2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const questions = [
  {
    question: "What kind of environment inspires you the most?",
    options: ["Nature & Landscapes", "Urban & Architecture", "Outer Space & Cosmos", "Interior & Still Life"],
  },
  {
    question: "Which color palette speaks to you?",
    options: ["Warm tones", "Cool tones", "Monochrome", "Vibrant & Multicolored"],
  },
  {
    question: "What mood do you want your art to evoke?",
    options: ["Calm & Peaceful", "Bold & Energetic", "Mysterious", "Joyful & Playful"],
  },
  {
    question: "Which art style catches your eye?",
    options: ["Realistic", "Abstract", "Impressionist", "Minimalist"],
  },
  {
    question: "Where would you display this art?",
    options: ["Living room", "Bedroom", "Office", "Gallery wall"],
  },
];

const genreMap = {
  "Nature & Landscapes": {
    genre: "Landscape & Nature Art",
    description: "You're drawn to the beauty of the natural world.",
    recommendations: ["Watercolor landscapes", "Plein air oil paintings", "Nature photography prints"],
  },
  Abstract: {
    genre: "Abstract & Contemporary",
    description: "You appreciate art that challenges perception and pushes boundaries.",
    recommendations: ["Abstract expressionism", "Mixed media collages", "Geometric abstractions"],
  },
  "Calm & Peaceful": {
    genre: "Meditative & Zen Art",
    description: "You seek tranquility and mindfulness through art.",
    recommendations: ["Minimalist ink wash", "Soft pastel abstracts", "Zen-inspired photography"],
  },
  default: {
    genre: "Eclectic & Modern",
    description: "You have diverse taste that spans multiple genres.",
    recommendations: ["Contemporary mixed media", "Modern figurative art", "Digital art prints"],
  },
};

const optionBadge = ["A", "B", "C", "D"];

const ArtQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1);
    else setShowResults(true);
  };

  const result =
    genreMap[answers[0] as keyof typeof genreMap] ||
    genreMap[answers[3] as keyof typeof genreMap] ||
    genreMap[answers[2] as keyof typeof genreMap] ||
    genreMap.default;

  const progress = ((currentQ + 1) / questions.length) * 100;
  const answeredCount = answers.filter(Boolean).length;

  return (
    <div className="min-h-screen bg-white text-[#1d1d1d]">
      <Navbar />

      <main className="relative overflow-hidden bg-white pt-20 pb-10">
        <div className="mx-auto max-w-[1120px] px-4 md:px-6">
          {!showResults ? (
            <div className="grid items-start gap-6 lg:grid-cols-[0.62fr_1.38fr]">
              <aside className="rounded-[28px] border border-[#e6dfd4] bg-white p-5 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.12)]">
                <div className={`${bodyFont} inline-flex items-center gap-2 rounded-full border border-[#d8d2c8] bg-white px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-[#6f6a63]`}>
                  <Sparkles className="h-3.5 w-3.5" />
                  AI Quiz Journey
                </div>

                <h2 className={`${headingFont} mt-4 text-[34px] leading-[0.95] text-[#111]`}>
                  Find Your Signature Art Taste
                </h2>

                <p className={`${bodyFont} mt-3 text-[13px] leading-5 text-[#6f6a63]`}>
                  Answer a few short questions and get a personalized style direction.
                </p>

                <div className="mt-5 rounded-[18px] border border-[#e6dfd4] bg-white p-4">
                  <div className={`${bodyFont} flex items-center justify-between text-[12px]`}>
                    <span className="text-[#777]">Answered</span>
                    <span className="font-semibold">{answeredCount}/{questions.length}</span>
                  </div>

                  <div className="mt-3 h-2 rounded-full bg-[#ede8df]">
                    <div className="h-full rounded-full bg-black transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  {questions.map((q, idx) => (
                    <div
                      key={q.question}
                      className={`${bodyFont} rounded-[12px] border px-3 py-2 text-[12px] ${
                        idx === currentQ
                          ? "border-black bg-black text-white"
                          : "border-[#e6dfd4] bg-white text-[#6f6a63]"
                      }`}
                    >
                      Q{idx + 1}: {answers[idx] ? "Answered" : "Pending"}
                    </div>
                  ))}
                </div>
              </aside>

              <section className="rounded-[28px] border border-[#e6dfd4] bg-white p-6 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.12)] md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <p className={`${bodyFont} text-[12px] uppercase tracking-[0.22em] text-[#777]`}>
                    Question {currentQ + 1} of {questions.length}
                  </p>

                  <button
                    onClick={() => (currentQ > 0 ? setCurrentQ(currentQ - 1) : navigate("/"))}
                    className={`${bodyFont} inline-flex items-center gap-2 rounded-full border border-[#d8d2c8] px-4 py-1.5 text-[12px] text-[#6f6a63]`}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </button>
                </div>

                <h2 className={`${headingFont} mt-4 max-w-[680px] text-[52px] leading-[0.92] text-[#111]`}>
                  {questions[currentQ].question}
                </h2>

                <div className="mt-7 space-y-3">
                  {questions[currentQ].options.map((option, idx) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className={`${bodyFont} flex w-full items-center gap-4 rounded-[18px] border px-5 py-4 text-left text-[18px] transition-all ${
                        answers[currentQ] === option
                          ? "border-black bg-black text-white"
                          : "border-[#d8d2c8] bg-white text-[#1d1d1d] hover:border-black/50"
                      }`}
                    >
                      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-[12px] ${
                        answers[currentQ] === option ? "bg-white/20 text-white" : "bg-[#f1f0ee] text-[#777]"
                      }`}>
                        {optionBadge[idx]}
                      </span>
                      <span>{option}</span>
                    </button>
                  ))}
                </div>

                <Button
                  onClick={handleNext}
                  disabled={!answers[currentQ]}
                  className={`${bodyFont} mt-6 h-11 rounded-full bg-black px-8 text-[13px] text-white`}
                >
                  {currentQ < questions.length - 1 ? "Next Question" : "Reveal My Style"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </section>
            </div>
          ) : (
            <div className="rounded-[28px] border border-[#e6dfd4] bg-white p-8 text-center shadow-[0_10px_30px_-20px_rgba(0,0,0,0.12)] md:p-10">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                <Wand2 className="h-5 w-5" />
              </div>

              <p className={`${bodyFont} mt-5 text-[12px] uppercase tracking-[0.26em] text-[#777]`}>
                Your Curator Result
              </p>

              <h2 className={`${headingFont} mt-3 text-[52px] leading-none text-[#111]`}>
                {result.genre}
              </h2>

              <p className={`${bodyFont} mx-auto mt-4 max-w-2xl text-[15px] leading-6 text-[#6f6a63]`}>
                {result.description}
              </p>

              <div className="mx-auto mt-7 grid max-w-3xl gap-4 md:grid-cols-3">
                {result.recommendations.map((rec) => (
                  <div key={rec} className="rounded-[18px] border border-[#e6dfd4] bg-white p-5 text-left">
                    <CheckCircle2 className="h-5 w-5 text-black" />
                    <p className={`${bodyFont} mt-3 text-[13px] text-[#111]`}>{rec}</p>
                  </div>
                ))}
              </div>

              <Button className={`${bodyFont} mt-8 h-11 rounded-full bg-black px-8 text-[13px] text-white`} onClick={() => navigate("/ai-curator")}>
                Chat with AI Curator
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtQuiz;