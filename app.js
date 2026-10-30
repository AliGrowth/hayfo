const products = [
  {
    id: "bbk-infrared-massager",
    name: "جهاز BBK للمساج 5 في 1",
    description: "جهاز مساج يدوي بتصميم فضي ورؤوس متعددة للاستخدام على مناطق مختلفة من الجسم. صُمم بخمس وظائف، مع خاصية الأشعة تحت الحمراء حسب وصف المنتج. يُرجى مراجعة تعليمات الاستخدام المرفقة.",
    quantity: 1,
    price: 228,
    oldPrice: null,
    label: "5 في 1",
    image: "images/قلم التدليك1.webp",
    imageAlt: "صورة توضيحية لجهاز قلم تدليك فضي متعدد الرؤوس",
    supplierUrl: "https://www.alibaba.com/product-detail/BBK-Silver-5-in-1-Infrared_1601453698479.html?source_from=alilens_1793116095201",
  },
  {
    id: "shiatsu-neck-massager",
    name: "جهاز مساج الرقبة Shiatsu",
    description: "جهاز كهربائي مخصص لتدليك منطقة الرقبة والكتفين بتقنية شياتسو التي تحاكي حركات العجن. اتبعوا تعليمات الشركة المصنّعة للاستخدام.",
    quantity: 1,
    price: 299,
    oldPrice: null,
    label: "مساج الرقبة",
    image: "images/تدليك الرقبة.webp",
    imageAlt: "صورة توضيحية لجهاز كهربائي لتدليك الرقبة والكتفين",
    supplierUrl: "https://www.alibaba.com/product-detail/Hot-Sale-Electric-Shiatsu-Neck-and_1601014957551.html?source_from=alilens_1793116197941",
  },
  {
    id: "ems-mini-face-massager",
    name: "جهاز مساج الوجه EMS ميني",
    description: "جهاز مساج وجه كهربائي بحجم ميني، يأتي بسبعة ألوان أو أنماط ضوئية حسب وصف المنتج. أضيفوه إلى روتين العناية بالوجه واستخدموه وفق تعليمات الشركة المصنّعة.",
    quantity: 1,
    price: 229,
    oldPrice: null,
    label: "7 ألوان",
    image: "images/face-massage-user.webp",
    imageAlt: "صورة توضيحية لجهاز كهربائي لمساج الوجه",
    supplierUrl: "https://www.alibaba.com/product-detail/7-Color-Mini-Electric-EMS-Wrinkle_1601844583772.html?source_from=alilens_1793116333493",
  },
];

const getPrice = (amount) => {
  const isFrench = new URLSearchParams(window.location.search).get("lang")?.toLowerCase() === "fr" || (navigator.language || "").toLowerCase().startsWith("fr");
  const currency = new Intl.NumberFormat(isFrench ? "fr-MA" : "ar-MA", { maximumFractionDigits: 2 });
  return `<span class="money" dir="ltr"><bdi class="money-amount" dir="ltr">${currency.format(amount)}</bdi><span class="money-currency" dir="ltr">${isFrench ? "MAD" : "درهم"}</span></span>`;
};
const productGrid = document.querySelector("#product-grid");
const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const drawerCount = document.querySelector("#drawer-count");
const cartTotal = document.querySelector("#cart-total");
const drawerFooter = document.querySelector("#drawer-footer");
const emptyCart = document.querySelector("#empty-cart");
const shippingNote = document.querySelector("#shipping-note");
const overlay = document.querySelector("#overlay");
const drawer = document.querySelector("#cart-drawer");
const checkoutModal = document.querySelector("#checkout-modal");
const toast = document.querySelector("#toast");

let cart = loadCart();
let toastTimeout;

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem("hayfo-cart") || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter((item) =>
      products.some((product) => product.id === item.id)
      && Number.isInteger(item.quantity)
      && item.quantity > 0
      && item.quantity <= 99
    );
  } catch (error) {
    console.warn("Could not restore the saved cart.", error);
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem("hayfo-cart", JSON.stringify(cart));
  } catch (error) {
    console.warn("Could not save the cart in this browser.", error);
  }
}

function renderProducts() {
  productGrid.innerHTML = products.map((product) => `
    <article class="product-card">
      <div class="product-photo">
        ${product.image
          ? `<img src="${product.image}?v=457cf47" alt="${product.imageAlt}" loading="lazy" decoding="async" />`
          : `<div class="product-art" aria-label="${product.name}"><span>${product.artLabel}</span><small>${product.artDetail}</small></div>`}
        <span class="product-label${product.id === "ems-mini-face-massager" ? " product-label-bottom" : ""}">${product.label}</span>
      </div>
      <h3 class="product-title">${product.name}</h3>
      <div class="product-info">
        <div><p>${product.description}</p></div>
        <div class="product-price">${product.price === null ? `<span class="price-on-request">${detectedLanguage === "fr" ? "Prix sur demande" : "السعر عند الطلب"}</span>` : `${getPrice(product.price)}${product.oldPrice ? `<del>${getPrice(product.oldPrice)}</del>` : ""}`}</div>
      </div>
      <button class="add-to-cart" type="button" data-add="${product.id}">
        <svg class="add-to-cart-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.4L22 9H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>
        <span>${detectedLanguage === "fr" ? "Ajouter au panier" : "أضيفوا إلى السلة"}</span>
      </button>
    </article>
  `).join("");
}

function renderCart() {
  const count = cart.reduce((total, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return total + (product ? product.quantity * item.quantity : 0);
  }, 0);
  const hasUnpricedProduct = cart.some((item) =>
    products.find((entry) => entry.id === item.id)?.price === null
  );
  const subtotal = cart.reduce((total, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return total + (product && product.price !== null ? product.price * item.quantity : 0);
  }, 0);
  const discountRate = hasUnpricedProduct ? 0 : count >= 3 ? 0.25 : count === 2 ? 0.15 : 0;
  const discount = subtotal * discountRate;
  cartCount.textContent = String(count);
  drawerCount.textContent = `(${count})`;
  const isFrench = new URLSearchParams(window.location.search).get("lang")?.toLowerCase() === "fr" || (navigator.language || "").toLowerCase().startsWith("fr");
  document.querySelector("#cart-subtotal").innerHTML = hasUnpricedProduct
    ? `${getPrice(subtotal)} + ${isFrench ? "Prix sur demande" : "السعر عند الطلب"}`
    : getPrice(subtotal);
  document.querySelector("#cart-discount-row").hidden = discountRate === 0;
  document.querySelector("#cart-discount-label").textContent = isFrench ? `Remise ${Math.round(discountRate * 100)} %` : `خصم ${Math.round(discountRate * 100)}٪`;
  document.querySelector("#cart-discount").innerHTML = `− ${getPrice(discount)}`;
  cartTotal.innerHTML = hasUnpricedProduct ? `${getPrice(subtotal)} + ${isFrench ? "Prix sur demande" : "السعر عند الطلب"}` : getPrice(subtotal - discount);
  emptyCart.hidden = count > 0;
  drawerFooter.hidden = count === 0;
  document.querySelector("#cart-price-note").hidden = !hasUnpricedProduct;
  document.querySelector("#checkout-button").disabled = hasUnpricedProduct;
  cartItems.innerHTML = cart.map((item) => {
    const product = products.find((entry) => entry.id === item.id);
    if (!product) return "";
    return `
      <article class="cart-item">
        ${product.image
          ? `<img src="${product.image}" alt="" loading="lazy" decoding="async" />`
          : `<div class="cart-item-art" aria-hidden="true">${product.artLabel}</div>`}
        <div>
          <h3>${product.name}</h3><p>${product.price === null ? (isFrench ? "Prix sur demande" : "السعر عند الطلب") : getPrice(product.price)}</p>
          <div class="quantity-control" aria-label="${isFrench ? "Quantité" : "عدد الباقات"}">
            <button type="button" data-quantity="${product.id}" data-change="-1" aria-label="${isFrench ? "Réduire la quantité" : "تقليل الكمية"}">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-quantity="${product.id}" data-change="1" aria-label="${isFrench ? "Augmenter la quantité" : "زيادة الكمية"}">＋</button>
          </div>
        </div>
        <span class="cart-item-price">${product.price === null ? (isFrench ? "Sur demande" : "عند الطلب") : getPrice(product.price * item.quantity)}</span>
      </article>
    `;
  }).join("");
  shippingNote.textContent = isFrench ? "Livraison gratuite sur toutes les commandes." : "التوصيل مجاني لجميع الطلبات.";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("visible"), 2600);
}

function syncOverlay() {
  const isOpen = drawer.classList.contains("open") || checkoutModal.classList.contains("open");
  overlay.hidden = !isOpen;
  document.body.classList.toggle("locked", isOpen);
}

function openCart() {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  syncOverlay();
  document.querySelector("#close-cart").focus();
}

function closeCart() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  syncOverlay();
}

function openCheckout() {
  if (cart.some((item) => products.find((product) => product.id === item.id)?.price === null)) {
    showToast("حددي ثمن المنتجات التي أُضيفت عند الطلب قبل إتمام الطلب.");
    return;
  }
  closeCart();
  checkoutModal.classList.add("open");
  checkoutModal.setAttribute("aria-hidden", "false");
  syncOverlay();
  document.querySelector("#close-checkout").focus();
}

function closeCheckout() {
  checkoutModal.classList.remove("open");
  checkoutModal.setAttribute("aria-hidden", "true");
  syncOverlay();
}

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const id = button.dataset.add;
  const existing = cart.find((item) => item.id === id);
  if (existing) existing.quantity = Math.min(existing.quantity + 1, 99);
  else cart.push({ id, quantity: 1 });
  saveCart();
  renderCart();
  const product = products.find((entry) => entry.id === id);
  showToast(product?.price === null
    ? "أُضيف المنتج إلى السلة؛ السعر عند الطلب."
    : "أُضيف المنتج إلى السلة");
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-quantity]");
  if (!button) return;
  const item = cart.find((entry) => entry.id === button.dataset.quantity);
  if (!item) return;
  item.quantity += Number(button.dataset.change);
  if (item.quantity <= 0) cart = cart.filter((entry) => entry !== item);
  else item.quantity = Math.min(item.quantity, 99);
  saveCart();
  renderCart();
});

document.querySelector("#open-cart").addEventListener("click", openCart);
document.querySelector("#close-cart").addEventListener("click", closeCart);
document.querySelector("#continue-shopping").addEventListener("click", closeCart);
document.querySelector("#checkout-button").addEventListener("click", openCheckout);
document.querySelector("#close-checkout").addEventListener("click", closeCheckout);
overlay.addEventListener("click", () => {
  closeCart();
  closeCheckout();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();
    closeCheckout();
  }
});

const checkoutForm = document.querySelector("#checkout-form");
const phoneInput = document.querySelector("#phone");

const languageOverride = new URLSearchParams(window.location.search).get("lang")?.toLowerCase();
const browserLanguage = (navigator.language || "ar-MA").toLowerCase();
const detectedLanguage = ["fr", "en", "ar"].includes(languageOverride)
  ? languageOverride
  : browserLanguage.startsWith("fr") ? "fr" : browserLanguage.startsWith("en") ? "en" : "ar";
const formMessages = {
  ar: {
    lang: "ar",
    dir: "rtl",
    nameLabel: "الاسم الكامل",
    phoneLabel: "رقم الهاتف",
    cityLabel: "المدينة",
    addressLabel: "العنوان (اختياري)",
    submit: "تأكيد الطلب التجريبي",
    nameRequired: "يرجى إدخال الاسم الكامل هنا",
    nameShort: "يجب إدخال ثلاثة أحرف على الأقل للاسم",
    phoneInvalid: "يجب أن يحتوي رقم الهاتف على 10 أرقام وأن يبدأ بالرقم 0",
    cityRequired: "يرجى إدخال اسم المدينة هنا",
    cityShort: "يجب إدخال حرفين على الأقل للمدينة",
    addressPlaceholder: "الحي، الشارع، رقم المنزل",
    cityPlaceholder: "المدينة"
  },
  fr: {
    lang: "fr",
    dir: "ltr",
    nameLabel: "Nom complet",
    phoneLabel: "Numéro de téléphone",
    cityLabel: "Ville",
    addressLabel: "Adresse (facultatif)",
    submit: "Confirmer la commande de démonstration",
    nameRequired: "Veuillez saisir votre nom complet",
    nameShort: "Le nom doit contenir au moins trois caractères",
    phoneInvalid: "Le numéro doit contenir 10 chiffres et commencer par 0",
    cityRequired: "Veuillez saisir le nom de votre ville",
    cityShort: "La ville doit contenir au moins deux caractères",
    addressPlaceholder: "Quartier, rue, numéro de maison",
    cityPlaceholder: "Ville"
  },
  en: {
    lang: "en",
    dir: "ltr",
    nameLabel: "Full name",
    phoneLabel: "Phone number",
    cityLabel: "City",
    addressLabel: "Address (optional)",
    submit: "Confirm demo order",
    nameRequired: "Please enter your full name",
    nameShort: "The name must contain at least three characters",
    phoneInvalid: "The phone number must contain 10 digits and start with 0",
    cityRequired: "Please enter your city",
    cityShort: "The city must contain at least two characters",
    addressPlaceholder: "Neighborhood, street, house number",
    cityPlaceholder: "City"
  }
};
const messages = formMessages[detectedLanguage];
document.documentElement.lang = messages.lang;
document.documentElement.dir = messages.dir;
document.body.dir = messages.dir;
document.body.setAttribute("lang", messages.lang);
checkoutForm.dir = messages.dir;
checkoutForm.lang = messages.lang;
document.querySelectorAll("input, textarea, select, button").forEach((element) => {
  element.dir = messages.dir;
  element.lang = messages.lang;
});
document.querySelectorAll("input, textarea, select").forEach((element) => {
  element.style.textAlign = messages.dir === "rtl" ? "right" : "left";
});

function applyCheckoutLanguage() {
  const labels = checkoutForm.querySelectorAll("label");
  labels[0].firstChild.textContent = messages.nameLabel;
  labels[1].firstChild.textContent = messages.phoneLabel;
  labels[2].firstChild.textContent = messages.cityLabel;
  labels[3].firstChild.textContent = messages.addressLabel;
  checkoutForm.querySelector("button[type='submit']").firstChild.textContent = `${messages.submit} `;
  document.querySelector("#full-name").placeholder = messages.nameLabel;
  document.querySelector("#phone").title = messages.phoneInvalid;
  document.querySelector("#city").placeholder = messages.cityPlaceholder;
  document.querySelector("[name='address']").placeholder = messages.addressPlaceholder;
}

applyCheckoutLanguage();

if (detectedLanguage === "fr") {
  const frenchProducts = {
    "bbk-infrared-massager": {
      name: "Appareil BBK de massage 5 en 1",
      description: "Appareil de massage manuel argenté avec plusieurs têtes pour différentes zones du corps. Conçu avec cinq fonctions et une option infrarouge selon la description du produit. Veuillez consulter le mode d’emploi.",
      label: "5 en 1",
      imageAlt: "Appareil de massage argenté multifonction"
    },
    "shiatsu-neck-massager": {
      name: "Appareil de massage Shiatsu pour le cou",
      description: "Appareil électrique conçu pour le cou et les épaules avec une technique Shiatsu imitant les mouvements de pétrissage. Suivez les instructions du fabricant.",
      label: "Massage du cou",
      imageAlt: "Appareil électrique de massage du cou et des épaules"
    },
    "ems-mini-face-massager": {
      name: "Mini appareil EMS de massage facial",
      description: "Mini appareil électrique de massage du visage proposant plusieurs modes lumineux selon la description du produit. Utilisez-le conformément aux instructions du fabricant.",
      label: "7 couleurs",
      imageAlt: "Mini appareil électrique de massage du visage"
    }
  };
  products.forEach((product) => Object.assign(product, frenchProducts[product.id]));
  document.title = "Hayfo | Des soins qui vous sont destinés";


  const translate = (selector, text) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  };
  const translations = {
    ".announcement span:first-child": "Livraison gratuite sur toutes les commandes",
    ".announcement span:last-child": "Paiement à la livraison partout au Maroc",
    ".main-nav a:nth-child(1)": "Accueil",
    ".main-nav a:nth-child(2)": "Boutique",
    ".main-nav a:nth-child(3)": "À propos",
    ".header-cta": "Acheter maintenant ←",
    ".hero .eyebrow": "Des soins à votre façon",
    ".hero-copy h1": "Des moments de soin qui font la différence.",
    ".hero-copy p": "Découvrez nos appareils de massage pour le visage, le cou et le corps, puis choisissez celui qui convient à votre routine.",
    ".hero-actions .button-dark": "Découvrir les appareils ←",
    ".hero-actions .text-link": "À propos de nos produits ↗",
    "#checkout-title": "Où envoyer votre commande ?",
    "#checkout-modal > p": "Renseignez vos informations pour finaliser la commande. Il s’agit d’une démonstration : aucune donnée n’est envoyée et aucun paiement n’est effectué.",
    ".bundle-offer": "Offre spéciale : -15 % pour deux appareils, et -25 % pour trois appareils ou plus.",
    ".story-copy .eyebrow": "Des soins à la maison",
    ".story-copy > h2": "Des moments de massage pensés pour vous.",
    ".story-copy > p:not(.disclaimer)": "Découvrez une sélection d’appareils de massage pour le visage et le cou. Consultez les instructions de chaque appareil avant utilisation.",
    ".newsletter h2": "Votre moment de soin. Nous sommes là.",
    ".newsletter p": "Inscrivez-vous pour recevoir nos conseils de soins et nos nouvelles offres.",
    "#newsletter-email": "Votre adresse e-mail",
    ".hero-proof small:first-child": "clients satisfaits",
    ".rating small": "4,9 sur 5",
    ".benefit-items:first-child > div:first-child b": "Livraison gratuite partout au Maroc",
    ".benefit-items:first-child > div:first-child small": "Sans montant minimum",
    ".benefit-items:first-child > div:last-child b": "Paiement à la livraison",
    ".benefit-items:first-child > div:last-child small": "Payez en toute sécurité à la réception",
    ".benefit-items:last-child > div:first-child b": "Livraison gratuite partout au Maroc",
    ".benefit-items:last-child > div:first-child small": "Sans montant minimum",
    ".benefit-items:last-child > div:last-child b": "Paiement à la livraison",
    ".benefit-items:last-child > div:last-child small": "Payez en toute sécurité à la réception",
    ".hero-proof strong:first-child": "Plus de 2 400 clients",
    ".hero-proof small:first-child": "ont choisi Hayfo",
    ".hero-visual-title": "Collection complète d’appareils de massage et de beauté",
    ".hero-caption span": "Moments de détente",
    ".hero-caption b": "À votre rythme",
    ".story-copy .story-points li:nth-child(1) b": "Options variées",
    ".story-copy .story-points li:nth-child(1) small": "Appareils pour le massage et les soins à domicile.",
    ".story-copy .story-points li:nth-child(2) b": "Choisissez selon vos besoins",
    ".story-copy .story-points li:nth-child(2) small": "Pour le visage, le cou ou une utilisation polyvalente.",
    ".story-copy .story-points li:nth-child(3) b": "Faciles à utiliser partout",
    ".story-copy .story-points li:nth-child(3) small": "Des appareils pratiques pour votre routine quotidienne.",
    ".story-copy .button-dark": "Découvrir les appareils ←",
    ".story-copy .disclaimer": "Votre confort et votre santé sont notre priorité. Ces appareils sont conçus pour compléter les soins quotidiens et le massage à domicile.",
    ".newsletter .eyebrow": "Le mot de Hayfo",
    ".newsletter-form button": "S’inscrire ←",
    ".site-footer > p": "Des moments de soin, à votre rythme.",
    ".footer-links a:nth-child(1)": "Boutique",
    ".footer-links a:nth-child(2)": "À propos",
    ".footer-links a:nth-child(3)": "Nous contacter",
    ".site-footer > small": "© 2026 VAURA. Tous droits réservés.",
    ".drawer-header .eyebrow": "Vos choix",
    ".drawer-header h2": "Panier (0)",
    "#empty-cart p": "Découvrez nos appareils et ajoutez-les au panier.",
    "#continue-shopping": "Continuer mes achats",
    "#cart-price-note": "Certains produits sont disponibles sur devis. Fixez leur prix avant de finaliser la commande.",
    ".cart-drawer .subtotal:first-of-type span": "Sous-total avant remise",
    ".total-row span": "Total après remise",
    ".drawer-footer small": "Paiement à la livraison · Cette page est une démonstration",
    "#checkout-modal .eyebrow": "Dernière étape",
    "#close-checkout": "Fermer",
    "#order-success h3": "Merci pour votre intérêt !",
    "#order-success p": "Votre commande de démonstration a été confirmée. Aucun paiement ni aucune commande réelle n’ont été effectués.",
    "#finish-order": "Retour à la boutique"
  };
  Object.entries(translations).forEach(([selector, text]) => {
    if (selector === "#newsletter-email") document.querySelector(selector)?.setAttribute("placeholder", text);
    else translate(selector, text);
  });
  document.querySelector(".main-nav")?.setAttribute("aria-label", "Navigation principale");
  document.querySelector("#open-cart")?.setAttribute("aria-label", "Ouvrir le panier");
  document.querySelector("#checkout-button")?.replaceChildren(document.createTextNode("Finaliser la commande "), Object.assign(document.createElement("span"), { textContent: "←", ariaHidden: "true" }));
  document.querySelector(".empty-cart b")?.replaceChildren(document.createTextNode("Votre panier attend vos choix"));
  document.querySelector("#close-cart")?.setAttribute("aria-label", "Fermer le panier");
  document.querySelectorAll(".proof-avatars span").forEach((span, index) => {
    span.textContent = ["L", "M", "A"][index];
  });
  document.querySelector(".wordmark")?.setAttribute("aria-label", "Hayfo - Accueil");
  document.querySelector(".footer-brand")?.setAttribute("aria-label", "Hayfo - Accueil");
  document.querySelector(".close-drawer")?.setAttribute("aria-label", "Fermer le panier");
  document.querySelector(".checkout-close")?.setAttribute("aria-label", "Fermer le formulaire");
  document.querySelector("#cart-drawer")?.setAttribute("aria-label", "Panier");
}

function validateMoroccanPhone() {
  const digitsOnly = phoneInput.value.replace(/[^0-9]/g, "");
  if (phoneInput.value !== digitsOnly) phoneInput.value = digitsOnly;

  const isValid = /^0[0-9]{9}$/.test(phoneInput.value);
  phoneInput.setCustomValidity(isValid || phoneInput.value === ""
    ? ""
    : messages.phoneInvalid);
  return isValid;
}

phoneInput.addEventListener("input", validateMoroccanPhone);
phoneInput.addEventListener("blur", validateMoroccanPhone);

const fullNameInput = document.querySelector("#full-name");
const cityInput = document.querySelector("#city");

function validateTextInput(input, emptyMessage, minimumLength = 3) {
  const value = input.value.trim();
  if (!value) {
    input.setCustomValidity(emptyMessage);
    return false;
  }
  if (value.length < minimumLength) {
    input.setCustomValidity(input === fullNameInput
      ? messages.nameShort
      : messages.cityShort);
    return false;
  }
  input.setCustomValidity("");
  return true;
}

fullNameInput.addEventListener("input", () => {
  validateTextInput(fullNameInput, messages.nameRequired, 3);
});

cityInput.addEventListener("input", () => {
  validateTextInput(cityInput, messages.cityRequired, 2);
});

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateTextInput(fullNameInput, messages.nameRequired, 3)) {
    fullNameInput.reportValidity();
    return;
  }
  if (!validateMoroccanPhone()) {
    phoneInput.reportValidity();
    return;
  }
  if (!validateTextInput(cityInput, messages.cityRequired, 2)) {
    cityInput.reportValidity();
    return;
  }
  checkoutForm.hidden = true;
  document.querySelector("#order-success").hidden = false;
});

document.querySelector("#finish-order").addEventListener("click", () => {
  cart = [];
  saveCart();
  renderCart();
  document.querySelector("#checkout-form").reset();
  document.querySelector("#checkout-form").hidden = false;
  document.querySelector("#order-success").hidden = true;
  closeCheckout();
  showToast(detectedLanguage === "fr" ? "Fin de la commande de démonstration" : "انتهت تجربة الطلب التجريبي");
});

document.querySelector("#newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.reset();
  showToast(detectedLanguage === "fr"
    ? "Merci pour votre intérêt ! L’inscription est désactivée dans cette démonstration."
    : "شكراً لاهتمامكم! الاشتراك غير مفعّل في النسخة التجريبية.");
});

document.addEventListener("contextmenu", (event) => {
  if (event.target.closest("img")) event.preventDefault();
});

document.addEventListener("dragstart", (event) => {
  if (event.target.closest("img")) event.preventDefault();
});

renderProducts();
renderCart();
