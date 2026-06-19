import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { categories } from "@/lib/recipes";
import ingredients from "@/assets/ingredients-flatlay.jpg";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Recipe Categories — Family Table Recipe" },
      {
        name: "description",
        content:
          "Explore Family Table recipe categories — breakfast, lunch, dinner, desserts, healthy meals, vegetarian and family favourites.",
      },
      { property: "og:title", content: "Recipe Categories — Family Table Recipe" },
      { property: "og:description", content: "Browse beautifully organised recipe categories." },
    ],
  }),
  component: Categories,
});

function Categories() {
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
              className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-40 hidden md:block"
            />
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-transparent to-cream-deep hidden md:block" />
            <div className="relative max-w-2xl">
              <span className="chip">By the mood, by the moment</span>
              <h1 className="mt-4 font-display text-4xl sm:text-6xl font-bold tracking-tight leading-[1]">
                Browse <span className="text-accent-gradient">Categories</span>
              </h1>
              <p className="mt-5 text-ink-soft max-w-lg">
                From slow weekend mornings to busy school nights — every category is a doorway into
                a different kind of meal.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl mt-12 mb-24 grid gap-5">
          {categories.map((c, i) => (
            <Reveal key={c.name}>
              <Link
                to="/recipes"
                className={`group relative grid lg:grid-cols-2 overflow-hidden rounded-[2.25rem] bg-card card-floating card-floating-hover ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[340px] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                  />
                </div>
                <div className="p-8 sm:p-12 flex flex-col justify-center">
                  <div className="flex items-center justify-between">
                    <span className="chip">{c.count} recipes</span>
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-primary-foreground transition-transform group-hover:rotate-45">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-3xl sm:text-5xl font-bold tracking-tight">
                    {c.name}
                  </h2>
                  <p className="mt-4 text-ink-soft max-w-md leading-relaxed">{c.blurb}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Explore {c.name.toLowerCase()} →
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
