/* ============================================================
   home.js — homepage-only logic: featured product rail
   ============================================================ */

function renderFeatured() {
  const mount = document.getElementById("featuredGrid");
  if (!mount) return;
  const featured = PRODUCTS.slice(0, 8);
  mount.innerHTML = featured.map(renderProductCard).join("");
  wireCardWishButtons(mount);
}

function wireCardWishButtons(scope) {
  scope.querySelectorAll("[data-wish-toggle]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.dataset.wishToggle;
      const nowIn = toggleWishlist(id);
      btn.classList.toggle("is-active", nowIn);
      btn.setAttribute("aria-pressed", String(nowIn));
      btn.querySelector("svg").setAttribute("fill", nowIn ? "currentColor" : "none");
      showToast(nowIn ? "Added to wishlist" : "Removed from wishlist");
    });
  });
}

document.addEventListener("DOMContentLoaded", renderFeatured);
