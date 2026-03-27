import { useState } from "react";
import { Menu, X, Search, ShoppingBag } from "lucide-react";

const navLinks = [
  { label: "BOOK NOW", href: "#services" },
  { label: "GIFT CARDS", href: "#shop" },
  { label: "SERVICE MENU", href: "#services" },
  { label: "ABOUT US", href: "#about" },
  { label: "SHOP", href: "#shop" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left nav links - desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] tracking-[0.15em] font-medium text-foreground hover:text-muted-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Center logo */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <a href="#" className="font-display text-xl md:text-2xl tracking-wide text-foreground">
              nas beauty paller
            </a>
            <p className="hidden md:block text-[9px] tracking-[0.3em] uppercase text-muted-foreground mt-0.5">
              A Space For You
            </p>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button className="text-foreground hover:text-muted-foreground transition-colors">
              <Search size={18} />
            </button>
            <button className="text-foreground hover:text-muted-foreground transition-colors relative">
              <ShoppingBag size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-xs tracking-[0.15em] font-medium text-foreground"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
