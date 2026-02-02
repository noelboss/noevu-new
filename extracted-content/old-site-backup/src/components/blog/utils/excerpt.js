import noevu from "/global/noevu.js";
import { getElement } from "./dom-helpers";

const log = noevu.log;

/**
 * Injects the blog excerpt into the header
 */
export const injectBlogExcerpt = () => {
  try {
    log("Injecting blog excerpt...");

    // Get the excerpt from meta description
    const excerpt = document.head.querySelector(
      'meta[name="description"]'
    )?.content;
    if (!excerpt) {
      log("No excerpt found in meta description");
      return;
    }

    // Find the header container
    const header = getElement(".blog-item-top-wrapper");
    if (!header) {
      log("No blog header found");
      return;
    }

    // Create excerpt element
    const excerptElement = document.createElement("div");
    excerptElement.className = "blog-excerpt";
    excerptElement.innerHTML = `<h2 class="subtitle">${excerpt}</h2>`;

    // Insert after the title or at the end of the header
    const title = header.querySelector("h1");
    if (title) {
      title.insertAdjacentElement("afterend", excerptElement);
    } else {
      header.appendChild(excerptElement);
    }

    log("Blog excerpt injected successfully");
  } catch (error) {
    console.error("Error injecting blog excerpt:", error);
    log(`Blog excerpt error: ${error.message}`);
  }
};
