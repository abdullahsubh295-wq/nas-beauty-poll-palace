import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, ShoppingBag } from "lucide-react";

interface NavbarProps {
  onBookNow?: () => void;
}

const Navbar = ({ onBookNow }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (label: string, e: React.MouseEvent) => {
    if (label === "BOOK NOW" && onBookNow) {
      e.preventDefault();
      onBookNow();
    } else if (label === "BOOK NOW") {
      e.preventDefault();
      navigate("/service-menu");
    } else if (label === "SERVICE MENU") {
      e.preventDefault();
      navigate("/service-menu");
    }
    setIsOpen(false);
  };

  const navLinks = [
    { label: "BOOK NOW", href: "#" },
    { label: "GIFT CARDS", href: "#shop" },
    { label: "SERVICE MENU", href: "/service-menu" },
    { label: "ABOUT US", href: "#about" },
    { label: "SHOP", href: "#shop" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(link.label, e)}
                className="text-[11px] tracking-[0.15em] font-medium text-foreground hover:text-muted-foreground transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <Link to="/" className="font-display text-xl md:text-2xl tracking-wide text-foreground">
              nas beauty paller
            </Link>
            <p className="hidden md:block text-[9px] tracking-[0.3em] uppercase text-muted-foreground mt-0.5">
              A Space For You
            </p>
          </div>

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

      {isOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(link.label, e)}
              className="block text-xs tracking-[0.15em] font-medium text-foreground"
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
