import { Cta } from "@/components/marketing/cta";
import { FeaturedNames } from "@/components/marketing/featured-names";
import { Features } from "@/components/marketing/features";
import { Hero } from "@/components/marketing/hero";
import { SearchBar } from "@/components/marketing/search-bar";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SearchBar />
        <Features />
        <FeaturedNames />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
