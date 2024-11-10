 // script.js
 function switchImage(imageSrc) {
    const mainImage = document.getElementById("mainProductImage");
    mainImage.style.opacity = "0"; // Start fading out

    setTimeout(() => {
        mainImage.src = imageSrc;
        mainImage.style.opacity = "1"; // Fade in with new image
    }, 300);

    // Update active thumbnail
    document.querySelectorAll(".thumbnails img").forEach(thumbnail => {
        thumbnail.classList.remove("active");
    });
    event.target.classList.add("active");
}

let cart = [];
        let totalPrice = 0;

        function addToCart(productName, price) {
            const existingProduct = cart.find(item => item.name === productName);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ name: productName, price: price, quantity: 1 });
            }
            updateCartDisplay();
        }

        function increaseQuantity(productName) {
            const product = cart.find(item => item.name === productName);
            if (product) {
                product.quantity += 1;
                updateCartDisplay();
            }
        }

        function decreaseQuantity(productName) {
            const product = cart.find(item => item.name === productName);
            if (product && product.quantity > 1) {
                product.quantity -= 1;
            } else if (product && product.quantity === 1) {
                // Remove item if quantity is 1 and user clicks '-'
                cart = cart.filter(item => item.name !== productName);
            }
            updateCartDisplay();
        }

        function updateCartDisplay() {
            const cartItemsList = document.getElementById("cart-items");
            const totalPriceDisplay = document.getElementById("total-price");

            cartItemsList.innerHTML = "";
            totalPrice = 0;

            cart.forEach(item => {
                const li = document.createElement("li");
                li.innerHTML = `
                    ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                    <button onclick="increaseQuantity('${item.name}')">+</button>
                    <button onclick="decreaseQuantity('${item.name}')">-</button>
                `;
                cartItemsList.appendChild(li);
                totalPrice += item.price * item.quantity;
            });

            totalPriceDisplay.textContent = totalPrice.toFixed(2);
        }

        function toggleCartModal() {
            const modal = document.getElementById("cart-modal");
            modal.style.display = (modal.style.display === "block") ? "none" : "block";
        }
        function checkout() {
            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }

            const name = document.querySelector(".contact-form input[type='text']").value;
            const userMessage = document.querySelector(".contact-form textarea").value;

            if (!name || !userMessage) {
                alert("Please fill out your name and message in the contact form.");
                return;
            }

            let message = `Order Details:\n\nName: ${name}\nMessage: ${userMessage}\n\nItems:\n`;

            cart.forEach((item, index) => {
                message += `${index + 1}. ${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}\n`;
            });

            message += `\nTotal: $${totalPrice.toFixed(2)}\nThank you for your purchase!`;

            const encodedMessage = encodeURIComponent(message);
            const phoneNumber = "96103226752";
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            window.open(whatsappURL, "_blank");

            cart = [];
            updateCartDisplay();
            document.querySelector(".contact-form input[type='text']").value = "";
            document.querySelector(".contact-form textarea").value = "";
            toggleCartModal();
        }

        window.onclick = function(event) {
            const modal = document.getElementById("cart-modal");
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }