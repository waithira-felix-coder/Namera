"""Import SSA baby names data into the Namera Postgres database.

This script downloads the SSA `names.zip`, aggregates counts across years,
normalizes names, and inserts them into the `names` table.

Run from the repo root using the project's virtualenv, e.g.:
  C:\...\.venv\Scripts\python.exe apps/api/scripts/import_ssa.py

"""
from __future__ import annotations

import io
import sys
import zipfile
import urllib.request
from collections import defaultdict
from pathlib import Path
from typing import Dict, Tuple

from sqlalchemy.orm import Session
from sqlalchemy import text

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.db.session import SessionLocal
from app.models.name import Name


SSA_ZIP_URL = "https://www.ssa.gov/oact/babynames/names.zip"


def slugify(name: str) -> str:
    s = name.strip().lower()
    out = []
    for ch in s:
        if ch.isalnum():
            out.append(ch)
        else:
            out.append("-")
    slug = "".join(out)
    # collapse repeated dashes
    while "--" in slug:
        slug = slug.replace("--", "-")
    slug = slug.strip("-")
    return slug or name.lower()


def download_zip(url: str) -> bytes:
    print("Downloading SSA names zip...")
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "*/*",
    })
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read()


def parse_names_from_zip(data: bytes) -> Dict[Tuple[str, str], int]:
    """Return mapping (name, gender) -> aggregated count."""
    counts: Dict[Tuple[str, str], int] = defaultdict(int)
    with zipfile.ZipFile(io.BytesIO(data)) as zf:
        for name in zf.namelist():
            if not name.lower().startswith("yob") or not name.lower().endswith(".txt"):
                continue
            with zf.open(name) as fh:
                for raw in fh:
                    try:
                        line = raw.decode("utf-8").strip()
                    except Exception:
                        continue
                    if not line:
                        continue
                    parts = line.split(",")
                    if len(parts) != 3:
                        continue
                    nm, gender, cnt = parts
                    try:
                        cnt = int(cnt)
                    except ValueError:
                        continue
                    counts[(nm, gender)] += cnt
    return counts


def ensure_unique_slug(slug: str, used: set) -> str:
    base = slug
    i = 1
    while slug in used:
        slug = f"{base}-{i}"
        i += 1
    used.add(slug)
    return slug


def ingest_to_db(counts: Dict[Tuple[str, str], int], limit: int | None = None) -> int:
    """Insert aggregated names into DB. Returns number inserted."""
    session: Session = SessionLocal()
    used_slugs = set(r[0] for r in session.execute(text("SELECT slug FROM names")).fetchall())

    # Sort by popularity desc
    items = sorted(counts.items(), key=lambda kv: kv[1], reverse=True)
    if limit:
        items = items[:limit]

    inserted = 0
    batch = []
    for (name, gender), total in items:
        slug_base = slugify(name)
        slug = ensure_unique_slug(slug_base, used_slugs)
        record = Name(
            slug=slug,
            name=name,
            gender=gender,
            meaning="",
            origin="",
            language="",
            popularity=str(total),
            style="unknown",
            description="",
            pronunciation="",
            compatibility="",
        )
        batch.append(record)
        if len(batch) >= 1000:
            for r in batch:
                session.merge(r)
            session.commit()
            inserted += len(batch)
            print(f"Inserted {inserted}...")
            batch = []

    if batch:
        for r in batch:
            session.merge(r)
        session.commit()
        inserted += len(batch)

    session.close()
    return inserted


def main() -> None:
    print("Importing SSA names (this may take a few minutes)...")
    try:
        data = download_zip(SSA_ZIP_URL)
    except Exception as e:
        print("Failed to download SSA data:", e)
        raise

    counts = parse_names_from_zip(data)
    print(f"Parsed {len(counts)} unique (name,gender) entries.")

    # Insert top 50000 most popular names by default to keep dataset reasonable
    inserted = ingest_to_db(counts, limit=50000)
    print(f"Inserted {inserted} names into database.")


if __name__ == "__main__":
    main()
