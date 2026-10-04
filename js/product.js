/* ============================================================
   product.js — single product page: detail, cart controls,
   reviews list + review submission form
   ============================================================ */

let currentProduct = null;
let selectedSize = null;
let selectedQty = 1;
let selectedRating = 0;

function getProductIdFromURL() {
  return new URLSearchParams(window.location.search).get("id");
}

function initProductPage() {
  const id = getProductIdFromURL();
  currentProduct = getProductById(id);

  if (!currentProduct) {
    document.getElementById("productMain").innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <h2>Product not found</h2>
        <p>That item may have been removed.</p>
        <a href="catalog.html" class="btn btn-primary" style="margin-top:1.25rem;">Back to shop</a>
      </div>`;
    document.getElementById("reviewsSection").style.display = "none";
    document.getElementById("relatedSection").style.display = "none";
    return;
  }

  selectedSize = currentProduct.sizes[0];
  renderProductStatic(); // runs once: builds size grid, wires all persistent controls
  renderProductRating(); // safe to re-run any time a review is added
  renderReviews();
  renderRelated();
  wireReviewForm();
}

/* Builds the size grid and wires every control that lives in the
   static HTML (add to cart, qty, wishlist). Runs exactly once so
   click listeners are never attached twice. */
function renderProductStatic() {
  const p = currentProduct;
  document.title = `${p.name} — Solstice`;
  document.getElementById("breadcrumbCategory").textContent = p.category;
  document.getElementById("breadcrumbCategory").href = `catalog.html?category=${p.category}`;
  document.getElementById("breadcrumbName").textContent = p.name;

  document.getElementById("productMedia").innerHTML = getProductMedia(p, { size: 600 });

  document.getElementById("productEyebrow").textContent = `${p.category} / ${p.subcategory}`;
  document.getElementById("productName").textContent = p.name;
  document.getElementById("productPrice").textContent = formatPrice(p.price);
  document.getElementById("productDesc").textContent = p.description;
  document.getElementById("productFabric").textContent = p.fabric;
  document.getElementById("productColor").textContent = p.colorName;

  const sizeGrid = document.getElementById("sizeGrid");
  sizeGrid.innerHTML = p.sizes
    .map(
      (s) => `<button type="button" class="size-btn ${s === selectedSize ? "is-selected" : ""}" data-size="${s}">${s}</button>`
    )
    .join("");
  sizeGrid.querySelectorAll(".size-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedSize = btn.dataset.size;
      sizeGrid.querySelectorAll(".size-btn").forEach((b) => b.classList.remove("is-selected"));
      btn.classList.add("is-selected");
    });
  });

  document.getElementById("qtyDisplay").textContent = selectedQty;
  document.getElementById("qtyMinus").addEventListener("click", () => {
    selectedQty = Math.max(1, selectedQty - 1);
    document.getElementById("qtyDisplay").textContent = selectedQty;
  });
  document.getElementById("qtyPlus").addEventListener("click", () => {
    selectedQty = Math.min(10, selectedQty + 1);
    document.getElementById("qtyDisplay").textContent = selectedQty;
  });

  document.getElementById("addToCartBtn").addEventListener("click", () => {
    addToCart(p.id, selectedSize, selectedQty);
    showToast(`Added ${selectedQty} × ${p.name} (${selectedSize}) to cart`);
  });

  const wishBtn = document.getElementById("wishBtn");
  const setWishState = () => {
    const active = isInWishlist(p.id);
    wishBtn.classList.toggle("is-active", active);
    wishBtn.setAttribute("aria-pressed", String(active));
    wishBtn.querySelector("svg").setAttribute("fill", active ? "currentColor" : "none");
  };
  setWishState();
  wishBtn.addEventListener("click", () => {
    const nowIn = toggleWishlist(p.id);
    setWishState();
    showToast(nowIn ? "Added to wishlist" : "Removed from wishlist");
  });
}

/* Updates just the star/count summary near the title. Safe to call
   again after a new review is submitted. */
function renderProductRating() {
  const { avg, count } = getAverageRating(currentProduct);
  document.getElementById("productRating").innerHTML =
    count > 0
      ? `${starsMarkup(avg)} <span>${avg.toFixed(1)} (${count} review${count === 1 ? "" : "s"})</span>`
      : `<span>No reviews yet</span>`;
}

/* ---------------- reviews ---------------- */

function renderReviews() {
  const p = currentProduct;
  const { avg, count } = getAverageRating(p);

  document.getElementById("reviewsAvg").textContent = count ? avg.toFixed(1) : "—";
  document.getElementById("reviewsStars").innerHTML = starsMarkup(avg);
  document.getElementById("reviewsCount").textContent = `Based on ${count} rating${count === 1 ? "" : "s"}`;

  const written = getStoredReviews(p.id).slice().reverse();
  const list = document.getElementById("reviewList");

  if (written.length === 0) {
    list.innerHTML = `<p style="color:var(--color-ink-soft)">No written reviews yet — be the first to share what you think.</p>`;
    return;
  }

  list.innerHTML = written
    .map(
      (r) => `
      <div class="review">
        <div class="review__head">
          <span class="review__name">${escapeHTML(r.name)}</span>
          <span class="review__date">${r.date}</span>
        </div>
        ${starsMarkup(r.rating)}
        <p class="review__text">${escapeHTML(r.text)}</p>
      </div>`
    )
    .join("");
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function wireReviewForm() {
  const starInput = document.getElementById("starInput");
  starInput.innerHTML = [1, 2, 3, 4, 5]
    .map(
      (i) => `<button type="button" data-star="${i}" aria-label="${i} star">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
          <path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.6l-6.1 3.4 1.5-6.8L2.2 9.5l6.9-.7L12 2.5z"/>
        </svg>
      </button>`
    )
    .join("");

  const starButtons = [...starInput.querySelectorAll("button")];
  starButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedRating = Number(btn.dataset.star);
      starButtons.forEach((b) => b.classList.toggle("is-active", Number(b.dataset.star) <= selectedRating));
      document.getElementById("ratingField").classList.remove("has-error");
    });
  });

  document.getElementById("reviewForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("reviewName");
    const textInput = document.getElementById("reviewText");
    let valid = true;

    toggleFieldError("nameField", nameInput.value.trim().length === 0);
    if (nameInput.value.trim().length === 0) valid = false;

    toggleFieldError("textField", textInput.value.trim().length < 5);
    if (textInput.value.trim().length < 5) valid = false;

    toggleFieldError("ratingField", selectedRating === 0);
    if (selectedRating === 0) valid = false;

    if (!valid) return;

    addReview(currentProduct.id, nameInput.value.trim(), selectedRating, textInput.value.trim());
    renderReviews();
    renderProductRating();

    e.target.reset();
    selectedRating = 0;
    starButtons.forEach((b) => b.classList.remove("is-active"));
    showToast("Thanks — your review has been posted");
  });
}

function toggleFieldError(fieldId, hasError) {
  document.getElementById(fieldId).classList.toggle("has-error", hasError);
}

/* ---------------- related products ---------------- */

function renderRelated() {
  const related = getRelatedProducts(currentProduct, 4);
  const mount = document.getElementById("relatedGrid");
  if (related.length === 0) {
    document.getElementById("relatedSection").style.display = "none";
    return;
  }
  mount.innerHTML = related.map(renderProductCard).join("");
  mount.querySelectorAll("[data-wish-toggle]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.dataset.wishToggle;
      const nowIn = toggleWishlist(id);
      btn.classList.toggle("is-active", nowIn);
      btn.querySelector("svg").setAttribute("fill", nowIn ? "currentColor" : "none");
      showToast(nowIn ? "Added to wishlist" : "Removed from wishlist");
    });
  });
}

document.addEventListener("DOMContentLoaded", initProductPage);
