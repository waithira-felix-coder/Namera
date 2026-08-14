import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const quickFilters = [
  "Christian boy names",
  "Unique biblical names",
  "Modern Kenyan names",
  "Names meaning hope",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),_transparent_40%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
      <Container className="grid gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
        <div>
          <div className="mb-6 inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-600">
            Every name has a story.
          </div>

          <h1 className="max-w-xl text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl">
            Find a baby name with clarity, culture, and confidence.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Namera blends meaning, popularity, surname flow, and heritage to help parents discover names that feel right for their family.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button size="lg" asChild>
              <Link href="/search">Explore names</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/advisor">Try advisor</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {quickFilters.map((filter) => (
              <span
                key={filter}
                className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-sm text-slate-700"
              >
                {filter}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.45)]">
            <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Top match</span>
                <span>94% fit</span>
              </div>

              <div className="mt-7 flex items-end justify-between gap-4">
                <div>
                  <p className="text-4xl font-semibold tracking-tight">Kian</p>
                  <p className="mt-2 text-sm text-slate-300">Modern • Short • International</p>
                </div>
                <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                  Strong fit
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Meaning</p>
                  <p className="mt-2 text-sm font-medium">Ancient • strong</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Origin</p>
                  <p className="mt-2 text-sm font-medium">Persian</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Flow</p>
                  <p className="mt-2 text-sm font-medium">Kimani + Kian</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
