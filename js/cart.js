/* ============================================================
   cart.js — render cart items, quantity controls, order summary
   ============================================================ */

function renderCartPage() {
  const cart = getCart();
  const listMount = document.getElementById("cartList");
  const layout = document.getElementById("cartLayout");
  const emptyState = document.getElementById("cartEmpty");

  if (cart.length === 0) {
    layout.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  layout.style.display = "grid";
  emptyState.style.display = "none";

  listMount.innerHTML = cart
    .map((item) => {
      const p = getProductById(item.id);
      if (!p) return "";
      return `
        <div class="cart-item" data-id="${p.id}" data-size="${item.size}">
          <a href="product.html?id=${p.id}" class="cart-item__media">
            ${getProductMedia(p, { size: 200 })}
          </a>
          <div>
            <a href="product.html?id=${p.id}" class="cart-item__name">${p.name}</a>
            <p class="cart-item__meta">Size ${item.size} · ${p.colorName}</p>
            <div class="cart-item__controls">
              <div class="qty-control">
                <button type="button" data-qty="minus" aria-label="Decrease quantity">−</button>
                <span>${item.qty}</span>
                <button type="button" data-qty="plus" aria-label="Increase quantity">+</button>
              </div>
            </div>
          </div>
          <div class="cart-item__end">
            <span class="cart-item__price">${formatPrice(p.price * item.qty)}</span>
            <button type="button" class="cart-item__remove" data-remove>Remove</button>
          </div>
        </div>`;
    })
    .join("");

  wireCartItemControls();
  renderSummary();
}

function wireCartItemControls() {
  document.querySelectorAll(".cart-item").forEach((el) => {
    const id = el.dataset.id;
    const size = el.dataset.size;
    const cartItem = getCart().find((i) => i.id === id && i.size === size);
    if (!cartItem) return;

    el.querySelector('[data-qty="minus"]').addEventListener("click", () => {
      updateCartQty(id, size, cartItem.qty - 1);
      renderCartPage();
    });
    el.querySelector('[data-qty="plus"]').addEventListener("click", () => {
      updateCartQty(id, size, cartItem.qty + 1);
      renderCartPage();
    });
    el.querySelector("[data-remove]").addEventListener("click", () => {
      removeFromCart(id, size);
      showToast("Removed from cart");
      renderCartPage();
    });
  });
}

function renderSummary() {
  const subtotal = getCartTotal();
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  document.getElementById("summarySubtotal").textContent = formatPrice(subtotal);
  document.getElementById("summaryShipping").textContent =
    shipping === 0 ? "Free" : formatPrice(shipping);
  document.getElementById("summaryTotal").textContent = formatPrice(total);

  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const note = document.getElementById("summaryNote");
  note.textContent =
    remaining > 0
      ? `Add ${formatPrice(remaining)} more for free shipping`
      : "You've unlocked free shipping";
}

document.addEventListener("DOMContentLoaded", renderCartPage);
