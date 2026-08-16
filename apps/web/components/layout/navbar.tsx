"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const navItems = [
  { href: "/search", label: "Search" },
  { href: "/compare", label: "Compare" },
  { href: "/advisor", label: "Advisor" },
  { href: "/collections", label: "Collections" },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={pathname === "/" ? "hidden" : "inline-flex"}
            onClick={() => router.back()}
            aria-label="Go back to previous page"
          >
            ← Back
          </Button>
        </div>

        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Namera home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white">
            N
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-900">
              Namera
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Link href="/search">
            <Button>Start exploring</Button>
          </Link>
        </div>
      </Container>
    </header>
  );
}
