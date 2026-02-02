import noevu from "/global/noevu.js";

import "./post/blog-post.less";
import "./post/blog-pagination.less";
import "./post/blog-imagestyles.less";

import "./entries-styles/sqs-vs-wp.less";

// Import components
import { getElement } from "./utils/dom-helpers";
import { initShareButtons } from "./post/share-buttons";
import { initTableOfContents } from "./post/table-of-contents";
import { initAuthorInfo } from "./post/author-info";
import { initCategories } from "./post/categories";
import { injectBlogExcerpt } from "./utils/excerpt";
import { initReadingTimeForSinglePost } from "./post/reading-time";

const log = noevu.log;

/**
 * Initialize blog post specific features
 */
const initBlogPost = () => {
  try {
    log("Initializing blog post features...");

    const topContainer = getElement(".blog-item-top-wrapper");
    if (!topContainer) {
      log(
        "No blog post top container found, skipping blog post initialization"
      );
      return;
    }

    // Initialize components in order
    log("Initializing blog post components...");

    // 1. Categories first (moves them to the top)
    initCategories();

    // 2. Inject excerpt after the title
    injectBlogExcerpt();

    // 3. Author info (needs to be positioned after categories)
    initAuthorInfo();

    // 4. Table of contents (needs headings to be in place)
    initTableOfContents();

    // 5. Share buttons (can be initialized any time after DOM is ready)
    initShareButtons(getElement(".toc-container"));

    // 6. Reading time (can be initialized last)
    initReadingTimeForSinglePost();

    log("Blog post initialization complete");
  } catch (error) {
    console.error("Error initializing blog post:", error);
    log(`Blog post initialization error: ${error.message}`);
  }
};

// Initialize when DOM is ready
log("Registering blog post initialization...");
noevu.init(initBlogPost);
