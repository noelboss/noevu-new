import noevu from "/global/noevu.js";
import "./categories.less";

const log = noevu.log;

// Configuration for category prefixes and their display names
export const CATEGORY_CONFIG = [
  {
    key: "service",
    prefix: "Service: ",
    title: "Services",
    items: [],
  },
  {
    key: "branche",
    prefix: "Branche: ",
    title: "Branchen",
    items: [],
  },
  {
    key: "other",
    prefix: null, // null prefix catches all remaining items
    title: "Kategorien",
    items: [],
  },
];

/**
 * Process and organize categories
 * @param {NodeList} categoryLinks - List of category link elements
 * @returns {Array} Processed category groups with items
 */
export const processCategories = (categoryLinks) => {
  if (!categoryLinks || !categoryLinks.length) {
    log("No category links provided");
    return [];
  }

  // Create a deep copy of the config to avoid modifying the original
  const categoryConfig = JSON.parse(JSON.stringify(CATEGORY_CONFIG));
  const processedUrls = new Set();

  // Process each category link
  Array.from(categoryLinks).forEach((link) => {
    try {
      if (!link || !link.textContent) {
        log("Skipping invalid category link");
        return;
      }

      // Skip duplicate URLs to handle cases where the same category appears multiple times
      const url = link.href;
      if (processedUrls.has(url)) {
        return;
      }
      processedUrls.add(url);

      const text = link.textContent.trim();
      if (!text) {
        log("Skipping empty category");
        return;
      }

      const linkClone = link.cloneNode(true);
      let categoryProcessed = false;

      // Try to match with configured categories
      for (const category of categoryConfig) {
        if (category.prefix && text.startsWith(category.prefix)) {
          const displayText = text
            .replace(new RegExp(`^${category.prefix}`), "")
            .trim();
          if (displayText) {
            linkClone.textContent = displayText;
            category.items.push(linkClone);
            categoryProcessed = true;
            //log(`Added to ${category.key} category: ${displayText}`);
            break;
          }
        }
      }

      // If no category matched, add to 'other' category
      if (!categoryProcessed) {
        const otherCategory = categoryConfig.find((c) => c.key === "other");
        if (otherCategory) {
          otherCategory.items.push(linkClone);
          //log(`Added to other category: ${text}`);
        }
      }
    } catch (error) {
      console.error("Error processing category:", error);
      log(`Error processing category: ${error.message}`);
    }
  });

  return categoryConfig.filter((category) => category.items.length > 0);
};

/**
 * Create category group HTML
 * @param {Object} category - Category configuration object
 * @returns {HTMLElement} Created category group element
 */
export const createCategoryGroup = (category) => {
  try {
    if (
      !category ||
      !category.key ||
      !category.title ||
      !Array.isArray(category.items)
    ) {
      throw new Error("Invalid category object");
    }

    const group = document.createElement("div");
    group.className = `category-group category-group--${category.key}`;
    group.setAttribute("data-category-type", category.key);

    const title = document.createElement("span");
    title.className = "category-group__title";
    title.textContent = `${category.title}: `;
    group.appendChild(title);

    const list = document.createElement("ul");
    list.className = "category-list";

    // Filter out any invalid items
    const validItems = category.items.filter(
      (item) =>
        item && item.nodeType === Node.ELEMENT_NODE && item.tagName === "A"
    );

    if (validItems.length === 0) {
      log(`No valid items in category: ${category.key}`);
      return null;
    }

    validItems.forEach((item, index) => {
      try {
        const listItem = document.createElement("li");
        listItem.className = "category-list__item";

        // Add a separator if not the first item
        if (index > 0) {
          const separator = document.createElement("span");
          separator.className = "category-separator";
          separator.textContent = ", ";
          listItem.appendChild(separator);
        }

        listItem.appendChild(item);
        list.appendChild(listItem);
      } catch (error) {
        console.error("Error creating category list item:", error);
      }
    });

    group.appendChild(list);
    return group;
  } catch (error) {
    console.error("Error creating category group:", error);
    log(`Error creating category group: ${error.message}`);
    return null;
  }
};

/**
 * Create a container for category groups
 * @param {Array} categories - Array of category objects
 * @returns {HTMLElement} Created container element with category groups
 */
export const createCategoriesContainer = (categories) => {
  try {
    if (!Array.isArray(categories) || categories.length === 0) {
      log("No categories provided for container");
      return document.createDocumentFragment();
    }

    const container = document.createElement("div");
    container.className = "blog-categories-container";

    let hasValidGroups = false;

    categories.forEach((category, index) => {
      try {
        const group = createCategoryGroup(category);
        if (group) {
          // Add spacing between groups if not the first group
          if (index > 0 && hasValidGroups) {
            const spacer = document.createElement("span");
            spacer.className = "category-group-spacer";
            spacer.textContent = " ";
            container.appendChild(spacer);
          }

          container.appendChild(group);
          hasValidGroups = true;
        }
      } catch (error) {
        console.error(
          `Error processing category group at index ${index}:`,
          error
        );
      }
    });

    if (!hasValidGroups) {
      log("No valid category groups were created");
      return document.createDocumentFragment();
    }

    return container;
  } catch (error) {
    console.error("Error creating categories container:", error);
    log(`Error creating categories container: ${error.message}`);
    return document.createDocumentFragment();
  }
};
