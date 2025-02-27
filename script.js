// script.js
document.addEventListener('DOMContentLoaded', function () {
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartToggle = document.querySelector('.cart-toggle');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    const cartCount = document.querySelector('.cart-count');
    let totalPrice = 0;
    let cart = [];

    // Toggle cart visibility
    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.toggle('open');
    });

    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });

    // Add to cart functionality
    document.querySelectorAll('.product button').forEach(button => {
        button.addEventListener('click', function () {
            const product = this.parentElement;
            const productName = product.querySelector('h3').innerText;
            const productPrice = parseFloat(product.querySelector('p').innerText.replace('$', ''));
            const productImage = product.querySelector('img').src;

            // Check if item already exists in cart
            const existingItem = cart.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity += 1; // Increase quantity if item already exists
            } else {
                cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 }); // Add new item to cart
            }

            updateCart(); // Update the cart UI
        });
    });

    // Update cart UI
    function updateCart() {
        cartItemsContainer.innerHTML = ''; // Clear the cart items container
        totalPrice = 0; // Reset total price
        cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0); // Update cart count

        // Loop through cart items and render them
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity">+</button>
                </div>
                <button class="remove-item">&times;</button>
            `;

            cartItemsContainer.appendChild(cartItem);

            // Update total price
            totalPrice += item.price * item.quantity;

            // Add event listeners for quantity buttons
            const decreaseButton = cartItem.querySelector('.decrease-quantity');
            const increaseButton = cartItem.querySelector('.increase-quantity');
            const removeButton = cartItem.querySelector('.remove-item');

            decreaseButton.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity -= 1; // Decrease quantity
                } else {
                    cart = cart.filter(cartItem => cartItem.name !== item.name); // Remove item if quantity is 1
                }
                updateCart(); // Update the cart UI
            });

            increaseButton.addEventListener('click', () => {
                item.quantity += 1; // Increase quantity
                updateCart(); // Update the cart UI
            });

            removeButton.addEventListener('click', () => {
                cart = cart.filter(cartItem => cartItem.name !== item.name); // Remove item from cart
                updateCart(); // Update the cart UI
            });
        });

        totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`; // Update total price display
    }

    // Checkout functionality
    document.querySelector('.checkout-btn').addEventListener('click', () => {
        if (cart.length > 0) {
            alert(`Thank you for your purchase! Total: $${totalPrice.toFixed(2)}`);
            cart = []; // Clear the cart
            updateCart(); // Update the cart UI
        } else {
            alert('Your cart is empty!');
        }
    });
});
