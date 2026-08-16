import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getNameRecords } from "@/lib/api/names";
import { NameSearch } from "@/components/search/name-search";

export default async function SearchPage({ searchParams }: { searchParams?: any }) {
  const names = await getNameRecords();

  // `searchParams` can be a Promise in this Next version — unwrap if necessary
  const sp = typeof (searchParams as any)?.then === "function" ? await searchParams : searchParams ?? {};

  const q = typeof sp?.q === "string" ? sp.q : undefined;
  const gender = typeof sp?.gender === "string" ? sp.gender : undefined;
  const profile = typeof sp?.profile === "string" ? sp.profile : undefined;
  const vibe = typeof sp?.vibe === "string" ? sp.vibe : undefined;
  const style = typeof sp?.style === "string" ? sp.style : undefined;

  const totalNames = names.length;

  return (
    <Section>
      <Container>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Search
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
              Discover names that fit your family.
            </h1>
          </div>

          <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm">
            {totalNames.toLocaleString()} names in our live database
          </div>
        </div>

        <div className="mb-10 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm">
          {/* interactive client-side search */}
          <NameSearch
            initialNames={names}
            initialQuery={q}
            initialGender={gender}
            initialProfile={profile}
            initialVibe={vibe}
            initialStyle={style}
          />
        </div>
      </Container>
    </Section>
  );
}
