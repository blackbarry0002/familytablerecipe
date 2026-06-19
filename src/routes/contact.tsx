import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import family from "@/assets/family-cooking.jpg";
import ingredients from "@/assets/ingredients-flatlay.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Family Table Recipe" },
      { name: "description", content: "Say hello to the Family Table team — share recipes, ask questions, or pitch a collaboration." },
      { property: "og:title", content: "Contact — Family Table Recipe" },
      { property: "og:description", content: "Get in touch with the Family Table team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="px-4 sm:px-6">
        <section className="mx-auto max-w-7xl pt-2">
          <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-cream-deep p-8 sm:p-14">
            <img src={ingredients} alt="" loading="lazy" className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-45 hidden md:block" />
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-transparent to-cream-deep hidden md:block" />
            <div className="relative max-w-2xl">
              <span className="chip">We'd love to hear from you</span>
              <h1 className="mt-4 font-display text-4xl sm:text-6xl font-bold tracking-tight leading-[1]">
                Get in touch <span className="text-accent-gradient">with us</span>
              </h1>
              <p className="mt-5 text-ink-soft max-w-lg">
                Share a recipe, ask a kitchen question, or pitch a collaboration — our table is open.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl mt-12 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <Reveal className="relative overflow-hidden rounded-[2.25rem] min-h-[420px]">
            <img src={family} alt="Family cooking" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <span className="chip self-start !bg-card/90">Contact information</span>
              <h3 className="mt-4 font-display text-3xl font-bold text-cream max-w-xs leading-tight">
                Real people, in a real kitchen.
              </h3>
            </div>
          </Reveal>

          <Reveal className="card-floating p-8 sm:p-10">
            <p className="text-ink-soft leading-relaxed">
              Connect with the Family Table team. Whether you have a burning question about a recipe, want to share your kitchen story, or partner with us — we read every message.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              <Info icon={Phone} label="Phone" value="(+1) 555-555-1234" />
              <Info icon={Mail} label="Email" value="hello@familytable.com" />
              <Info icon={MapPin} label="Studio" value="123 Harvest Lane, Hudson, NY 12534" className="sm:col-span-2" />
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="mt-10 grid gap-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name" placeholder="Maya Patel" />
                <Field label="Email" type="email" placeholder="maya@email.com" />
              </div>
              <Field label="Subject" placeholder="A recipe question" />
              <div>
                <label className="text-xs font-medium uppercase tracking-widest text-ink-soft">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what's cooking…"
                  className="mt-2 w-full rounded-2xl border border-border bg-background px-5 py-4 text-sm outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <button type="submit" className="btn-accent w-full sm:w-auto sm:self-start">
                {sent ? "Message sent — thank you!" : <>Send message <Send className="h-4 w-4" /></>}
              </button>
            </form>
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl my-16">
          <Reveal className="overflow-hidden rounded-[2.25rem] border border-border bg-card">
            <div className="aspect-[16/8] w-full">
              <iframe
                title="Studio location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-73.795%2C42.245%2C-73.760%2C42.265&layer=mapnik"
                className="h-full w-full grayscale-[0.2]"
                loading="lazy"
              />
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Info({ icon: Icon, label, value, className = "" }: { icon: typeof Phone; label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-ink-soft">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <p className="mt-2 font-display text-base font-semibold">{value}</p>
    </div>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-widest text-ink-soft">{label}</label>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-full border border-border bg-background px-5 py-3.5 text-sm outline-none focus:border-primary transition-colors"
      />
    </div>
  );
}
