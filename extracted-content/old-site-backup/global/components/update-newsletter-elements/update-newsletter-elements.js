/* adjust newsletter form values */
import noevu from "/global/noevu.js";
const log = noevu.log;

const updateNewsletterElements = {
  newLabel: "Ja, ich möchte über Neuigkeiten und Updates informiert werden.",
  observer: null,

  setNewLabel(label = "") {
    this.newLabel = label;
  },

  initializeForm(container) {
    // Check checkboxes
    const checkboxes = container.querySelectorAll(
      "input[type='checkbox'][name^='email-']"
    );
    checkboxes.forEach((checkbox) => {
      if (!checkbox.checked) {
        checkbox.click();
      } else {
        ["change", "input"].forEach((eventType) =>
          checkbox.dispatchEvent(new Event(eventType, { bubbles: true }))
        );
      }
    });

    // Update labels if needed
    if (this.newLabel) {
      container.querySelectorAll(".email .option span").forEach((span) => {
        if (span.textContent !== this.newLabel) {
          span.textContent = this.newLabel;
        }
      });
    }
  },

  observeNewsletterElements(newLabel = null, root = document) {
    if (newLabel !== null) {
      this.newLabel = newLabel;
    }

    // Clean up previous observer
    if (this.observer) {
      this.observer.disconnect();
    }

    // Process existing forms
    document.querySelectorAll(".react-form-contents").forEach((form) => {
      this.initializeForm(form);
    });

    // Set up observer for new forms
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach((node) => {
            // Check if the added node is a form or contains forms
            if (node.matches?.(".react-form-contents")) {
              this.initializeForm(node);
            }
            node.querySelectorAll?.(".react-form-contents").forEach((form) => {
              this.initializeForm(form);
            });
          });
        }
      });
    });

    // Start observing the entire document
    this.observer.observe(root, {
      childList: true,
      subtree: true,
    });
  },
};

// Bind methods
Object.entries(updateNewsletterElements).forEach(([key, value]) => {
  if (typeof value === "function") {
    updateNewsletterElements[key] = value.bind(updateNewsletterElements);
  }
});

export default updateNewsletterElements;
export const { observeNewsletterElements, setNewLabel } =
  updateNewsletterElements;
