import productMist from "@/assets/product-mist.jpg";

const FeaturedProductSection = () => {
  return (
    <section className="py-20 md:py-28 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="aspect-square max-w-md mx-auto w-full overflow-hidden">
          <img
            src={productMist}
            alt="RoseDew Face Mist"
            className="w-full h-full object-cover"
            loading="lazy"
            width={600}
            height={800}
          />
        </div>
        <div className="space-y-6">
          <p className="section-subtitle">✨ This Just In</p>
          <h2 className="section-title">RoseDew Face Mist</h2>
          <div className="w-12 h-px bg-foreground" />
          <p className="text-muted-foreground font-body leading-relaxed">
            A refreshing oasis for thirsty skin, RoseDew infuses your complexion with the power of botanical extracts and
            thoughtfully selected ingredients. This revitalizing mist combines replenishing rose water with hydrating aloe vera,
            creating the perfect moisture balance while soothing allantoin calms and uplifting neroli brightens your senses.
          </p>
          <div className="flex items-center gap-6">
            <button className="btn-beauty-filled">Add to Cart</button>
            <span className="font-display text-xl">$58.00</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductSection;
