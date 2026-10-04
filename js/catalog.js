/* ============================================================
   catalog.js — filter, sort and render the full product grid
   ============================================================ */

const catalogState = {
  categories: new Set(),
  subcategories: new Set(),
  sort: "featured",
};

function initCatalogFromURL() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  if (category) catalogState.categories.add(category);
}

function getUniqueSubcategories() {
  return [...new Set(PRODUCTS.map((p) => p.subcategory))].sort();
}

function renderFilters() {
  const categoryMount = document.getElementById("categoryFilters");
  const subMount = document.getElementById("subcategoryFilters");

  const categories = ["Women", "Men", "Accessories"];
  categoryMount.innerHTML = categories
    .map(
      (c) => `
      <label>
        <input type="checkbox" value="${c}" data-filter="category"
          ${catalogState.categories.has(c) ? "checked" : ""} />
        ${c}
      </label>`
    )
    .join("");

  subMount.innerHTML = getUniqueSubcategories()
    .map(
      (s) => `
      <label>
        <input type="checkbox" value="${s}" data-filter="subcategory"
          ${catalogState.subcategories.has(s) ? "checked" : ""} />
        ${s}
      </label>`
    )
    .join("");

  document.querySelectorAll('[data-filter="category"]').forEach((box) => {
    box.addEventListener("change", () => {
      box.checked
        ? catalogState.categories.add(box.value)
        : catalogState.categories.delete(box.value);
      renderCatalog();
    });
  });

  document.querySelectorAll('[data-filter="subcategory"]').forEach((box) => {
    box.addEventListener("change", () => {
      box.checked
        ? catalogState.subcategories.add(box.value)
        : catalogState.subcategories.delete(box.value);
      renderCatalog();
    });
  });
}

function getFilteredSortedProducts() {
  let list = PRODUCTS.filter((p) => {
    const catOk =
      catalogState.categories.size === 0 || catalogState.categories.has(p.category);
    const subOk =
      catalogState.subcategories.size === 0 ||
      catalogState.subcategories.has(p.subcategory);
    return catOk && subOk;
  });

  switch (catalogState.sort) {
    case "price-asc":
      list = list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list = list.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      list = list.sort(
        (a, b) => getAverageRating(b).avg - getAverageRating(a).avg
      );
      break;
    default:
      break; /* featured = catalog order */
  }
  return list;
}

function renderCatalog() {
  const grid = document.getElementById("catalogGrid");
  const countEl = document.getElementById("catalogCount");
  const list = getFilteredSortedProducts();

  countEl.textContent = `${list.length} item${list.length === 1 ? "" : "s"}`;

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <h2>Nothing matches those filters</h2>
        <p>Try clearing a filter to see more items.</p>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(renderProductCard).join("");
  wireCardWishButtons(grid);
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

function wireSortAndClear() {
  document.getElementById("sortSelect").addEventListener("change", (e) => {
    catalogState.sort = e.target.value;
    renderCatalog();
  });

  document.getElementById("clearFilters").addEventListener("click", () => {
    catalogState.categories.clear();
    catalogState.subcategories.clear();
    document.getElementById("sortSelect").value = "featured";
    catalogState.sort = "featured";
    renderFilters();
    renderCatalog();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCatalogFromURL();
  renderFilters();
  renderCatalog();
  wireSortAndClear();
});
