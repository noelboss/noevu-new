#!/usr/bin/env node
/**
 * Image Download Script
 *
 * Downloads external images referenced in blog posts
 * and updates the frontmatter to use local paths.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, basename } from 'path';
import https from 'https';
import http from 'http';

const BLOG_DIR = 'src/content/blog';
const IMAGE_DIR = 'public/images/blog';

// Ensure image directory exists
if (!existsSync(IMAGE_DIR)) {
  mkdirSync(IMAGE_DIR, { recursive: true });
}

// Download a file from URL
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = writeFileSync;

    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        return downloadFile(response.headers.location, dest)
          .then(resolve)
          .catch(reject);
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => {
        const buffer = Buffer.concat(chunks);
        writeFileSync(dest, buffer);
        resolve();
      });
      response.on('error', reject);
    }).on('error', reject);
  });
}

// Generate a clean filename from URL
function urlToFilename(url, slug) {
  // Extract extension from URL or default to jpg
  const urlPath = new URL(url).pathname;
  const ext = urlPath.match(/\.(jpg|jpeg|png|gif|webp)/i)?.[1] || 'jpg';

  // Use blog slug as filename for consistency
  return `${slug}.${ext.toLowerCase()}`;
}

async function processBlogs() {
  const files = readdirSync(BLOG_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

  console.log(`\nProcessing ${files.length} blog posts...\n`);

  let downloaded = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of files) {
    const filepath = join(BLOG_DIR, file);
    const content = readFileSync(filepath, 'utf-8');

    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) continue;

    const frontmatter = frontmatterMatch[1];

    // Find featuredImage URL
    const imageMatch = frontmatter.match(/featuredImage:\s*["']?(https?:\/\/[^"'\n]+)["']?/);
    if (!imageMatch) {
      skipped++;
      continue;
    }

    const imageUrl = imageMatch[1];

    // Skip if already local
    if (!imageUrl.startsWith('http')) {
      skipped++;
      continue;
    }

    // Get slug from file
    const slug = file.replace(/\.(md|mdx)$/, '');
    const filename = urlToFilename(imageUrl, slug);
    const localPath = join(IMAGE_DIR, filename);

    // Skip if already downloaded
    if (existsSync(localPath)) {
      console.log(`  ⏭  ${file} (already exists)`);
      skipped++;
      continue;
    }

    try {
      console.log(`  ⬇  Downloading: ${file}`);
      await downloadFile(imageUrl, localPath);

      // Update frontmatter with local path
      const newFrontmatter = frontmatter.replace(
        imageMatch[0],
        `featuredImage: "/images/blog/${filename}"`
      );

      const newContent = content.replace(frontmatterMatch[1], newFrontmatter);
      writeFileSync(filepath, newContent);

      console.log(`  ✓  ${file} → ${filename}`);
      downloaded++;
    } catch (error) {
      console.error(`  ✗  ${file}: ${error.message}`);
      errors++;
    }
  }

  console.log('\n' + '─'.repeat(50));
  console.log(`Downloaded: ${downloaded}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Errors: ${errors}`);
  console.log('');
}

processBlogs().catch(console.error);
