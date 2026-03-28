import { useState } from "react";
import { Star, ChevronRight, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const reviews = [
  {
    name: "Ayesha K.",
    rating: 5,
    date: "2 weeks ago",
    text: "Absolutely loved my facial! My skin has never felt this smooth. The staff was so welcoming and professional.",
  },
  {
    name: "Priya M.",
    rating: 5,
    date: "1 month ago",
    text: "Best waxing experience ever — quick, clean, and virtually painless. Will definitely be coming back!",
  },
  {
    name: "Sara L.",
    rating: 4,
    date: "1 month ago",
    text: "The bridal package was everything I needed before my big day. My skin was glowing and I felt so pampered.",
  },
  {
    name: "Fatima R.",
    rating: 5,
    date: "3 weeks ago",
    text: "I've tried so many parlours but Naz Beauty Parlour is on another level. The ambiance, the care, everything is top-notch.",
  },
  {
    name: "Hina T.",
    rating: 5,
    date: "2 months ago",
    text: "Got a hair treatment and it completely transformed my hair. So silky and healthy looking now!",
  },
  {
    name: "Zara A.",
    rating: 4,
    date: "1 week ago",
    text: "Love the skin consultation they offer. Very knowledgeable team and great product recommendations.",
  },
];

const ReviewsPanel = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-primary text-primary-foreground px-2 py-4 rounded-l-lg shadow-lg hover:pr-3 transition-all duration-300 flex flex-col items-center gap-1 group">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-[10px] tracking-widest uppercase font-medium [writing-mode:vertical-lr] rotate-180">
            Reviews
          </span>
          <ChevronRight className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto p-0">
        <SheetHeader className="p-6 pb-4 border-b border-border sticky top-0 bg-background z-10">
          <SheetTitle className="font-display text-2xl tracking-wide">
            Client Reviews
          </SheetTitle>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">4.9 out of 5 · {reviews.length} reviews</span>
          </div>
        </SheetHeader>

        <div className="divide-y divide-border">
          {reviews.map((review, index) => (
            <div key={index} className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                    <span className="font-display text-sm text-accent-foreground">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < review.rating
                          ? "fill-primary text-primary"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ReviewsPanel;
