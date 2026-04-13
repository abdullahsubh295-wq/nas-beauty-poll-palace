import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, ShoppingBag, ChevronDown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "@/components/CartDrawer";

interface NavbarProps {
  onBookNow?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
}

const navLinks: NavItem[] = [
  {
    label: "BOOK NOW",
    href: "#",
  },
  {
    label: "SERVICE MENU",
    href: "/service-menu",
    dropdown: [
      { label: "Signature Facials", href: "/service-menu" },
      { label: "Advanced Treatments", href: "/service-menu" },
      { label: "Brows & Lashes", href: "/service-menu" },
      { label: "Skin Check Quiz", href: "/skin-quiz" },
    ],
  },
  {
    label: "ABOUT US",
    href: "#about",
    dropdown: [
      { label: "Our Story", href: "#about" },
      { label: "Our Team", href: "#about" },
      { label: "Locations", href: "#locations" },
    ],
  },
  {
    label: "SHOP",
    href: "/shop",
    dropdown: [
      { label: "All Products", href: "/shop" },
      { label: "Serums & Oils", href: "/shop" },
      { label: "Moisturizers", href: "/shop" },
      { label: "Gift Sets", href: "/shop" },
    ],
  },
];

const Navbar = ({ onBookNow }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { totalItems } = useCart();

  const handleNavClick = (label: string, href: string, e: React.MouseEvent) => {
    if (label === "BOOK NOW" && onBookNow) {
      e.preventDefault();
      onBookNow();
    } else if (label === "BOOK NOW") {
      e.preventDefault();
      navigate("/service-menu");
    } else if (href.startsWith("/")) {
      e.preventDefault();
      navigate(href);
    }
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && handleMouseEnter(link.label)}
                onMouseLeave={() => link.dropdown && handleMouseLeave()}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(link.label, link.href, e)}
                  className="flex items-center gap-1 text-[11px] tracking-[0.15em] font-medium text-foreground hover:text-muted-foreground transition-colors cursor-pointer py-2"
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-200 ${
                        openDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </a>

                {/* Dropdown */}
                {link.dropdown && openDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-1 min-w-[200px]">
                    <div className="bg-background border border-border shadow-lg py-2">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={(e) => handleNavClick(item.label, item.href, e)}
                          className="block px-5 py-2.5 text-[11px] tracking-[0.1em] text-foreground hover:bg-secondary transition-colors font-body"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Center logo */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <Link to="/" className="font-display text-xl md:text-2xl tracking-wide text-foreground text-center mb-0">
              NAZ BEAUTY <br />SALON
            </Link>
            <p className="hidden md:block text-[9px] tracking-[0.3em] uppercase text-muted-foreground mt-1.5 mb-1">
              Where Beauty Meets Self-Care
            </p>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button className="text-foreground hover:text-muted-foreground transition-colors">
              <Search size={18} />
            </button>
            <button onClick={() => setCartOpen(true)} className="text-foreground hover:text-muted-foreground transition-colors relative">
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-6 space-y-1">
          {navLinks.map((link) => (
            <div key={link.label}>
              <div className="flex items-center justify-between">
                <a
                  href={link.href}
                  onClick={(e) => {
                    if (link.dropdown) {
                      e.preventDefault();
                      setMobileExpanded(mobileExpanded === link.label ? null : link.label);
                    } else {
                      handleNavClick(link.label, link.href, e);
                    }
                  }}
                  className="block py-2.5 text-xs tracking-[0.15em] font-medium text-foreground"
                >
                  {link.label}
                </a>
                {link.dropdown && (
                  <button
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === link.label ? null : link.label)
                    }
                    className="p-1"
                  >
                    <ChevronDown
                      size={14}
                      className={`text-muted-foreground transition-transform ${
                        mobileExpanded === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </div>
              {link.dropdown && mobileExpanded === link.label && (
                <div className="pl-4 pb-2 space-y-1">
                  {link.dropdown.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(item.label, item.href, e)}
                      className="block py-1.5 text-[11px] tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
    <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
};

export default Navbar;
