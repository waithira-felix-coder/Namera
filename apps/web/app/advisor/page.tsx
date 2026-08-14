import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function AdvisorPage() {
  return (
    <Section>
      <Container>
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Advisor</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Your AI naming advisor.</h1>
        </div>

        <Card className="border-slate-200 bg-white/90">
          <CardHeader>
            <CardTitle>What are you looking for?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <textarea
              aria-label="Advisor prompt"
              placeholder="I’m Christian, Kenyan, and want a short modern boy name that works well with Kimani."
              className="min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
            <div className="flex justify-end">
              <Button>Get recommendations</Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
