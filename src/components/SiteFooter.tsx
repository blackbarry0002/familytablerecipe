import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Facebook } from "lucide-react";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="px-4 sm:px-6 pb-6 pt-16">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-ink text-cream p-8 sm:p-12 lg:p-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-11 w-11 shrink-0" />
              <span className="font-display text-2xl font-bold">Family<span className="text-accent-gradient">Table</span></span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">
              A modern recipe home for the meals that bring people together. Cook with intention, gather with joy.
            </p>
            <div className="mt-6 flex gap-2">
              {[Instagram, Youtube, Facebook].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="grid h-10 w-10 place-items-center rounded-full bg-white/5 hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Explore" items={[
            { label: "All Recipes", to: "/recipes" },
            { label: "Categories", to: "/categories" },
            { label: "About", to: "/about" },
            { label: "Contact", to: "/contact" },
          ]} />
          <FooterCol title="Cuisine" items={[
            { label: "Breakfast", to: "/categories" },
            { label: "Quick Meals", to: "/recipes" },
            { label: "Desserts", to: "/categories" },
            { label: "Vegetarian", to: "/categories" },
          ]} />
          <FooterCol title="Company" items={[
            { label: "Our Story", to: "/about" },
            { label: "Press", to: "/about" },
            { label: "Privacy", to: "/legal" },
            { label: "Terms", to: "/legal" },
          ]} />
        </div>

        <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/10 pt-6 text-xs text-cream/50">
          <p>© {new Date().getFullYear()} Family Table Recipe. Cooked with care.</p>
          <p>Made for families who gather around the table.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-cream/60">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {items.map((i) => (
          <li key={i.label}>
            <Link to={i.to} className="text-sm text-cream/85 hover:text-primary transition-colors">{i.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
