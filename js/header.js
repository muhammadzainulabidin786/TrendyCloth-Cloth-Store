/* ============================================================
   header.js
   Fetches components/header.html and injects it into the
   #header-placeholder element present on every page, then wires
   up mobile menu toggle, active-link highlighting and badges.

   Note: fetch() requires the site to be served over http(s),
   e.g. VS Code "Live Server" or `python -m http.server`.
   Opening the file directly (file://) will block this fetch.
   ============================================================ */

async function loadHeader() {
  const mount = document.getElementById("header-placeholder");
  if (!mount) return;

  try {
    const res = await fetch("components/header.html");
    mount.innerHTML = await res.text();
  } catch (e) {
    mount.innerHTML =
      "<p style='padding:1rem;text-align:center;'>Header failed to load — serve this site from a local server.</p>";
    console.error(e);
    return;
  }

  updateHeaderCounts();
  highlightActiveNav();
  wireMobileMenu();
}

function highlightActiveNav() {
  const page = document.body.dataset.page;
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.remove("is-active");
  });

  if (page === "catalog" && category) {
    const key = category.toLowerCase();
    const match = document.querySelector(`[data-nav="${key}"]`);
    if (match) match.classList.add("is-active");
  } else if (page === "catalog") {
    document.querySelector('[data-nav="catalog"]')?.classList.add("is-active");
  }
}

function wireMobileMenu() {
  const btn = document.getElementById("menuToggle");
  const nav = document.getElementById("siteNav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(isOpen));
    btn.classList.toggle("is-open", isOpen);
  });
}

document.addEventListener("DOMContentLoaded", loadHeader);
