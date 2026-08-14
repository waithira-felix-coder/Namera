import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { NameRecord } from "@/lib/types";

export function NameCard({ name }: { name: NameRecord }) {
  return (
    <Card className="h-full border-slate-200 bg-white/90">
      <CardHeader>
        <CardTitle className="text-2xl">{name.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex flex-wrap gap-2">
          {name.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <CardDescription className="text-base leading-7 text-slate-600">
          {name.description}
        </CardDescription>

        <div className="mt-5 space-y-2 text-sm text-slate-600">
          <p>
            <span className="font-medium text-slate-900">Meaning:</span> {name.meaning}
          </p>
          <p>
            <span className="font-medium text-slate-900">Origin:</span> {name.origin}
          </p>
          <p>
            <span className="font-medium text-slate-900">Fit:</span> {name.compatibility}
          </p>
        </div>

        <Link
          href={`/names/${name.slug}`}
          className="mt-6 inline-flex text-sm font-medium text-slate-900 transition hover:text-slate-600"
        >
          View profile →
        </Link>
      </CardContent>
    </Card>
  );
}
