document.addEventListener('DOMContentLoaded', () => {

    const recommendedContainer = document.getElementById('recommended-cards');
    const categoriesContainer = document.getElementById('all-categories');
    
    const modal = document.getElementById('imageModal');
    const fullImage = document.getElementById('fullImage');
    const closeBtn = document.getElementsByClassName('close-button')[0];
    
    // Función para generar una tarjeta de producto
    const generateProductCard = (product) => {
        const whatsappNumber = '573123456789';
        const message = encodeURIComponent(`Hola, me gustaría ordenar: ${product.name}`);
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image modal-trigger" data-src="${product.image}">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">$${product.price.toFixed()}</p>
                    <a href="${whatsappLink}" class="order-button" target="_blank">
                        Pedir
                    </a>
                </div>
            </div>
        `;
    };

    // 1. Generar la sección de productos recomendados (sin cambios)
    const recommendedProducts = menuData.filter(product => product.recommended);
    recommendedProducts.forEach(product => {
        recommendedContainer.innerHTML += generateProductCard(product);
    });

    // 2. Agrupar productos por categoría y generar secciones expandibles
    const categories = [...new Set(menuData.map(product => product.category))];
    
    categories.forEach(category => {
        const categorySection = document.createElement('section');
        categorySection.className = 'menu-category-section';

        const categoryTitleBtn = document.createElement('h3');
        categoryTitleBtn.className = 'category-title collapsible-btn';
        categoryTitleBtn.innerHTML = `
            ${category.charAt(0).toUpperCase() + category.slice(1)} <span class="arrow-icon">▼</span>
        `;
        
        const productsGrid = document.createElement('div');
        productsGrid.className = 'product-grid collapsible-content';
        
        const productsInCategory = menuData.filter(product => product.category === category);
        productsInCategory.forEach(product => {
            productsGrid.innerHTML += generateProductCard(product);
        });
        
        categorySection.appendChild(categoryTitleBtn);
        categorySection.appendChild(productsGrid);
        categoriesContainer.appendChild(categorySection);
    });

    // 3. Añadir la funcionalidad del modal
    const images = document.querySelectorAll('.modal-trigger');
    images.forEach(image => {
        image.addEventListener('click', function() {
            modal.style.display = "block";
            fullImage.src = this.dataset.src;
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // --- NUEVA FUNCIONALIDAD: Categorías expandibles ---
    const collapsibleButtons = document.querySelectorAll('.collapsible-btn');

    collapsibleButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            const arrow = this.querySelector('.arrow-icon');
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                arrow.style.transform = 'rotate(0deg)';
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                arrow.style.transform = 'rotate(-90deg)';
            }
        });
    });
});