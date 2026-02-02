/**
 * Safely gets a DOM element by selector
 */
export const getElement = (selector, parent = document) => {
  try {
    return parent.querySelector(selector);
  } catch (error) {
    console.error(`Error getting element with selector "${selector}":`, error);
    return null;
  }
};

/**
 * Safely gets multiple DOM elements by selector
 */
export const getElements = (selector, parent = document) => {
  try {
    return Array.from(parent.querySelectorAll(selector));
  } catch (error) {
    console.error(`Error getting elements with selector "${selector}":`, error);
    return [];
  }
};

/**
 * Creates a DOM element with attributes and children
 */
export const createElement = (tag, attributes = {}, children = []) => {
  const element = document.createElement(tag);
  
  // Set attributes
  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      element.setAttribute(key, value);
    }
  });
  
  // Append children
  if (Array.isArray(children)) {
    children.forEach(child => {
      if (child instanceof Node) {
        element.appendChild(child);
      } else if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      }
    });
  }
  
  return element;
};

/**
 * Debounces a function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
