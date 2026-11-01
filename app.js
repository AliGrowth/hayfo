document.addEventListener('DOMContentLoaded', () => {
    // قاموس الترجمات (عربي / فرنسي)
    const translations = {
        ar: {
            announcement: "توصيل مجاني لجميع الطلبات · الدفع عند الاستلام لجميع أنحاء المغرب",
            home: "الرئيسية",
            shop: "المتجر",
            about: "عن الجهاز",
            heroEyebrow: "العناية على طريقتكم",
            heroTitle: "لحظات عناية<br />تصنع <em>فرقاً.</em>",
            heroDesc: "اكتشفوا أجهزة المساج والتدليك للوجه والرقبة والجسم، واختاروا الجهاز المناسب لروتينكم.",
            shopDevices: "تسوقوا الأجهزة",
            aboutProducts: "عن منتجاتنا",
            clientsCount: "أكثر من 2,400 عميل اختاروا هايفو",
            rating: "4.9 من 5",
            freeShippingBanner: "توصيل مجاني لجميع أنحاء المغرب",
            freeShippingSub: "دون حد أدنى للطلب",
            codBanner: "الدفع عند الاستلام",
            codSub: "ادفعوا بأمان بعد استلاستلام طلبكم",
            bundleOffer: "عرض خاص: خصم 15٪ عند شراء جهازين، و25٪ عند شراء 3 أجهزة أو أكثر.",
            addToCart: "أضف إلى السلة",
            cartTitle: "سلة التسوق",
            emptyCartTitle: "سلتكم تنتظر اختياراتكم",
            emptyCartDesc: "اكتشفوا الأجهزة وأضيفوها إلى السلة.",
            continueShopping: "مواصلة التسوق",
            subtotalLabel: "المجموع قبل الخصم",
            totalLabel: "الإجمالي بعد الخصم",
            checkoutBtn: "إتمام الطلب",
            cartFooterNote: "الدفع عند الاستلام · هذا نموذج عرض تجريبي",
            modalCheckoutTitle: "إتمام الطلب",
            nameLabel: "الاسم الكامل",
            namePlaceholder: "اسمكم الكريم",
            phoneLabel: "رقم الهاتف",
            phonePlaceholder: "06XXXXXXXX",
            addressLabel: "العنوان والمدينة",
            addressPlaceholder: "المدينة، الحي...",
            confirmOrderBtn: "تأكيد الطلب",
            successTitle: "شكراً، طلبك وصلنا 🤍",
            successCopy: "تم تسجيل طلبك بنجاح. شكراً على ثقتك واختيارك متجرنا.",
            successContact: "فريقنا غادي يتواصل معاك قريباً بالتليفون أو واتساب لتأكيد التفاصيل والإرسال.",
            viewOrderBtn: "عرض رقم الطلب",
            finishOrderBtn: "متابعة التسوق",
            currency: "درهم"
        },
        fr: {
            announcement: "Livraison gratuite pour toutes les commandes · Paiement à la livraison partout au Maroc",
            home: "Accueil",
            shop: "Boutique",
            about: "À propos",
            heroEyebrow: "Le soin à votre façon",
            heroTitle: "Des moments de soin<br />qui font <em>la différence.</em>",
            heroDesc: "Découvrez nos appareils de massage pour le visage, le cou et le corps, et choisissez celui qui convient à votre routine.",
            shopDevices: "Acheter les appareils",
            aboutProducts: "À propos de nos produits",
            clientsCount: "Plus de 2 400 clients ont choisi Hayfo",
            rating: "4.9 sur 5",
            freeShippingBanner: "Livraison gratuite partout au Maroc",
            freeShippingSub: "Sans minimum d'achat",
            codBanner: "Paiement à la livraison",
            codSub: "Payez en toute sécurité après réception",
            bundleOffer: "Offre spéciale : 15% de réduction pour l'achat de 2 appareils, et 25% pour 3 appareils ou plus.",
            addToCart: "Ajouter au panier",
            cartTitle: "Panier",
            emptyCartTitle: "Votre panier attend vos choix",
            emptyCartDesc: "Découvrez nos appareils et ajoutez-les au panier.",
            continueShopping: "Continuer vos achats",
            subtotalLabel: "Sous-total",
            totalLabel: "Total après réduction",
            checkoutBtn: "Commander",
            cartFooterNote: "Paiement à la livraison · Ceci est un modèle de démonstration",
            modalCheckoutTitle: "Finaliser la commande",
            nameLabel: "Nom complet",
            namePlaceholder: "Votre nom",
            phoneLabel: "Numéro de téléphone",
            phonePlaceholder: "06XXXXXXXX",
            addressLabel: "Adresse et Ville",
            addressPlaceholder: "Ville, Quartier...",
            confirmOrderBtn: "Confirmer la commande",
            successTitle: "Merci, votre commande a bien été reçue 🤍",
            successCopy: "Votre commande a été enregistrée avec succès. Merci pour votre confiance.",
            successContact: "Notre équipe vous contactera bientôt par téléphone ou WhatsApp pour confirmer.",
            viewOrderBtn: "Afficher le numéro de commande",
            finishOrderBtn: "Continuer vos achats",
            currency: "MAD"
        },
        en: {
            announcement: "Free delivery for all orders · Cash on delivery throughout Morocco",
            home: "Home",
            shop: "Shop",
            about: "About",
            heroEyebrow: "Care your way",
            heroTitle: "Moments of care<br />that make <em>a difference.</em>",
            heroDesc: "Discover massage devices for the face, neck and body, and choose the one that fits your routine.",
            shopDevices: "Shop devices",
            aboutProducts: "About our products",
            clientsCount: "Over 2,400 clients chose Hayfo",
            rating: "4.9 out of 5",
            freeShippingBanner: "Free delivery throughout Morocco",
            freeShippingSub: "No minimum order",
            codBanner: "Cash on delivery",
            codSub: "Pay safely after receiving your order",
            bundleOffer: "Special offer: 15% off when buying 2 devices, and 25% off for 3 or more.",
            addToCart: "Add to cart",
            cartTitle: "Shopping cart",
            emptyCartTitle: "Your cart awaits your choices",
            emptyCartDesc: "Discover the devices and add them to your cart.",
            continueShopping: "Continue shopping",
            subtotalLabel: "Subtotal before discount",
            totalLabel: "Total after discount",
            checkoutBtn: "Checkout",
            cartFooterNote: "Cash on delivery · This is a demo store",
            modalCheckoutTitle: "Checkout",
            nameLabel: "Full name",
            namePlaceholder: "Your name",
            phoneLabel: "Phone number",
            phonePlaceholder: "06XXXXXXXX",
            addressLabel: "Address and city",
            addressPlaceholder: "City, neighborhood...",
            confirmOrderBtn: "Confirm order",
            successTitle: "Thank you, your order has been received 🤍",
            successCopy: "Your order has been registered successfully. Thank you for your trust.",
            successContact: "Our team will contact you soon by phone or WhatsApp to confirm the details.",
            viewOrderBtn: "View order number",
            finishOrderBtn: "Continue shopping",
            currency: "MAD"
        }
    };

    let currentLang = localStorage.getItem('hayfo_lang') || 'ar';

    function changeLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('hayfo_lang', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        const langSelect = document.getElementById('lang-select');
        if (langSelect) langSelect.value = lang;
        updateStaticTexts();
        renderProducts();
        updateCartUI();
    }

    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.value = currentLang;
        langSelect.addEventListener('change', (e) => changeLanguage(e.target.value));
    }

    // Apply on load
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    if (langSelect) langSelect.value = currentLang;

    function updateStaticTexts() {
        const t = translations[currentLang];
        
        // تحديث النصوص الثابتة في الصفحة عبر الـ selectors أو إضافة data-i18n مسبقاً إن أمكن
        const checkoutBtn = document.getElementById('checkout-button');
        if (checkoutBtn) checkoutBtn.innerHTML = `${t.checkoutBtn} <span aria-hidden="true">←</span>`;
        
        const emptyCartTitle = document.querySelector('#empty-cart b');
        if (emptyCartTitle) emptyCartTitle.textContent = t.emptyCartTitle;

        const emptyCartDesc = document.querySelector('#empty-cart p');
        if (emptyCartDesc) emptyCartDesc.textContent = t.emptyCartDesc;

        const continueShopBtn = document.getElementById('continue-shopping');
        if (continueShopBtn) continueShopBtn.textContent = t.continueShopping;

        const subtotalSpan = document.querySelector('.subtotal span');
        if (subtotalSpan) subtotalSpan.textContent = t.subtotalLabel;

        const modalTitle = document.querySelector('.modal-header h3');
        if (modalTitle) modalTitle.textContent = t.modalCheckoutTitle;

        const confirmBtn = document.querySelector('#checkout-form button[type="submit"]');
        if (confirmBtn) confirmBtn.textContent = t.confirmOrderBtn;
    }

    // جعل دالة تغيير اللغة متاحة عامة في المتصفح
    window.changeLanguage = changeLanguage;

    const products = [
        {
            id: 1,
            sku: "masseur-électrique5",
            price: 229,
            oldPrice: 350,
            image: "images/تدليك%20الرقبة.webp",
            name: { ar: "جهاز مساج الرقبة والتدليك Shiatsu", fr: "Appareil de massage du cou Shiatsu", en: "Shiatsu Neck Massage Device" },
            description: { ar: "جهاز متعدد الوظائف للراحة والاسترخاء وتخفيف آلام الرقبة والكتفين.", fr: "Appareil multifonction pour le confort, la relaxation et le soulagement des douleurs du cou et des épaules.", en: "Multifunction device for comfort, relaxation and relief of neck and shoulder pain." },
            badge: { ar: "الأكثر مبيعاً", fr: "Meilleure vente", en: "Best seller" }
        },
        {
            id: 2,
            sku: "appareil-de-massage-facial",
            price: 199,
            oldPrice: 290,
            image: "images/face-massage-user.webp",
            name: { ar: "جهاز مساج الوجه EMS ميني", fr: "Appareil de massage facial EMS mini", en: "Mini EMS Facial Massage Device" },
            description: { ar: "لشد الوجه وتحفيز الكولاجين والعناية اليومية بالبشرة.", fr: "Pour raffermir le visage, stimuler le collagène et le soin quotidien de la peau.", en: "For firming the face, stimulating collagen and daily skin care." },
            badge: { ar: "عرض خاص", fr: "Offre spéciale", en: "Special offer" }
        },
        {
            id: 3,
            sku: "massager-pen",
            price: 269,
            oldPrice: 400,
            image: "images/قلم%20التدليك1.webp",
            name: { ar: "مسدس المساج العضلي المحمول", fr: "Pistolet de massage musculaire portable", en: "Portable Muscle Massage Gun" },
            description: { ar: "لتخفيف تشنجات العضلات واسترخاء الجسم بعد التعب والتمارين.", fr: "Pour soulager les crampes musculaires et relaxer le corps après l'effort et l'exercice.", en: "To relieve muscle cramps and relax the body after fatigue and exercise." },
            badge: { ar: "جديد", fr: "Nouveau", en: "New" }
        }
    ];

    function localizeProduct(p) {
        const tr = p.name && typeof p.name === 'object' ? p : p;
        const lang = currentLang;
        return {
            id: p.id,
            sku: p.sku,
            price: p.price,
            oldPrice: p.oldPrice,
            image: p.image,
            name: (p.name && typeof p.name === 'object') ? (p.name[lang] || p.name.ar) : p.name,
            description: (p.description && typeof p.description === 'object') ? (p.description[lang] || p.description.ar) : p.description,
            badge: (p.badge && typeof p.badge === 'object') ? (p.badge[lang] || p.badge.ar) : p.badge
        };
    }

    let cart = [];

    function getCartSummary(cartItems) {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let discountRate = 0;
        if (totalItems >= 3) discountRate = 0.25;
        else if (totalItems === 2) discountRate = 0.15;
        const discount = Math.round(subtotal * discountRate);
        const total = subtotal - discount;
        return { totalItems, subtotal, discountRate, discount, total };
    }

    const productGrid = document.getElementById('product-grid');
    const cartCount = document.getElementById('cart-count');
    const drawerCount = document.getElementById('drawer-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const drawerFooter = document.getElementById('drawer-footer');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    
    const cartDrawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('overlay');
    const openCartBtn = document.getElementById('open-cart');
    const closeCartBtn = document.getElementById('close-cart');
    const continueShoppingBtn = document.getElementById('continue-shopping');
    const finishOrderBtn = document.getElementById('finish-order');
    
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutBtn = document.getElementById('close-checkout');
    const checkoutButton = document.getElementById('checkout-button');
    const checkoutForm = document.getElementById('checkout-form');
    const orderSuccess = document.getElementById('order-success');
    const orderNumberBtn = document.getElementById('order-number');

    let lastOrder = null;

    function renderProducts() {
        if (!productGrid) return;
        productGrid.innerHTML = products.map(p => {
            const lp = localizeProduct(p);
            const cur = translations[currentLang].currency;
            return `
            <div class="product-card" style="border: 1px solid #e0dcd5; padding: 20px; border-radius: 16px; background: #fff; text-align: right; box-shadow: 0 4px 12px rgba(0,0,0,0.03); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <img src="${lp.image}" alt="${lp.name}" style="width: 100%; height: auto; max-width: 100%; object-fit: contain; object-position: center center; display: block; overflow: visible; background: #f3f0ea; border-radius: 10px; margin-bottom: 15px; padding: 8px; box-sizing: border-box;" onerror="this.src='https://via.placeholder.com/300x200?text=Hayfo+Luxury'">
                    <span style="background: #2c2825; color: #fff; padding: 4px 12px; font-size: 12px; border-radius: 20px; display: inline-block; margin-bottom: 12px;">${lp.badge}</span>
                    <h3 style="margin: 0 0 5px; font-size: 18px; color: #2c2825;">${lp.name}</h3>
                    <p style="color: #666; font-size: 14px; margin-bottom: 20px; line-height: 1.5;">${lp.description}</p>
                </div>
                <div>
                    <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 15px;">
                        <strong style="color: #c0392b; font-size: 20px;">${lp.price} ${cur}</strong>
                        <span style="text-decoration: line-through; color: #999; font-size: 14px;">${lp.oldPrice} ${cur}</span>
                    </div>
                    <button onclick="window.addToCart(${lp.id})" style="background: #2c2825; color: #fff; border: none; padding: 12px; border-radius: 8px; cursor: pointer; width: 100%; font-weight: bold;">${translations[currentLang].addToCart}</button>
                </div>
            </div>
        `}).join('');
    }

    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        const existing = cart.find(item => item.id === productId);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartUI();
        openCart();
    };

    function updateCartUI() {
        const summary = getCartSummary(cart);
        if (cartCount) cartCount.textContent = summary.totalItems;
        if (drawerCount) drawerCount.textContent = `(${summary.totalItems})`;

        if (cart.length === 0) {
            if (emptyCart) emptyCart.hidden = false;
            if (cartItemsContainer) cartItemsContainer.innerHTML = '';
            if (drawerFooter) drawerFooter.hidden = true;
        } else {
            if (emptyCart) emptyCart.hidden = true;
            if (drawerFooter) drawerFooter.hidden = false;
            if (cartItemsContainer) {
                const cur = translations[currentLang].currency;
                cartItemsContainer.innerHTML = cart.map(item => {
                    const lp = localizeProduct(item);
                    return `
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding: 12px 0;">
                        <div>
                            <h4 style="margin: 0; font-size: 14px; color: #2c2825;">${lp.name}</h4>
                            <small hidden style="color: #888; font-family: monospace;">SKU: ${item.sku}</small>
                            <div style="color: #666; font-size: 13px;">${item.price} ${cur} × ${item.quantity}</div>
                        </div>
                        <button onclick="window.removeFromCart(${item.id})" style="background: none; border: none; color: #c0392b; cursor: pointer; font-size: 16px;">×</button>
                    </div>
                `}).join('');
            }
        }

        const cur = translations[currentLang].currency;
        if (cartSubtotal) cartSubtotal.textContent = `${summary.subtotal} ${cur}`;
        const discountRow = document.getElementById('cart-discount-row');
        const discountEl = document.getElementById('cart-discount');
        const discountLabel = document.getElementById('cart-discount-label');
        if (discountRow) discountRow.hidden = summary.discount === 0;
        if (discountEl) discountEl.textContent = `${summary.discount} ${cur}`;
        if (discountLabel) {
            const lbl = summary.discountRate === 0.25
                ? (currentLang === 'ar' ? 'خصم 25٪' : currentLang === 'fr' ? 'Remise 25%' : 'Discount 25%')
                : summary.discountRate === 0.15
                    ? (currentLang === 'ar' ? 'خصم 15٪' : currentLang === 'fr' ? 'Remise 15%' : 'Discount 15%')
                    : (currentLang === 'ar' ? 'الخصم' : currentLang === 'fr' ? 'Remise' : 'Discount');
            discountLabel.textContent = lbl;
        }
        if (cartTotal) cartTotal.textContent = `${summary.total} ${cur}`;
    }

    window.removeFromCart = function(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartUI();
    };

    function openCart() {
        if (cartDrawer) cartDrawer.classList.add('open');
        if (overlay) overlay.hidden = false;
    }

    function closeCart() {
        if (cartDrawer) cartDrawer.classList.remove('open');
        if (overlay) overlay.hidden = true;
    }

    if (openCartBtn) openCartBtn.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (continueShoppingBtn) continueShoppingBtn.addEventListener('click', closeCart);
    if (overlay) overlay.addEventListener('click', () => { closeCart(); closeCheckout(); });

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            closeCart();
            if (checkoutModal) checkoutModal.classList.add('open');
            if (overlay) overlay.hidden = false;
        });
    }

    if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeCheckout);

    function closeCheckout() {
        if (checkoutModal) checkoutModal.classList.remove('open');
        if (overlay) overlay.hidden = true;
    }

    async function submitOrderToTajirCod(orderData) {
        const TAJIRCOD_WEBHOOK_URL = 'https://app.tajercod.com/webhook/ddb1d227-bdc9-4c09-9690-cd390ad69466/lightfunnels/96b9622a-9a37-4d3b-97a6-086a442294ac';
        try {
            const response = await fetch(TAJIRCOD_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: orderData.name,
                    phone: orderData.phone,
                    address: orderData.address,
                    product: orderData.product,
                    skuList: orderData.skuList,
                    quantity: orderData.quantity,
                    totalPrice: orderData.total,
                    storeLink: 'https://aligrowth.github.io/hayfo/',
                    createdAt: new Date().toISOString()
                })
            });
            if (response.ok) {
                console.log('تم إرسال الطلب بنجاح إلى TajirCod');
            } else {
                console.error('فشل في إرسال الطلب من المنصة');
            }
            return response.ok;
        } catch (error) {
            console.error('خطأ في الاتصال بالشبكة:', error);
            return false;
        }
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('customer-name')?.value || '';
            const phone = document.getElementById('customer-phone')?.value || '';
            const address = document.getElementById('customer-address')?.value || '';
            const orderId = '#HAYFO-' + Math.floor(10000 + Math.random() * 90000);
            const orderItems = cart.map(item => ({ ...item }));
            const summary = getCartSummary(cart);
            const subtotal = summary.subtotal;
            const totalQty = summary.totalItems;
            const discount = summary.discount;
            const total = summary.total;
            
            const orderData = {
                name,
                phone,
                address,
                product: orderItems.map(i => i.name).join('، '),
                skuList: orderItems.map(i => `${i.sku} (x${i.quantity})`).join(', '),
                quantity: totalQty,
                total
            };

            await submitOrderToTajirCod(orderData);

            lastOrder = { orderId, name, phone, address, items: orderItems, subtotal, discount, total };

            checkoutForm.hidden = true;
            if (orderSuccess) orderSuccess.hidden = false;
            cart = [];
            updateCartUI();
        });
    }

    if (finishOrderBtn) {
        finishOrderBtn.addEventListener('click', () => {
            closeCheckout();
            if (orderSuccess) orderSuccess.hidden = true;
            if (checkoutForm) checkoutForm.hidden = false;
        });
    }

    if (orderNumberBtn) {
        orderNumberBtn.addEventListener('click', () => {
            if (!lastOrder) return;
            showOrderCard(lastOrder);
        });
    }

    function showOrderCard(order) {
        const existing = document.getElementById('order-card-overlay');
        if (existing) existing.remove();

        const overlayEl = document.createElement('div');
        overlayEl.id = 'order-card-overlay';
        overlayEl.style.cssText = 'position:fixed;inset:0;background:rgba(20,19,17,.5);display:grid;place-items:center;z-index:999;padding:16px;';

        const card = document.createElement('div');
        card.style.cssText = 'background:#fffefa;max-width:480px;width:100%;border-radius:16px;padding:24px;text-align:right;box-shadow:0 12px 40px rgba(0,0,0,.2);max-height:90vh;overflow:auto;';

        const itemsHtml = order.items.map(it => `
            <div style="display:flex;justify-content:space-between;border-bottom:1px solid #eee;padding:8px 0;">
                <div>
                    <span>${it.name} × ${it.quantity}</span>
                    <small hidden style="display:block;color:#888;font-family:monospace;">SKU: ${it.sku}</small>
                </div>
                <strong>${it.price * it.quantity} درهم</strong>
            </div>
        `).join('');

        card.innerHTML = `
            <h2 style="margin:0 0 8px;color:#2c2825;">تفاصيل الطلب</h2>
            <p style="margin:0 0 16px;color:#666;">رقم الطلب: <strong>${order.orderId}</strong></p>
            <div style="margin-bottom:16px;">
                <h3 style="margin:0 0 8px;font-size:15px;">معلومات الزبون</h3>
                <p style="margin:2px 0;">الاسم: ${order.name}</p>
                <p style="margin:2px 0;">الهاتف: ${order.phone}</p>
                <p style="margin:2px 0;">العنوان: ${order.address}</p>
            </div>
            <div style="margin-bottom:16px;">
                <h3 style="margin:0 0 8px;font-size:15px;">المشتريات</h3>
                ${itemsHtml}
                ${order.discount ? `<div style="display:flex;justify-content:space-between;padding:4px 0;color:#c0392b;"><span>الخصم</span><span>-${order.discount} درهم</span></div>` : ''}
                <div style="display:flex;justify-content:space-between;margin-top:8px;font-weight:bold;">
                    <span>الإجمالي بعد الخصم</span><span>${order.total} درهم</span>
                </div>
            </div>
            <button id="close-order-card" style="background:#2c2825;color:#fff;border:none;padding:10px 16px;border-radius:8px;cursor:pointer;width:100%;font-weight:bold;">إغلاق</button>
        `;

        overlayEl.appendChild(card);
        document.body.appendChild(overlayEl);

        const closeBtn = card.querySelector('#close-order-card');
        if (closeBtn) closeBtn.addEventListener('click', () => overlayEl.remove());
        overlayEl.addEventListener('click', (e) => { if (e.target === overlayEl) overlayEl.remove(); });
    }

    renderProducts();
    updateCartUI();

    // عداد تنازلي لعرض الخصم
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        const countdownDuration = 3 * 60 * 60;
        const countdownStorageKey = 'hayfo_countdown_3h_v4';
        localStorage.removeItem('hayfo_countdown_end_time');
        localStorage.removeItem('hayfo_countdown_end_time_v2');
        localStorage.removeItem(countdownStorageKey);
        let endTime = Date.now() + countdownDuration * 1000;

        const updateCountdown = () => {
            const remaining = endTime - Date.now();
            if (remaining <= 0) { countdownEl.textContent = 'انتهى العرض'; return; }
            const totalSeconds = Math.ceil(remaining / 1000);
            const h = Math.floor(totalSeconds / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            const s = totalSeconds % 60;
            countdownEl.textContent = `ينتهي عرض الخصم خلال: ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
});