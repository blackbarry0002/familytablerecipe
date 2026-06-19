import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft, ArrowRight, ChefHat, Clock, Flame, Heart,
  Printer, Share2, Star, Users, Utensils, CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { RecipeCard } from "@/components/RecipeCard";
import { recipes, recipeBySlug } from "@/lib/recipes";

export const Route = createFileRoute("/recipes/$slug")({
  loader: ({ params }) => {
    const recipe = recipeBySlug(params.slug);
    if (!recipe) throw notFound();
    return { recipe };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.recipe.title} — Family Table Recipe` },
          { name: "description", content: loaderData.recipe.description },
          { property: "og:title", content: loaderData.recipe.title },
          { property: "og:description", content: loaderData.recipe.description },
          { property: "og:image", content: loaderData.recipe.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center p-8">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold">Recipe not found</h1>
        <Link to="/recipes" className="btn-primary mt-6 inline-flex">
          Back to all recipes
        </Link>
      </div>
    </div>
  ),
  component: RecipeDetail,
});

function RecipeDetail() {
  const { recipe } = Route.useLoaderData() as { recipe: import("@/lib/recipes").Recipe };
  const related = recipes.filter((r) => r.slug !== recipe.slug && r.category === recipe.category).slice(0, 3);
  const fallback = recipes.filter((r) => r.slug !== recipe.slug).slice(0, 3);
  const more = related.length >= 3 ? related : fallback;
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (i: number) =>
    setCheckedSteps((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const difficultyColor =
    recipe.difficulty === "Easy"
      ? "text-emerald-600 bg-emerald-50"
      : recipe.difficulty === "Medium"
      ? "text-amber-600 bg-amber-50"
      : "text-rose-600 bg-rose-50";

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.title,
    "image": [recipe.image],
    "description": recipe.description,
    "recipeCategory": recipe.category,
    "recipeYield": `${recipe.servings} servings`,
    "recipeIngredient": recipe.ingredients,
    "recipeInstructions": recipe.steps.map((step, index) => ({
      "@type": "HowToStep",
      "text": step,
      "position": index + 1
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": recipe.rating,
      "reviewCount": recipe.saves || 120
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <SiteHeader />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-2 pb-0">
        {/* Breadcrumb */}
        <Reveal>
          <Link
            to="/recipes"
            className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors mb-8 group"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-card border border-border group-hover:border-ink/30 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
            </span>
            All recipes
          </Link>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
          {/* Left — image */}
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-[var(--shadow-float)]">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Category pill over image */}
              <div className="absolute top-5 left-5">
                <span className="chip !bg-card/95 backdrop-blur shadow-sm">
                  <Utensils className="h-3.5 w-3.5 text-primary" /> {recipe.category}
                </span>
              </div>
              {/* Rating badge */}
              <div className="absolute top-5 right-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/80 backdrop-blur text-cream px-3 py-1.5 text-xs font-display font-semibold">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {recipe.rating.toFixed(1)} rating
                </span>
              </div>
            </div>

            {/* Floating "Loved by" card */}
            <div className="absolute -right-4 bottom-10 hidden sm:block">
              <div className="card-floating p-3 pr-5 flex items-center gap-3 shadow-[var(--shadow-float)]">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary">
                  <Heart className="h-5 w-5 fill-primary" />
                </div>
                <div>
                  <div className="text-[10px] text-ink-soft uppercase tracking-wider">Saved by</div>
                  <div className="font-display font-semibold text-sm">{recipe.saves ?? "—"} cooks</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — info */}
          <Reveal className="order-1 lg:order-2 lg:pt-4">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              {recipe.category}
            </span>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.02] tracking-tight">
              {recipe.title}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed max-w-lg">
              {recipe.description}
            </p>

            {/* Quick stats row */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard icon={Clock} label="Prep + cook" value={recipe.time} />
              <StatCard icon={Users} label="Servings" value={`${recipe.servings} people`} />
              <StatCard icon={ChefHat} label="Difficulty" value={recipe.difficulty} valueClass={difficultyColor} />
              <StatCard icon={Flame} label="Calories" value={recipe.nutrition?.[0]?.value ?? "—"} />
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[recipe.category, recipe.difficulty, "Family-friendly", "Tested recipe"].map((tag) => (
                <span key={tag} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-display font-medium text-ink-soft">
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA row */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="btn-accent gap-2">
                <Heart className="h-4 w-4" /> Save recipe
              </button>
              <button className="btn-ghost gap-2">
                <Share2 className="h-4 w-4" /> Share
              </button>
              <button className="btn-ghost gap-2">
                <Printer className="h-4 w-4" /> Print
              </button>
            </div>

            {/* Story pull-quote */}
            <blockquote className="mt-10 border-l-4 border-primary pl-5">
              <p className="font-display text-xl sm:text-2xl leading-snug tracking-tight italic text-ink">
                "{recipe.story}"
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── INGREDIENTS + METHOD ──────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-20">
        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">

          {/* Ingredients panel — sticky */}
          <Reveal className="lg:sticky lg:top-28 self-start space-y-5">
            <div className="rounded-[2rem] bg-ink text-cream p-7 sm:p-9">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold">Ingredients</h2>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-cream/70">
                  Serves {recipe.servings}
                </span>
              </div>
              <ul className="mt-6 space-y-3">
                {recipe.ingredients.map((ing) => (
                  <li key={ing} className="flex items-start gap-3 text-sm">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-cream/85">{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nutrition grid */}
            {recipe.nutrition && (
              <div className="rounded-[2rem] bg-card border border-border p-7">
                <h3 className="font-display text-base font-bold text-ink-soft uppercase tracking-widest text-xs mb-4">
                  Nutrition · per serving
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {recipe.nutrition.map((n) => (
                    <div key={n.label} className="rounded-2xl bg-cream-deep p-4">
                      <div className="text-[10px] uppercase tracking-wider text-ink-soft">{n.label}</div>
                      <div className="font-display text-xl font-bold mt-0.5">{n.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Reveal>

          {/* Method */}
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight">
              How to make it
            </h2>
            <p className="mt-2 text-sm text-ink-soft">Tap a step to mark it complete</p>

            <ol className="mt-7 space-y-4">
              {recipe.steps.map((step, i) => {
                const done = checkedSteps.has(i);
                return (
                  <li
                    key={i}
                    onClick={() => toggleStep(i)}
                    className={`relative card-floating p-6 pl-7 flex gap-5 cursor-pointer transition-all duration-300 ${
                      done ? "opacity-60" : "hover:shadow-[var(--shadow-float)]"
                    }`}
                  >
                    {/* Step number */}
                    <div className="shrink-0 flex flex-col items-center gap-1 pt-1">
                      <span
                        className={`font-display text-2xl font-bold leading-none transition-colors ${
                          done ? "text-primary" : "text-ink/20"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {i < recipe.steps.length - 1 && (
                        <div className="w-px flex-1 bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`leading-relaxed transition-colors ${done ? "line-through text-ink-soft" : "text-ink"}`}>
                        {step}
                      </p>
                    </div>
                    <div
                      className={`shrink-0 mt-0.5 transition-all duration-300 ${
                        done ? "text-primary scale-110" : "text-border"
                      }`}
                    >
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Chef's tips */}
            {recipe.tips && recipe.tips.length > 0 && (
              <div className="mt-10 rounded-[2rem] bg-primary/8 border border-primary/20 p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-primary">
                    <ChefHat className="h-4 w-4" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                    Chef's tips
                  </span>
                </div>
                <ul className="space-y-3">
                  {recipe.tips.map((tip) => (
                    <li key={tip} className="flex gap-3 text-sm leading-relaxed text-ink">
                      <span className="text-primary mt-0.5">✦</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ── RELATED ───────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-24 mb-24">
        <div className="flex items-end justify-between gap-4 mb-10">
          <Reveal>
            <span className="chip">Cook this next</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
              More from <span className="text-accent-gradient">{recipe.category}</span>
            </h2>
          </Reveal>
          <Link to="/recipes" className="btn-ghost !py-2.5 !px-5 text-sm shrink-0">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Reveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  valueClass = "",
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-1.5 text-ink-soft">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[10px] uppercase tracking-wider font-medium">{label}</span>
      </div>
      <div className={`font-display font-bold text-sm mt-0.5 rounded-full px-2 py-0.5 self-start ${valueClass || "text-ink bg-transparent px-0 py-0"}`}>
        {value}
      </div>
    </div>
  );
}
