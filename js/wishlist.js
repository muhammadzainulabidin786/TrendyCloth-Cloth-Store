/* ============================================================
   wishlist.js — render saved products with a quick "move to cart"
   ============================================================ */

function renderWishlistCard(product) {
  const { avg, count } = getAverageRating(product);
  return `
    <article class="product-card" data-id="${product.id}">
      <a href="product.html?id=${product.id}" class="product-card__media">
        ${getProductMedia(product)}
        <button class="product-card__wish is-active" data-wish-remove="${product.id}" aria-label="Remove from wishlist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.6">
            <path d="M12 20.4c-.3 0-.6-.1-.8-.3C7 16.7 3.5 13.6 3.5 9.8 3.5 7.1 5.6 5 8.3 5c1.5 0 2.9.7 3.7 1.9C12.8 5.7 14.2 5 15.7 5c2.7 0 4.8 2.1 4.8 4.8 0 3.8-3.5 6.9-7.7 10.3-.2.2-.5.3-.8.3z"/>
          </svg>
        </button>
      </a>
      <div class="product-card__tag">
        <div class="product-card__info">
          <p class="eyebrow">${product.subcategory}</p>
          <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
          ${
            count > 0
              ? `<div class="rating-line">${starsMarkup(avg)}<span>(${count})</span></div>`
              : `<div class="rating-line"><span>No reviews yet</span></div>`
          }
        </div>
        <div class="product-card__hole-row">
          <span class="swatch-hole"></span>
          <span class="tag-price">${formatPrice(product.price)}</span>
        </div>
      </div>
      <button class="product-card__quickadd" data-quickadd="${product.id}">
        Move to cart (size ${product.sizes[0]})
      </button>
    </article>`;
}

function renderWishlistPage() {
  const ids = getWishlist();
  const grid = document.getElementById("wishlistGrid");
  const emptyState = document.getElementById("wishlistEmpty");

  if (ids.length === 0) {
    grid.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  grid.style.display = "grid";
  emptyState.style.display = "none";

  const products = ids.map(getProductById).filter(Boolean);
  grid.innerHTML = products.map(renderWishlistCard).join("");

  grid.querySelectorAll("[data-wish-remove]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      removeFromWishlist(btn.dataset.wishRemove);
      showToast("Removed from wishlist");
      renderWishlistPage();
    });
  });

  grid.querySelectorAll("[data-quickadd]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = getProductById(btn.dataset.quickadd);
      addToCart(p.id, p.sizes[0], 1);
      showToast(`Added ${p.name} to cart`);
    });
  });
}

document.addEventListener("DOMContentLoaded", renderWishlistPage);
