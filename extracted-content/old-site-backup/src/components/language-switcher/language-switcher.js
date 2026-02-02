import { log, init } from "/global/noevu.js";
import "./language-switcher.less";

const initLanguageSwitcher = () => {
  const container = document.getElementById("noevu-language-switcher");
  if (!container) return false;

  // If Weglot is not available, return false to trigger polling
  if (
    typeof window.Weglot !== "object" ||
    !Array.isArray(window.Weglot?.options?.languages)
  ) {
    return false;
  }

  // Clear any existing polling
  if (window.weglotPollingInterval) {
    clearInterval(window.weglotPollingInterval);
    delete window.weglotPollingInterval;
  }
  // Get available languages including the current one
  const currentLang = Weglot.getCurrentLang();

  const availableLanguages = [
    ...Weglot.options.languages.map((lang) => lang.language_to),
    Weglot.options.language_from,
  ];

  log(availableLanguages);

  // Clear container and create links
  container.innerHTML = "";
  const list = document.createElement("ul");
  list.className = "language-switcher-list";

  availableLanguages.forEach((lang) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    const langName = Weglot.getLanguageName(lang);

    link.href = "#";
    link.textContent = langName;
    link.dataset.lang = lang;
    link.className = "language-link";

    if (lang === currentLang) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }

    link.addEventListener("click", (e) => {
      e.preventDefault();
      // Always get the current language when clicked, not from the closure
      const currentLang = Weglot.getCurrentLang();
      if (lang !== currentLang) {
        Weglot.switchTo(lang);
      }
    });

    listItem.appendChild(link);
    list.appendChild(listItem);
  });

  container.appendChild(list);

  // Update active state when language changes
  Weglot.on("languageChanged", (newLang) => {
    const links = container.querySelectorAll(".language-link");
    links.forEach((link) => {
      const isActive = link.dataset.lang === newLang;
      link.classList.toggle("active", isActive);
      link.setAttribute("aria-current", isActive ? "page" : null);
    });
  });

  return true; // Indicate successful initialization
};

// Initialize with polling
const initWithPolling = () => {
  // Try to initialize immediately
  if (initLanguageSwitcher()) return;

  // If Weglot isn't available yet, set up polling
  window.weglotPollingInterval = setInterval(() => {
    if (initLanguageSwitcher()) {
      clearInterval(window.weglotPollingInterval);
      delete window.weglotPollingInterval;
    }
  }, 100); // Check every 100ms
};

// Start the initialization when DOM is ready
initWithPolling();
