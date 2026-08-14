"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function SearchBar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function submit() {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    router.push(`/search?${params.toString()}`);
  }

  return (
    <section className="border-y border-slate-200 bg-white py-8">
      <Container>
        <div className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              aria-label="Search names"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by meaning, style, origin, or religion..."
              className="w-full border-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          <Button onClick={submit} className="md:min-w-[180px]">Find matching names</Button>
        </div>
      </Container>
    </section>
  );
}
