// Utility to replace innerHTML of selected elements
/**
 * Replace innerHTML of elements matching selector with provided HTML/text.
 * @param {string} selector - CSS selector string.
 * @param {string} content - HTML or text to set as element content.
 */
export function replaceContent(selector, content) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    el.innerHTML = content;
  });
}
