/**
 * Extract blog content from downloaded reference site and create MDX files.
 *
 * Architecture: Content migration script to transform HTML to structured MDX.
 */

import { load } from 'cheerio';
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join, basename } from 'path';

const REFERENCE_DIR = 'reference/noevu.ch/blog';
const OUTPUT_DIR = 'src/content/blog';

function extractPostData(htmlPath) {
  let html;
  try {
    html = readFileSync(htmlPath, 'utf-8');
  } catch (error) {
    console.error(`Error reading ${htmlPath}:`, error.message);
    return null;
  }

  const $ = load(html);
  const filename = basename(htmlPath, '.html');

  // Extract title
  const titleElem = $('h1').first();
  const title = titleElem.text().trim() || filename.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  // Extract date from meta or schema
  let publishedAt = new Date().toISOString();
  const dateModified = $('meta[property="article:modified_time"]').attr('content');
  const datePublished = $('meta[property="article:published_time"]').attr('content');
  const timeElem = $('time').attr('datetime');

  // Helper to safely parse dates
  function tryParseDate(dateStr) {
    if (!dateStr) return null;
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return null;
      return d.toISOString();
    } catch {
      return null;
    }
  }

  publishedAt = tryParseDate(datePublished)
    || tryParseDate(dateModified)
    || tryParseDate(timeElem)
    || new Date().toISOString();

  // Extract categories
  const categories = [];
  $('a[href*="category"]').each((_, el) => {
    const cat = $(el).text().trim();
    if (cat && cat.length < 50 && !categories.includes(cat)) {
      categories.push(cat);
    }
  });

  // Extract excerpt/description
  let excerpt = $('meta[name="description"]').attr('content') || '';
  if (!excerpt) {
    const firstP = $('article p, .blog-item-content p').first().text();
    excerpt = firstP.slice(0, 300).trim();
  }

  // Extract featured image
  const featuredImage = $('meta[property="og:image"]').attr('content') || null;

  // Extract main content
  const contentElem = $('article, .blog-item-content, .entry-content').first();

  // Remove unwanted elements
  contentElem.find('script, style, nav, header, footer, .share-buttons, .blog-meta').remove();

  // Convert content to markdown-ish text
  let content = '';
  contentElem.find('p, h2, h3, h4, ul, ol, blockquote').each((_, el) => {
    const $el = $(el);
    const tag = el.tagName.toLowerCase();

    if (tag === 'h2') {
      content += `\n## ${$el.text().trim()}\n\n`;
    } else if (tag === 'h3') {
      content += `\n### ${$el.text().trim()}\n\n`;
    } else if (tag === 'h4') {
      content += `\n#### ${$el.text().trim()}\n\n`;
    } else if (tag === 'ul' || tag === 'ol') {
      $el.find('li').each((_, li) => {
        content += `- ${$(li).text().trim()}\n`;
      });
      content += '\n';
    } else if (tag === 'blockquote') {
      content += `> ${$el.text().trim()}\n\n`;
    } else {
      const text = $el.text().trim();
      if (text && text.length > 10) {
        content += `${text}\n\n`;
      }
    }
  });

  return {
    title,
    slug: filename,
    excerpt: excerpt || `Blog-Beitrag: ${title}`,
    featuredImage,
    categories: categories.slice(0, 5),
    publishedAt,
    author: {
      name: 'Noel Bossart',
      bio: 'Gründer von Noevu und Experte für Webdesign und digitale Strategien.',
    },
    content: content.trim() || 'Inhalt folgt...',
  };
}

function escapeYaml(str) {
  if (!str) return '';
  // Escape special characters for YAML strings
  return str.replace(/"/g, '\\"').replace(/\n/g, ' ');
}

function createMdxFile(postData, outputDir) {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const filename = `${postData.slug}.mdx`;
  const filepath = join(outputDir, filename);

  // Build frontmatter
  let mdx = '---\n';
  mdx += `title: "${escapeYaml(postData.title)}"\n`;
  mdx += `slug: "${postData.slug}"\n`;
  mdx += `excerpt: "${escapeYaml(postData.excerpt)}"\n`;

  if (postData.featuredImage) {
    mdx += `featuredImage: "${postData.featuredImage}"\n`;
  }

  if (postData.categories.length > 0) {
    mdx += 'categories:\n';
    postData.categories.forEach(cat => {
      mdx += `  - "${escapeYaml(cat)}"\n`;
    });
  }

  mdx += 'author:\n';
  mdx += `  name: "${postData.author.name}"\n`;
  if (postData.author.bio) {
    mdx += `  bio: "${escapeYaml(postData.author.bio)}"\n`;
  }

  mdx += `publishedAt: "${postData.publishedAt}"\n`;
  mdx += '---\n\n';

  // Add content
  mdx += postData.content;

  writeFileSync(filepath, mdx, 'utf-8');
  console.log(`Created: ${filename}`);
}

function main() {
  if (!existsSync(REFERENCE_DIR)) {
    console.error(`Reference directory not found: ${REFERENCE_DIR}`);
    process.exit(1);
  }

  // Get all HTML files
  const htmlFiles = readdirSync(REFERENCE_DIR)
    .filter(f => f.endsWith('.html'))
    .filter(f => !f.includes('category=') && !f.includes('tag=') && !f.includes('offset=') && !f.includes('?'));

  console.log(`Found ${htmlFiles.length} blog posts to migrate\n`);

  let migrated = 0;
  for (const file of htmlFiles.sort()) {
    const htmlPath = join(REFERENCE_DIR, file);
    console.log(`Processing: ${file}`);

    const postData = extractPostData(htmlPath);
    if (postData && postData.title) {
      createMdxFile(postData, OUTPUT_DIR);
      migrated++;
    } else {
      console.log('  Skipped: Could not extract data');
    }
  }

  console.log(`\nMigration complete: ${migrated} posts created`);
}

main();
