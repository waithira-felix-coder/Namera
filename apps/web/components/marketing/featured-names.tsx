import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { NameCard } from "@/components/names/name-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getFeaturedNames } from "@/lib/api/names";

export async function FeaturedNames() {
  const featuredNames = await getFeaturedNames();

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Featured names</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Names parents are exploring.</h2>
          </div>
          <Link href="/search">
            <Button variant="ghost" className="w-fit">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredNames.map((name) => (
            <NameCard key={name.slug} name={name} />
          ))}
        </div>
      </Container>
    </section>
  );
}
