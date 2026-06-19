import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Shield, FileText, Cookie, Mail } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Legal — Family Table Recipe" },
      {
        name: "description",
        content: "Privacy policy, terms of service, and cookie policy for Family Table Recipe.",
      },
    ],
  }),
  component: Legal,
});

const sections = [
  { id: "privacy", icon: Shield, label: "Privacy Policy" },
  { id: "terms", icon: FileText, label: "Terms of Service" },
  { id: "cookies", icon: Cookie, label: "Cookie Policy" },
  { id: "contact", icon: Mail, label: "Contact Us" },
];

function Legal() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="px-4 sm:px-6">
        {/* Hero */}
        <section className="mx-auto max-w-7xl pt-2">
          <Reveal>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors mb-8 group"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-card border border-border group-hover:border-ink/30 transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" />
              </span>
              Back home
            </Link>

            <div className="relative overflow-hidden rounded-[2.5rem] bg-ink text-cream px-8 sm:px-14 py-14 sm:py-20">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, oklch(0.95 0.02 80) 1px, transparent 0)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-10 -right-6 font-display font-black text-[16vw] leading-none text-white/[0.04] select-none tracking-tighter"
              >
                legal
              </div>
              <div className="relative max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-display font-medium text-cream/80">
                  <Shield className="h-3.5 w-3.5 text-primary" /> Last updated · June 2026
                </span>
                <h1 className="mt-5 font-display text-4xl sm:text-6xl font-bold tracking-tight leading-[1]">
                  Legal &<br />
                  <span className="text-primary">Transparency</span>.
                </h1>
                <p className="mt-5 text-cream/70 max-w-lg leading-relaxed">
                  We believe in plain-language legal. No walls of legalese — just clear explanations
                  of how we handle your data, what you can expect from us, and how to reach us.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Body */}
        <section className="mx-auto max-w-7xl mt-16 mb-24">
          <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
            {/* Sidebar nav */}
            <aside className="lg:sticky lg:top-28 self-start">
              <nav className="rounded-[1.5rem] border border-border bg-card p-4 space-y-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-display font-medium text-ink-soft hover:bg-cream-deep hover:text-ink transition-colors"
                  >
                    <s.icon className="h-4 w-4 text-primary shrink-0" />
                    {s.label}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <div className="space-y-16">
              {/* Privacy Policy */}
              <Reveal>
                <article id="privacy" className="scroll-mt-28">
                  <SectionHeader icon={Shield} title="Privacy Policy" />
                  <Prose>
                    <Lead>
                      Family Table Recipe is committed to protecting your privacy. This policy
                      explains what information we collect, how we use it, and your rights over it.
                    </Lead>

                    <SubHead>Information We Collect</SubHead>
                    <p>When you use Family Table Recipe, we may collect the following:</p>
                    <ul>
                      <li>
                        <strong>Account information</strong> — name and email address when you
                        subscribe to our newsletter or create a saved-recipe list.
                      </li>
                      <li>
                        <strong>Usage data</strong> — pages visited, recipes viewed, search queries,
                        and time spent on the site, collected via anonymised analytics.
                      </li>
                      <li>
                        <strong>Device data</strong> — browser type, operating system, and IP
                        address for security and performance purposes.
                      </li>
                      <li>
                        <strong>Cookies</strong> — see our Cookie Policy below for full details.
                      </li>
                    </ul>

                    <SubHead>How We Use Your Information</SubHead>
                    <ul>
                      <li>To send you the weekly recipe newsletter (only if you subscribed).</li>
                      <li>To improve our recipe recommendations and site experience.</li>
                      <li>To detect and prevent fraud or misuse of our platform.</li>
                      <li>To comply with legal obligations.</li>
                    </ul>
                    <p>We do not sell, rent, or trade your personal data to third parties. Ever.</p>

                    <SubHead>Data Retention</SubHead>
                    <p>
                      We retain your email address for as long as you remain subscribed. You may
                      unsubscribe at any time via the link in any newsletter. Analytics data is
                      retained for 24 months and then automatically deleted.
                    </p>

                    <SubHead>Your Rights</SubHead>
                    <p>
                      You have the right to access, correct, or delete any personal data we hold
                      about you. To exercise these rights, email us at{" "}
                      <a
                        href="mailto:privacy@familytablerecipe.com"
                        className="text-primary underline underline-offset-2"
                      >
                        privacy@familytablerecipe.com
                      </a>
                      . We will respond within 30 days.
                    </p>

                    <SubHead>Third-Party Services</SubHead>
                    <p>
                      We use a small number of third-party services to operate the site — including
                      a newsletter provider, an analytics platform, and a content delivery network.
                      Each is bound by their own privacy policy and a data processing agreement with
                      us. We do not permit these providers to use your data for their own marketing.
                    </p>
                  </Prose>
                </article>
              </Reveal>

              <Divider />

              {/* Terms of Service */}
              <Reveal>
                <article id="terms" className="scroll-mt-28">
                  <SectionHeader icon={FileText} title="Terms of Service" />
                  <Prose>
                    <Lead>
                      By accessing or using Family Table Recipe, you agree to these terms. Please
                      read them — they're short and written in plain English.
                    </Lead>

                    <SubHead>Using the Site</SubHead>
                    <ul>
                      <li>
                        Family Table Recipe is free to use for personal, non-commercial purposes.
                      </li>
                      <li>
                        You may share recipes for personal use and link back to the original page.
                        Please do not reproduce full recipe text or images without written
                        permission.
                      </li>
                      <li>
                        Do not use automated tools to scrape, crawl, or harvest content from the
                        site.
                      </li>
                    </ul>

                    <SubHead>Recipes & Content Accuracy</SubHead>
                    <p>
                      All recipes are tested by our team, but results may vary based on ingredient
                      brands, equipment, and technique. Nutritional information is provided as an
                      estimate and should not be used as medical or dietary advice.
                    </p>
                    <p>
                      If you have food allergies or dietary restrictions, always verify every
                      ingredient yourself. We cannot be held responsible for adverse reactions
                      resulting from recipes on this site.
                    </p>

                    <SubHead>Intellectual Property</SubHead>
                    <p>
                      All content on Family Table Recipe — including recipes, photography, copy, and
                      branding — is owned by Family Table Recipe or our content contributors and is
                      protected by copyright. Unauthorised reproduction is prohibited.
                    </p>

                    <SubHead>Limitation of Liability</SubHead>
                    <p>
                      Family Table Recipe is provided "as is." We make no warranties about the
                      accuracy or reliability of the content. To the fullest extent permitted by
                      law, we are not liable for any damages arising from your use of this site.
                    </p>

                    <SubHead>Changes to These Terms</SubHead>
                    <p>
                      We may update these terms from time to time. Material changes will be
                      communicated via the newsletter or a notice on the site. Continued use after
                      changes constitutes acceptance.
                    </p>
                  </Prose>
                </article>
              </Reveal>

              <Divider />

              {/* Cookie Policy */}
              <Reveal>
                <article id="cookies" className="scroll-mt-28">
                  <SectionHeader icon={Cookie} title="Cookie Policy" />
                  <Prose>
                    <Lead>
                      We use cookies to make Family Table Recipe work properly and to understand how
                      people use it. Here's exactly what we use and why.
                    </Lead>

                    <SubHead>What Are Cookies?</SubHead>
                    <p>
                      Cookies are small text files stored on your device when you visit a website.
                      They help the site remember your preferences and gather anonymised data about
                      usage patterns.
                    </p>

                    <SubHead>Cookies We Use</SubHead>
                    <div className="overflow-x-auto">
                      <table>
                        <thead>
                          <tr>
                            <th>Cookie</th>
                            <th>Type</th>
                            <th>Purpose</th>
                            <th>Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <code>ft_session</code>
                            </td>
                            <td>Essential</td>
                            <td>Keeps you logged in during your visit</td>
                            <td>Session</td>
                          </tr>
                          <tr>
                            <td>
                              <code>ft_prefs</code>
                            </td>
                            <td>Functional</td>
                            <td>Remembers your theme and dietary filter preferences</td>
                            <td>1 year</td>
                          </tr>
                          <tr>
                            <td>
                              <code>_analytics</code>
                            </td>
                            <td>Analytics</td>
                            <td>Anonymised page-view and click tracking</td>
                            <td>2 years</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <SubHead>Your Choices</SubHead>
                    <p>
                      You can control cookies through your browser settings. Disabling cookies may
                      affect certain features of the site (such as saved preferences). You can also
                      opt out of analytics tracking at any time — just email us.
                    </p>
                    <p>We do not use advertising cookies or share cookie data with ad networks.</p>
                  </Prose>
                </article>
              </Reveal>

              <Divider />

              {/* Contact */}
              <Reveal>
                <article id="contact" className="scroll-mt-28">
                  <SectionHeader icon={Mail} title="Contact Us" />
                  <Prose>
                    <Lead>
                      Questions about any of the above? We're real people and we read every email.
                    </Lead>
                  </Prose>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {[
                      {
                        label: "Privacy & Data",
                        email: "privacy@familytablerecipe.com",
                        desc: "Data requests, deletion, access rights",
                      },
                      {
                        label: "General Legal",
                        email: "legal@familytablerecipe.com",
                        desc: "Copyright, licensing, permissions",
                      },
                      {
                        label: "Newsletter",
                        email: "hello@familytablerecipe.com",
                        desc: "Subscribe, unsubscribe, feedback",
                      },
                      {
                        label: "Press & Media",
                        email: "press@familytablerecipe.com",
                        desc: "Media kit, interviews, partnerships",
                      },
                    ].map((c) => (
                      <a
                        key={c.label}
                        href={`mailto:${c.email}`}
                        className="group card-floating card-floating-hover p-6 block"
                      >
                        <div className="text-xs uppercase tracking-widest font-medium text-primary mb-1">
                          {c.label}
                        </div>
                        <div className="font-display font-semibold text-sm group-hover:text-primary transition-colors">
                          {c.email}
                        </div>
                        <div className="text-xs text-ink-soft mt-1">{c.desc}</div>
                      </a>
                    ))}
                  </div>
                </article>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

/* ── Shared sub-components ── */

function SectionHeader({ icon: Icon, title }: { icon: typeof Shield; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <div className="prose-legal space-y-5 text-ink leading-relaxed">{children}</div>;
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg text-ink-soft leading-relaxed border-l-4 border-primary pl-5 font-display">
      {children}
    </p>
  );
}

function SubHead({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display text-lg font-bold text-ink mt-8 mb-3">{children}</h3>;
}

function Divider() {
  return <div className="border-t border-border" />;
}
