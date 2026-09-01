import { Star, Sparkles, MapPin } from "lucide-react";

const badges = [
  { icon: Star, title: "500+ Five-Star Reviews", desc: "Rated 4.9 by clients across the city" },
  { icon: Sparkles, title: "Licensed Estheticians", desc: "Advanced facial & peel certified" },
  { icon: MapPin, title: "Easy To Reach", desc: "Free parking · Same-week appointments" },
];

const TrustBadges = () => {
  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="relative group [perspective:1200px]">
          {/* Bottle cap */}
          <div className="mx-auto w-28 h-6 rounded-t-md bg-gradient-to-b from-[hsl(var(--gold))] to-[hsl(12_30%_22%)] shadow-md" />
          <div className="mx-auto w-32 h-3 -mt-1 rounded-sm bg-foreground/80 shadow-inner" />
          {/* Bottle neck */}
          <div className="mx-auto w-16 h-6 bg-gradient-to-b from-foreground/15 to-foreground/5 border-x border-foreground/15" />

          {/* Bottle body — capsule */}
          <div
            className="relative mx-auto rounded-[3rem] border border-foreground/15 bg-gradient-to-br from-[hsl(var(--cream))] via-background to-[hsl(var(--cream-dark))] shadow-[0_20px_60px_-20px_hsl(12_30%_22%/0.35)] backdrop-blur-sm overflow-hidden transition-transform duration-500 ease-out group-hover:[transform:rotateX(4deg)_rotateY(-4deg)] [transform-style:preserve-3d]"
          >
            {/* Glass highlight */}
            <span className="pointer-events-none absolute top-2 left-6 w-16 h-32 bg-gradient-to-b from-white/60 to-transparent rounded-full blur-md rotate-12" />
            <span className="pointer-events-none absolute bottom-3 right-8 w-24 h-10 bg-foreground/5 rounded-full blur-xl" />

            {/* Label */}
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-2 px-8 md:px-14 py-10 md:py-12 text-center">
              {badges.map((badge) => (
                <div
                  key={badge.title}
                  className="flex flex-col items-center gap-2 md:px-4 md:border-l md:border-foreground/10 first:md:border-l-0 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center ring-1 ring-foreground/10">
                    <badge.icon size={18} className="text-[hsl(var(--gold))]" />
                  </div>
                  <h4 className="font-display text-sm tracking-wide">{badge.title}</h4>
                  <p className="text-muted-foreground text-xs font-body max-w-[200px]">{badge.desc}</p>
                </div>
              ))}
            </div>

            {/* Tagline strip — like product label */}
            <div className="relative border-t border-foreground/10 bg-foreground/[0.03] py-2 text-center">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
                Naz Beauty · Pure · Trusted · Loved
              </p>
            </div>
          </div>

          {/* Bottle base shadow */}
          <div className="mx-auto mt-2 w-[70%] h-3 bg-foreground/10 blur-md rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
