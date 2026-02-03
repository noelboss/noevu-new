// Global Lazy Summaries component
// Loads external lazy-summaries resources from assets.squarewebsites.org
import { init, log, setDebug } from "/global/noevu.js";

init(() => {
  // Load the main lazy-summaries script
  if (!document.querySelector('script[src*="lazy-summaries.min.js"]')) {
    const lsScript = document.createElement("script");
    lsScript.defer = true;
    lsScript.src =
      "https://assets.squarewebsites.org/lazy-summaries/lazy-summaries.min.js";
    document.body.appendChild(lsScript);
    log("Lazy Summaries script loaded");
  }

  // Load the admin script for iframe context
  (function () {
    // If the current window is the top window or the script is already loaded, do nothing.
    if (
      window.self === window.top ||
      window.top.document.getElementById("lazy-summaries-admin")
    ) {
      return;
    }

    // Otherwise start the script loading process.
    (function (e, t, s, i, a) {
      if (s.querySelector("#" + t)) {
        i && i(this);
      } else {
        var n = document.createElement("script");
        n.src = e + "?cache=" + (new Date().getTime() + "").slice(0, 8);
        n.id = t;
        n.defer = true;

        n.onload = function () {
          a && this.remove();
          i && i(this);
        };
        s.appendChild(n);
      }
    })(
      "https://assets.squarewebsites.org/lazy-summaries/lazy-summaries-admin.js",
      "lazy-summaries-admin",
      window.top.document.getElementsByTagName("head")[0]
    );
  })();
});
