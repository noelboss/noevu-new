// global/loader.js
import "./devmode.less";

(() => {
  // Configuration
  const CONFIG = {
    STORAGE_KEY: "noevu-devmode",
    DEV_PATH: "https://localhost:5173",
  };

  // Determine project name from production script tag
  const scriptTag =
    document.currentScript || document.getElementById("noevu-app");
  const PROJECT_NAME = (() => {
    if (!scriptTag || !scriptTag.src) {
      console.warn(
        "Production script tag not found. Loader will not inject any assets."
      );
      return null;
    }
    // First try to get from data-project attribute
    if (scriptTag && scriptTag.hasAttribute("data-project")) {
      return scriptTag.getAttribute("data-project");
    }

    const segments = scriptTag.src.split("/");
    return segments[3] || null;
  })();
  if (!PROJECT_NAME) {
    console.warn(
      "Project name could not be determined. Loader will not inject any assets."
    );
    return;
  }

  // --- DevMode detection logic ---
  // DevMode logic: URL param > local storage > iframe editor > off
  const params = new URLSearchParams(window.location.search);
  let devMode = false;

  // Check URL parameters first (highest priority)
  if (params.has("devmode")) {
    devMode = params.get("devmode") === "true";
    // Only update local storage if explicitly set via URL
    if (devMode) {
      localStorage.setItem(CONFIG.STORAGE_KEY, "true");
    } else {
      localStorage.removeItem(CONFIG.STORAGE_KEY);
    }
  }
  // Then check local storage if no URL parameter
  else if (localStorage.getItem(CONFIG.STORAGE_KEY) === "true") {
    devMode = true;
  }
  // Finally check if in iframe (Squarespace editor)
  else if (window.self !== window.top) {
    let parentHref = "";
    let parentParams = "";
    try {
      parentHref = window.parent.location.href;
      parentParams = new URLSearchParams(window.parent.location.search);
    } catch { }
    if (parentParams.has("devmode")) {
      devMode = parentParams.get("devmode") === "true";
      if (devMode) {
        localStorage.setItem(CONFIG.STORAGE_KEY, "true");
      } else {
        localStorage.removeItem(CONFIG.STORAGE_KEY);
      }
    } else if (
      parentHref.includes(`.squarespace.com/config/pages/custom-css`) ||
      parentHref.includes(`.squarespace.com/config/pages/code-injection`)
    ) {
      devMode = true;
      localStorage.removeItem(CONFIG.STORAGE_KEY);
    } else {
      devMode = false;
    }
  } else {
    devMode = false;
    localStorage.removeItem(CONFIG.STORAGE_KEY);
  }
  window.DEVMODE = devMode;
  console.info(`Dev mode: ${devMode ? "enabled" : "disabled"}`);

  // Handle dev mode setup
  if (devMode) {
    // Inject Vite HMR client
    const injectScript = (src) => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement("script");
        script.type = "module";
        script.src = src;
        document.head.appendChild(script);
      }
    };

    injectScript(`${CONFIG.DEV_PATH}/@vite/client`);

    // Add dev mode visual indicator
    const applyDevIndicator = () => {
      const devBadge = document.createElement("div");
      devBadge.id = "noevu-dev-indicator";
      devBadge.innerHTML = "<a href='/?devmode=false'>DEV MODE</a>";
      document.body.appendChild(devBadge);
      document.body.classList.add("devmode");

      const style = document.createElement("style");
      style.textContent = `
        #noevu-dev-indicator {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: linear-gradient(135deg, #e67e22, #d35400);
          color: white;
          padding: 8px 12px;
          border-radius: 4px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          font-size: 12px;
          font-weight: bold;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          z-index: 9999;
          animation: noevu-pulse 2s infinite;
          cursor: pointer;
          user-select: none;
        }
        #noevu-dev-indicator:hover {
          background: linear-gradient(135deg, #d35400, #e67e22);
        }
        @keyframes noevu-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `;
      document.head.appendChild(style);

      devBadge.addEventListener("click", function () {
        this.style.display = this.style.display === "none" ? "block" : "none";
      });
    };
    // Replace production files with development files
    const replaceProductionFiles = () => {
      // Find and remove production JS
      const prodScript = document.getElementById("noevu-app");
      if (prodScript) {
        prodScript.remove();
      }

      // Find and remove production CSS
      const prodStyles = document.getElementById("noevu-styles");
      if (prodStyles) {
        prodStyles.remove();
      }

      // Inject development JS
      const devScript = document.createElement("script");
      devScript.type = "module";
      devScript.src = `${CONFIG.DEV_PATH}/projects/${PROJECT_NAME}/main.js`;
      document.head.appendChild(devScript);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", applyDevIndicator);
      document.addEventListener("DOMContentLoaded", replaceProductionFiles);
    } else {
      applyDevIndicator();
      replaceProductionFiles();
    }
    throw new Error(`👋 Dev mode enabeled, exit production script now`);
  } else {
    // Production mode - inject production files if not already present
    // This should usually not be the case
    // Only inject if not already present
    if (!document.getElementById("noevu-styles")) {
      const prodStyles = document.createElement("link");
      prodStyles.id = "noevu-styles";
      prodStyles.rel = "stylesheet";
      prodStyles.href = `https://assets.noevu.dev/${PROJECT_NAME}/styles.min.css`;
      document.head.appendChild(prodStyles);
    }

    if (!document.getElementById("noevu-app")) {
      const prodScript = document.createElement("script");
      prodScript.id = "noevu-app";
      prodScript.defer = true;
      prodScript.src = `https://assets.noevu.dev/${PROJECT_NAME}/app.min.js`;
      document.head.appendChild(prodScript);
    }
  }
})();
