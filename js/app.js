document.addEventListener('DOMContentLoaded', () => {

    const recommendedContainer = document.getElementById('recommended-cards');
    const categoriesContainer = document.getElementById('all-categories');
    
    // Referencias al modal
    const modal = document.getElementById('imageModal');
    const fullImage = document.getElementById('fullImage');
    const closeBtn = document.getElementsByClassName('close-button')[0];
    
    // --- Función para generar una tarjeta de producto ---
    const generateProductCard = (product) => {
        const whatsappNumber = '573186789977';
        const message = encodeURIComponent(`Hola, me gustaría pedir: ${product.name}`);
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

    // --- 1. Generar la sección de productos recomendados ---
    const recommendedProducts = menuData.filter(product => product.recommended);
    recommendedProducts.forEach(product => {
        recommendedContainer.innerHTML += generateProductCard(product);
    });

    // --- 2. Agrupar productos por categoría y generar secciones ---
    const categories = [...new Set(menuData.map(product => product.category))];
    
    categories.forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.className = 'menu-category-section';
        categorySection.innerHTML = `<h3 class="category-title">${category.charAt(0).toUpperCase() + category.slice(1)}</h3>`;
        
        const productsGrid = document.createElement('div');
        productsGrid.className = 'product-grid';
        
        const productsInCategory = menuData.filter(product => product.category === category);
        productsInCategory.forEach(product => {
            productsGrid.innerHTML += generateProductCard(product);
        });
        
        categorySection.appendChild(productsGrid);
        categoriesContainer.appendChild(categorySection);
    });

    // --- 3. Agregar funcionalidad del Modal ---
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

    // Opcional: Cerrar el modal haciendo clic fuera de la imagen
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});