import type { NameRecord, NameSearchFilters } from "@/lib/types";

export const names: NameRecord[] = [
  {
    slug: "kian",
    name: "Kian",
    gender: "boy",
    meaning: "Ancient and strong",
    origin: "Persian",
    language: "Persian / English",
    popularity: "Low to moderate",
    style: "Modern",
    description: "Short, elegant, and internationally easy to pronounce across family and cultural contexts.",
    pronunciation: "kee-an",
    compatibility: "93% fit with Kimani",
    profile: "balanced",
    discoverability: "moderate",
    vibe: "classic",
    nickname: "Kiki",
    tags: ["short", "international", "modern", "unique"],
  },
  {
    slug: "ezra",
    name: "Ezra",
    gender: "boy",
    meaning: "Helper",
    origin: "Hebrew",
    language: "Hebrew / English",
    popularity: "Moderate",
    style: "Classic-modern",
    description: "Warm, familiar, and meaningful with strong biblical associations while still feeling current.",
    pronunciation: "EZ-rah",
    compatibility: "90% fit",
    profile: "balanced",
    discoverability: "moderate",
    vibe: "warm",
    nickname: "Ez",
    tags: ["biblical", "strong", "classic"],
  },
  {
    slug: "amani",
    name: "Amani",
    gender: "girl",
    meaning: "Peace and hope",
    origin: "Swahili",
    language: "Swahili / Arabic",
    popularity: "Growing",
    style: "Soft and global",
    description: "Gentle, lyrical, and meaningful with cross-cultural appeal and a contemporary feel.",
    pronunciation: "ah-MAH-nee",
    compatibility: "91% fit",
    profile: "gentle",
    discoverability: "moderate",
    vibe: "soft",
    nickname: "Ami",
    tags: ["meaningful", "global", "soft"],
  },
  {
    slug: "noor",
    name: "Noor",
    gender: "unisex",
    meaning: "Light",
    origin: "Arabic",
    language: "Arabic / English",
    popularity: "Steady",
    style: "Minimal and elegant",
    description: "Short and luminous, with spiritual meaning and a clean, memorable sound.",
    pronunciation: "noor",
    compatibility: "88% fit",
    profile: "minimal",
    discoverability: "moderate",
    vibe: "luminous",
    nickname: "Nori",
    tags: ["short", "light", "memorable"],
  },
  {
    slug: "liam",
    name: "Liam",
    gender: "boy",
    meaning: "Protector or determined guardian",
    origin: "Irish",
    language: "Irish / English",
    popularity: "Very high",
    style: "Modern",
    description: "Very familiar, polished, and easy to say in many contexts, though less distinctive in some markets.",
    pronunciation: "LEE-am",
    compatibility: "85% fit",
    profile: "steady",
    discoverability: "high",
    vibe: "confident",
    nickname: "Lee",
    tags: ["modern", "popular", "short"],
  },
  {
    slug: "asher",
    name: "Asher",
    gender: "boy",
    meaning: "Happy or blessed",
    origin: "Hebrew",
    language: "Hebrew / English",
    popularity: "Rising",
    style: "Strong and modern",
    description: "A warm biblical name with gentle energy and rising appeal in contemporary naming circles.",
    pronunciation: "AY-shur",
    compatibility: "89% fit",
    profile: "balanced",
    discoverability: "moderate",
    vibe: "friendly",
    nickname: "Ash",
    tags: ["biblical", "rising", "friendly"],
  },
];

export const featuredNames = ["kian", "ezra", "amani", "noor"];

export function getNameBySlug(slug: string) {
  return names.find((name) => name.slug === slug);
}

export function searchNames(query = "", filters: Partial<NameSearchFilters> = {}) {
  const normalizedQuery = query.trim().toLowerCase();

  return names.filter((name) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [
        name.name,
        name.meaning,
        name.origin,
        name.language,
        name.description,
        name.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);

    const matchesGender = !filters.gender || name.gender === filters.gender;
    const matchesReligion = !filters.religion || name.tags.some((tag) => tag.toLowerCase() === filters.religion?.toLowerCase());
    const matchesStyle = !filters.style || name.style.toLowerCase() === filters.style.toLowerCase();
    const matchesMeaning =
      !filters.meaning ||
      name.meaning.toLowerCase().includes(filters.meaning.toLowerCase());

    return matchesQuery && matchesGender && matchesReligion && matchesStyle && matchesMeaning;
  });
}

export function getFeaturedNames() {
  return featuredNames
    .map((slug) => getNameBySlug(slug))
    .filter((name): name is NameRecord => Boolean(name));
}
