import { log } from "/global/noevu.js";

(() => {
  log("Redirecting main domain");
  // Define the new hostname
  const primaryHostname = Static.SQUARESPACE_CONTEXT.website.authenticUrl;

  // Get the current path and query
  const path = window.location.pathname;
  const query = window.location.search;

  log(primaryHostname);

  // Check if the path is not /config and the current hostname is the old one
  if (
    location.pathname.indexOf("/config") !== 0 &&
    location.host.includes("squarespace.com") &&
    window.self === window.top
  ) {
    // Construct the new URL
    const newUrl = `${primaryHostname}${path}${query}`;

    // Redirect to the new URL
    window.location.replace(newUrl);
  }
})();
