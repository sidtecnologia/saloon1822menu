document.addEventListener('DOMContentLoaded', () => {

    const recommendedContainer = document.getElementById('recommended-cards');
    const categoriesContainer = document.getElementById('all-categories');
    
    // Referencias al modal y al carrito
    const modal = document.getElementById('imageModal');
    const fullImage = document.getElementById('fullImage');
    const closeBtn = document.getElementsByClassName('close-button')[0];
    const cartBtn = document.getElementById('cart-btn');
    const cartBadge = document.getElementById('cart-badge'); // Nuevo elemento
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const closeCartBtn = document.getElementsByClassName('close-cart-btn')[0];

    // --- Array para el carrito ---
    let cart = [];

    // --- Función para generar una tarjeta de producto con botones de cantidad ---
    const generateProductCard = (product) => {
        return `
            <div class="product-card" data-product-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image modal-trigger" data-src="${product.image}">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">$${product.price.toFixed()}</p>
                    <div class="product-actions">
                        <button class="add-to-cart-btn" data-id="${product.id}">Añadir al Carrito</button>
                    </div>
                </div>
            </div>
        `;
    };

    // --- Funciones para manejar el carrito ---

    const updateCart = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let totalItems = 0; // Contador de ítems
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Tu carrito está vacío.</p>';
        } else {
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <span>${item.name} (${item.quantity})</span>
                    <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    <div class="cart-item-controls">
                        <button class="decrease-qty" data-id="${item.id}">-</button>
                        <button class="increase-qty" data-id="${item.id}">+</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemElement);
                total += item.price * item.quantity;
                totalItems += item.quantity; // Sumamos la cantidad de cada producto
            });
        }
        cartTotalElement.textContent = total.toFixed(2);
        cartBadge.textContent = totalItems; // Actualizamos el globo con el total de ítems
        if (totalItems > 0) {
            cartBadge.style.display = 'flex'; // Muestra el globo si hay ítems
        } else {
            cartBadge.style.display = 'none'; // Oculta el globo si está vacío
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
    
    // --- Generación del menú (sin cambios) ---
    const recommendedProducts = menuData.filter(product => product.recommended);
    recommendedProducts.forEach(product => {
        recommendedContainer.innerHTML += generateProductCard(product);
    });

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

    // --- Event Listeners ---
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

    // Abrir y cerrar el modal del carrito
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

        const whatsappNumber = '573123456789';
        let message = "¡Hola! Quisiera hacer el siguiente pedido:\n\n";
        let total = 0;

        cart.forEach(item => {
            message += `* ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
            total += item.price * item.quantity;
        });

        message += `\nTotal: $${total.toFixed(2)}`;
        
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    });

    // Funcionalidad de modal de imagen y categorías expandibles (sin cambios)
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

    // Llama a updateCart al inicio para inicializar el badge
    updateCart();
});