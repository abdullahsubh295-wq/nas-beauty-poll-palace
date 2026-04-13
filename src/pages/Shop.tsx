import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { products, categories } from "@/data/products";
import { Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Shop = () => {
  const [sortBy, setSortBy] = useState("featured");
  const [filterCategory, setFilterCategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const { addToCart } = useCart();

  const filtered = useMemo(() => {
    let list = filterCategory === "all" ? [...products] : products.filter((p) => p.category === filterCategory);

    switch (sortBy) {
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [sortBy, filterCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onBookNow={() => {}} />
      <main className="pt-24 md:pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">Our Collection</h1>
          <p className="text-muted-foreground text-sm font-body mb-8">
            Premium skincare crafted for radiant, healthy skin.
          </p>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div key={product.id} className="group space-y-3">
                <Link to={`/shop/${product.id}`}>
                  <div className="aspect-[3/4] overflow-hidden bg-secondary cursor-pointer">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width={600}
                      height={800}
                    />
                  </div>
                </Link>
                <div className="space-y-1">
                  <Link to={`/shop/${product.id}`}>
                    <h3 className="font-display text-sm hover:text-muted-foreground transition-colors">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        className={i < Math.round(product.rating) ? "fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" : "text-border"}
                      />
                    ))}
                    <span className="text-[10px] text-muted-foreground font-body ml-1">({product.reviewCount})</span>
                  </div>
                  <p className="text-muted-foreground text-sm font-body">${product.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => {
                    addToCart(product);
                    setCartOpen(true);
                  }}
                  className="btn-beauty text-[10px] w-full text-center py-2.5"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
};

export default Shop;
