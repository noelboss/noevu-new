#!/usr/bin/env node
/**
 * Swap Hero Headlines Script
 *
 * The live noevu.ch site displays:
 * - subheadline (h2) as the LARGE decorative text
 * - headline (h1) as the smaller text above
 *
 * The local site has these inverted. This script swaps them to match the live site.
 *
 * Usage:
 *   node scripts/swap-hero-headlines.mjs [--dry-run]
 *
 * Options:
 *   --dry-run    Show what would be changed without modifying files
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, basename } from 'path';

const CONTENT_DIR = './src/content/pages';
const DRY_RUN = process.argv.includes('--dry-run');

// Files that need headline/subheadline swapped based on live site comparison
const FILES_TO_SWAP = [
  'ueber-uns.json',
  'kontakt.json',
  'projekte.json',
  'squarespace-agentur.json',
  // Add more files here if needed
];

function findJsonFiles(dir, files = []) {
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      findJsonFiles(fullPath, files);
    } else if (item.endsWith('.json')) {
      files.push(fullPath);
    }
  }
  return files;
}

function swapHeroHeadlines(filePath) {
  const fileName = basename(filePath);

  // Only process files in our swap list
  if (!FILES_TO_SWAP.includes(fileName)) {
    return { skipped: true, reason: 'not in swap list' };
  }

  const content = readFileSync(filePath, 'utf-8');
  let data;

  try {
    data = JSON.parse(content);
  } catch (e) {
    return { skipped: true, reason: 'invalid JSON' };
  }

  if (!data.sections || !Array.isArray(data.sections)) {
    return { skipped: true, reason: 'no sections array' };
  }

  let modified = false;

  for (const section of data.sections) {
    if (section.type === 'hero' && section.headline && section.subheadline) {
      // Swap headline and subheadline
      const oldHeadline = section.headline;
      const oldSubheadline = section.subheadline;

      section.headline = oldSubheadline;
      section.subheadline = oldHeadline;

      modified = true;

      console.log(`\n📄 ${fileName}`);
      console.log(`   Before:`);
      console.log(`     headline: "${oldHeadline.substring(0, 50)}${oldHeadline.length > 50 ? '...' : ''}"`);
      console.log(`     subheadline: "${oldSubheadline.substring(0, 50)}${oldSubheadline.length > 50 ? '...' : ''}"`);
      console.log(`   After:`);
      console.log(`     headline: "${section.headline.substring(0, 50)}${section.headline.length > 50 ? '...' : ''}"`);
      console.log(`     subheadline: "${section.subheadline.substring(0, 50)}${section.subheadline.length > 50 ? '...' : ''}"`);
    }
  }

  if (modified && !DRY_RUN) {
    writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
    console.log(`   ✅ Saved`);
  } else if (modified && DRY_RUN) {
    console.log(`   🔍 Dry run - no changes written`);
  }

  return { modified };
}

function main() {
  console.log('🔄 Hero Headline Swap Script');
  console.log('============================');

  if (DRY_RUN) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
  }

  console.log(`Looking for JSON files in ${CONTENT_DIR}...`);
  console.log(`Files to swap: ${FILES_TO_SWAP.join(', ')}\n`);

  const jsonFiles = findJsonFiles(CONTENT_DIR);
  let swappedCount = 0;
  let skippedCount = 0;

  for (const filePath of jsonFiles) {
    const result = swapHeroHeadlines(filePath);
    if (result.modified) {
      swappedCount++;
    } else if (result.skipped) {
      skippedCount++;
    }
  }

  console.log('\n============================');
  console.log(`✅ Swapped: ${swappedCount} files`);
  console.log(`⏭️  Skipped: ${skippedCount} files`);

  if (DRY_RUN && swappedCount > 0) {
    console.log('\n💡 Run without --dry-run to apply changes');
  }

  if (!DRY_RUN && swappedCount > 0) {
    console.log('\n💡 Run `npm run build` to rebuild with the changes');
  }
}

main();
