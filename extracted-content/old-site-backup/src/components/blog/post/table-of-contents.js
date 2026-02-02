/**
 * Creates a table of contents from h2 elements
 */
export const createTableOfContents = (headings) => {
  const tocList = document.createElement("ul");

  headings.forEach((heading, index) => {
    // Remove link if exists
    const headingLink = heading.querySelector('a[href^="/sm-"]');
    if (headingLink) {
      const textNode = document.createTextNode(headingLink.textContent);
      heading.replaceChild(textNode, headingLink);
    }

    // Ensure heading has an ID
    let sectionId = heading.id;
    if (!sectionId) {
      sectionId = `section-${index}`;
      heading.id = sectionId;
    }

    // Create list item with anchor
    const listItem = document.createElement("li");
    const anchorElement = document.createElement("a");
    anchorElement.href = `#${sectionId}`;
    anchorElement.textContent = heading.textContent;
    listItem.dataset.name = sectionId;
    listItem.appendChild(anchorElement);
    tocList.appendChild(listItem);
  });

  return tocList;
};

/**
 * Handles scroll events to highlight current section in TOC
 */
const setupScrollHandling = (tocList, headings) => {
  const handleScroll = () => {
    const scrollPos = window.scrollY + 100;
    let activeFound = false;

    // Check if we're at the top of the page
    if (scrollPos < 150) {
      tocList
        .querySelectorAll("li")
        .forEach((item) => item.classList.remove("active"));
      const firstItem = tocList.querySelector("li:first-child");
      if (firstItem) firstItem.classList.add("active");
      return;
    }

    // Check each heading
    headings.forEach((heading, index) => {
      const sectionId = heading.id;
      if (!sectionId) return;

      const element = document.getElementById(sectionId);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementBottom = elementTop + rect.height;

      const tocListItem = tocList.querySelector(`[data-name="${sectionId}"]`);
      if (!tocListItem) return;

      // If this is the first element and we're near the top, activate it
      if (index === 0 && scrollPos < elementBottom) {
        tocList
          .querySelectorAll("li")
          .forEach((item) => item.classList.remove("active"));
        tocListItem.classList.add("active");
        activeFound = true;
      }
      // For other elements, check if scroll position is within the element's bounds
      else if (
        scrollPos >= elementTop - 100 &&
        scrollPos < elementBottom - 100
      ) {
        tocList
          .querySelectorAll("li")
          .forEach((item) => item.classList.remove("active"));
        tocListItem.classList.add("active");
        activeFound = true;
      }
    });

    // If no active item found and we're at the bottom, activate the last one
    if (
      !activeFound &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
    ) {
      tocList
        .querySelectorAll("li")
        .forEach((item) => item.classList.remove("active"));
      const lastItem = tocList.querySelector("li:last-child");
      if (lastItem) lastItem.classList.add("active");
    }
  };

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);
  // Initial check
  setTimeout(handleScroll, 100);
  // Also check on load in case images are still loading
  window.addEventListener("load", handleScroll);

  return handleScroll;
};

/**
 * Initializes the table of contents
 */
export const initTableOfContents = () => {
  const tocElement = document.querySelector(".toc");
  if (!tocElement) return;

  const anchors = document.createElement("div");
  anchors.className = "anchors";

  // Create TOC container
  const tocContainer = document.createElement("div");
  tocContainer.className = "toc-container";

  // Get all h2 elements
  const headings = Array.from(
    document.querySelectorAll(".blog-item-content h2")
  );
  if (headings.length === 0) return;

  // Create TOC list
  const tocList = createTableOfContents(headings);

  // Assemble the TOC
  tocContainer.appendChild(tocList);
  anchors.appendChild(tocContainer);

  // Add to DOM
  tocElement.appendChild(anchors);

  // Add column class to parent
  const closestColumnParent = tocElement.closest(".col");
  if (closestColumnParent) {
    closestColumnParent.classList.add("col-toc");
  }

  // Setup scroll handling
  const handleScroll = setupScrollHandling(tocList, headings);

  // Handle click on TOC items
  tocList.addEventListener("click", (event) => {
    const anchor = event.target.closest("a");
    if (!anchor) return;

    event.preventDefault();
    const targetId = anchor.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      // Update URL without page jump
      history.pushState(null, null, `#${targetId}`);
    }
  });

  // Cleanup function
  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("load", handleScroll);
  };
};
