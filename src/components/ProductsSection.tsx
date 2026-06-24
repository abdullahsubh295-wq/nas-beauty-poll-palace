import productSerum from "@/assets/product-serum.jpg";
import productCream from "@/assets/product-cream.jpg";
import productMist from "@/assets/product-mist.jpg";
import productCleanser from "@/assets/product-cleanser.jpg";

const products = [
  { name: "GlowShift Serum", price: "$88.00", image: productSerum },
  { name: "VelvetCloud Face Cream", price: "$68.00", image: productCream },
  { name: "RoseDew Face Mist", price: "$58.00", image: productMist },
  { name: "SilkWave Cleanser", price: "$48.00", image: productCleanser },
];

import Reveal from "@/components/Reveal";

const ProductsSection = () => {
  return (
    <section id="shop" className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-center justify-between mb-12">
            <h2 className="section-title">Shop Our Collection</h2>
            <a href="/shop" className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors story-link">
              See all
            </a>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <Reveal key={product.name} delay={i * 100} direction="up">
              <div className="group cursor-pointer space-y-3 hover-3d rounded-md p-2 bg-background">
                <div className="aspect-[3/4] overflow-hidden bg-secondary rounded-sm">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover img-zoom"
                    loading="lazy"
                    width={600}
                    height={800}
                  />
                </div>
                <div className="space-y-1 px-1">
                  <h3 className="font-display text-sm">{product.name}</h3>
                  <p className="text-muted-foreground text-sm font-body">{product.price}</p>
                </div>
                <button className="btn-beauty text-[10px] w-full text-center py-2.5">
                  Add to Cart
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
