import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";
import { Star, ChevronLeft, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl mb-4">Product Not Found</h1>
          <Link to="/shop" className="btn-beauty text-xs px-6 py-2.5">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onBookNow={() => {}} />
      <main className="pt-24 md:pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/shop" className="inline-flex items-center gap-1 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ChevronLeft size={14} />
            Back to Shop
          </Link>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Image */}
            <div className="aspect-[3/4] overflow-hidden bg-secondary">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                width={600}
                height={800}
              />
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-body mb-2">{product.category}</p>
                <h1 className="font-display text-2xl md:text-3xl text-foreground mb-3">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.round(product.rating) ? "fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" : "text-border"}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground font-body">{product.rating} ({product.reviewCount} reviews)</span>
                </div>
                <p className="font-display text-xl">${product.price.toFixed(2)}</p>
              </div>

              <p className="text-sm text-muted-foreground font-body leading-relaxed">{product.description}</p>

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2.5 hover:bg-secondary transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-body">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2.5 hover:bg-secondary transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
                <Button onClick={handleAddToCart} className="flex-1" size="lg">
                  Add to Cart
                </Button>
              </div>

              {/* Extra Info */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div>
                  <h3 className="font-display text-sm mb-2">Key Ingredients</h3>
                  <p className="text-xs text-muted-foreground font-body leading-relaxed">{product.ingredients}</p>
                </div>
                <div>
                  <h3 className="font-display text-sm mb-2">How to Use</h3>
                  <p className="text-xs text-muted-foreground font-body leading-relaxed">{product.howToUse}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
};

export default ProductDetail;
