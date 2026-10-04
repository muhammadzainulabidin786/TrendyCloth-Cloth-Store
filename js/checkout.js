/* ============================================================
   checkout.js — order review + shipping/payment form validation
   and mock order placement (front-end only, no real payment)
   ============================================================ */

function renderOrderReview() {
  const cart = getCart();
  const mount = document.getElementById("orderItems");

  if (cart.length === 0) {
    window.location.href = "cart.html";
    return;
  }

  mount.innerHTML = cart
    .map((item) => {
      const p = getProductById(item.id);
      if (!p) return "";
      return `
        <div class="order-review__item">
          ${getProductMedia(p, { size: 56 })}
          <div>
            <strong>${p.name}</strong>
            <span>Size ${item.size} · Qty ${item.qty}</span>
          </div>
          <span>${formatPrice(p.price * item.qty)}</span>
        </div>`;
    })
    .join("");

  const subtotal = getCartTotal();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const total = subtotal + shipping;

  document.getElementById("checkoutSubtotal").textContent = formatPrice(subtotal);
  document.getElementById("checkoutShipping").textContent =
    shipping === 0 ? "Free" : formatPrice(shipping);
  document.getElementById("checkoutTotal").textContent = formatPrice(total);
}

const REQUIRED_FIELDS = [
  "fullName",
  "email",
  "address",
  "city",
  "zip",
  "cardNumber",
  "cardExpiry",
  "cardCvc",
];

function validateCheckoutForm() {
  let valid = true;

  REQUIRED_FIELDS.forEach((id) => {
    const input = document.getElementById(id);
    const fieldWrap = input.closest(".field");
    const empty = input.value.trim().length === 0;
    fieldWrap.classList.toggle("has-error", empty);
    if (empty) valid = false;
  });

  const email = document.getElementById("email");
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  if (!emailValid) {
    email.closest(".field").classList.add("has-error");
    valid = false;
  }

  const cardNumber = document.getElementById("cardNumber");
  const digitsOnly = cardNumber.value.replace(/\s/g, "");
  if (digitsOnly.length > 0 && !/^\d{12,19}$/.test(digitsOnly)) {
    cardNumber.closest(".field").classList.add("has-error");
    valid = false;
  }

  return valid;
}

function placeOrder(e) {
  e.preventDefault();
  if (!validateCheckoutForm()) {
    showToast("Please fix the highlighted fields");
    return;
  }

  const orderNumber = "SOL-" + Math.floor(100000 + Math.random() * 900000);
  document.getElementById("orderNumber").textContent = orderNumber;

  clearCart();
  document.getElementById("checkoutForm").style.display = "none";
  document.getElementById("checkoutLayout").style.display = "none";
  document.getElementById("checkoutHeading").style.display = "none";
  document.getElementById("confirmation").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  renderOrderReview();
  document.getElementById("checkoutForm").addEventListener("submit", placeOrder);
});
