import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const collections = [
  { title: "Favorites", slug: "favorites" },
  { title: "Shortlist", slug: "shortlist" },
  { title: "Biblical names", slug: "biblical" },
  { title: "Modern names", slug: "modern" },
  { title: "Partner favorites", slug: "partner" },
];

export default function CollectionsPage() {
  return (
    <Section>
      <Container>
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Collections
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            Save and organize your favorites.
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
            >
              <Card className="cursor-pointer border-slate-200 bg-white/90 hover:shadow">
                <CardHeader>
                  <CardTitle>{collection.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">
                  A curated list of names that fit this theme and family
                  preference.
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
