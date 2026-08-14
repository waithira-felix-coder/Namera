import * as React from "react";

import { cn } from "@/lib/utils";

export function Section({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"section">) {
  return (
    <section
      className={cn("relative py-16 sm:py-20 lg:py-24", className)}
      {...props}
    />
  );
}
