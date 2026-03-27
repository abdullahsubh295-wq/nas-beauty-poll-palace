import { Star, Truck, MapPin } from "lucide-react";

const badges = [
  { icon: Star, title: "Five Star Reviews", desc: "Over 500+ Five Star Reviews" },
  { icon: Truck, title: "Free Shipping", desc: "Free shipping on orders over $50" },
  { icon: MapPin, title: "Parlor Pickup", desc: "Shop online and pick up in person" },
];

const TrustBadges = () => {
  return (
    <section className="py-12 px-6 border-y border-border bg-background">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {badges.map((badge) => (
          <div key={badge.title} className="flex flex-col items-center gap-2">
            <badge.icon size={20} className="text-foreground" />
            <h4 className="font-display text-sm">{badge.title}</h4>
            <p className="text-muted-foreground text-xs font-body">{badge.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBadges;
