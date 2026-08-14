import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const collections = [
  "Favorites",
  "Shortlist",
  "Biblical names",
  "Modern names",
  "Partner favorites",
];

export default function CollectionsPage() {
  return (
    <Section>
      <Container>
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Collections</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Save and organize your favorites.</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {collections.map((collection) => (
            <Card key={collection} className="border-slate-200 bg-white/90">
              <CardHeader>
                <CardTitle>{collection}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                A curated list of names that fit this theme and family preference.
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
