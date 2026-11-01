// ===== العد التنازلي =====
const DURATION = 3 * 60 * 60 * 1000; // 3 ساعات
const COUNTDOWN_STORAGE_KEY = 'hayfo_countdown_end_time_3h_v1';

function getEndTime() {
    const now = Date.now();
    let end = Number(localStorage.getItem(COUNTDOWN_STORAGE_KEY));
    // إذا لم يكن هناك وقت مخزن أو قد انتهى الوقت، قم بإنشاء وقت جديد فوراً
    if (!Number.isFinite(end) || end <= now || end > now + DURATION) {
        end = now + DURATION;
        localStorage.setItem(COUNTDOWN_STORAGE_KEY, String(end));
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
        el.textContent = `${h}:${m}:${s}`;
        
        if (left === 0) {
            localStorage.removeItem(COUNTDOWN_STORAGE_KEY);
        }
    };
    tick();
    setInterval(tick, 1000);
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
