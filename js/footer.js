/* ============================================================
   footer.js
   Fetches components/footer.html into #footer-placeholder and
   wires up the (non-functional, front-end only) newsletter form.
   ============================================================ */

async function loadFooter() {
  const mount = document.getElementById("footer-placeholder");
  if (!mount) return;

  try {
    const res = await fetch("components/footer.html");
    mount.innerHTML = await res.text();
  } catch (e) {
    mount.innerHTML =
      "<p style='padding:1rem;text-align:center;'>Footer failed to load — serve this site from a local server.</p>";
    console.error(e);
    return;
  }

  const form = document.getElementById("newsletterForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("You're on the list — thanks for signing up.");
      form.reset();
    });
  }
}

document.addEventListener("DOMContentLoaded", loadFooter);
