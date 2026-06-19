import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  ArrowRight,
  Clock,
  Heart,
  Leaf,
  Quote,
  Sparkles,
  Star,
  Utensils,
  Wind,
  Snowflake,
  Sprout,
  Sun,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { RecipeCard } from "@/components/RecipeCard";
import { recipes } from "@/lib/recipes";
import CurvedLoop from "@/components/CurvedLoop";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import heroDinner from "@/assets/hero-dinner.jpg";
import heroSpread from "@/assets/hero-spread.jpg";
import familyCooking from "@/assets/family-cooking.jpg";
import ingredientsFlatlay from "@/assets/ingredients-flatlay.jpg";
import herb from "@/assets/herb-basil.jpg";
import kneading from "@/assets/kneading.jpg";
import bread from "@/assets/recipe-bread.jpg";
import risotto from "@/assets/recipe-risotto.jpg";
import pasta from "@/assets/recipe-pasta.jpg";
import salad from "@/assets/recipe-salad.jpg";
import pancakes from "@/assets/recipe-pancakes.jpg";
import dessert from "@/assets/recipe-dessert.jpg";
import bowl from "@/assets/recipe-bowl.jpg";
import toast from "@/assets/recipe-toast.jpg";
import chicken from "@/assets/recipe-chicken.jpg";
import CircularGallery from "@/components/CircularGallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Family Table Recipe — Gather, Cook, Share" },
      {
        name: "description",
        content:
          "Discover beautifully crafted family recipes — easy weeknight meals, weekend favourites and seasonal classics.",
      },
      { property: "og:title", content: "Family Table Recipe" },
      { property: "og:description", content: "Discover beautifully crafted family recipes." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="px-4 sm:px-6">
        <Hero />
        <Marquee />
        <Features />
        <Popular />
        <Seasonal />
        <Featured />
        <BentoFavorites />
        <GallerySection />
        <Process />
        <Testimonials />
        <Inspiration />
        <Newsletter />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ---------------- HERO (unique animated) ---------------- */

function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const orbit = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Title reveal
      const heroLineSpans = el.querySelectorAll(".hero-line span");
      if (heroLineSpans.length)
        gsap.from(heroLineSpans, {
          yPercent: 110,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.08,
        });

      const heroFades = el.querySelectorAll(".hero-fade");
      if (heroFades.length)
        gsap.from(heroFades, {
          opacity: 0,
          y: 24,
          duration: 1,
          ease: "power3.out",
          delay: 0.4,
          stagger: 0.08,
        });

      // Orbit rotation
      if (orbit.current) {
        gsap.to(orbit.current, {
          rotation: 360,
          duration: 60,
          ease: "none",
          repeat: -1,
          transformOrigin: "50% 50%",
        });
      }
      const orbitDishes = el.querySelectorAll(".orbit-dish");
      if (orbitDishes.length)
        gsap.to(orbitDishes, {
          rotation: -360,
          duration: 60,
          ease: "none",
          repeat: -1,
          transformOrigin: "50% 50%",
        });

      // Parallax on mouse move (only scoped elements)
      const parallaxEls = el.querySelectorAll(".hero-parallax");
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / r.width;
        const y = (e.clientY - r.top - r.height / 2) / r.height;
        if (parallaxEls.length)
          gsap.to(parallaxEls, { x: x * 18, y: y * 18, duration: 0.8, ease: "power2.out" });
      };
      el.addEventListener("mousemove", onMove);
      return () => el.removeEventListener("mousemove", onMove);
    }, el);

    return () => ctx.revert();
  }, []);

  const dishes = [heroDinner, pasta, dessert, bowl, pancakes, risotto];

  return (
    <section ref={root} className="mx-auto max-w-7xl pt-2">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[radial-gradient(ellipse_at_top_right,oklch(0.95_0.06_70),oklch(0.97_0.02_80)_60%)] px-6 sm:px-10 lg:px-14 pt-12 lg:pt-16 pb-16 lg:pb-24">
        {/* Decorative grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, oklch(0.18 0.02 60) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        {/* Centred watermark */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center font-display font-black text-[22vw] leading-none text-ink/[0.04] select-none tracking-tighter"
        >
          gather
        </div>

        <div className="relative grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <span className="chip hero-fade">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Autumn Edition · Vol. 04
            </span>

            <h1 className="mt-6 font-display font-bold tracking-tight text-[2.75rem] sm:text-6xl lg:text-[5.5rem] leading-[0.92]">
              <span className="hero-line block overflow-hidden">
                <span className="block">Where every</span>
              </span>
              <span className="hero-line block overflow-hidden">
                <span className="block italic font-serif font-normal text-accent-gradient">
                  recipe
                </span>
              </span>
              <span className="hero-line block overflow-hidden">
                <span className="block">tells a story.</span>
              </span>
            </h1>

            <p className="hero-fade mt-7 max-w-md text-base sm:text-lg text-ink-soft leading-relaxed">
              500+ slow-tested family recipes — for weeknights you'd rather forget and Sundays
              you'll want to remember.
            </p>

            <div className="hero-fade mt-8 flex flex-wrap items-center gap-3">
              <Link to="/recipes" className="btn-primary">
                Start cooking <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/categories" className="btn-ghost">
                Browse categories
              </Link>
            </div>

            <div className="hero-fade mt-10 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[salad, bowl, dessert, pasta].map((src, i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full ring-2 ring-background overflow-hidden"
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <div className="text-xs text-ink-soft mt-1">Rated 4.9 by 12,000+ home cooks</div>
              </div>
            </div>
          </div>

          {/* Right: hero orbit composition */}
          <div className="relative aspect-square max-w-[480px] sm:max-w-[560px] lg:max-w-[640px] w-full mx-auto">
            {/* Orbit rings */}
            <div className="absolute inset-4 rounded-full border border-dashed border-ink/15" />
            <div className="absolute inset-14 rounded-full border border-dashed border-ink/10" />

            {/* Center plate */}
            <div className="hero-parallax absolute inset-[22%] rounded-full overflow-hidden shadow-[var(--shadow-float)] ring-8 ring-background">
              <img
                src={heroSpread}
                alt="Featured autumn spread"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Orbiting dishes — mobile: h-20 w-20 · tablet: h-28 w-28 · desktop: h-36 w-36 */}
            <div ref={orbit} className="absolute inset-0">
              {dishes.map((src, i) => {
                const angle = (i / dishes.length) * Math.PI * 2;
                const r = 46;
                const x = 50 + Math.cos(angle) * r;
                const y = 50 + Math.sin(angle) * r;
                return (
                  <div
                    key={i}
                    className="orbit-dish absolute h-20 w-20 sm:h-28 sm:w-28 lg:h-36 lg:w-36 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden ring-4 ring-background shadow-[var(--shadow-card)]"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative mt-14 lg:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-border border-t border-border pt-8">
          {[
            { k: "500+", v: "Tested recipes" },
            { k: "120k", v: "Home cooks" },
            { k: "98%", v: "Cook again" },
            { k: "4.9★", v: "Average rating" },
          ].map((s, i) => (
            <div key={s.v} className={`px-4 ${i === 0 ? "sm:pl-0" : ""}`}>
              <div className="font-display text-2xl sm:text-3xl font-bold">{s.k}</div>
              <div className="text-xs text-ink-soft mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CURVED MARQUEE ---------------- */
function Marquee() {
  return (
    <section className="mt-10 -mx-4 sm:-mx-6 overflow-hidden border-y border-border bg-background py-2">
      <div className="text-primary font-display">
        <CurvedLoop
          marqueeText="Pasta Night ✦ Weeknight Dinners ✦ Cozy Soups ✦ Sunday Roasts ✦ Quick Breakfasts ✦ Plant-Forward ✦ Heirloom Recipes ✦ "
          speed={1.5}
          curveAmount={120}
          direction="left"
          interactive={true}
          className="curved-marquee-text"
        />
      </div>
    </section>
  );
}

/* ---------------- FEATURES ---------------- */
function Features() {
  const items = [
    {
      icon: Utensils,
      title: "Easy Recipes",
      text: "Everyday meals with clear steps and short ingredient lists.",
    },
    {
      icon: Heart,
      title: "Family Favorites",
      text: "The dishes everyone keeps asking for, weekend after weekend.",
    },
    {
      icon: Clock,
      title: "Quick Meals",
      text: "Beautiful dinners on the table in 30 minutes or less.",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl mt-24">
      <Reveal stagger className="grid gap-5 md:grid-cols-3">
        {items.map((f) => (
          <div key={f.title} className="card-floating card-floating-hover p-7">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">{f.text}</p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
              Learn more <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

/* ---------------- POPULAR (ScrollStack) ---------------- */
const stackPalettes = [
  "bg-ink text-cream",
  "bg-[oklch(0.96_0.05_70)] text-ink",
  "bg-primary text-primary-foreground",
  "bg-[oklch(0.14_0.02_60)] text-cream",
  "bg-[oklch(0.93_0.08_80)] text-ink",
  "bg-[oklch(0.20_0.04_250)] text-cream",
];

function Popular() {
  const featured = recipes.slice(0, 6);
  return (
    <section className="mx-auto max-w-7xl mt-24">
      <div className="flex items-end justify-between gap-4 mb-10">
        <Reveal>
          <span className="chip">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Trending this week
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight">
            Popular <span className="text-accent-gradient">Recipes</span> Today
          </h2>
        </Reveal>
        <Link to="/recipes" className="btn-ghost shrink-0 !py-2.5 !px-5 text-sm">
          View all
        </Link>
      </div>

      <ScrollStack
        useWindowScroll={true}
        itemDistance={6}
        itemStackDistance={12}
        itemScale={0.02}
        baseScale={0.92}
        stackPosition="12%"
        scaleEndPosition="6%"
      >
        {featured.map((r, i) => (
          <ScrollStackItem key={r.slug}>
            <Link
              to="/recipes/$slug"
              params={{ slug: r.slug }}
              className={`group flex flex-col sm:flex-row w-full h-full min-h-[380px] sm:min-h-[320px] lg:min-h-[360px] ${stackPalettes[i % stackPalettes.length]}`}
            >
              {/* Image */}
              <div className="relative w-full sm:w-[42%] lg:w-[38%] shrink-0 overflow-hidden min-h-[220px] sm:min-h-0">
                <img
                  src={r.image}
                  alt={r.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                />
                {/* Number badge */}
                <div className="absolute top-5 left-5 font-display font-black text-5xl leading-none text-white/20 select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                {/* Rating */}
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {r.rating.toFixed(1)}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-14 flex-1">
                <div>
                  <span className="text-xs font-display font-semibold uppercase tracking-[0.18em] opacity-60">
                    {r.category}
                  </span>
                  <h3 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.1] tracking-tight">
                    {r.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed opacity-70 max-w-lg line-clamp-2">
                    {r.description}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-current/20 bg-current/10 px-3 py-1.5 text-xs font-medium">
                      <Clock className="h-3 w-3" /> {r.time}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-current/20 bg-current/10 px-3 py-1.5 text-xs font-medium">
                      {r.difficulty}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-display font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                    Cook this{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}

/* ---------------- SEASONAL ---------------- */
const seasonData: Record<
  string,
  {
    icon: React.ComponentType<any>;
    label: string;
    palette: string;
    accent: string;
    picks: number[];
  }
> = {
  Autumn: {
    icon: Wind,
    label: "Peak autumn produce",
    palette: "from-amber-950/90 via-amber-900/60",
    accent: "bg-amber-500",
    picks: [2, 3, 4, 5],
  },
  Winter: {
    icon: Snowflake,
    label: "Cold-weather comfort",
    palette: "from-slate-950/90 via-slate-800/60",
    accent: "bg-sky-400",
    picks: [0, 1, 6, 7],
  },
  Spring: {
    icon: Sprout,
    label: "Fresh seasonal starts",
    palette: "from-emerald-950/90 via-emerald-800/60",
    accent: "bg-emerald-400",
    picks: [3, 4, 5, 6],
  },
  Summer: {
    icon: Sun,
    label: "Light & bright plates",
    palette: "from-rose-950/90 via-orange-800/60",
    accent: "bg-rose-400",
    picks: [1, 2, 4, 5],
  },
};

function Seasonal() {
  const [active, setActive] = useState<keyof typeof seasonData>("Autumn");
  const seasons = Object.keys(seasonData) as (keyof typeof seasonData)[];
  const season = seasonData[active];
  const picks = season.picks.map((i) => recipes[i % recipes.length]);
  const [featured, ...rest] = picks;

  return (
    <section className="mx-auto max-w-7xl mt-28">
      {/* Header row */}
      <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">
        <div>
          <span className="chip">
            <Leaf className="h-3.5 w-3.5 text-primary" /> Cooking with the season
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight">
            What's good <span className="text-accent-gradient">right now</span>.
          </h2>
          <p className="mt-3 text-ink-soft max-w-md text-sm leading-relaxed">
            Recipes built around peak produce — roasted squash, slow-braised greens, warming spices
            and orchard fruit.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          {seasons.map((s) => {
            const Icon = seasonData[s].icon;
            return (
              <button
                key={s}
                onClick={() => setActive(s)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-display font-medium border transition-all ${
                  active === s
                    ? "bg-ink text-cream border-ink shadow-sm"
                    : "bg-card text-ink-soft border-border hover:text-ink hover:border-ink/30"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {s}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Magazine grid */}
      <Reveal
        stagger
        className="grid gap-4 lg:grid-cols-[1.6fr_1fr_1fr] lg:grid-rows-2 lg:h-[560px]"
      >
        {/* Large featured card */}
        <Link
          to="/recipes/$slug"
          params={{ slug: featured.slug }}
          className="group relative overflow-hidden rounded-[2rem] lg:row-span-2"
        >
          <img
            src={featured.image}
            alt={featured.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${season.palette} to-transparent`} />
          {/* Season badge */}
          <div className="absolute top-5 left-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-card/95 backdrop-blur px-3 py-1.5 text-xs font-display font-semibold shadow-sm">
              <span className={`h-2 w-2 rounded-full ${season.accent}`} />
              {season.label}
            </span>
          </div>
          {/* Bottom info */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <span className="text-[10px] uppercase tracking-[0.2em] text-cream/70 font-medium">
              {featured.category}
            </span>
            <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold text-cream leading-tight max-w-xs">
              {featured.title}
            </h3>
            <div className="mt-4 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1.5 text-xs text-cream font-medium">
                <Clock className="h-3 w-3" /> {featured.time}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1.5 text-xs text-cream font-medium">
                <Star className="h-3 w-3 fill-current text-amber-400" />{" "}
                {featured.rating.toFixed(1)}
              </span>
            </div>
            <div className="mt-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="inline-flex items-center gap-2 text-sm font-display font-semibold text-cream">
                View recipe <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>

        {/* Three side cards */}
        {rest.map((r) => (
          <Link
            key={r.slug}
            to="/recipes/$slug"
            params={{ slug: r.slug }}
            className="group relative overflow-hidden rounded-[1.75rem] min-h-48"
          >
            <img
              src={r.image}
              alt={r.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <span className="text-[10px] uppercase tracking-wider text-cream/70 font-medium">
                {r.category}
              </span>
              <h3 className="mt-1 font-display text-base sm:text-lg font-bold text-cream leading-tight">
                {r.title}
              </h3>
              <span className="mt-2 text-xs text-cream/60 inline-flex items-center gap-1">
                <Clock className="h-3 w-3" /> {r.time}
              </span>
            </div>
            {/* Hover arrow */}
            <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-card/90 backdrop-blur grid place-items-center opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <ArrowRight className="h-3.5 w-3.5 text-ink" />
            </div>
          </Link>
        ))}
      </Reveal>
    </section>
  );
}

/* ---------------- FEATURED ---------------- */
function Featured() {
  return (
    <section className="mx-auto max-w-7xl mt-28">
      <Reveal className="overflow-hidden rounded-[2.5rem] bg-card shadow-[var(--shadow-card)]">
        <div className="grid lg:grid-cols-[1.05fr_1fr]">
          <div className="relative aspect-[5/4] lg:aspect-auto">
            <img
              src={pasta}
              alt="Featured pasta recipe"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute top-5 left-5 chip !bg-card/95">⭐ Featured this week</span>
          </div>
          <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              The Sunday Edition
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.05]">
              Slow-Simmered Tomato Pappardelle, with a story.
            </h2>
            <p className="mt-5 text-ink-soft leading-relaxed">
              A pot of crushed San Marzanos, sweet onion, and a long, quiet simmer — the kind of
              sauce that fills the house and asks everyone to come sit down a little earlier.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {[
                "San Marzano tomatoes",
                "Fresh pappardelle",
                "Sweet yellow onion",
                "Garlic & basil",
                "Parmigiano-Reggiano",
                "Cold-press olive oil",
              ].map((i) => (
                <li key={i} className="flex items-center gap-2 text-ink-soft">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {i}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/recipes/$slug"
                params={{ slug: "tomato-pappardelle" }}
                className="btn-accent"
              >
                Read the recipe <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="btn-ghost">Save for later</button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- BENTO ---------------- */
function BentoFavorites() {
  return (
    <section className="mx-auto max-w-7xl mt-28">
      <Reveal>
        <span className="chip">From our kitchen to yours</span>
        <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight max-w-2xl">
          Family <span className="text-accent-gradient">Favorites</span> the table keeps asking for.
        </h2>
      </Reveal>
      <Reveal stagger className="mt-10 grid gap-5 lg:grid-cols-4 lg:grid-rows-2 lg:h-[640px]">
        <BentoCard
          slug="buttermilk-pancakes"
          image={pancakes}
          title="Buttermilk Berry Pancakes"
          tag="Breakfast"
          className="lg:col-span-2 lg:row-span-1"
        />
        <BentoCard
          slug="chocolate-raspberry-cake"
          image={dessert}
          title="Dark Chocolate Cake"
          tag="Dessert"
          className="lg:col-span-1"
        />
        <BentoCard
          slug="harvest-buddha-bowl"
          image={bowl}
          title="Harvest Buddha Bowl"
          tag="Healthy"
          className="lg:col-span-1"
        />
        <BentoCard
          slug="avocado-egg-toast"
          image={toast}
          title="Avocado Egg Toast"
          tag="Breakfast"
          className="lg:col-span-1"
        />
        <BentoCard
          slug="garden-feta-bowl"
          image={salad}
          title="Garden Feta Bowl"
          tag="Lunch"
          className="lg:col-span-1"
        />
        <BentoCard
          slug="tomato-pappardelle"
          image={pasta}
          title="Sunday Pappardelle"
          tag="Dinner"
          className="lg:col-span-2"
        />
      </Reveal>
    </section>
  );
}

function BentoCard({
  image,
  title,
  tag,
  slug,
  className = "",
}: {
  image: string;
  title: string;
  tag: string;
  slug: string;
  className?: string;
}) {
  return (
    <Link
      to="/recipes/$slug"
      params={{ slug }}
      className={`group relative overflow-hidden rounded-[2rem] bg-card card-floating-hover min-h-64 ${className}`}
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <span className="chip self-start !bg-card/90 backdrop-blur">{tag}</span>
        <h3 className="mt-3 font-display text-2xl font-bold text-cream">{title}</h3>
      </div>
    </Link>
  );
}

/* ---------------- PROCESS / HOW WE COOK ---------------- */
function Process() {
  const steps = [
    {
      n: "01",
      title: "Source",
      text: "Start with peak-season produce and the best ingredients you can reasonably find.",
      img: herb,
    },
    {
      n: "02",
      title: "Slow it down",
      text: "Build flavor in layers — aromatics, patience, a little salt at every stage.",
      img: kneading,
    },
    {
      n: "03",
      title: "Share it",
      text: "Plate it generously, bring it to the middle of the table, and pour something cold.",
      img: bread,
    },
  ];
  return (
    <section className="mx-auto max-w-7xl mt-28">
      <Reveal>
        <span className="chip">How we cook</span>
        <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl">
          Three small rituals behind every <span className="text-accent-gradient">great meal</span>.
        </h2>
      </Reveal>
      <Reveal stagger className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <article key={s.n} className="card-floating card-floating-hover overflow-hidden">
            <div className="relative aspect-[5/4]">
              <img
                src={s.img}
                alt={s.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute top-4 left-4 font-display font-bold text-cream/90 text-sm bg-ink/60 backdrop-blur rounded-full px-3 py-1">
                {s.n}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">{s.text}</p>
            </div>
          </article>
        ))}
      </Reveal>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const quotes = [
    {
      q: "These are the only recipes I trust for Sunday dinner. Every single one has worked.",
      who: "Marta R.",
      role: "Home cook · Barcelona",
    },
    {
      q: "Beautifully written and actually doable on a Tuesday night. My family is obsessed with the risotto.",
      who: "James K.",
      role: "Dad of three · Brooklyn",
    },
    {
      q: "It feels like cooking with a friend who happens to be a great chef. Calm, warm, and never preachy.",
      who: "Aiko M.",
      role: "Food writer · Kyoto",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl mt-28">
      <Reveal className="text-center">
        <span className="chip mx-auto">
          <Heart className="h-3.5 w-3.5 text-primary" /> Loved at the table
        </span>
        <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight">
          Cooked, plated, and <span className="text-accent-gradient">shared</span>.
        </h2>
      </Reveal>
      <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-3">
        {quotes.map((t) => (
          <figure key={t.who} className="card-floating card-floating-hover p-7 flex flex-col">
            <Quote className="h-7 w-7 text-primary" />
            <blockquote className="mt-4 font-display text-lg leading-snug flex-1">
              "{t.q}"
            </blockquote>
            <figcaption className="mt-6 pt-5 border-t border-border">
              <div className="font-display font-semibold">{t.who}</div>
              <div className="text-xs text-ink-soft mt-0.5">{t.role}</div>
            </figcaption>
          </figure>
        ))}
      </Reveal>
    </section>
  );
}

/* ---------------- INSPIRATION ---------------- */
function Inspiration() {
  return (
    <section className="mx-auto max-w-7xl mt-28">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] min-h-[420px]">
          <img
            src={familyCooking}
            alt="Family cooking together"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-ink/70 via-ink/20 to-transparent" />
          <div className="relative h-full flex flex-col justify-end p-8 sm:p-12">
            <span className="chip self-start !bg-card/90">Cooking Inspiration</span>
            <h3 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-cream max-w-md leading-tight">
              Slow afternoons, flour-dusted counters, and recipes passed down.
            </h3>
          </div>
        </Reveal>
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-primary text-primary-foreground p-8 sm:p-12 flex flex-col justify-between min-h-[420px]">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] opacity-80">Cook with us</span>
            <h3 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
              Join the table. Learn from chefs, parents, and home cooks.
            </h3>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <Stat n="120k+" l="Home cooks" />
            <Stat n="500+" l="Tested recipes" />
            <Stat n="98%" l="Would cook again" />
            <Stat n="40+" l="Guest chefs" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-2xl bg-primary-foreground/10 backdrop-blur p-4">
      <div className="font-display text-2xl font-bold">{n}</div>
      <div className="text-xs opacity-80 mt-0.5">{l}</div>
    </div>
  );
}

/* ---------------- GALLERY SECTION ---------------- */
function GallerySection() {
  const galleryItems = [
    { image: pancakes, text: "Buttermilk Pancakes" },
    { image: dessert, text: "Dark Chocolate Cake" },
    { image: bowl, text: "Harvest Buddha Bowl" },
    { image: toast, text: "Avocado Egg Toast" },
    { image: salad, text: "Garden Feta Salad" },
    { image: pasta, text: "Tomato Pappardelle" },
    { image: risotto, text: "Mushroom Risotto" },
    { image: chicken, text: "Roasted Herb Chicken" },
    { image: bread, text: "Artisan Sourdough" },
    { image: heroSpread, text: "Autumn Harvest Spread" },
  ];

  return (
    <section className="mt-28 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="text-center">
          <span className="chip mx-auto">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Visual Feast
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight">
            A Taste of <span className="text-accent-gradient">Our Table</span>
          </h2>
          <p className="mt-3 text-ink-soft max-w-md mx-auto text-sm leading-relaxed">
            Drag to spin the carousel or use the arrow keys to browse through some of our most
            beloved plated dishes.
          </p>
        </Reveal>
      </div>
      <Reveal className="mt-10">
        <div className="-mx-4 sm:-mx-6 relative w-full h-[500px] sm:h-[600px] overflow-hidden bg-transparent">
          <CircularGallery
            items={galleryItems}
            bend={3}
            textColor="oklch(0.18 0.02 60)"
            borderRadius={0.05}
            scrollEase={0.02}
            fontUrl="https://fonts.googleapis.com/css2?family=Outfit:wght@700&display=swap"
            font="bold 24px Outfit"
          />
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- NEWSLETTER ---------------- */
function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl my-28">
      <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-card p-8 sm:p-14">
        <img
          src={ingredientsFlatlay}
          alt=""
          loading="lazy"
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-25 hidden md:block"
        />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-transparent to-card hidden md:block" />
        <div className="relative max-w-xl">
          <span className="chip">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> The Weekly
          </span>
          <h3 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
            One beautiful recipe in your inbox, every Sunday.
          </h3>
          <p className="mt-4 text-ink-soft">
            No spam, no ads — just the week's most-loved recipe and a few seasonal ideas to inspire
            your table.
          </p>
          <form
            className="mt-7 grid grid-cols-[minmax(0,1fr)_auto] gap-2 rounded-full border border-border bg-background p-1.5 max-w-md"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="bg-transparent px-5 py-3 text-sm outline-none placeholder:text-ink-soft"
            />
            <button className="btn-accent !py-2.5 !px-5 text-sm">Subscribe</button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
