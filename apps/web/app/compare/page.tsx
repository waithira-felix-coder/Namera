import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const comparison = [
  { name: "Kian", meaning: "Strong", popularity: "Low-moderate", style: "Modern" },
  { name: "Ezra", meaning: "Helper", popularity: "Moderate", style: "Classic-modern" },
  { name: "Amani", meaning: "Peace / hope", popularity: "Growing", style: "Soft and global" },
];

export default function ComparePage() {
  return (
    <Section>
      <Container>
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Compare</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Compare names side by side.</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {comparison.map((item) => (
            <Card key={item.name} className="border-slate-200 bg-white/90">
              <CardHeader>
                <CardTitle className="text-2xl">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <p><span className="font-medium text-slate-900">Meaning:</span> {item.meaning}</p>
                <p><span className="font-medium text-slate-900">Popularity:</span> {item.popularity}</p>
                <p><span className="font-medium text-slate-900">Style:</span> {item.style}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
