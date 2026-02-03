/* reposition footer element */
import noevu from "/global/noevu.js";

// Import component styles
import "./reposition-footer.less";

// Function to reposition the footer copyright element
noevu.init(() => {
  const footerCopyright = document.getElementById("footercopyright");

  if (!footerCopyright) {
    noevu.log("Footer copyright element not found: #footercopyright");
    return false;
  }

  // Get target ID from the data-target attribute
  const targetId = footerCopyright.getAttribute("data-target");
  if (!targetId) {
    noevu.log("No data-target attribute found on #footercopyright");
    return false;
  }

  const targetBlock = document.getElementById(targetId);
  if (targetBlock) {
    // Only move if it's not already in the target
    if (footerCopyright.parentElement !== targetBlock) {
      targetBlock.appendChild(footerCopyright);
      noevu.log(`Footer copyright moved to #${targetId}`);
      return true;
    }
    return false; // Already in the right place
  } else {
    noevu.log(`Target block not found: #${targetId}`);
    return false;
  }
});
