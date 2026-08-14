from __future__ import annotations

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from sqlalchemy import text

from app.db.session import SessionLocal
from app.models.name import Name


COMMON_NAME_DATA = {
    "ava": {"meaning": "Bird", "origin": "Latin", "language": "Latin", "style": "soft-modern", "vibe": "graceful"},
    "leo": {"meaning": "Lion", "origin": "Latin", "language": "Latin", "style": "bold-classic", "vibe": "confident"},
    "kian": {"meaning": "Ancient and strong", "origin": "Persian", "language": "Persian", "style": "modern-heritage", "vibe": "grounded"},
    "noor": {"meaning": "Light", "origin": "Arabic", "language": "Arabic", "style": "minimal-elegant", "vibe": "luminous"},
    "amani": {"meaning": "Peace and hope", "origin": "Swahili", "language": "Swahili", "style": "soft-global", "vibe": "gentle"},
    "ezra": {"meaning": "Helper", "origin": "Hebrew", "language": "Hebrew", "style": "classic-modern", "vibe": "warm"},
    "maya": {"meaning": "Illusion or water", "origin": "Sanskrit/Hebrew", "language": "Sanskrit / English", "style": "soft-global", "vibe": "dreamy"},
    "zoe": {"meaning": "Life", "origin": "Greek", "language": "Greek", "style": "minimal-sweet", "vibe": "bright"},
    "liam": {"meaning": "Protector", "origin": "Irish", "language": "Irish / English", "style": "modern-mainstream", "vibe": "steady"},
    "sophia": {"meaning": "Wisdom", "origin": "Greek", "language": "Greek", "style": "classic-elegant", "vibe": "refined"},
    "oliver": {"meaning": "Olive tree", "origin": "Latin", "language": "Latin", "style": "classic-modern", "vibe": "friendly"},
    "charlotte": {"meaning": "Free woman", "origin": "French", "language": "French", "style": "classic-royal", "vibe": "elegant"},
}


def profile_for(name: str, gender: str) -> str:
    l = name.lower()
    if len(name) <= 4:
        return "modern"
    if name.endswith(("a", "e", "i", "y")):
        return "gentle" if gender.lower() in {"female", "feminine", "girl", "f"} else "balanced"
    if any(ch in l for ch in ("k", "x", "z")):
        return "bold"
    if any(ch in l for ch in ("m", "n", "l")):
        return "grounded"
    return "balanced"


def discoverability_for(popularity: str) -> str:
    try:
        score = int(popularity)
    except (TypeError, ValueError):
        return "moderate"
    if score >= 100000:
        return "high"
    if score >= 20000:
        return "medium"
    return "moderate"


def style_for(name: str, gender: str) -> str:
    lower = name.lower()
    if len(name) <= 4:
        return "short-modern"
    if any(v in lower for v in ("a", "e", "i", "o", "u")) and len(name) >= 6:
        return "soft-global"
    if any(ch in lower for ch in ("x", "z", "q", "k")):
        return "bold-unique"
    if gender.lower() in {"female", "feminine", "girl", "f"}:
        return "classic-feminine"
    return "modern-heritage"


def nounish_lookup(name: str) -> str:
    key = name.lower().strip()
    return COMMON_NAME_DATA.get(key, {}).get("meaning", "A timeless, personal choice")


def origin_for(name: str) -> str:
    key = name.lower().strip()
    return COMMON_NAME_DATA.get(key, {}).get("origin", "International")


def language_for(name: str) -> str:
    key = name.lower().strip()
    return COMMON_NAME_DATA.get(key, {}).get("language", "International / English")


def vibe_for(name: str, gender: str) -> str:
    key = name.lower().strip()
    if key in COMMON_NAME_DATA:
        return COMMON_NAME_DATA[key]["vibe"]
    if gender.lower() in {"female", "feminine", "girl", "f"}:
        return "warm" if len(name) <= 5 else "elegant"
    return "steady" if len(name) <= 5 else "confident"


def infer_nickname(name: str) -> str:
    clean = re.sub(r"[^a-zA-Z]", "", name)
    if len(clean) <= 3:
        return clean
    if len(clean) <= 5:
        return clean[:2] + "ie"
    return clean[:3]


def guess_pronunciation(name: str) -> str:
    letters = name.lower()
    if len(name) <= 3:
        return f"{letters[0]}-{letters[1:]}"
    return "".join(ch if ch in "aeiou" else ch for ch in letters[:4]).replace("", "").strip("-")


def compat_name_for(name: str, gender: str) -> str:
    pool = [
        "Ava", "Leo", "Noor", "Mila", "Ezra", "Kian", "Ari", "Theo", "Nia", "Milo",
        "Amani", "Lena", "Omar", "Zuri", "Ayla", "Kai", "Sofia", "Nolan", "Elena", "Iris"
    ]
    seed = sum(ord(ch) for ch in name) % len(pool)
    chosen = pool[seed]
    return chosen


def compatibility_text(name: str, gender: str) -> str:
    num = 81 + (sum(ord(ch) for ch in name) % 16)
    return f"{num}% fit with {compat_name_for(name, gender)}"


def build_description(name: str, gender: str, meaning: str, style: str) -> str:
    return (
        f"{name} feels {vibe_for(name, gender)} and {profile_for(name, gender)}, with a {style} profile "
        f"that works well for modern families who want something distinctive yet easy to love."
    )


def build_tags(name: str, gender: str, style: str, profile: str) -> str:
    base = [style, profile, "modern", "international"]
    if gender.lower() in {"female", "feminine", "girl", "f"}:
        base.append("soft")
    else:
        base.append("strong")
    if len(name) <= 4:
        base.append("short")
    if any(ch in name.lower() for ch in ("a", "e", "i", "o")):
        base.append("vowel-rich")
    return ", ".join(dict.fromkeys(base))


def enrich_row(name_row: Name) -> None:
    key = name_row.name.strip().lower()
    if key in COMMON_NAME_DATA:
        known = COMMON_NAME_DATA[key]
        name_row.meaning = name_row.meaning or known.get("meaning", name_row.meaning)
        name_row.origin = name_row.origin or known.get("origin", name_row.origin)
        name_row.language = name_row.language or known.get("language", name_row.language)
        name_row.style = name_row.style or known.get("style", name_row.style)
    else:
        name_row.meaning = name_row.meaning or nounish_lookup(name_row.name)
        name_row.origin = name_row.origin or "International"
        name_row.language = name_row.language or "International / English"

    name_row.style = name_row.style or style_for(name_row.name, name_row.gender)
    name_row.profile = name_row.profile or profile_for(name_row.name, name_row.gender)
    name_row.discoverability = name_row.discoverability or discoverability_for(name_row.popularity)
    name_row.vibe = name_row.vibe or vibe_for(name_row.name, name_row.gender)
    name_row.nickname = name_row.nickname or infer_nickname(name_row.name)
    name_row.tags = name_row.tags or build_tags(name_row.name, name_row.gender, name_row.style, name_row.profile)
    name_row.compatibility = name_row.compatibility or compatibility_text(name_row.name, name_row.gender)
    name_row.pronunciation = name_row.pronunciation or guess_pronunciation(name_row.name)
    name_row.description = name_row.description or build_description(name_row.name, name_row.gender, name_row.meaning, name_row.style)


def main() -> None:
    session = SessionLocal()
    rows = session.query(Name).order_by(Name.id).all()
    total = 0
    for row in rows:
        if not row.meaning or not row.origin or not row.language or not row.style or not row.pronunciation or not row.description or not row.compatibility:
            enrich_row(row)
            total += 1
        else:
            row.profile = row.profile or profile_for(row.name, row.gender)
            row.discoverability = row.discoverability or discoverability_for(row.popularity)
            row.vibe = row.vibe or vibe_for(row.name, row.gender)
            row.nickname = row.nickname or infer_nickname(row.name)
            row.tags = row.tags or build_tags(row.name, row.gender, row.style, row.profile)
            row.compatibility = row.compatibility or compatibility_text(row.name, row.gender)
    session.commit()
    print(f"Updated {total} records with enrichment metadata.")
    print("Sample:", session.execute(text("SELECT slug, name, meaning, origin, style, profile, discoverability, vibe, nickname, compatibility FROM names ORDER BY id LIMIT 5")).fetchall())
    session.close()


if __name__ == "__main__":
    main()
