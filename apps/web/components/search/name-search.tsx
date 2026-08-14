"use client";

import { useMemo, useState } from "react";
import type { NameRecord } from "@/lib/types";
import { NameCard } from "@/components/names/name-card";
import { Button } from "@/components/ui/button";

export function NameSearch({
  initialNames,
  initialQuery,
  initialGender,
  initialProfile,
  initialVibe,
  initialStyle,
}: {
  initialNames: NameRecord[];
  initialQuery?: string;
  initialGender?: string;
  initialProfile?: string;
  initialVibe?: string;
  initialStyle?: string;
}) {
  const [query, setQuery] = useState(initialQuery ?? "");
  const [gender, setGender] = useState<string>(initialGender ?? "");
  const [profile, setProfile] = useState<string>(initialProfile ?? "");
  const [vibe, setVibe] = useState<string>(initialVibe ?? "");
  const [style, setStyle] = useState<string>(initialStyle ?? "");
  const [limit, setLimit] = useState(24);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initialNames
      .filter((n) => (gender ? n.gender.toLowerCase() === gender.toLowerCase() : true))
      .filter((n) => (profile ? (n.profile ?? "").toLowerCase() === profile.toLowerCase() : true))
      .filter((n) => (vibe ? (n.vibe ?? "").toLowerCase() === vibe.toLowerCase() : true))
      .filter((n) => (style ? (n.style ?? "").toLowerCase().includes(style.toLowerCase()) : true))
      .filter((n) => {
        if (!q) return true;
        return (
          n.name.toLowerCase().includes(q) ||
          n.meaning.toLowerCase().includes(q) ||
          n.origin.toLowerCase().includes(q) ||
          (n.tags || []).join(" ").toLowerCase().includes(q) ||
          (n.description || "").toLowerCase().includes(q) ||
          (n.compatibility || "").toLowerCase().includes(q)
        );
      })
      .slice(0, limit);
  }, [initialNames, query, gender, profile, vibe, style, limit]);

  return (
    <div>
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by meaning, origin, tags, or fit..."
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm"
        />

        <select value={gender} onChange={(e) => setGender(e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm">
          <option value="">Any gender</option>
          <option value="boy">Boy</option>
          <option value="girl">Girl</option>
          <option value="unisex">Unisex</option>
        </select>

        <select value={profile} onChange={(e) => setProfile(e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm">
          <option value="">Any profile</option>
          <option value="balanced">Balanced</option>
          <option value="modern">Modern</option>
          <option value="gentle">Gentle</option>
          <option value="bold">Bold</option>
          <option value="short-modern">Short</option>
        </select>

        <select value={vibe} onChange={(e) => setVibe(e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm">
          <option value="">Any vibe</option>
          <option value="classic">Classic</option>
          <option value="confident">Confident</option>
          <option value="gentle">Gentle</option>
          <option value="warm">Warm</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {filtered.map((name) => (
          <NameCard key={name.slug} name={name} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center">
        {filtered.length >= limit ? (
          <Button variant="outline" onClick={() => setLimit((s) => s + 24)}>
            Load more
          </Button>
        ) : (
          <span className="text-sm text-slate-500">End of results</span>
        )}
      </div>
    </div>
  );
}
