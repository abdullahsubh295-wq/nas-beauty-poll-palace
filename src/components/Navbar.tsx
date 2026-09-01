import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Sparkles, Star } from "lucide-react";

interface NavbarProps {
  onBookNow?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  action?: "book";
}

const navLinks: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "/service-menu" },
  { label: "SKIN QUIZ", href: "/skin-quiz" },
  { label: "ABOUT US", href: "/about" },
];

const Navbar = ({ onBookNow }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const delta = y - lastY.current;
      if (y < 80) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
        setIsOpen(false);
      } else if (delta < -6) {
        setHidden(false);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (item: NavItem, e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (item.action === "book") {
      if (onBookNow) onBookNow();
      else navigate("/?booking=true");
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

  const handleBook = () => {
    setIsOpen(false);
    if (onBookNow) onBookNow();
    else navigate("/?booking=true");
  };

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        hidden ? "-translate-y-[180%]" : scrolled ? "top-2" : "top-3"
      } w-[min(1360px,calc(100vw-1.25rem))]`}
    >
      {/* Utility strip — fills the space beside the brush */}
      <div className="hidden md:flex items-center justify-between mb-2 px-4 text-[10px] tracking-[0.22em] uppercase text-foreground/70">
        <span className="flex items-center gap-2 rounded-full bg-background/70 backdrop-blur-md px-4 py-1.5 border border-border shadow-sm">
          <Star size={11} className="text-[hsl(var(--gold))]" />
          Trusted by 500+ clients
        </span>
        <button
          onClick={() => navigate("/skin-quiz")}
          className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f7e4d8] to-[#f3e2bf] px-5 py-1.5 border border-[hsl(var(--gold))]/40 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
        >
          <Sparkles size={11} className="text-[hsl(var(--gold))]" />
          Free 60-second Skin Quiz
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
        <a
          href="tel:+923000000000"
          className="flex items-center gap-2 rounded-full bg-background/70 backdrop-blur-md px-4 py-1.5 border border-border shadow-sm hover:bg-background transition-colors"
        >
          <Phone size={11} className="text-[hsl(var(--gold))]" />
          Open today · 10am – 8pm
        </a>
      </div>

      <nav className="relative" aria-label="Primary">
        {/* Desktop makeup-brush nav */}
        <div className="hidden md:flex items-stretch h-14 group">
          {/* Bristles (left fan) */}
          <div className="relative h-full flex items-center" aria-hidden>
            <div
              className="h-full w-10 rounded-l-full"
              style={{
                background:
                  "linear-gradient(90deg, #fff5ea 0%, #f3d9c4 55%, #e6b8a2 100%)",
                clipPath:
                  "polygon(0% 15%, 100% 0%, 100% 100%, 0% 85%, 8% 70%, 0% 55%, 8% 40%, 0% 30%)",
                boxShadow: "inset -2px 0 6px hsl(var(--foreground)/0.15)",
              }}
            />
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
                "linear-gradient(135deg, #3a1f1a 0%, #5a2e26 40%, #7a3a2c 70%, #3a1f1a 100%)",
              boxShadow:
                "0 10px 30px -10px hsl(var(--foreground)/0.45), inset 0 1px 0 hsl(var(--background)/0.08)",
            }}
          >
            <div
              className="absolute top-1 left-10 right-16 h-1 rounded-full opacity-30 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--background)/0.9), transparent)",
              }}
            />

            <Link
              to="/"
              className="flex flex-col leading-none mr-6 whitespace-nowrap hover:opacity-80 transition-opacity"
            >
              <span className="font-display text-[15px] tracking-[0.18em] text-background">
                NAZ BEAUTY
              </span>
              <span className="text-[8px] tracking-[0.3em] uppercase text-background/50 mt-0.5">
                Skin & Beauty Studio
              </span>
            </Link>

            <ul className="flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(link, e)}
                    className="relative px-3 lg:px-4 py-2 text-[11px] tracking-[0.18em] font-medium rounded-full text-background/85 hover:text-background hover:bg-background/10 transition-all duration-300 after:absolute after:left-4 after:right-4 after:-bottom-0.5 after:h-px after:bg-[hsl(var(--gold))] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 ml-4">
              <span className="hidden lg:block text-[10px] tracking-[0.16em] text-background/50 uppercase">
                Limited slots this week
              </span>
              <button
                onClick={handleBook}
                className="px-5 py-2 text-[11px] tracking-[0.18em] font-medium rounded-full bg-gradient-to-r from-[#e8b6a3] to-[#d9b779] text-foreground hover:from-[#f3d9c4] hover:to-[#f5e6c4] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
              >
                BOOK IN 30 SECONDS
              </button>
            </div>

            <div
              className="absolute right-0 top-0 bottom-0 w-2"
              aria-hidden
              style={{
                background: "linear-gradient(180deg, #d9b779, #b08642, #8c6628)",
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
              background: "linear-gradient(90deg, #fff5ea, #e6b8a2)",
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
              background: "linear-gradient(135deg, #3a1f1a, #5a2e26, #3a1f1a)",
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
                onClick={handleBook}
                className="px-3 py-1.5 text-[9px] tracking-[0.15em] rounded-full bg-gradient-to-r from-[#e8b6a3] to-[#d9b779] text-foreground font-medium"
              >
                BOOK NOW
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
                className="block px-6 py-3 text-[11px] tracking-[0.18em] font-medium text-foreground hover:bg-secondary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/skin-quiz");
              }}
              className="mx-4 mt-2 flex w-[calc(100%-2rem)] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f7e4d8] to-[#f3e2bf] px-4 py-2.5 text-[10px] tracking-[0.18em] uppercase font-medium"
            >
              <Sparkles size={12} className="text-[hsl(var(--gold))]" />
              Free 60-second Skin Quiz
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
