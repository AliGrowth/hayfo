document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. إدارة السلة وعرض المنتجات (Shopping Cart & UI)
    // ----------------------------------------------------
    const cart = JSON.parse(localStorage.getItem('hayfo_cart')) || [];
    
    // حفظ السلة محلياً
    function saveCart() {
        localStorage.setItem('hayfo_cart', JSON.stringify(cart));
    }

    // ----------------------------------------------------
    // 2. دالة إرسال الطلب إلى منصة TajirCod (Webhook Integration)
    // ----------------------------------------------------
    async function submitOrderToTajirCod(orderData) {
        // استبدل الرابط أدناه برابط الـ Webhook الفعلي الذي ستحصل عليه من منصة TajirCod
        const TAJIRCOD_WEBHOOK_URL = 'https://app.tajircod.com/api/v1/webhook/your-unique-code-here';

        try {
            const response = await fetch(TAJIRCOD_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: orderData.name,         // اسم الزبون
                    phone: orderData.phone,       // رقم الهاتف
                    address: orderData.address,   // العنوان / المدينة
                    product: orderData.product,   // اسم المنتج
                    quantity: orderData.quantity, // الكمية
                    totalPrice: orderData.total,  // الثمن الإجمالي
                    storeLink: 'https://aligrowth.github.io/hayfo/',
                    createdAt: new Date().toISOString()
                }),
            });

            if (response.ok) {
                console.log('تم إرسال الطلب بنجاح إلى TajirCod');
                alert('تم تأكيد طلبك بنجاح! سنتصل بك قريباً لتأكيد الشحن.');
                localStorage.removeItem('hayfo_cart'); // تفريغ السلة بعد الطلب
                window.location.reload();
            } else {
                console.error('فشل في إرسال الطلب من المنصة');
                alert('حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مجدداً.');
            }
        } catch (error) {
            console.error('خطأ في الاتصال بالشبكة:', error);
            alert('تأكد من اتصالك بالإنترنت وحاول مرة أخرى.');
        }
    }

    // ربط نموذج الطلب (Checkout Form) إذا كان متوفراً في الصفحة
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const customerName = document.getElementById('customer-name')?.value || '';
            const customerPhone = document.getElementById('customer-phone')?.value || '';
            const customerAddress = document.getElementById('customer-address')?.value || '';
            
            const orderData = {
                name: customerName,
                phone: customerPhone,
                address: customerAddress,
                product: 'منتج من متجر هايفو - Hayfo',
                quantity: 1,
                total: 229 // مثال على الثمن بالدرهم حسب محتوى المتجر
            };

            await submitOrderToTajirCod(orderData);
        });
    }
});