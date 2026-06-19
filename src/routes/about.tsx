import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Leaf, Users, Award } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import family from "@/assets/family-cooking.jpg";
import chicken from "@/assets/recipe-chicken.jpg";
import pancakes from "@/assets/recipe-pancakes.jpg";
import bowl from "@/assets/recipe-bowl.jpg";
import pasta from "@/assets/recipe-pasta.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Family Table Recipe" },
      { name: "description", content: "The story behind Family Table Recipe — a home for the meals that bring people together." },
      { property: "og:title", content: "About — Family Table Recipe" },
      { property: "og:description", content: "The story behind Family Table Recipe." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="px-4 sm:px-6">
        <section className="mx-auto max-w-7xl pt-2">
          <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-cream-deep p-8 sm:p-14">
            <img src={chicken} alt="" loading="lazy" className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-45 hidden md:block" />
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-transparent to-cream-deep hidden md:block" />
            <div className="relative max-w-2xl">
              <span className="chip">Our Story</span>
              <h1 className="mt-4 font-display text-4xl sm:text-6xl font-bold tracking-tight leading-[1]">
                About our <span className="text-accent-gradient">Family Table</span>
              </h1>
              <p className="mt-5 text-ink-soft max-w-lg">
                A modern recipe home built around one quiet belief — the meals that matter are the ones we share.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl mt-24 grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem]">
            <img src={family} alt="Family cooking together" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </Reveal>
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Why we cook</span>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold leading-[1.05]">
              Recipes are the way we keep the people we love close.
            </h2>
            <p className="mt-6 text-ink-soft leading-relaxed">
              Family Table began with a worn notebook full of grandmother's handwriting — measurements in pinches, instructions in stories. We started this site to keep that warmth alive in a modern kitchen: tested recipes, beautiful photography, and the quiet rituals that turn cooking into care.
            </p>
            <p className="mt-4 text-ink-soft leading-relaxed">
              Every recipe is cooked at least three times in our own homes before it gets a place at the table. We test for taste, for clarity, and for the small things — a friendly Tuesday meal, a slow Sunday roast, a dessert worth lighting candles for.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl mt-28">
          <Reveal stagger className="grid gap-5 grid-cols-2 lg:grid-cols-4">
            {[
              { k: "500+", v: "Tested recipes", Icon: Award },
              { k: "120k", v: "Home cooks", Icon: Users },
              { k: "12 yrs", v: "Cooking together", Icon: Heart },
              { k: "100%", v: "Seasonal & honest", Icon: Leaf },
            ].map((s) => (
              <div key={s.v} className="card-floating p-7">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary"><s.Icon className="h-5 w-5" /></div>
                <div className="mt-5 font-display text-3xl font-bold">{s.k}</div>
                <div className="text-sm text-ink-soft mt-1">{s.v}</div>
              </div>
            ))}
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl mt-28">
          <Reveal>
            <span className="chip">What we believe</span>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight max-w-2xl">
              Values that <span className="text-accent-gradient">shape</span> our kitchen.
            </h2>
          </Reveal>
          <Reveal stagger className="mt-10 grid gap-5 lg:grid-cols-3 lg:grid-rows-2 lg:h-[560px]">
            <div className="relative overflow-hidden rounded-[2rem] lg:row-span-2 min-h-64">
              <img src={pasta} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <span className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70">01</span>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-cream">Slow over fast, always.</h3>
                <p className="mt-3 text-sm text-cream/80 leading-relaxed">We make room for the steps that matter, even on a Tuesday.</p>
              </div>
            </div>
            <ValueCard image={bowl} n="02" t="Seasonal & local" b="The best ingredients are the ones near you, right now." />
            <ValueCard image={pancakes} n="03" t="Recipes that work" b="Tested in our homes — measurements, timing and all." />
            <ValueCard image={chicken} n="04" t="Made for gathering" b="Every recipe is written for the people you cook with." />
            <ValueCard image={family} n="05" t="Stories, not lectures" b="A kitchen is a place to learn — gently, with each other." />
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl my-28">
          <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-ink text-cream p-10 sm:p-16 text-center">
            <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight max-w-3xl mx-auto">
              Pull up a chair. There's always room at the table.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/recipes" className="btn-accent">Explore recipes</Link>
              <Link to="/contact" className="btn-ghost !bg-transparent !text-cream !border-cream/30 hover:!bg-white/10">Get in touch</Link>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function ValueCard({ image, n, t, b }: { image: string; n: string; t: string; b: string }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-card card-floating-hover p-7 grid grid-cols-[1fr_auto] gap-4 items-end min-h-48">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{n}</span>
        <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold">{t}</h3>
        <p className="mt-2 text-sm text-ink-soft leading-relaxed max-w-xs">{b}</p>
      </div>
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
        <img src={image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </div>
  );
}
