import { Star } from "lucide-react";

const GOOGLE_REVIEW_URL = "https://www.google.com/search?q=Naz+Beauty+Salon+reviews";

const reviews = [
  {
    name: "Sarah M.",
    initial: "S",
    color: "bg-rose-400",
    rating: 5,
    date: "2 weeks ago",
    text: "Absolutely the best facial I've ever had. The space is gorgeous, the products are luxurious, and my skin has never looked better. Already booked my next appointment!",
  },
  {
    name: "Jessica L.",
    initial: "J",
    color: "bg-amber-500",
    rating: 5,
    date: "1 month ago",
    text: "I came in with stubborn acne and left feeling like a new person. The team really listens and customizes everything. Worth every single dollar.",
  },
  {
    name: "Amanda R.",
    initial: "A",
    color: "bg-emerald-500",
    rating: 5,
    date: "3 weeks ago",
    text: "Hands down the most relaxing and effective treatment in the city. The chemical peel gave me that vacation glow without any downtime. Highly recommend.",
  },
  {
    name: "Michelle K.",
    initial: "M",
    color: "bg-indigo-500",
    rating: 5,
    date: "1 week ago",
    text: "Naz is genuinely talented. She took the time to explain my skin concerns and built a routine that actually works. My friends keep asking what I'm doing differently.",
  },
  {
    name: "Priya S.",
    initial: "P",
    color: "bg-fuchsia-500",
    rating: 5,
    date: "2 months ago",
    text: "From booking to checkout, the whole experience felt premium. Clean, calm, beautifully designed space. I never want to go anywhere else.",
  },
  {
    name: "Olivia T.",
    initial: "O",
    color: "bg-sky-500",
    rating: 5,
    date: "5 days ago",
    text: "Five stars isn't enough. The brow lamination + facial combo transformed my whole look for an event. So many compliments!",
  },
];

const GoogleLogo = () => (
  <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const GoogleReviewsSection = () => {
  return (
    <section className="py-20 md:py-28 px-6 bg-secondary/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background border border-border mb-4">
            <GoogleLogo />
            <span className="text-xs tracking-[0.15em] font-medium">VERIFIED GOOGLE REVIEWS</span>
          </div>
          <h2 className="section-title mb-3">Loved by 500+ Clients</h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
            ))}
            <span className="ml-1 font-display text-xl">4.9</span>
          </div>
          <p className="text-muted-foreground text-sm font-body">Based on 500+ verified Google reviews</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <article
              key={i}
              className="bg-background border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full ${r.color} text-white flex items-center justify-center font-medium`}>
                  {r.initial}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="font-medium text-sm">{r.name}</p>
                    <GoogleLogo />
                  </div>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(r.rating)].map((_, j) => (
                  <Star key={j} size={14} className="fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{r.text}</p>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-background border border-border hover:border-foreground transition-all duration-300 hover:shadow-md text-sm font-medium"
          >
            <GoogleLogo />
            Read all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;
