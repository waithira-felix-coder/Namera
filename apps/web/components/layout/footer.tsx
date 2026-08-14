import Link from "next/link";

import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/80">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-tight text-slate-900">Namera</p>
          <p className="mt-2 max-w-sm text-sm text-slate-600">
            A calmer, smarter way to discover the right baby name for your family.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
          <Link href="/search" className="transition hover:text-slate-900">
            Search
          </Link>
          <Link href="/advisor" className="transition hover:text-slate-900">
            Advisor
          </Link>
          <Link href="/compare" className="transition hover:text-slate-900">
            Compare
          </Link>
          <Link href="/favorites" className="transition hover:text-slate-900">
            Favorites
          </Link>
        </div>
      </Container>
    </footer>
  );
}
