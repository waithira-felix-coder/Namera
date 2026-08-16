import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import Link from "next/link";
import { getNameRecords } from "@/lib/api/names";
import type { NameRecord } from "@/lib/types";

type Props = { params: { slug: string } };

function slugMatches(name: NameRecord, slug: string) {
  const s = slug.toLowerCase();
  if (s === "favorites") return (name.tags ?? []).includes("favorite") || name.popularity === "high";
  if (s === "shortlist") return (name.tags ?? []).includes("shortlist");
  if (s === "biblical") return (name.tags ?? []).includes("biblical") || (name.origin ?? "").toLowerCase().includes("hebr");
  if (s === "modern") return (name.style ?? "").toLowerCase().includes("modern") || (name.vibe ?? "").toLowerCase().includes("modern");
  if (s === "partner") return (name.tags ?? []).includes("partner");
  return false;
}

export default async function CollectionDetail({ params }: Props) {
  const slug = params.slug;
  const all = await getNameRecords();

  const matched = all.filter((n) => slugMatches(n, slug));

  return (
    <Section>
      <Container>
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Collection</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{slug.replace(/-/g, " ")}</h1>
        </div>

        <div className="grid gap-4">
          {matched.length === 0 && (
            <p className="text-sm text-slate-600">No names found for this collection.</p>
          )}

          {matched.slice(0, 200).map((n) => (
            <Link key={n.slug} href={`/names/${n.slug}`} className="block rounded-md border p-3 hover:bg-slate-50">
              <div className="font-semibold">{n.name} <span className="text-sm text-slate-500">{n.gender}</span></div>
              <div className="text-sm text-slate-600">{n.meaning || n.origin}</div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
