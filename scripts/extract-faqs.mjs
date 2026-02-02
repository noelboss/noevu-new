import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.join(__dirname, '../extracted-content/pages');
const BLOGS_DIR = path.join(__dirname, '../extracted-content/blogs');
const OUTPUT_FILE = path.join(__dirname, '../extracted-content/extracted-faqs.json');

// Function to extract FAQ sections from markdown content
function extractFAQs(content, filename) {
  const faqs = [];

  // Look for FAQ section heading
  const faqHeadingMatch = content.match(/##\s*(Häufig gestellte Fragen|FAQ|Frequently Asked Questions|häufigsten Fragen|Die häufigsten Fragen|Antworten auf.*Fragen)/i);

  if (!faqHeadingMatch) {
    return null;
  }

  // Get content after FAQ heading
  const faqStartIndex = faqHeadingMatch.index;
  const faqContent = content.slice(faqStartIndex);

  // Pattern 1: List-based FAQs with *  #### Question format
  // More flexible pattern to catch nested content
  const listQAPattern = /\*\s+####\s+(.+?)\s*\n([\s\S]+?)(?=\n\*\s+####|\n\n###[^#]|\n\n##[^#]|\n###[^#]|$)/g;
  let match;

  while ((match = listQAPattern.exec(faqContent)) !== null) {
    const question = match[1].trim();
    let answer = match[2].trim();

    // Clean up answer text
    answer = cleanAnswer(answer);

    if (question && answer) {
      faqs.push({ question, answer });
    }
  }

  // Pattern 2: Simple #### Question format (for blog posts)
  if (faqs.length === 0) {
    const simpleQAPattern = /####\s+(.+?)\s*\n\n\s+([\s\S]+?)(?=\n####|\n\n###|\n\n##|$)/g;

    while ((match = simpleQAPattern.exec(faqContent)) !== null) {
      const question = match[1].trim();
      let answer = match[2].trim();

      answer = cleanAnswer(answer);

      if (question && answer) {
        faqs.push({ question, answer });
      }
    }
  }

  return faqs.length > 0 ? faqs : null;
}

// Helper function to clean up answer text
function cleanAnswer(answer) {
  return answer
    .replace(/^\*\s+/gm, '') // Remove list markers at start of lines
    .replace(/\n{3,}/g, '\n\n') // Normalize line breaks
    .replace(/\[(.+?)\]\(file:\/\/\/[^)]+\)/g, '$1') // Remove file:// links but keep text
    .replace(/\[(.+?)\]\([^)]+\)/g, '$1') // Remove other links but keep text
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold markers
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
}

// Function to process all markdown files in a directory
function processDirectory(dir, type) {
  const results = [];

  try {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      if (path.extname(file) === '.md') {
        const filePath = path.join(dir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const faqs = extractFAQs(content, file);

        if (faqs) {
          results.push({
            file: file,
            type: type,
            count: faqs.length,
            faqs: faqs
          });
          console.log(`✓ Found ${faqs.length} FAQs in ${file}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error.message);
  }

  return results;
}

// Main execution
console.log('Starting FAQ extraction...\n');

const pageResults = processDirectory(PAGES_DIR, 'page');
const blogResults = processDirectory(BLOGS_DIR, 'blog');

const allResults = [...pageResults, ...blogResults];

console.log(`\nTotal files with FAQs: ${allResults.length}`);
console.log(`- Pages: ${pageResults.length}`);
console.log(`- Blogs: ${blogResults.length}`);

const totalFAQs = allResults.reduce((sum, item) => sum + item.count, 0);
console.log(`Total FAQs extracted: ${totalFAQs}`);

// Write results to JSON file
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allResults, null, 2), 'utf-8');
console.log(`\n✓ Results written to ${OUTPUT_FILE}`);

// Generate summary by file
console.log('\n=== Summary ===');
allResults
  .sort((a, b) => b.count - a.count)
  .forEach(item => {
    console.log(`${item.file}: ${item.count} FAQs`);
  });
