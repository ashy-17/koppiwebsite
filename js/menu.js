// Cart functionality
let cart = [];
const productModal = new bootstrap.Modal(document.getElementById('productModal'));
let currentProduct = null;

// DOM Elements
const cartButton = document.getElementById('cartButton');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cartItems');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const cartTotal = document.getElementById('cartTotal');
const totalAmount = document.getElementById('totalAmount');
const checkoutBtn = document.getElementById('checkoutBtn');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');

// Open cart sidebar
cartButton.addEventListener('click', () => {
    cartSidebar.classList.add('open');
    overlay.classList.add('show');
});

// Close cart sidebar
closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('show');
});

overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('show');
});

// Product modal setup
document.querySelectorAll('[data-bs-toggle="modal"]').forEach(element => {
    element.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const title = this.getAttribute('data-title');
        const price = this.getAttribute('data-price');
        const img = this.getAttribute('data-img');
        const desc = this.getAttribute('data-desc');
        
        currentProduct = { id, title, price, img, desc };
        
        document.getElementById('modalProductImg').src = img;
        document.getElementById('modalProductImg').alt = title;
        document.getElementById('modalProductTitle').textContent = title;
        document.getElementById('modalProductPrice').textContent = `₱${price}`;
        document.getElementById('modalProductDescription').textContent = desc;
        document.getElementById('modalQuantity').value = 1;
    });
});

// Quantity selectors
document.querySelectorAll('.quantity-btn').forEach(button => {
    button.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const input = document.querySelector(`.quantity-input[data-id="${id}"]`);
        let value = parseInt(input.value);
        
        if (this.classList.contains('minus') && value > 1) {
            input.value = value - 1;
        } else if (this.classList.contains('plus')) {
            input.value = value + 1;
        }
    });
});

// Modal quantity controls
document.getElementById('modalMinus').addEventListener('click', () => {
    const input = document.getElementById('modalQuantity');
    let value = parseInt(input.value);
    if (value > 1) input.value = value - 1;
});

document.getElementById('modalPlus').addEventListener('click', () => {
    const input = document.getElementById('modalQuantity');
    input.value = parseInt(input.value) + 1;
});

// Add to cart from modal
document.getElementById('modalAddToCart').addEventListener('click', () => {
    const quantity = parseInt(document.getElementById('modalQuantity').value);
    addToCart(currentProduct, quantity);
    productModal.hide();
});

// Add to cart from cards
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const card = this.closest('.menu-card');
        const title = card.querySelector('.menu-title').textContent;
        const price = card.querySelector('.price-tag').textContent.replace('₱', '');
        const img = card.querySelector('.menu-img').src;
        const quantity = parseInt(card.querySelector('.quantity-input').value);
        
        const product = {
            id,
            title,
            price,
            img,
            quantity
        };
        
        addToCart(product, quantity);
    });
});

// Add item to cart
function addToCart(product, quantity) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity
        });
    }
    
    updateCart();
    showNotification(`${product.title} added to cart`);
}

// Update cart UI
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
    
    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        emptyCartMessage.classList.remove('d-none');
        cartTotal.classList.add('d-none');
        checkoutBtn.classList.add('d-none');
    } else {
        emptyCartMessage.classList.add('d-none');
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="d-flex">
                    <img src="${item.img}" alt="${item.title}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h5>${item.title}</h5>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="cart-item-price">₱${item.price}</span>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                            </div>
                        </div>
                    </div>
                    <button class="btn-remove" data-id="${item.id}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        
        // Update total
        const total = cart.reduce((sum, item) => sum + (parseInt(item.price) * item.quantity), 0);
        totalAmount.textContent = total;
        
        cartTotal.classList.remove('d-none');
        checkoutBtn.classList.remove('d-none');
    }
    
    // Add event listeners to cart items
    addCartItemEventListeners();
}

// Add event listeners to cart items
function addCartItemEventListeners() {
    document.querySelectorAll('.cart-item .quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const item = cart.find(item => item.id === id);
            
            if (this.classList.contains('minus')) {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart = cart.filter(item => item.id !== id);
                }
            } else if (this.classList.contains('plus')) {
                item.quantity++;
            }
            
            updateCart();
        });
    });
    
    document.querySelectorAll('.btn-remove').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            cart = cart.filter(item => item.id !== id);
            updateCart();
            showNotification('Item removed from cart');
        });
    });
}

// Show notification
function showNotification(message) {
    notificationMessage.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Checkout button
// Replace the existing checkout button event listener with this:
checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        // Save cart data to localStorage before redirecting
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cartTotal', totalAmount.textContent);
        
        // Redirect to checkout page
        window.location.href = 'checkout.html';
    }
});

// Filter menu items by category
document.querySelectorAll('.category-tabs .nav-link').forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Update active tab
        document.querySelectorAll('.category-tabs .nav-link').forEach(t => {
            t.classList.remove('active');
        });
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        filterMenuItems(category);
    });
});

// Filter menu items
function filterMenuItems(category) {
    const items = document.querySelectorAll('#menuItems .col-md-6');
    
    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Search functionality
const searchBar = document.querySelector('.search-bar');
searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.toLowerCase();
    const items = document.querySelectorAll('.menu-card');
    
    items.forEach(item => {
        const title = item.querySelector('.menu-title').textContent.toLowerCase();
        const description = item.querySelector('.menu-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            item.closest('.col-md-6').style.display = 'block';
        } else {
            item.closest('.col-md-6').style.display = 'none';
        }
    });
});

// Initialize cart
updateCart();