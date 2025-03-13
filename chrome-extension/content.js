let isSingleClickHandled = false; // Flag to track if a single-click has been handled
let clickTimeout; // To handle the timeout for single-click

document.addEventListener(
  "click",
  function (event) {
    if (event.target.closest(".gb_z")) {
      return; // Ignore clicks inside the Google Account Switcher
    }

    let link = event.target.closest("a, [role='link'], [data-href]");

    if (link) {
      let href = link.href || link.getAttribute("data-href");

      if (!href) return;

      // Allow Messenger links to navigate normally
      if (href.startsWith("https://www.messenger.com/e2ee/")) {
        return; // Let Messenger handle its own navigation
      }

      if (
        event.target.isContentEditable ||
        ["INPUT", "TEXTAREA"].includes(event.target.tagName)
      ) {
        return;
      }

      if (
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        event.detail === 1
      ) {
        event.preventDefault();

        if (clickTimeout) {
          clearTimeout(clickTimeout);
        }

        clickTimeout = setTimeout(() => {
          if (!isSingleClickHandled) {
            window.location.href = href;
            isSingleClickHandled = true;
          }
        }, 300);
      }

      event.preventDefault();
    }
  },
  true
);

document.addEventListener("dblclick", function (event) {
  if (event.target.closest(".gb_z")) {
    return;
  }

  let link = event.target.closest("a, [role='link'], [data-href]");

  if (link) {
    let href = link.href || link.getAttribute("data-href");

    if (href) {
      if (clickTimeout) {
        clearTimeout(clickTimeout);
      }

      event.preventDefault();
      window.open(href, "_blank", "noopener,noreferrer");
      isSingleClickHandled = true;
    }
  }
});

setInterval(() => {
  isSingleClickHandled = false;
}, 500);
