let isSingleClickHandled = false; // Flag to track if a single-click has been handled
let clickTimeout; // To handle the timeout for single-click

document.addEventListener(
  "click",
  function (event) {
    if (event.target.closest(".gb_z")) {
      return; // Ignore clicks inside the Google Account Switcher
    }

    let link = event.target.closest("a, [role='link'], [data-href]");

    if (!link) return;

    let href = link.href || link.getAttribute("data-href");
    if (!href) return;

    // Ignore links to AWS S3
    if (
      href.includes("s3.amazonaws.com") ||
      href.includes("console.aws.amazon.com/s3")
    ) {
      return;
    }

    // Allow Messenger links to navigate normally
    if (href.startsWith("https://www.messenger.com/e2ee/")) {
      return;
    }

    if(href.startsWith("https://www.messenger.com/t/")) {
      return;
    }

    if (
      event.target.isContentEditable ||
      ["INPUT", "TEXTAREA"].includes(event.target.tagName)
    ) {
      return;
    }

    if (
      event.target.closest(".gb_z") ||
      href.includes("s3.amazonaws.com") ||
      href.includes("console.aws.amazon.com/s3")
    ) {
      return;
    }

    if (
      event.target.isContentEditable ||
      ["INPUT", "TEXTAREA"].includes(event.target.tagName)
    ) {
      return;
    }

    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }

    clickTimeout = setTimeout(() => {
      if (!isSingleClickHandled) {
        window.location.href = href;
        isSingleClickHandled = true;
      }
    }, 300);

    event.preventDefault();
  },
  true
);

document.addEventListener("dblclick", function (event) {
  if (event.target.closest(".gb_z")) {
    return; // Ignore clicks inside the Google Account Switcher
  }

  let link = event.target.closest("a, [role='link'], [data-href]");

  if (link) {
    let href = link.href || link.getAttribute("data-href");

    if (href) {
      // Ignore links to AWS S3
      if (
        href.includes("s3.amazonaws.com") ||
        href.includes("console.aws.amazon.com/s3")
      ) {
        return;
      }

      if (clickTimeout) {
        clearTimeout(clickTimeout);
      }

      event.preventDefault();
      window.open(href, "_blank", "noopener,noreferrer");
    }
  }
});

setInterval(() => {
  isSingleClickHandled = false;
}, 300);
