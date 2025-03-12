let isSingleClickHandled = false; // Flag to track if a single-click has been handled
let clickTimeout; // To handle the timeout for single-click

document.addEventListener(
  "click",
  function (event) {
    let link = event.target.closest("a, [role='link'], [data-href]");

    if (link) {
      let href = link.href || link.getAttribute("data-href");

      if (!href) return;

      // Ignore clicks inside editable elements like text inputs
      if (
        event.target.isContentEditable ||
        ["INPUT", "TEXTAREA"].includes(event.target.tagName)
      ) {
        return;
      }

      // If it's a single-click and no modifier keys are pressed, handle normally
      if (
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        event.detail === 1
      ) {
        // Prevent the default action for single-click
        event.preventDefault();

        // If timeout is already set, clear it
        if (clickTimeout) {
          clearTimeout(clickTimeout);
        }

        // Set a timeout to handle the single-click after a short delay
        clickTimeout = setTimeout(() => {
          if (!isSingleClickHandled) {
            // Navigate in place for single-click
            window.location.href = href; // This will navigate in the same tab

            isSingleClickHandled = true; // Mark as handled to prevent double-click opening
          }
        }, 300); // Timeout duration for single-click
      }

      // Prevent normal behavior entirely for single-click
      event.preventDefault();
    }
  },
  true
); // Use the capture phase

document.addEventListener("dblclick", function (event) {
  let link = event.target.closest("a, [role='link'], [data-href]");

  if (link) {
    let href = link.href || link.getAttribute("data-href");

    if (href) {
      // Clear the single-click timeout and open the link immediately in a new tab
      if (clickTimeout) {
        clearTimeout(clickTimeout); // Cancel single-click timeout
      }

      event.preventDefault(); // Prevent the default navigation

      // Open the link in a new tab via window.open
      window.open(href, "_blank", "noopener,noreferrer");

      // Mark single-click as handled to prevent further actions
      isSingleClickHandled = true;
    }
  }
});

// Reset the click handling flag after a short interval
setInterval(() => {
  isSingleClickHandled = false;
}, 500); // Reset flag every 500ms to allow new clicks to be handled properly
