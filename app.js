// ===== العد التنازلي =====
const DURATION = 3 * 60 * 60 * 1000; // 3 ساعات

function getEndTime() {
    let end = Number(localStorage.getItem('countdownEnd'));
    // إذا لم يكن هناك وقت مخزن أو قد انتهى الوقت، قم بإنشاء وقت جديد فوراً
    if (!end || isNaN(end) || Date.now() >= end) {            
        end = Date.now() + DURATION;
        localStorage.setItem('countdownEnd', end);
    }
    return end;
}

function startCountdown(el) {
    if (!el) return;
    const tick = () => {
        const end = getEndTime();
        const left = Math.max(0, end - Date.now());
        const h = String(Math.floor(left / 3600000)).padStart(2, '0');
        const m = String(Math.floor((left % 3600000) / 60000)).padStart(2, '0');
        const s = String(Math.floor((left % 60000) / 1000)).padStart(2, '0');
        el.textContent = ${h}::;
        
        if (left === 0) {
            localStorage.removeItem('countdownEnd');
        }
    };
    tick();
    setInterval(tick, 1000);
}

// ===== السلة =====
const getCart = () => JSON.parse(localStorage.getItem('cart') || '[]');
const saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

function addToCart(product) {
    const cart = getCart();
    const item = cart.find(i => i.id === product.id);
    item ? item.qty++ : cart.push({ ...product, qty: 1 });
    saveCart(cart);
    
    const cartCountEl = document.querySelector('#cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = cart.reduce((n, i) => n + i.qty, 0);
    }
}

// ===== اللغة =====
const SUPPORTED = ['ar', 'fr', 'en'];
function detectLang() {
    const saved = localStorage.getItem('lang');
    if (saved) return saved;
    const browser = (navigator.language || 'en').slice(0, 2);
    return SUPPORTED.includes(browser) ? browser : 'en';
}
function applyLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}
applyLang(detectLang());
