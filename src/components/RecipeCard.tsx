import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Heart, Star } from "lucide-react";
import type { Recipe } from "@/lib/recipes";

export type { Recipe };

export function RecipeCard({ recipe, size = "md" }: { recipe: Recipe; size?: "sm" | "md" | "lg" }) {
  const aspect = size === "lg" ? "aspect-[4/5]" : size === "sm" ? "aspect-[4/3]" : "aspect-[5/4]";
  return (
    <article className="group card-floating card-floating-hover overflow-hidden">
      {/* Entire card is one link — no nested interactive elements blocking clicks */}
      <Link to="/recipes/$slug" params={{ slug: recipe.slug }} className="block focus:outline-none">
        <div className={`relative ${aspect} overflow-hidden`}>
          <img
            src={recipe.image}
            alt={recipe.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
          />

          {/* Rating badge */}
          <div className="absolute left-3 top-3 chip !bg-card/95 backdrop-blur shadow-sm">
            <Star className="h-3 w-3 fill-primary text-primary" />
            {recipe.rating.toFixed(1)}
          </div>

          {/* Save button — stop propagation so it doesn't double-fire the link */}
          <button
            aria-label="Save recipe"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card/95 backdrop-blur text-ink-soft hover:text-primary transition-colors shadow-sm"
          >
            <Heart className="h-4 w-4" />
          </button>

          {/* Gradient + hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Hover CTA — fully inside the link so any click navigates */}
          <div className="absolute inset-x-4 bottom-4 flex justify-center translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <div className="inline-flex items-center gap-2 rounded-full bg-card/95 backdrop-blur px-5 py-2.5 text-xs font-display font-semibold shadow-lg pointer-events-none">
              View full recipe <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-ink-soft">
            <span className="font-medium uppercase tracking-wider text-primary">
              {recipe.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {recipe.time}
            </span>
          </div>
          <h3 className="mt-2 font-display text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>
          <p className="mt-1.5 text-xs text-ink-soft leading-relaxed line-clamp-2">
            {recipe.description}
          </p>
        </div>
      </Link>
    </article>
  );
}
