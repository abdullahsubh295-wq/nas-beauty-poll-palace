import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "@/components/CartDrawer";

interface NavbarProps {
  onBookNow?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  action?: "book";
}

const navLinks: NavItem[] = [
  { label: "BOOK NOW", href: "#", action: "book" },
  { label: "SERVICES", href: "/service-menu" },
  { label: "MENU", href: "/shop" },
  { label: "ABOUT US", href: "/#about" },
];

const Navbar = ({ onBookNow }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (item: NavItem, e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (item.action === "book") {
      if (onBookNow) onBookNow();
      else navigate("/service-menu");
      return;
    }
    if (item.href.startsWith("/#")) {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(item.href.slice(1));
        el?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return;
    }
    if (item.href.startsWith("#")) {
      const el = document.querySelector(item.href);
      el?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate(item.href);
  };

  return (
    <>
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          scrolled ? "top-3" : "top-5"
        } w-[min(960px,calc(100vw-1.5rem))]`}
        aria-label="Primary"
      >
        {/* Desktop makeup-brush nav */}
        <div className="hidden md:flex items-stretch h-14 group">
          {/* Bristles (left fan) */}
          <div className="relative h-full flex items-center" aria-hidden>
            <div
              className="h-full w-10 rounded-l-full"
              style={{
                background:
                  "linear-gradient(90deg, hsl(var(--background)) 0%, hsl(var(--muted)) 60%, hsl(var(--secondary)) 100%)",
                clipPath:
                  "polygon(0% 15%, 100% 0%, 100% 100%, 0% 85%, 8% 70%, 0% 55%, 8% 40%, 0% 30%)",
                boxShadow: "inset -2px 0 6px hsl(var(--foreground)/0.15)",
              }}
            />
            {/* fine bristle lines */}
            <div
              className="absolute inset-y-0 left-0 w-10 opacity-40 pointer-events-none"
              style={{
                clipPath:
                  "polygon(0% 15%, 100% 0%, 100% 100%, 0% 85%, 8% 70%, 0% 55%, 8% 40%, 0% 30%)",
                backgroundImage:
                  "repeating-linear-gradient(85deg, hsl(var(--foreground)/0.12) 0 1px, transparent 1px 3px)",
              }}
            />
          </div>

          {/* Ferrule (metal band) */}
          <div
            className="h-full w-3 relative"
            aria-hidden
            style={{
              background:
                "linear-gradient(180deg, #d9b779 0%, #f5e6c4 25%, #b08642 55%, #f5e6c4 80%, #8c6628 100%)",
              boxShadow:
                "inset 0 0 0 1px rgba(0,0,0,0.15), 0 2px 6px rgba(0,0,0,0.15)",
            }}
          />

          {/* Handle (links) */}
          <div
            className="relative flex-1 flex items-center justify-between pl-8 pr-6 rounded-r-full overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--foreground)) 0%, hsl(var(--foreground)/0.92) 50%, hsl(var(--foreground)) 100%)",
              boxShadow:
                "0 10px 30px -10px hsl(var(--foreground)/0.45), inset 0 1px 0 hsl(var(--background)/0.08)",
            }}
          >
            {/* glossy highlight */}
            <div
              className="absolute top-1 left-10 right-16 h-1 rounded-full opacity-30 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--background)/0.9), transparent)",
              }}
            />

            <Link
              to="/"
              className="font-display text-[15px] tracking-[0.18em] text-background mr-6 whitespace-nowrap hover:opacity-80 transition-opacity"
            >
              NAZ BEAUTY
            </Link>

            <ul className="flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(link, e)}
                    className={`relative px-3 lg:px-4 py-2 text-[11px] tracking-[0.18em] font-medium rounded-full transition-all duration-300 ${
                      link.action === "book"
                        ? "bg-[#d9b779] text-foreground hover:bg-[#f5e6c4] shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        : "text-background/85 hover:text-background hover:bg-background/10"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setCartOpen(true)}
                  className="ml-2 relative text-background/85 hover:text-background transition-colors p-2"
                  aria-label="Open cart"
                >
                  <ShoppingBag size={16} />
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-[#d9b779] text-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </li>
            </ul>

            {/* Handle end cap */}
            <div
              className="absolute right-0 top-0 bottom-0 w-2"
              aria-hidden
              style={{
                background:
                  "linear-gradient(180deg, #d9b779, #b08642, #8c6628)",
                borderTopRightRadius: "9999px",
                borderBottomRightRadius: "9999px",
              }}
            />
          </div>
        </div>

        {/* Mobile compact brush bar */}
        <div className="md:hidden flex items-stretch h-12">
          <div
            className="h-full w-7 rounded-l-full"
            aria-hidden
            style={{
              background:
                "linear-gradient(90deg, hsl(var(--background)), hsl(var(--secondary)))",
              clipPath:
                "polygon(0% 15%, 100% 0%, 100% 100%, 0% 85%, 10% 60%, 0% 40%)",
            }}
          />
          <div
            className="h-full w-2"
            aria-hidden
            style={{
              background:
                "linear-gradient(180deg,#d9b779,#f5e6c4,#b08642,#8c6628)",
            }}
          />
          <div
            className="flex-1 flex items-center justify-between px-4 rounded-r-full"
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--foreground)), hsl(var(--foreground)/0.9))",
              boxShadow: "0 8px 24px -8px hsl(var(--foreground)/0.4)",
            }}
          >
            <Link
              to="/"
              className="font-display text-sm tracking-[0.15em] text-background"
            >
              NAZ BEAUTY
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCartOpen(true)}
                className="relative text-background p-1.5"
                aria-label="Open cart"
              >
                <ShoppingBag size={16} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#d9b779] text-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-background p-1.5"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown panel */}
        {isOpen && (
          <div className="md:hidden mt-3 bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-xl py-3 animate-fade-in">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(link, e)}
                className={`block px-6 py-3 text-[11px] tracking-[0.18em] font-medium transition-colors ${
                  link.action === "book"
                    ? "text-foreground bg-[#d9b779]/30 hover:bg-[#d9b779]/50"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
};

export default Navbar;
