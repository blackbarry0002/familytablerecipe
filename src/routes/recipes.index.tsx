import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { RecipeCard } from "@/components/RecipeCard";
import { recipes } from "@/lib/recipes";
import ingredients from "@/assets/ingredients-flatlay.jpg";

const filters = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Desserts",
  "Healthy",
  "Vegetarian",
  "Pasta",
  "Family",
];

export const Route = createFileRoute("/recipes/")({
  head: () => ({
    meta: [
      { title: "All Recipes — Family Table Recipe" },
      {
        name: "description",
        content:
          "Browse the complete Family Table recipe collection — search, filter and save your favourites.",
      },
      { property: "og:title", content: "All Recipes — Family Table Recipe" },
      { property: "og:description", content: "The complete recipe collection from Family Table." },
    ],
  }),
  component: AllRecipes,
});

function AllRecipes() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");

  const list = useMemo(() => {
    return recipes.filter((r) => {
      const matchCat = active === "All" || r.category.toLowerCase() === active.toLowerCase();
      const matchQ = !query || r.title.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [query, active]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="px-4 sm:px-6">
        <section className="mx-auto max-w-7xl pt-2">
          <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-cream-deep p-8 sm:p-14">
            <img
              src={ingredients}
              alt=""
              loading="lazy"
              className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-50 hidden md:block"
            />
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-transparent to-cream-deep hidden md:block" />
            <div className="relative max-w-2xl">
              <span className="chip">The collection</span>
              <h1 className="mt-4 font-display text-4xl sm:text-6xl font-bold tracking-tight leading-[1]">
                Every <span className="text-accent-gradient">recipe</span>, beautifully indexed.
              </h1>
              <p className="mt-5 text-ink-soft max-w-lg">
                Search by name, filter by mood, save the ones you'll cook again. The full Family
                Table library, always at your fingertips.
              </p>
              <div className="mt-7 grid grid-cols-[minmax(0,1fr)_auto] gap-2 rounded-full border border-border bg-card p-1.5 max-w-xl">
                <div className="flex items-center gap-2 px-4">
                  <Search className="h-4 w-4 text-ink-soft shrink-0" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search 500+ recipes"
                    className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-ink-soft"
                  />
                </div>
                <button className="btn-primary !py-2.5 !px-5 text-sm shrink-0">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </button>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl mt-10">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full px-4 py-2 text-sm font-display font-medium border transition-all ${
                  active === f
                    ? "bg-ink text-primary-foreground border-ink"
                    : "bg-card text-ink-soft border-border hover:text-ink hover:border-ink/30"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl mt-10 mb-24">
          {list.length === 0 ? (
            <div className="card-floating p-16 text-center">
              <p className="font-display text-xl">No recipes match — try a different filter.</p>
            </div>
          ) : (
            <Reveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((r) => (
                <RecipeCard key={r.title + r.category} recipe={r} />
              ))}
            </Reveal>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
