/* ============================================================
   products.js
   Product database with online product images.
   ============================================================ */

const PRODUCTS = [
  {
    id: "wren-wrap-dress",
    name: "Wren Wrap Dress",
    category: "Women",
    subcategory: "Dresses",
    price: 6800,
    colorName: "Clay",
    colorHex: "#A8542E",
    icon: "dress",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
    sizes: ["XS", "S", "M", "L"],
    description:
      "A soft wrap dress cut from brushed cotton twill. Self-tie waist, dropped shoulder, falls to the knee. Wear it belted for work or loose for everything after.",
    fabric: "100% brushed cotton twill",
    seedRatings: [5, 4, 5, 4],
  },

  {
    id: "linen-boxy-shirt",
    name: "Linen Boxy Shirt",
    category: "Women",
    subcategory: "Tops",
    price: 4299,
    colorName: "Moss",
    colorHex: "#4A5741",
    icon: "shirt",
    image:
      "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=900&q=85",
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "A relaxed, boxy button-down in washed linen. Dropped hem, single chest pocket, sits loose through the body for warm-weather layering.",
    fabric: "100% European linen",
    seedRatings: [4, 5, 5],
  },


  {
    id: "tapered-trouser",
    name: "Tapered Trouser",
    category: "Women",
    subcategory: "Bottoms",
    price: 5899,
    colorName: "Stone",
    colorHex: "#8A8577",
    icon: "trouser",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",
    sizes: ["XS", "S", "M", "L"],
    description:
      "A mid-rise trouser with a tapered leg and pressed crease. Side-zip closure, no back pockets to keep the silhouette clean.",
    fabric: "Stretch cotton twill",
    seedRatings: [4, 4, 3],
  },

  {
    id: "cable-knit-sweater",
    name: "Cable Knit Sweater",
    category: "Women",
    subcategory: "Knitwear",
    price: 6499,
    colorName: "Clay",
    colorHex: "#A8542E",
    icon: "sweater",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=85",
    sizes: ["S", "M", "L"],
    description:
      "A heavyweight cable knit with a crew neck and ribbed cuffs. Chunky enough to wear on its own, roomy enough to layer over a shirt.",
    fabric: "70% wool, 30% acrylic",
    seedRatings: [5, 4],
  },

  {
    id: "oxford-weave-shirt",
    name: "Oxford Weave Shirt",
    category: "Men",
    subcategory: "Tops",
    price: 4699,
    colorName: "Moss",
    colorHex: "#4A5741",
    icon: "shirt",
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",
    sizes: ["S", "M", "L", "XL"],
    description:
      "A classic oxford button-down with a soft button-down collar. Slightly heavier weave than a dress shirt, built to hold its shape all day.",
    fabric: "100% cotton oxford",
    seedRatings: [4, 5, 4, 4],
  },

  {
    id: "waxed-chore-jacket",
    name: "Waxed Chore Jacket",
    category: "Men",
    subcategory: "Outerwear",
    price: 8999,
    colorName: "Ink",
    colorHex: "#201F1C",
    icon: "jacket",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
    sizes: ["S", "M", "L", "XL"],
    description:
      "A boxy chore jacket in waxed cotton canvas, four patch pockets, corozo buttons. Ages into its own finish the more you wear it.",
    fabric: "Waxed cotton canvas",
    seedRatings: [5, 5, 5, 4],
  },

  {
    id: "straight-leg-denim",
    name: "Straight Leg Denim",
    category: "Men",
    subcategory: "Bottoms",
    price: 2999,
    colorName: "Stone",
    colorHex: "#8A8577",
    icon: "trouser",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
    sizes: ["30", "32", "34", "36"],
    description:
      "A straight leg jean in rigid stone-washed denim. Mid-rise, sits at the natural waist, breaks cleanly over a boot.",
    fabric: "100% cotton denim, 13oz",
    seedRatings: [4, 4, 5],
  },

  {
    id: "merino-crew-sweater",
    name: "Merino Crew Sweater",
    category: "Men",
    subcategory: "Knitwear",
    price: 4999,
    colorName: "Clay",
    colorHex: "#A8542E",
    icon: "sweater",
    image:
      "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=900&q=85",
    sizes: ["S", "M", "L", "XL"],
    description:
      "A fine-gauge merino crewneck. Light enough for layering, warm enough to wear alone once the temperature drops.",
    fabric: "100% merino wool",
    seedRatings: [5, 4, 4],
  },

  {
    id: "heavyweight-tee",
    name: "Heavyweight Tee",
    category: "Men",
    subcategory: "Tops",
    price: 1999,
    colorName: "Moss",
    colorHex: "#4A5741",
    icon: "tee",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A boxy tee in heavyweight cotton jersey that holds a proper drape instead of clinging. Ribbed collar, no side seams.",
    fabric: "100% combed cotton, 240gsm",
    seedRatings: [5, 5, 4, 5, 4],
  },

  {
    id: "canvas-tote",
    name: "Canvas Tote",
    category: "Accessories",
    subcategory: "Bags",
    price: 2599,
    colorName: "Ink",
    colorHex: "#201F1C",
    icon: "tote",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85",
    sizes: ["One Size"],
    description:
      "A structured tote in 16oz cotton canvas with leather handles and an interior pocket. Holds a laptop, a change of shoes, and then some.",
    fabric: "16oz cotton canvas, leather trim",
    seedRatings: [5, 5, 4],
  },

  {
    id: "leather-crossbody",
    name: "Leather Crossbody",
    category: "Accessories",
    subcategory: "Bags",
    price: 2999,
    colorName: "Clay",
    colorHex: "#A8542E",
    icon: "crossbody",
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85",
    sizes: ["One Size"],
    description:
      "A compact crossbody in vegetable-tanned leather with an adjustable strap and magnetic flap closure. Fits a phone, cards, and keys.",
    fabric: "Vegetable-tanned leather",
    seedRatings: [4, 5, 5, 4],
  },

  {
    id: "wool-beanie",
    name: "Wool Beanie",
    category: "Accessories",
    subcategory: "Hats",
    price: 2499,
    colorName: "Moss",
    colorHex: "#4A5741",
    icon: "beanie",
    image:
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=900&q=85",
    sizes: ["One Size"],
    description:
      "A ribbed beanie in double-layer merino wool. Unlined, close fit, no pom.",
    fabric: "100% merino wool",
    seedRatings: [5, 4],
  },

  {
    id: "full-grain-belt",
    name: "Full Grain Belt",
    category: "Accessories",
    subcategory: "Belts",
    price: 3499,
    colorName: "Ink",
    colorHex: "#201F1C",
    icon: "belt",
    image:
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=900&q=85",
    sizes: ["S/M", "L/XL"],
    description:
      "A 3.5cm belt in full grain leather with a solid brass buckle. Five holes, punch a sixth if you need it.",
    fabric: "Full grain leather, brass hardware",
    seedRatings: [5, 5],
  },

  {
    id: "quilted-vest",
    name: "Quilted Vest",
    category: "Women",
    subcategory: "Outerwear",
    price: 5999,
    colorName: "Stone",
    colorHex: "#8A8577",
    icon: "vest",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85",
    sizes: ["XS", "S", "M", "L"],
    description:
      "A diamond-quilted vest with a stand collar and welt pockets. Insulated without the bulk, easy to layer under a coat.",
    fabric: "Nylon shell, synthetic fill",
    seedRatings: [4, 4, 5, 4],
  },
];


/* ============================================================
   HELPERS
   ============================================================ */

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}


function getRelatedProducts(product, count = 4) {
  return PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, count);
}


function formatPrice(n) {
  return "RS: " + n.toFixed(2);
}


/* ============================================================
   PRODUCT CARD
   ============================================================ */

function renderProductCard(product) {
  const wished = isInWishlist(product.id);
  const { avg, count } = getAverageRating(product);

  return `
    <article class="product-card" data-id="${product.id}">

      <a href="product.html?id=${product.id}" class="product-card__media">
        ${getProductMedia(product)}

        <button
          class="product-card__wish ${wished ? "is-active" : ""}"
          data-wish-toggle="${product.id}"
          aria-label="Toggle wishlist"
          aria-pressed="${wished}"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="${wished ? "currentColor" : "none"}"
            stroke="currentColor"
            stroke-width="1.6"
          >
            <path d="M12 20.4c-.3 0-.6-.1-.8-.3C7 16.7 3.5 13.6 3.5 9.8 3.5 7.1 5.6 5 8.3 5c1.5 0 2.9.7 3.7 1.9C12.8 5.7 14.2 5 15.7 5c2.7 0 4.8 2.1 4.8 4.8 0 3.8-3.5 6.9-7.7 10.3-.2.2-.5.3-.8.3z"/>
          </svg>
        </button>
      </a>

      <div class="product-card__tag">

        <div class="product-card__info">

          <p class="eyebrow">
            ${product.subcategory}
          </p>

          <h3>
            <a href="product.html?id=${product.id}">
              ${product.name}
            </a>
          </h3>

          ${
            count > 0
              ? `
                <div class="rating-line">
                  ${starsMarkup(avg)}
                  <span>(${count})</span>
                </div>
              `
              : `
                <div class="rating-line">
                  <span>No reviews yet</span>
                </div>
              `
          }

        </div>

        <div class="product-card__hole-row">
          <span class="swatch-hole"></span>
          <span class="tag-price">
            ${formatPrice(product.price)}
          </span>
        </div>

      </div>

    </article>
  `;
}


/* ============================================================
   STAR RATING
   ============================================================ */

function starsMarkup(avg) {
  let html = '<span class="stars">';

  for (let i = 1; i <= 5; i++) {

    const filled = i <= Math.round(avg);

    html += `
      <svg
        viewBox="0 0 24 24"
        fill="${filled ? "currentColor" : "none"}"
        stroke="currentColor"
        stroke-width="1.4"
      >
        <path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.6l-6.1 3.4 1.5-6.8L2.2 9.5l6.9-.7L12 2.5z"/>
      </svg>
    `;
  }

  html += "</span>";

  return html;
}


/* ============================================================
   FALLBACK GARMENT SVG
   Used only if an online image fails.
   ============================================================ */

function getGarmentSVG(type, hex, opts = {}) {

  const size = opts.size || 240;

  const stroke = "#FAF8F3";

  const paths = {

    dress: `
      <path d="M100 40 L90 60 L70 90 L78 210 L162 210 L170 90 L150 60 L140 40
      Q120 55 100 40 Z" />

      <path d="M90 60 Q120 78 150 60" />
    `,

    shirt: `
      <path d="M85 45 L60 65 L70 95 L88 85 L88 210 L152 210 L152 85 L170 95 L180 65 L155 45
      Q140 62 120 62 Q100 62 85 45 Z" />

      <line
        x1="120"
        y1="70"
        x2="120"
        y2="200"
        stroke-dasharray="4 6"
      />
    `,

    tee: `
      <path d="M88 48 L58 68 L72 98 L88 88 L88 208 L152 208 L152 88 L168 98 L182 68 L152 48
      Q140 66 120 66 Q100 66 88 48 Z" />
    `,

    jacket: `
      <path d="M82 50 L52 72 L66 104 L82 92 L82 210 L100 210 L100 120 L120 140 L140 120 L140 210 L158 210
      L158 92 L174 104 L188 72 L158 50 Q142 68 120 68 Q98 68 82 50 Z" />

      <line x1="120" y1="68" x2="120" y2="140"/>
    `,

    vest: `
      <path d="M92 46 L78 70 L88 200 L120 180 L152 200 L162 70 L148 46
      Q134 64 120 64 Q106 64 92 46 Z" />

      <line x1="120" y1="64" x2="120" y2="180"/>
    `,

    trouser: `
      <path d="M84 40 L84 90 L70 210 L96 210 L118 110 L124 110 L146 210 L172 210 L158 90 L158 40 Z" />

      <line x1="121" y1="40" x2="121" y2="100"/>
    `,

    skirt: `
      <path d="M95 50 L145 50 L168 205 L72 205 Z" />

      <line x1="95" y1="50" x2="72" y2="205"/>
      <line x1="145" y1="50" x2="168" y2="205"/>
      <line x1="112" y1="52" x2="98" y2="204"/>
      <line x1="128" y1="52" x2="142" y2="204"/>
    `,

    sweater: `
      <path d="M84 55 L56 76 L70 106 L84 96 L84 205 L156 205 L156 96 L170 106 L184 76 L156 55
      Q140 78 120 78 Q100 78 84 55 Z" />

      <line
        x1="84"
        y1="120"
        x2="156"
        y2="120"
        stroke-dasharray="4 6"
      />
    `,

    tote: `
      <path d="M65 95 L175 95 L165 205 L75 205 Z" />

      <path
        d="M90 95 Q90 60 120 60 Q150 60 150 95"
        fill="none"
      />
    `,

    crossbody: `
      <rect
        x="75"
        y="95"
        width="90"
        height="80"
        rx="6"
      />

      <path
        d="M75 100 Q60 40 155 55"
        fill="none"
      />

      <rect
        x="108"
        y="120"
        width="24"
        height="18"
        rx="3"
        fill="${hex}"
        stroke="${stroke}"
      />
    `,

    beanie: `
      <path
        d="M70 140 Q70 70 120 70 Q170 70 170 140 L170 150 L70 150 Z"
      />

      <rect
        x="66"
        y="148"
        width="108"
        height="26"
        rx="8"
      />
    `,

    belt: `
      <rect
        x="45"
        y="108"
        width="150"
        height="26"
        rx="4"
      />

      <rect
        x="103"
        y="98"
        width="34"
        height="46"
        rx="4"
        fill="${hex}"
        stroke="${stroke}"
      />
    `
  };

  const body = paths[type] || paths.tee;

  return `
    <svg
      viewBox="0 0 240 240"
      width="${size}"
      height="${size}"
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >

      <rect
        width="240"
        height="240"
        fill="${hex}"
      />

      <g
        fill="none"
        stroke="${stroke}"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        ${body}
      </g>

    </svg>
  `;
}


/* ============================================================
   PRODUCT MEDIA
   ============================================================ */

function getProductMedia(product, opts = {}) {

  if (!product.image) {
    return getGarmentSVG(
      product.icon,
      product.colorHex,
      opts
    );
  }

  return `
    <div
      class="media-photo"
      style="width:100%;height:100%;"
    >

      <img
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
        style="
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
        "
        onerror="
          this.style.display='none';
          this.nextElementSibling.style.display='block';
        "
      />

      <div
        style="
          display:none;
          width:100%;
          height:100%;
        "
      >
        ${getGarmentSVG(
          product.icon,
          product.colorHex,
          opts
        )}
      </div>

    </div>
  `;
}