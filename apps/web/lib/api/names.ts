import { names as fallbackNames } from "@/lib/data/names";
import type { NameRecord } from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const USE_LIVE_API = process.env.NEXT_PUBLIC_USE_LIVE_API !== "false";

function normalizeTags(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (typeof value === "string") {
    return value
      .split(/[|,]/)
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
}

function mapApiName(raw: Record<string, unknown>): NameRecord {
  const tags = normalizeTags(raw.tags);

  return {
    id: Number(raw.id ?? 0),
    slug: String(raw.slug ?? ""),
    name: String(raw.name ?? ""),
    gender: String(raw.gender ?? "unisex") as NameRecord["gender"],
    meaning: String(raw.meaning ?? ""),
    origin: String(raw.origin ?? ""),
    language: String(raw.language ?? ""),
    popularity: String(raw.popularity ?? ""),
    style: String(raw.style ?? ""),
    description: String(raw.description ?? ""),
    pronunciation: String(raw.pronunciation ?? ""),
    compatibility: String(raw.compatibility ?? ""),
    profile: String(raw.profile ?? "balanced"),
    discoverability: String(raw.discoverability ?? "moderate"),
    vibe: String(raw.vibe ?? "classic"),
    nickname: String(raw.nickname ?? ""),
    tags,
  };
}

async function fetchNames(): Promise<NameRecord[]> {
  if (!USE_LIVE_API) {
    return fallbackNames;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/names`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch names: ${response.status}`);
    }

    const data = (await response.json()) as Record<string, unknown>[];
    return data.map(mapApiName);
  } catch (error) {
    console.warn(
      "Using fallback names because the API was unavailable:",
      error,
    );
    return fallbackNames;
  }
}

export async function getNameRecords(): Promise<NameRecord[]> {
  return fetchNames();
}

export async function getNameBySlug(slug: string): Promise<NameRecord | null> {
  const names = await fetchNames();
  return names.find((name) => name.slug === slug) ?? null;
}

export async function getFeaturedNames(): Promise<NameRecord[]> {
  const names = await fetchNames();
  return names.slice(0, 4);
}
