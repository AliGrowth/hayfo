document.addEventListener('DOMContentLoaded', () => {
    // قاموس الترجمات (عربي / فرنسي)
    const translations = {
        ar: {
            addToCart: "أضف إلى السلة",
            emptyCartTitle: "سلتكم تنتظر اختياراتكم",
            emptyCartDesc: "اكتشفوا الأجهزة وأضيفوها إلى السلة.",
            continueShopping: "مواصلة التسوق",
            subtotalLabel: "المجموع قبل الخصم",
            totalLabel: "الإجمالي بعد الخصم",
            checkoutBtn: "إتمام الطلب",
            modalCheckoutTitle: "إتمام الطلب",
            confirmOrderBtn: "تأكيد الطلب"
        },
        fr: {
            addToCart: "Ajouter au panier",
            emptyCartTitle: "Votre panier attend vos choix",
            emptyCartDesc: "Découvrez nos appareils et ajoutez-les au panier.",
            continueShopping: "Continuer vos achats",
            subtotalLabel: "Sous-total",
            totalLabel: "Total après réduction",
            checkoutBtn: "Commander",
            modalCheckoutTitle: "Finaliser la commande",
            confirmOrderBtn: "Confirmer la commande"
        }
    };

    let currentLang = 'ar';

    function changeLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        renderProducts();
        updateCartUI();
    }
    window.changeLanguage = changeLanguage;

    // مصفوفة المنتجات مع مطابقة مسارات وأسماء الصور الحالية لديك بدقة
    const products = [
        {
            id: 1,
            sku: "masseur-électrique5",
            name: "جهاز مساج الرقبة والتدليك Shiatsu",
            price: 229,
            oldPrice: 350,
            description: "جهاز متعدد الوظائف للراحة والاسترخاء وتخفيف آلام الرقبة والكتفين.",
            badge: "الأكثر مبيعاً",
            image: "images/تدليك الرقبة.webp"
        },
        {
            id: 2,
            sku: "appareil-de-massage-facial",
            name: "جهاز مساج الوجه EMS ميني",
            price: 199,
            oldPrice: 290,
            description: "لشد الوجه وتحفيز الكولاجين والعناية اليومية بالبشرة.",
            badge: "عرض خاص",
            image: "images/face-massage-user.webp"
        },
        {
            id: 3,
            sku: "massager-pen",
            name: "مسدس المساج العضلي المحمول",
            price: 269,
            oldPrice: 400,
            description: "لتخفيف تشنجات العضلات واسترخاء الجسم بعد التعب والتمارين.",
            badge: "جديد",
            image: "images/قلم التدليك1.webp"
        }
    ];

    const cartStorageKey = 'hayfo_cart_v1';
    let cart = [];
    try {
        const storedCart = JSON.parse(localStorage.getItem(cartStorageKey) || '[]');
        if (Array.isArray(storedCart)) {
            cart = storedCart.filter(item =>
                item &&
                Number.isFinite(Number(item.id)) &&
                Number.isFinite(Number(item.quantity)) &&
                Number(item.quantity) > 0
            ).map(item => ({ ...item, quantity: Number(item.quantity) }));
        }
    } catch (error) {
        console.warn('تعذر تحميل سلة التسوق المحفوظة:', error);
        cart = [];
    }

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
        productGrid.innerHTML = products.map(p => `
            <div class="product-card" style="border: 1px solid #e0dcd5; padding: 20px; border-radius: 16px; background: #fff; text-align: right; box-shadow: 0 4px 12px rgba(0,0,0,0.03); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 15px;" onerror="this.src='https://via.placeholder.com/300x200?text=Hayfo+Luxury'">
                    <span style="background: #2c2825; color: #fff; padding: 4px 12px; font-size: 12px; border-radius: 20px; display: inline-block; margin-bottom: 12px;">${p.badge}</span>
                    <h3 style="margin: 0 0 5px; font-size: 18px; color: #2c2825;">${p.name}</h3>
                    <small style="color: #888; display: block; margin-bottom: 10px; font-family: monospace;">SKU: ${p.sku}</small>
                    <p style="color: #666; font-size: 14px; margin-bottom: 20px; line-height: 1.5;">${p.description}</p>
                </div>
                <div>
                    <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 15px;">
                        <strong style="color: #c0392b; font-size: 20px;">${p.price} درهم</strong>
                        <span style="text-decoration: line-through; color: #999; font-size: 14px;">${p.oldPrice} درهم</span>
                    </div>
                    <button type="button" class="add-to-cart" data-product-id="${p.id}" style="background: #2c2825; color: #fff; border: none; padding: 12px; border-radius: 8px; cursor: pointer; width: 100%; font-weight: bold;">${translations[currentLang].addToCart}</button>
                </div>
            </div>
        `).join('');
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
    };

    if (productGrid) {
        productGrid.addEventListener('click', (event) => {
            const addButton = event.target.closest('.add-to-cart');
            if (!addButton) return;

            event.preventDefault();
            event.stopPropagation();

            const productId = Number(addButton.dataset.productId);
            if (Number.isFinite(productId)) {
                window.addToCart(productId);
            }
        });
    }

    function updateCartUI() {
        const summary = getCartSummary(cart);
        try {
            localStorage.setItem(cartStorageKey, JSON.stringify(cart));
        } catch (error) {
            console.warn('تعذر حفظ سلة التسوق:', error);
        }
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
                cartItemsContainer.innerHTML = cart.map(item => `
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding: 12px 0;">
                        <div>
                            <h4 style="margin: 0; font-size: 14px; color: #2c2825;">${item.name}</h4>
                            <small style="color: #888; font-family: monospace;">SKU: ${item.sku}</small>
                            <div style="color: #666; font-size: 13px;">${item.price} درهم × ${item.quantity}</div>
                        </div>
                        <button onclick="window.removeFromCart(${item.id})" style="background: none; border: none; color: #c0392b; cursor: pointer; font-size: 16px;">×</button>
                    </div>
                `).join('');
            }
        }

        if (cartSubtotal) cartSubtotal.textContent = `${summary.subtotal} درهم`;
        const discountRow = document.getElementById('cart-discount-row');
        const discountEl = document.getElementById('cart-discount');
        const discountLabel = document.getElementById('cart-discount-label');
        if (discountRow) discountRow.hidden = summary.discount === 0;
        if (discountEl) discountEl.textContent = `${summary.discount} درهم`;
        if (discountLabel) discountLabel.textContent = summary.discountRate === 0.25 ? (currentLang === 'ar' ? 'خصم 25٪' : 'Remise 25%') : summary.discountRate === 0.15 ? (currentLang === 'ar' ? 'خصم 15٪' : 'Remise 15%') : (currentLang === 'ar' ? 'الخصم' : 'Remise');
        if (cartTotal) cartTotal.textContent = `${summary.total} درهم`;
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
                    <small style="display:block;color:#888;font-family:monospace;">SKU: ${it.sku}</small>
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

    function initCountdown() {
        const timerElement = document.getElementById('countdown');
        if (!timerElement) return;

        const durationSeconds = 3 * 60 * 60;
        const countdownStorageKey = 'hayfo_countdown_end_time_3h_v1';
        const now = Math.floor(Date.now() / 1000);
        const savedTime = Number(localStorage.getItem(countdownStorageKey));
        let endTime;

        localStorage.removeItem('hayfo_timer_end');

        if (Number.isFinite(savedTime) && savedTime > now) {
            endTime = savedTime;
        } else {
            endTime = now + durationSeconds;
            localStorage.setItem(countdownStorageKey, String(endTime));
        }

        const updateCountdown = () => {
            const remaining = endTime - Math.floor(Date.now() / 1000);
            if (remaining <= 0) {
                timerElement.textContent = 'انتهى العرض';
                return;
            }

            const hours = Math.floor(remaining / 3600);
            const minutes = Math.floor((remaining % 3600) / 60);
            const seconds = remaining % 60;

            timerElement.textContent = 
                String(hours).padStart(2, '0') + ':' + 
                String(minutes).padStart(2, '0') + ':' + 
                String(seconds).padStart(2, '0');
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    renderProducts();
    updateCartUI();
    initCountdown();
});