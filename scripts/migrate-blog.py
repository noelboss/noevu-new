#!/usr/bin/env python3
"""
Extract blog content from downloaded reference site and create MDX files.

Architecture: Content migration script to transform HTML to structured MDX.
"""

import os
import re
import json
from pathlib import Path
from datetime import datetime

try:
    from bs4 import BeautifulSoup
except ImportError:
    print("Installing beautifulsoup4...")
    import subprocess
    subprocess.run(["pip3", "install", "beautifulsoup4"], check=True)
    from bs4 import BeautifulSoup


def slugify(text: str) -> str:
    """Convert text to URL-friendly slug."""
    text = text.lower()
    text = re.sub(r'[äÄ]', 'ae', text)
    text = re.sub(r'[öÖ]', 'oe', text)
    text = re.sub(r'[üÜ]', 'ue', text)
    text = re.sub(r'[ß]', 'ss', text)
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = text.strip('-')
    return text


def extract_post_data(html_path: Path) -> dict | None:
    """Extract blog post data from HTML file."""
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')
    except Exception as e:
        print(f"Error reading {html_path}: {e}")
        return None

    # Extract title
    title_elem = soup.select_one('h1, .blog-item-title, article h1')
    title = title_elem.get_text(strip=True) if title_elem else html_path.stem.replace('-', ' ').title()

    # Extract date
    date_elem = soup.select_one('time, .blog-meta-item--date, [datetime]')
    if date_elem:
        date_str = date_elem.get('datetime') or date_elem.get_text(strip=True)
        try:
            # Try various date formats
            for fmt in ['%Y-%m-%dT%H:%M:%S%z', '%Y-%m-%d', '%d.%m.%Y', '%d. %b %Y', '%d. %B %Y']:
                try:
                    dt = datetime.strptime(date_str.split('+')[0].split('T')[0] if 'T' in date_str else date_str, fmt.replace('T%H:%M:%S%z', ''))
                    break
                except:
                    continue
            else:
                dt = datetime.now()
        except:
            dt = datetime.now()
    else:
        dt = datetime.now()

    # Extract categories
    categories = []
    category_elems = soup.select('.blog-categories a, .blog-meta-item--categories a, [class*="category"] a')
    for cat in category_elems:
        cat_text = cat.get_text(strip=True)
        if cat_text and len(cat_text) < 50:
            categories.append(cat_text)

    # Extract excerpt/description
    meta_desc = soup.select_one('meta[name="description"]')
    excerpt = meta_desc['content'] if meta_desc and meta_desc.get('content') else ''

    if not excerpt:
        # Try first paragraph
        first_p = soup.select_one('article p, .blog-item-content p')
        if first_p:
            excerpt = first_p.get_text(strip=True)[:300]

    # Extract featured image
    og_image = soup.select_one('meta[property="og:image"]')
    featured_image = og_image['content'] if og_image and og_image.get('content') else None

    # Extract main content
    content_elem = soup.select_one('article .blog-item-content, .entry-content, article .content, main article')
    if content_elem:
        # Remove scripts, styles, nav elements
        for elem in content_elem.select('script, style, nav, header, footer, .share-buttons'):
            elem.decompose()
        content = content_elem.get_text(separator='\n\n', strip=True)
    else:
        content = ''

    # Generate slug from filename
    slug = html_path.stem

    return {
        'title': title,
        'slug': slug,
        'excerpt': excerpt[:300] if excerpt else f"Blog-Beitrag: {title}",
        'featuredImage': featured_image,
        'categories': list(set(categories))[:5],  # Dedupe and limit
        'publishedAt': dt.strftime('%Y-%m-%dT12:00:00.000Z'),
        'author': {
            'name': 'Noel Bossart',
            'bio': 'Gründer von Noevu und Experte für Webdesign und digitale Strategien.',
        },
        'content': content,
    }


def create_mdx_file(post_data: dict, output_dir: Path) -> None:
    """Create MDX file from extracted post data."""
    output_dir.mkdir(parents=True, exist_ok=True)

    filename = f"{post_data['slug']}.mdx"
    filepath = output_dir / filename

    # Create frontmatter
    frontmatter = {
        'title': post_data['title'],
        'slug': post_data['slug'],
        'excerpt': post_data['excerpt'],
        'categories': post_data['categories'],
        'author': post_data['author'],
        'publishedAt': post_data['publishedAt'],
    }

    if post_data['featuredImage']:
        frontmatter['featuredImage'] = post_data['featuredImage']

    # Build MDX content
    mdx_content = "---\n"
    for key, value in frontmatter.items():
        if isinstance(value, str):
            # Escape quotes in strings
            escaped = value.replace('"', '\\"')
            mdx_content += f'{key}: "{escaped}"\n'
        elif isinstance(value, list):
            mdx_content += f'{key}:\n'
            for item in value:
                mdx_content += f'  - "{item}"\n'
        elif isinstance(value, dict):
            mdx_content += f'{key}:\n'
            for k, v in value.items():
                if v:
                    escaped = str(v).replace('"', '\\"')
                    mdx_content += f'  {k}: "{escaped}"\n'
    mdx_content += "---\n\n"

    # Add content
    content = post_data.get('content', '')
    if content:
        # Split into paragraphs and format
        paragraphs = content.split('\n\n')
        for para in paragraphs:
            para = para.strip()
            if para:
                mdx_content += f"{para}\n\n"
    else:
        mdx_content += "Inhalt folgt...\n"

    # Write file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(mdx_content)

    print(f"Created: {filepath.name}")


def main():
    reference_dir = Path("reference/noevu.ch/blog")
    output_dir = Path("src/content/blog")

    if not reference_dir.exists():
        print(f"Reference directory not found: {reference_dir}")
        return

    # Get all HTML files (excluding category/tag pages)
    html_files = [
        f for f in reference_dir.glob("*.html")
        if not any(x in f.name for x in ['category=', 'tag=', 'offset=', '?'])
    ]

    print(f"Found {len(html_files)} blog posts to migrate\n")

    migrated = 0
    for html_file in sorted(html_files):
        print(f"Processing: {html_file.name}")
        post_data = extract_post_data(html_file)

        if post_data and post_data.get('title'):
            create_mdx_file(post_data, output_dir)
            migrated += 1
        else:
            print(f"  Skipped: Could not extract data")

    print(f"\nMigration complete: {migrated} posts created")


if __name__ == "__main__":
    main()
