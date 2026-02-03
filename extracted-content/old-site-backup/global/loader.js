// global/loader.js
// deprecated

(function() {
    // Configuration
    const CONFIG = {
        COOKIE_NAME: "noevu-devmode",
    };

    // Determine project name via <script data-project="..."></script>
    const scriptTag = document.currentScript;
    const PROJECT_NAME = scriptTag?.dataset.project || null;

    // Early exit if no project specified
    if (!PROJECT_NAME) {
        console.warn("No project specified. Loader will not inject any assets.");
        return; 
    }

    // Get development server URL from current script
    const devOrigin = scriptTag.src
        .split("/")
        .slice(0, 3)
        .join("/")
        .replace("vercel.app", "localhost:5173");

    // --- DevMode detection logic ---
    const cookie = {
        get(name) {
            const match = document.cookie.match(
                new RegExp(`(^|;\\s*)(${name})=([^;]*)`)
            );
            return match ? match[3] : null;
        },
        set(name, value, remove = false) {
            document.cookie = remove ?
                `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=strict` :
                `${name}=${value}; path=/; samesite=strict`;
        },
    };

    // Simplified devMode logic: URL param > cookie > iframe editor > off
    const params = new URLSearchParams(window.location.search);
    let devMode;
    const hasCookie = cookie.get(CONFIG.COOKIE_NAME) === "true";
    if (params.has("devmode")) {
        devMode = params.get("devmode") === "true";
        cookie.set(CONFIG.COOKIE_NAME, devMode ? "true" : "", !devMode);
    } else if (hasCookie) {
        devMode = true;
    } else if (window.self !== window.top) {
        let parentHref = "";
        try {
            parentHref = window.parent.location.href;
        } catch {}
        if (parentHref.includes(`.squarespace.com/config/pages/website-tools`)) {
            devMode = true;
            cookie.set(CONFIG.COOKIE_NAME, "", true);
        } else {
            devMode = false;
        }
    } else {
        devMode = false;
        cookie.set(CONFIG.COOKIE_NAME, "", true);
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

        injectScript(`${devOrigin}/@vite/client`);

        // Add dev mode visual indicator
        const applyDevIndicator = () => {
            const devBadge = document.createElement("div");
            devBadge.id = "noevu-dev-indicator";
            devBadge.innerHTML = "<span>DEV MODE 1.1</span>";
            document.body.appendChild(devBadge);

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

            devBadge.addEventListener("click", function() {
                this.style.display = this.style.display === "none" ? "block" : "none";
            });
        };

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", applyDevIndicator);
        } else {
            applyDevIndicator();
        }

        // Replace production files with development files
        const replaceProductionFiles = () => {
            try {
                // Find and remove production JS
                const prodScript = document.getElementById(`noevu-${PROJECT_NAME}`);
                if (prodScript) {
                    prodScript.remove();
                }

                // Find and remove production CSS
                const prodStyles = document.getElementById(
                    `noevu-${PROJECT_NAME}-styles`
                );
                if (prodStyles) {
                    prodStyles.remove();
                }

                // Inject development JS
                const devScript = document.createElement("script");
                devScript.type = "module";
                devScript.src = `${devOrigin}/projects/${PROJECT_NAME}/main.js`;
                document.head.appendChild(devScript);
            } catch (error) {
                console.error("Error replacing production files:", error);
            }
        };

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", replaceProductionFiles);
        } else {
            replaceProductionFiles();
        }
    }
})();