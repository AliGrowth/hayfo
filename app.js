document.addEventListener('DOMContentLoaded', () => {
    // قائمة المنتجات الثلاثة لمتجر هايفو
    const products = [
        {
            id: 1,
            name: "جهاز مساج الرقبة والتدليك Shiatsu",
            price: 229,
            oldPrice: 350,
            description: "جهاز متعدد الوظائف للراحة والاسترخاء وتخفيف آلام الرقبة والكتفين.",
            badge: "الأكثر مبيعاً"
        },
        {
            id: 2,
            name: "جهاز مساج الوجه EMS ميني",
            price: 199,
            oldPrice: 290,
            description: "لشد الوجه وتحفيز الكولاجين والعناية اليومية بالبشرة.",
            badge: "عرض خاص"
        },
        {
            id: 3,
            name: "مسدس المساج العضلي المحمول",
            price: 269,
            oldPrice: 400,
            description: "لتخفيف تشنجات العضلات واسترخاء الجسم بعد التعب والتمارين.",
            badge: "جديد"
        }
    ];

    const productGrid = document.getElementById('product-grid');
    
    // عرض المنتجات الثلاثة في الصفحة الرئيسية
    if (productGrid) {
        productGrid.innerHTML = products.map(p => `
            <div class="product-card" style="border: 1px solid #e0dcd5; padding: 20px; border-radius: 12px; background: #fff; text-align: right; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                <span style="background: #2c2825; color: #fff; padding: 4px 10px; font-size: 12px; border-radius: 20px;">${p.badge}</span>
                <h3 style="margin: 15px 0 10px; font-size: 18px; color: #2c2825;">${p.name}</h3>
                <p style="color: #666; font-size: 14px; margin-bottom: 15px;">${p.description}</p>
                <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 15px;">
                    <strong style="color: #c0392b; font-size: 20px;">${p.price} درهم</strong>
                    <span style="text-decoration: line-through; color: #999; font-size: 14px;">${p.oldPrice} درهم</span>
                </div>
                <button onclick="alert('تمت الإضافة إلى السلة بنجاح')" style="background: #2c2825; color: #fff; border: none; padding: 12px; border-radius: 8px; cursor: pointer; width: 100%; font-weight: bold;">أضف إلى السلة</button>
            </div>
        `).join('');
    }
});