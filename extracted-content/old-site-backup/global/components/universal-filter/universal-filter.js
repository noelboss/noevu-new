// Universal Filter component
import { log } from "/global/noevu.js";
import "./universal-filter.less";
// Loads external custom filter resources from assets.squarewebsites.org

// Inject external custom filter stylesheet once
if (!document.querySelector('link[href*="custom-filter.min.css"]')) {
  const cfLink = document.createElement("link");
  cfLink.rel = "stylesheet";
  cfLink.href =
    "https://assets.squarewebsites.org/custom-filter/custom-filter.min.css";
  document.head.appendChild(cfLink);
  log("Universal Filter CSS loaded");
}

// Inject external custom filter JavaScript once
if (!document.querySelector('script[src*="custom-filter.min.js"]')) {
  const cfScript = document.createElement("script");
  cfScript.defer = true;
  cfScript.src =
    "https://assets.squarewebsites.org/custom-filter/custom-filter.min.js";
  document.body.appendChild(cfScript);
  log("Universal Filter JS loaded");
}
