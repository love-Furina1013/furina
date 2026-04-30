#!/usr/bin/env python3
"""Backfill missing GI wiki link files with the lightweight scraper path.

The upstream link scraper enriches entries by applying every page filter, which
can hang on some categories. For local cache generation we mainly need stable
entry ids, names, and URLs; category tags are useful but not required.
"""

import asyncio
import json
import sys
from pathlib import Path

project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from playwright.async_api import async_playwright
from gi_wiki_scraper.link_parsers.generate_links import fetch_items_for_category_basic


LINK_DIR = project_root / "gi_wiki_scraper" / "output" / "link"


def expected_filename(category):
    return LINK_DIR / f"{category['id']}_{category['name']}.json"


async def main():
    categories_path = LINK_DIR / "categories.json"
    if not categories_path.exists():
        raise SystemExit(f"Missing categories file: {categories_path}")

    categories = json.loads(categories_path.read_text(encoding="utf-8"))
    missing = [category for category in categories if not expected_filename(category).exists()]
    if not missing:
        print("No missing GI link categories.")
        return

    print(f"Backfilling {len(missing)} missing GI link categories...")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        try:
            for category in missing:
                print(f"\n--- Backfill {category['id']} {category['name']} ---")
                await page.goto(category["url"], wait_until="networkidle", timeout=60000)
                await fetch_items_for_category_basic(page, category)
                await page.wait_for_timeout(1000)
        finally:
            await browser.close()


if __name__ == "__main__":
    asyncio.run(main())
