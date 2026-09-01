import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Cross-fades between routes: fades the outgoing page out, swaps the
 * rendered location, scrolls to top, then fades the new page in.
 */
const PageTransition = ({
  children,
}: {
  children: (location: ReturnType<typeof useLocation>) => ReactNode;
}) => {
  const location = useLocation();
  const [displayed, setDisplayed] = useState(location);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (location.pathname === displayed.pathname) {
      setDisplayed(location);
      return;
    }
    setLeaving(true);
    const t = window.setTimeout(() => {
      setDisplayed(location);
      window.scrollTo({ top: 0, left: 0 });
      setLeaving(false);
    }, 260);
    return () => window.clearTimeout(t);
  }, [location, displayed.pathname]);

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        leaving ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
      }`}
    >
      {children(displayed)}
    </div>
  );
};

export default PageTransition;
