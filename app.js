// ===== العد التنازلي المستمر =====
const COUNTDOWN_DURATION_MS = 3 * 60 * 60 * 1000;
const COUNTDOWN_STORAGE_KEY = 'hayfo_countdown_end_time_3h_v1';
let countdownIntervalId = null;

function readCountdownEnd() {
    try {
        const rawEnd = localStorage.getItem(COUNTDOWN_STORAGE_KEY);
        const end = Number(rawEnd);
        return Number.isFinite(end) && end > 0 ? end : null;
    } catch (error) {
        console.warn('Could not read the countdown end time.', error);
        return null;
    }
}

function saveCountdownEnd(end) {
    try {
        localStorage.setItem(COUNTDOWN_STORAGE_KEY, String(end));
    } catch (error) {
        console.warn('Could not save the countdown end time.', error);
    }
}

function getCountdownEnd() {
    const now = Date.now();
    const storedEnd = readCountdownEnd();
    const validEnd =
        storedEnd !== null &&
        storedEnd > now &&
        storedEnd <= now + COUNTDOWN_DURATION_MS;

    if (validEnd) return storedEnd;

    const newEnd = now + COUNTDOWN_DURATION_MS;
    saveCountdownEnd(newEnd);
    return newEnd;
}

function startCountdown(el) {
    if (!el) return;

    if (countdownIntervalId !== null) {
        window.clearInterval(countdownIntervalId);
    }

    const updateCountdown = () => {
        let end = getCountdownEnd();
        let remaining = Math.max(0, end - Date.now());

        if (remaining <= 0) {
            end = Date.now() + COUNTDOWN_DURATION_MS;
            saveCountdownEnd(end);
            remaining = COUNTDOWN_DURATION_MS;
        }

        const totalSeconds = Math.ceil(remaining / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        el.textContent = `${hours}:${minutes}:${seconds}`;
    };

    updateCountdown();
    countdownIntervalId = window.setInterval(updateCountdown, 1000);
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) updateCountdown();
    });
    window.addEventListener('focus', updateCountdown);
    window.addEventListener('pageshow', updateCountdown);
}

function initAnnouncementCountdown() {
    localStorage.removeItem('countdownEnd');
    localStorage.removeItem('hayfo_timer_end');
    startCountdown(document.getElementById('countdown'));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnnouncementCountdown);
} else {
    initAnnouncementCountdown();
}

const products = [
  {
    id: "bbk-infrared-massager",
    name: "جهاز BBK للمساج 5 في 1",
    description: "استعيدي نضارة بشرتك وشوقيها حيوية مع جهاز BBK متعدد الوظائف! يجمع بين 5 تقنيات متقدمة: المساج بالاهتزاز، العلاج بالأشعة تحت الحمراء، والذبذبات الكهربائية. مثالي لتدليك الوجه والرقبة والجسم، يساعد على تحسين الدورة الدموية، تخفيف التوتر، وتقليل التجاعيد. تصميم أنيق وزخرفي يجعله هدية مثالية.",
    quantity: 1,
    price: 228,
    oldPrice: null,
    label: "5 في 1",
    image: "images/1.webp",
    imageAlt: "صورة توضيحية لجهاز قلم تدليك فضي متعدد الرؤوس",
    supplierUrl: "https://www.alibaba.com/product-detail/BBK-Silver-5-in-1-Infrared_1601453698479.html?source_from=alilens_1793116095201",
  },
  {
    id: "shiatsu-neck-massager",
    name: "جهاز مساج الرقبة Shiatsu",
    description: "دخلي عالم الاسترخاء مع جهاز مساج الرقبة Shiatsu! يعتمد على تقنية الشياتسو اليابانية التي تحاكي حركات أيادي المختصين في التدليك. مثالي لتخفيف آلام الرقبة والكتفين والظهر، يعزز الدورة الدموية، ويطلق التوتر المتراكم. سهل الاستخدام بزر واحد، مع تصميم مريح يناسب جميع الأحجام. الحل الأمثل لراحة يومية بعد يوم عمل طويل.",
    quantity: 1,
    price: 299,
    oldPrice: null,
    label: "الأكثر مبيعاً",
    image: "images/3.webp",
    imageAlt: "صورة توضيحية لجهاز كهربائي لتدليك الرقبة والكتفين",
    supplierUrl: "https://www.alibaba.com/product-detail/Hot-Sale-Electric-Shiatsu-Neck-and_1601014957551.html?source_from=alilens_1793116197941",
  },
  {
    id: "ems-mini-face-massager",
    name: "جهاز مساج الوجه والعنق EMS ميني",
    description: "اكتشفي سرجمال البشرة المشدودة مع جهاز EMS ميني! يجمع بين التقنية الكهربائية والاضاءة الملونة السبعة لعلاج التجاعيد وشد الوجه والرقبة. يعمل على تنشيط الخلايا وإنتاج الكولاجين، مما يمنحك بشرة مشدودة ونضرة. حجمه المصغر يجعله مثالياً للحمل في الحقيبة، واستخدامه اليومي يستغرق دقائق معدودة. بديل مثالي لزياراتصالون التجميل.",
    quantity: 1,
    price: 229,
    oldPrice: null,
    label: "جديد",
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
          ? `<img class="product-img" src="${product.image}?v=457cf47" alt="${product.imageAlt}" loading="lazy" decoding="async" />`
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
  
  // تم إزالة openCart() من هنا تماماً لكي لا تفتح السلة تلقائياً عند إضافة منتج
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
    submit: "تأكيد طلبي الآن (الدفع عند الاستلام)",
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
    submit: "Confirmer ma commande maintenant (paiement à la livraison)",
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
    submit: "Confirm my order now (cash on delivery)",
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
      description: "Redonnez à votre peau éclat et vitalité avec l'appareil BBK 5-en-1 ! Combine 5 technologies avancées : massage par vibrations, thérapie infrarouge et impulsions électriques. Idéal pour le visage, le cou et le corps, il améliore la circulation sanguine, soulage le stress et réduit les rides. Design élégant qui en fait un cadeau parfait.",
      label: "5 en 1",
      imageAlt: "Appareil de massage argenté multifonction"
    },
    "shiatsu-neck-massager": {
      name: "Appareil de massage Shiatsu pour le cou",
      description: "Découvrez le monde de la détente avec le masseur cervical Shiatsu ! Il utilise la technique japonaise Shiatsu qui imite les mouvements des mains d'un spécialiste. Idéal pour soulager les douleurs du cou, des épaules et du dos, il améliore la circulation sanguine et libère le stress accumulé. Facile à utiliser d'une simple pression, avec un design confortable. La solution parfaite pour le relaxation quotidienne.",
      label: "Best-seller",
      imageAlt: "Appareil électrique de massage du cou et des épaules"
    },
    "ems-mini-face-massager": {
      name: "Mini appareil EMS de massage facial",
      description: "Découvrez le secret d'une peau ferme avec le mini appareil EMS ! Il combine la technologie électrique et les sept lumières colorées pour traiter les rides et raffermissir le visage et le cou. Il active les cellules et stimule la production de collagène pour une peau ferme et éclatante. Sa taille compacte le rend parfait pour Emporter partout. Une alternative idéale aux séances de salon de beauté.",
      label: "Nouveau",
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
    ".announcement span:first-child": "⚡ Stock limité — Jusqu’à -25 %, offre se termine dans",
    ".announcement span:last-child": "📦 Livraison rapide et paiement à la livraison",
    ".main-nav a:nth-child(1)": "Accueil",
    ".main-nav a:nth-child(2)": "Boutique",
    ".main-nav a:nth-child(3)": "À propos",
    ".header-cta": "Acheter maintenant ←",
    ".hero .eyebrow": "",
    ".hero-copy h1": "Des moments de soin qui font la différence.",
    ".hero-copy p": "Découvrez nos appareils de massage pour le visage, le cou et le corps, puis choisissez celui qui convient à votre routine.",
    ".hero-actions .button-dark": "Découvrir les appareils ←",
    ".hero-actions .text-link": "À propos de nos produits ↗",
    "#checkout-title": "",
    "#checkout-modal > p": "",
    ".bundle-offer": "Offre spéciale : -15 % pour deux appareils, et -25 % pour trois appareils ou plus — Stock limité !",
    ".story-copy .eyebrow": "Des soins à la maison",
    ".story-copy > h2": "Des moments de massage pensés pour vous.",
    ".story-copy > p:not(.disclaimer)": "Découvrez une sélection d’appareils de massage pour le visage et le cou.",
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
    ".testimonials .eyebrow": "Avis de nos clients",
    ".testimonials .section-heading": "Que disent <em>nos clients</em> ?",
    ".testimonial-card:nth-child(1) .testimonial-text": "\"Appareil de massage pour le cou incroyable ! Toute ma famille l'utilise et se sent relaxée après une longue journée. Livraison rapide et emballage excellent.\" — Sara M., Casablanca",
    ".testimonial-card:nth-child(2) .testimonial-text": "\"L'appareil BBK multifonction est très pratique. Je l'ai offert en cadeau et ma famille l'adore. Bonne qualité pour le prix.\" — Ahmed B., Marrakech",
    ".testimonial-card:nth-child(3) .testimonial-text": "\"L'appareil EMS facial est très efficace pour raffermir la peau. Je l'utilise quotidiennement et je vois une différence notable. Je le recommande vivement !\" — Fatima Z., Fès",
    ".newsletter .eyebrow": "Le mot de VAURA",
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
    "#order-success h3": "Commande confirmée avec succès ! ✨✓✨",
    "#order-success p": "Merci de votre confiance en VAURA. Votre commande a été reçue et notre équipe vous contactera pour confirmer les détails de la livraison.",
    "#finish-order": "Retour à la boutique",
    "#trust-delivery": "📦 Livraison rapide dans toutes les villes marocaines - Paiement à la livraison",
    "#trust-guarantee": "🔒 Garantie qualité : échange ou remboursement disponible"
  };
  Object.entries(translations).forEach(([selector, text]) => {
    if (selector === "#newsletter-email") document.querySelector(selector)?.setAttribute("placeholder", text);
    else translate(selector, text);
  });
  document.querySelector(".main-nav")?.setAttribute("aria-label", "Navigation principale");
  document.querySelector("#open-cart")?.setAttribute("aria-label", "Ouvrir le panier");
  document.querySelector("#checkout-button")?.replaceChildren(document.createTextNode("Commander maintenant - Paiement à la livraison "), Object.assign(document.createElement("span"), { textContent: "←", ariaHidden: "true" }));
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

  // Build order data matching Sheet columns
  const name = fullNameInput.value.trim();
  const phone = phoneInput.value.trim();
  const city = cityInput.value.trim();
  const address = document.querySelector("[name='address']").value.trim();
  const notes = messages.lang === "fr"
    ? cart.map(i => {
        const p = products.find(pr => pr.id === i.id);
        return `${p?.name || ""} x${i.quantity}`;
      }).join(", ")
    : cart.map(i => {
        const p = products.find(pr => pr.id === i.id);
        return `${p?.name || ""} × ${i.quantity}`;
      }).join("، ");

  const subtotal = cart.reduce((t, i) => {
    const p = products.find(pr => pr.id === i.id);
    return t + (p?.price ? p.price * i.quantity : 0);
  }, 0);
  const count = cart.reduce((t, i) => t + i.quantity, 0);
  const discountRate = count >= 3 ? 0.25 : count === 2 ? 0.15 : 0;
  const total = subtotal * (1 - discountRate);

  const orderData = {
    date_order: new Date().toISOString().slice(0, 16).replace("T", " "),
    full_name: name,
    phone: phone,
    address: address,
    sku: cart.map(i => i.id).join(", "),
    qte: String(count),
    price: String(Math.round(total)),
    note: notes + (city ? " - " + city : ""),
    delivery_note: messages.lang === "fr"
      ? "Paiement à la livraison"
      : "الدفع عند الاستلام"
  };

  sendOrderToSheet(orderData).then(result => {
    console.log("Order sent:", result);
  });

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

// ===== ربط Google Sheets باستلام الطلبات =====
const SHEETDB_API_URL = "https://sheetdb.io/api/v1/8hta5lbm5rf06"; // ← ضع رابط API الخاص بك من SheetDB

function sendOrderToSheet(orderData) {
  if (SHEETDB_API_URL === "https://sheetdb.io/api/v1/your-api-id") {
    console.warn("SheetDB API not configured.");
    return Promise.resolve({ success: false, message: "Webhook غير مُعدّ" });
  }
  return fetch(SHEETDB_API_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  }).then(() => ({ success: true })).catch(() => ({ success: false }));
}

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
    ? "Merci pour votre intérêt ! L'inscription est désactivée dans cette démonstration."
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