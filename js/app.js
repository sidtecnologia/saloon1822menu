document.addEventListener('DOMContentLoaded', () => {

    const recommendedCarousel = document.getElementById('recommended-carousel');
    const categoriesContainer = document.getElementById('all-categories');

    // Referencias a modales y carrito
    const imageModal = document.getElementById('imageModal');
    const fullImage = document.getElementById('fullImage');
    const imageModalCaption = document.getElementById('image-modal-caption');
    const closeBtn = document.getElementsByClassName('close-button')[0];
    const cartBtn = document.getElementById('cart-btn');
    const cartBadge = document.getElementById('cart-badge');
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const closeCartBtn = document.getElementsByClassName('close-cart-btn')[0];

    let cart = [];

    // --- Generación de Tarjetas y Carrusel ---
    // Función para generar la tarjeta circular para el carrusel
    const generateCarouselCard = (product) => {
        return `
            <div class="carousel-item">
                <img src="${product.image}" alt="${product.name}" class="carousel-image modal-trigger" 
                     data-id="${product.id}" data-src="${product.image}" data-name="${product.name}" data-description="${product.description}" data-price="${product.price}">
            </div>
        `;
    };

    // Función para generar la tarjeta rectangular del menú completo
    const generateProductCard = (product) => {
        const starIcon = product.recommended ? '<span class="special-star">⭐</span>' : '';

        return `
            <div class="product-card" data-product-id="${product.id}">
                ${starIcon}
                <img src="${product.image}" alt="${product.name}" class="product-image modal-trigger" 
                     data-id="${product.id}" data-src="${product.image}" data-name="${product.name}" data-description="${product.description}" data-price="${product.price}">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">$${product.price.toFixed(3)}</p>
                    <div class="product-actions">
                        <button class="add-to-cart-btn" data-id="${product.id}">Añadir al Carrito</button>
                    </div>
                </div>
            </div>
        `;
    };

    // --- Lógica de Renderizado ---
    const recommendedProducts = menuData.filter(p => p.recommended);
    recommendedProducts.forEach(p => {
        recommendedCarousel.innerHTML += generateCarouselCard(p);
    });

    const categories = [...new Set(menuData.map(p => p.category))];
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
        
        const productsInCategory = menuData.filter(p => p.category === category);
        productsInCategory.forEach(p => {
            productsGrid.innerHTML += generateProductCard(p);
        });
        
        categorySection.appendChild(categoryTitleBtn);
        categorySection.appendChild(productsGrid);
        categoriesContainer.appendChild(categorySection);
    });

    // --- Lógica de Carrusel con Arrastre ---
    let isDragging = false;
    let startPos = 0;
    let scrollLeft = 0;

    recommendedCarousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        recommendedCarousel.classList.add('grabbing');
        startPos = e.pageX - recommendedCarousel.offsetLeft;
        scrollLeft = recommendedCarousel.scrollLeft;
    });

    recommendedCarousel.addEventListener('mouseleave', () => {
        isDragging = false;
        recommendedCarousel.classList.remove('grabbing');
    });

    recommendedCarousel.addEventListener('mouseup', () => {
        isDragging = false;
        recommendedCarousel.classList.remove('grabbing');
    });

    recommendedCarousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - recommendedCarousel.offsetLeft;
        const walk = (x - startPos) * 1.5;
        recommendedCarousel.scrollLeft = scrollLeft - walk;
    });

    // --- Lógica del Modal de Imagen ---
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            imageModal.style.display = "block";
            fullImage.src = this.dataset.src;
            imageModalCaption.innerHTML = `
                <h4>${this.dataset.name}</h4>
                <p>${this.dataset.description}</p>
                <p><strong>Precio: $${parseFloat(this.dataset.price).toFixed(3)}</strong></p>
                <button class="add-to-cart-btn" data-id="${this.dataset.id}">Añadir al Carrito</button>
            `;
        });
    });

    closeBtn.addEventListener('click', function() {
        imageModal.style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target == imageModal) {
            imageModal.style.display = "none";
        }
    });

    // --- Lógica de Categorías Expandibles ---
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

    // --- Lógica del Carrito ---
    const updateCart = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let totalItems = 0;
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Tu carrito está vacío.</p>';
        } else {
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <span>${item.name} (${item.quantity})</span>
                    <span class="cart-item-price">$${(item.price * item.quantity).toFixed(3)}</span>
                    <div class="cart-item-controls">
                        <button class="decrease-qty" data-id="${item.id}">-</button>
                        <button class="increase-qty" data-id="${item.id}">+</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemElement);
                total += item.price * item.quantity;
                totalItems += item.quantity;
            });
        }
        cartTotalElement.textContent = total.toFixed(3);
        cartBadge.textContent = totalItems;
        if (totalItems > 0) {
            cartBadge.style.display = 'flex';
        } else {
            cartBadge.style.display = 'none';
        }
    };

    const addToCart = (productId) => {
        const product = menuData.find(p => p.id === productId);
        if (product) {
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCart();
        }
    };
    
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            addToCart(e.target.dataset.id);
        }
        if (e.target.classList.contains('increase-qty')) {
            const item = cart.find(i => i.id === e.target.dataset.id);
            if (item) {
                item.quantity++;
                updateCart();
            }
        }
        if (e.target.classList.contains('decrease-qty')) {
            const itemIndex = cart.findIndex(i => i.id === e.target.dataset.id);
            if (itemIndex !== -1) {
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity--;
                } else {
                    cart.splice(itemIndex, 1);
                }
                updateCart();
            }
        }
    });

    cartBtn.addEventListener('click', () => {
        cartModal.style.display = "block";
        updateCart();
    });

    closeCartBtn.addEventListener('click', () => {
        cartModal.style.display = "none";
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = "none";
        }
    });
    
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Tu carrito está vacío. Añade productos para hacer tu pedido.");
            return;
        }

        const whatsappNumber = '573186789977';
        let message = "¡Hola! Quisiera hacer el siguiente pedido:\n\n";
        let total = 0;

        cart.forEach(item => {
            message += `* ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(3)}\n`;
            total += item.price * item.quantity;
        });

        message += `\nTotal: $${total.toFixed(3)}`;
        
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    });
    
    updateCart();
});