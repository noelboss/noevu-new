import noevu from "/global/noevu.js";

import "./list/list.less";

// Import components
import { initGalleryMeta } from "./list/gallery";
import { initBlogItemClickHandler } from "./list/click-handle";
import { initBlogListCategories } from "./list/categories";
import { initReadingTimeForList } from "./list/reading-time";

const log = noevu.log;

// Initialize blog functionality
const initBlog = () => {
  // Initialize blog item click handling
  initBlogItemClickHandler();

  // Initialize gallery meta handling
  initGalleryMeta();

  // Initialize reading time for list view
  initReadingTimeForList();

  // Initialize blog list categories
  initBlogListCategories();
};

// Initialize when DOM is ready
noevu.init(initBlog);
