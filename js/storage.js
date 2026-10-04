/* ============================================================
   storage.js
   Thin wrapper around localStorage for cart, wishlist and reviews.
   Every page includes this file before its own page script.
   ============================================================ */

const FREE_SHIPPING_THRESHOLD = 75;
const SHIPPING_FLAT_RATE = 6.5;
const TAX_RATE = 0.0;

const STORAGE_KEYS = {
  cart: "solstice_cart",
  wishlist: "solstice_wishlist",
  reviews: "solstice_reviews",
};

function readStore(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Storage read failed for", key, e);
    return [];
  }
}

function writeStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage write failed for", key, e);
  }
}

/* ---------------- Cart ----------------
   cart item shape: { id, size, qty } */

function getCart() {
  return readStore(STORAGE_KEYS.cart);
}

function saveCart(cart) {
  writeStore(STORAGE_KEYS.cart, cart);
  updateHeaderCounts();
}

function addToCart(id, size, qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id && item.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, size, qty });
  }
  saveCart(cart);
}

function updateCartQty(id, size, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id && i.size === size);
  if (!item) return;
  item.qty = Math.max(1, qty);
  saveCart(cart);
}

function removeFromCart(id, size) {
  const cart = getCart().filter((i) => !(i.id === id && i.size === size));
  saveCart(cart);
}

function getCartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function getCartTotal() {
  return getCart().reduce((sum, i) => {
    const p = getProductById(i.id);
    return p ? sum + p.price * i.qty : sum;
  }, 0);
}

function clearCart() {
  writeStore(STORAGE_KEYS.cart, []);
  updateHeaderCounts();
}

/* ---------------- Wishlist ----------------
   wishlist item shape: array of product ids */

function getWishlist() {
  return readStore(STORAGE_KEYS.wishlist);
}

function isInWishlist(id) {
  return getWishlist().includes(id);
}

function toggleWishlist(id) {
  let list = getWishlist();
  if (list.includes(id)) {
    list = list.filter((x) => x !== id);
  } else {
    list.push(id);
  }
  writeStore(STORAGE_KEYS.wishlist, list);
  updateHeaderCounts();
  return list.includes(id);
}

function removeFromWishlist(id) {
  const list = getWishlist().filter((x) => x !== id);
  writeStore(STORAGE_KEYS.wishlist, list);
  updateHeaderCounts();
}

/* ---------------- Reviews ----------------
   stored review shape: { productId, name, rating, text, date } */

function getStoredReviews(productId) {
  return readStore(STORAGE_KEYS.reviews).filter(
    (r) => r.productId === productId
  );
}

function addReview(productId, name, rating, text) {
  const all = readStore(STORAGE_KEYS.reviews);
  all.push({
    productId,
    name,
    rating,
    text,
    date: new Date().toISOString().slice(0, 10),
  });
  writeStore(STORAGE_KEYS.reviews, all);
}

/* combine the product's seed ratings (numbers only) with any
   full written reviews a visitor has added in this browser */
function getAllRatingsFor(product) {
  const seed = (product.seedRatings || []).map((r) => ({
    productId: product.id,
    name: "Verified Buyer",
    rating: r,
    text: null,
    date: null,
    seeded: true,
  }));
  return [...seed, ...getStoredReviews(product.id)];
}

function getAverageRating(product) {
  const all = getAllRatingsFor(product);
  if (all.length === 0) return { avg: 0, count: 0 };
  const sum = all.reduce((s, r) => s + r.rating, 0);
  return { avg: sum / all.length, count: all.length };
}

/* ---------------- Header badge sync ---------------- */

function updateHeaderCounts() {
  const cartBadge = document.querySelector("[data-cart-count]");
  const wishBadge = document.querySelector("[data-wishlist-count]");
  if (cartBadge) cartBadge.textContent = getCartCount();
  if (wishBadge) wishBadge.textContent = getWishlist().length;
}

/* ---------------- Toast ---------------- */

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.remove("toast--visible");
  void toast.offsetWidth; /* restart animation */
  toast.classList.add("toast--visible");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove("toast--visible");
  }, 2200);
}
