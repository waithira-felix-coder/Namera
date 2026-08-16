"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import AdvisorWidget from "@/components/advisor/advisor-widget";

export default function AdvisorPage() {
  return (
    <Section>
      <Container>
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Advisor
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            Your AI naming advisor.
          </h1>
        </div>

        <div>
          {/* Client-side advisor widget (lazy-loaded) */}
          <AdvisorWidget />
        </div>
      </Container>
    </Section>
  );
}
