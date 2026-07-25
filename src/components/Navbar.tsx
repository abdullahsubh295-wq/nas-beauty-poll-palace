import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onBookNow?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  action?: "book";
  match?: (pathname: string, hash: string) => boolean;
}

const navLinks: NavItem[] = [
  { label: "HOME", href: "/", match: (p) => p === "/" },
  { label: "BOOK NOW", href: "#", action: "book" },
  { label: "SERVICES", href: "/service-menu", match: (p) => p.startsWith("/service-menu") },
  { label: "ABOUT US", href: "/#about", match: (_p, h) => h === "#about" },
];

const Navbar = ({ onBookNow }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

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
      else navigate("/service-menu");
      return;
    }
    if (item.href.startsWith("/#")) {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(item.href.slice(1));
        el?.scrollIntoView({ behavior: "smooth" });
      }, 60);
      return;
    }
    if (item.href.startsWith("#")) {
      const el = document.querySelector(item.href);
      el?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate(item.href);
  };

  const isActive = (item: NavItem) =>
    item.match ? item.match(location.pathname, location.hash) : false;

  // Brown eyeliner gradients (theme brown instead of the reference image's black)
  const bodyGradient =
    "linear-gradient(180deg, #2a140f 0%, #4a231b 18%, #7a3a2c 45%, #4a231b 78%, #2a140f 100%)";
  const goldRing =
    "linear-gradient(180deg, #8c6628 0%, #f5e6c4 40%, #d9b779 60%, #8c6628 100%)";
  const glossHighlight =
    "linear-gradient(180deg, transparent 30%, rgba(255,240,220,0.28) 50%, transparent 70%)";

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        hidden ? "-translate-y-[160%]" : scrolled ? "top-3" : "top-5"
      } w-[min(980px,calc(100vw-1.5rem))]`}
      aria-label="Primary"
    >
      {/* Desktop eyeliner pen */}
      <div className="hidden md:flex items-stretch h-14 relative">
        {/* Left tapered cap */}
        <div
          aria-hidden
          className="h-full w-14 relative"
          style={{
            background: bodyGradient,
            clipPath: "polygon(0% 50%, 22% 8%, 100% 0%, 100% 100%, 22% 92%)",
            boxShadow:
              "inset 0 2px 0 rgba(255,220,200,0.08), 0 8px 24px -10px rgba(0,0,0,0.5)",
          }}
        >
          <span
            className="absolute inset-0 pointer-events-none"
            style={{ background: glossHighlight, clipPath: "inherit" }}
          />
        </div>

        {/* Gold ferrule ring */}
        <div
          aria-hidden
          className="h-full w-2.5 relative z-10"
          style={{
            background: goldRing,
            boxShadow:
              "inset 0 0 0 1px rgba(0,0,0,0.25), 0 0 10px rgba(217,183,121,0.35)",
          }}
        />

        {/* Body barrel */}
        <div
          className="relative flex-1 flex items-center justify-between pl-7 pr-4"
          style={{
            background: bodyGradient,
            boxShadow:
              "inset 0 1px 0 rgba(255,220,200,0.08), 0 12px 32px -14px rgba(20,10,8,0.55)",
          }}
        >
          {/* Gloss highlight along top */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-full pointer-events-none"
            style={{ background: glossHighlight }}
          />

          <Link
            to="/"
            className="relative font-display text-[15px] tracking-[0.22em] text-[hsl(var(--cream))] mr-6 whitespace-nowrap hover:text-white transition-colors"
          >
            NAZ BEAUTY
          </Link>

          <ul className="relative flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link);
              return (
                <li key={link.label} className="relative">
                  {/* Active glow indicator (light shining above the link) */}
                  {active && (
                    <>
                      <span
                        aria-hidden
                        className="pointer-events-none absolute left-1/2 -top-4 -translate-x-1/2 w-24 h-8 rounded-full blur-xl opacity-90 animate-fade-in"
                        style={{
                          background:
                            "radial-gradient(ellipse at center, hsl(var(--gold) / 0.9) 0%, hsl(var(--gold) / 0.4) 40%, transparent 70%)",
                        }}
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute left-1/2 -top-1 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))] shadow-[0_0_8px_2px_hsl(var(--gold)/0.7)]"
                      />
                    </>
                  )}
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(link, e)}
                    className={`relative px-3 lg:px-4 py-2 text-[11px] tracking-[0.22em] font-medium rounded-full transition-all duration-300 ${
                      active
                        ? "text-[hsl(var(--cream))]"
                        : "text-[hsl(var(--cream))]/70 hover:text-[hsl(var(--cream))]"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right tapered tip */}
        <div
          aria-hidden
          className="h-full w-16 relative"
          style={{
            background: bodyGradient,
            clipPath: "polygon(0% 0%, 100% 45%, 100% 55%, 0% 100%)",
            boxShadow: "0 8px 24px -10px rgba(0,0,0,0.5)",
          }}
        >
          <span
            className="absolute inset-0 pointer-events-none"
            style={{ background: glossHighlight, clipPath: "inherit" }}
          />
        </div>
      </div>

      {/* Mobile compact eyeliner */}
      <div className="md:hidden flex items-stretch h-12 relative">
        <div
          aria-hidden
          className="h-full w-8"
          style={{
            background: bodyGradient,
            clipPath: "polygon(0% 50%, 30% 10%, 100% 0%, 100% 100%, 30% 90%)",
          }}
        />
        <div aria-hidden className="h-full w-1.5" style={{ background: goldRing }} />
        <div
          className="flex-1 flex items-center justify-between px-4"
          style={{ background: bodyGradient }}
        >
          <Link
            to="/"
            className="font-display text-sm tracking-[0.18em] text-[hsl(var(--cream))]"
          >
            NAZ BEAUTY
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[hsl(var(--cream))] p-1.5"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        <div
          aria-hidden
          className="h-full w-10"
          style={{
            background: bodyGradient,
            clipPath: "polygon(0% 0%, 100% 45%, 100% 55%, 0% 100%)",
          }}
        />
      </div>

      {/* Mobile dropdown panel */}
      {isOpen && (
        <div className="md:hidden mt-3 bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-xl py-3 animate-fade-in">
          {navLinks.map((link) => {
            const active = isActive(link);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(link, e)}
                className={`flex items-center gap-3 px-6 py-3 text-[11px] tracking-[0.22em] font-medium transition-colors ${
                  active
                    ? "text-foreground bg-secondary"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))] shadow-[0_0_8px_2px_hsl(var(--gold)/0.6)]" />
                )}
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
