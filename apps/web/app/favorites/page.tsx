import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const favorites = ["Kian", "Ezra", "Amani", "Noor"];

export default function FavoritesPage() {
  return (
    <Section>
      <Container>
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Favorites</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Your short list.</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {favorites.map((name) => (
            <Card key={name} className="border-slate-200 bg-white/90">
              <CardHeader>
                <CardTitle className="text-2xl">{name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Saved</span>
                  <Button variant="ghost" className="px-0 text-slate-900">
                    View <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
