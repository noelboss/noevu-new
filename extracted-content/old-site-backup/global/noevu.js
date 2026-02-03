import "./base.less";

const noevu = {
  debug: window.DEVMODE ? true : false,
  log: (...args) => {
    if (noevu.debug) console.log("noevu →", ...args);
  },

  isSquarespace: () => {
      return window.location.hostname.includes("squarespace.com");
  },

  isEditing: () => {
    let win = window;
    try {
      // Climb up until we reach the topmost window
      while (win.parent && win.parent !== win) {
        win = win.parent;
      }

      // Check if the topmost window is in editing mode
      return (
        win.document.documentElement.classList.contains("editing-page") ||
        // or if the current frame body has class .sqs-edit-mode-active or .sqs-is-page-editing
        win.document.body.classList.contains("sqs-edit-mode-active") ||
        win.document.body.classList.contains("sqs-is-page-editing")
      );
    } catch (err) {
      log("Unable to access parent frame:", err);
      return false;
    }
  },

  init: (callback, disableOnEditing = false, disableOnSquarespace = false) => {
    if (disableOnSquarespace && noevu.isSquarespace()) {
      noevu.log("🏃‍♂️‍➡️ Skipping init due to Squarespace");
      return;
    }
    if (
      typeof callback === "function" &&
      (!disableOnEditing || !noevu.isEditing())
    ) {
      let fnName = callback.name || "iffe";
      // ——— DOM ready or not ———
      if (document.readyState === "loading") {
        noevu.log("🏗️ DOM still loading, waiting for DOMContentLoaded", fnName);
        document.addEventListener("DOMContentLoaded", callback);
      } else {
        noevu.log("🏃‍♂️‍➡️ DOM already ready, running immediately ", fnName);
        callback();
      }

      //window.addEventListener("mercury:load", () => noevu.log("mercury:load"));
      //window.addEventListener("mercury:load", callback);
    } else {
      noevu.log(
        "❌ Skipping init due to editing frame or wrong function type",
        callback?.name || typeof callback
      );
    }
  },
  setDebug: (value) => {
    noevu.debug = value;
  },
};

// Export the new function
export const { log, init, debug, setDebug, isEditing, setFormal, formal } =
  noevu;
export default noevu;
