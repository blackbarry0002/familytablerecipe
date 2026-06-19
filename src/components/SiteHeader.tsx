import { useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import PillNav from "./PillNav";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: "/" },
    { label: "All Recipes", href: "/recipes" },
    { label: "Categories", href: "/categories" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 py-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`rounded-full border border-border/60 bg-card/85 px-4 sm:px-5 py-2 backdrop-blur-xl transition-shadow duration-300 ${
            scrolled ? "shadow-[0_8px_30px_-12px_oklch(0.45_0.06_60_/_0.18)]" : "shadow-none"
          }`}
        >
          <PillNav
            items={links}
            activeHref={location.pathname}
            baseColor="var(--color-cream-deep)"
            pillColor="transparent"
            pillTextColor="var(--color-ink-soft)"
            hoverBgColor="var(--color-ink)"
            hoveredPillTextColor="var(--color-cream)"
            initialLoadAnimation={false}
          />
        </div>
      </div>
    </header>
  );
}
