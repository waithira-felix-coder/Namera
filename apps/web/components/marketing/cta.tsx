import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Cta() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-10 text-white sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                Start your naming journey
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Let Namera help you narrow the right fit.
              </h2>
            </div>

            <Button size="lg" variant="secondary" asChild className="bg-white text-slate-900 hover:bg-slate-100">
              <Link href="/search">Build my shortlist</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
