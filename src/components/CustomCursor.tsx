import { useEffect, useState } from "react";
import { MousePointer2 } from "lucide-react";

const STORAGE_KEY = "naz_custom_cursor_enabled";

const CustomCursor = () => {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(STORAGE_KEY);
    // Default ON; respect stored preference if present
    if (stored === null) return true;
    return stored === "true";
  });
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    setIsCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(enabled));
    if (enabled && !isCoarse) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "";
    }
    return () => {
      document.body.style.cursor = "";
    };
  }, [enabled, isCoarse]);

  useEffect(() => {
    if (!enabled || isCoarse) return;
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [role='button'], input, textarea, select, label"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [enabled, isCoarse]);

  if (isCoarse) return null;

  return (
    <>
      {enabled && (
        <>
          <div
            className="pointer-events-none fixed z-[9999] mix-blend-difference transition-transform duration-100 ease-out"
            style={{
              left: pos.x,
              top: pos.y,
              transform: `translate(-50%, -50%) scale(${hovering ? 2.5 : 1})`,
            }}
          >
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <div
            className="pointer-events-none fixed z-[9998] border border-foreground/40 rounded-full transition-all duration-300 ease-out"
            style={{
              left: pos.x,
              top: pos.y,
              width: hovering ? 50 : 32,
              height: hovering ? 50 : 32,
              transform: "translate(-50%, -50%)",
            }}
          />
        </>
      )}
      <button
        onClick={() => setEnabled((v) => !v)}
        aria-label={enabled ? "Disable custom cursor" : "Enable custom cursor"}
        title={enabled ? "Disable custom cursor" : "Enable custom cursor"}
        className="fixed bottom-5 left-5 z-[10000] w-10 h-10 rounded-full bg-foreground text-background shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      >
        <MousePointer2 size={16} className={enabled ? "" : "opacity-50"} />
      </button>
    </>
  );
};

export default CustomCursor;
