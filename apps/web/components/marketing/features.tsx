import { ArrowRight, BadgeCheck, Sparkles, TrendingUp } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

const features = [
  {
    icon: Sparkles,
    title: "Meaning intelligence",
    description: "Understand a name’s significance, context, and cultural nuance without guessing.",
  },
  {
    icon: BadgeCheck,
    title: "Surname compatibility",
    description: "Evaluate rhythm, flow, and sound so names fit naturally with your family name.",
  },
  {
    icon: TrendingUp,
    title: "Trend awareness",
    description: "See popularity patterns and recent changes, while preserving clarity about prediction limits.",
  },
];

export function Features() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Why Namera
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            The smarter way to choose a name.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="h-full border-slate-200 bg-white/80">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-7 text-slate-600">
                  {description}
                </CardDescription>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                  Learn more <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
