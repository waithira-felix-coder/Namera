"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNameRecords } from "@/lib/api/names";

export function AdvisorWidget() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Array<any>>([]);

  function detectGender(text: string) {
    const t = text.toLowerCase();
    if (t.includes("boy") || t.includes("male")) return "male";
    if (t.includes("girl") || t.includes("female")) return "female";
    return undefined;
  }

  function detectStyle(text: string) {
    const t = text.toLowerCase();
    if (t.includes("modern")) return "modern";
    if (t.includes("biblical") || t.includes("bible")) return "biblical";
    if (t.includes("short") || t.includes("shorter")) return "short";
    return undefined;
  }

  async function onGenerate() {
    setLoading(true);
    try {
      const names = await getNameRecords();
      const gender = detectGender(prompt);
      const style = detectStyle(prompt);

      const tokens = prompt.toLowerCase().split(/\s+/).filter(Boolean);

      const filtered = names.filter((n) => {
        if (gender && n.gender && String(n.gender) !== gender) return false;
        if (style && n.style && typeof n.style === "string" && !n.style.includes(style)) return false;
        // match any token in name, meaning, origin or tags
        const hay = [n.name, n.meaning, n.origin, ...(n.tags ?? [])].join(" ").toLowerCase();
        return tokens.every((tok) => hay.includes(tok));
      });

      // fallback: if filtered empty, pick top matching by name substring or popularity
      const resultsToShow = filtered.length ? filtered.slice(0, 12) : names.slice(0, 12);
      setResults(resultsToShow);
    } catch (e) {
      console.error(e);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-slate-200 bg-white/90">
      <CardHeader>
        <CardTitle>AI Naming Advisor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <textarea
          aria-label="Advisor prompt"
          placeholder="I’m Christian, Kenyan, and want a short modern boy name that works well with Kimani."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />

        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={() => setPrompt("")}>Clear</Button>
          <Button onClick={onGenerate} disabled={loading || !prompt.trim()}>
            {loading ? "Finding..." : "Get recommendations"}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="grid gap-3">
            {results.map((r) => (
              <div key={r.slug} className="rounded-md border p-3">
                <div className="font-semibold">{r.name} <span className="text-sm text-slate-500">{r.gender}</span></div>
                <div className="text-sm text-slate-600">{r.meaning || r.origin}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AdvisorWidget;
