export type NameGender = "boy" | "girl" | "unisex" | "masculine" | "feminine" | "unisex";

export type NameRecord = {
  id?: number;
  slug: string;
  name: string;
  gender: NameGender;
  meaning: string;
  origin: string;
  language: string;
  popularity: string;
  style: string;
  description: string;
  pronunciation: string;
  compatibility: string;
  profile?: string;
  discoverability?: string;
  vibe?: string;
  nickname?: string;
  tags: string[];
};

export type NameSearchFilters = {
  gender?: NameGender;
  religion?: string;
  style?: string;
  meaning?: string;
};
