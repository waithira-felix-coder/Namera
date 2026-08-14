import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getNameBySlug, getNameRecords } from "@/lib/api/names";

export async function generateStaticParams() {
  const names = await getNameRecords();
  return names.map((name) => ({ slug: name.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = await getNameBySlug(slug);

  if (!name) {
    return {
      title: "Name not found | Namera",
    };
  }

  return {
    title: `${name.name} | Namera`,
    description: `${name.name} — ${name.meaning}. A ${name.style.toLowerCase()} name with ${name.origin.toLowerCase()} roots.`,
  };
}

export default async function NameProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const name = await getNameBySlug(slug);

  if (!name) {
    notFound();
  }

  return (
    <Section>
      <Container className="max-w-4xl">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Name profile</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{name.name}</h1>
            </div>
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              {name.compatibility}
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">Meaning</p>
              <p className="mt-2 text-lg font-medium text-slate-900">{name.meaning}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">Origin</p>
              <p className="mt-2 text-lg font-medium text-slate-900">{name.origin}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">Pronunciation</p>
              <p className="mt-2 text-lg font-medium text-slate-900">{name.pronunciation}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">Profile</p>
              <p className="mt-2 text-lg font-medium text-slate-900">{name.profile ?? "balanced"}</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Overview</p>
            <p className="mt-4 text-lg leading-8 text-slate-700">{name.description}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {name.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
