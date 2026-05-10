// How to add an item to the cart:
// 1. Create an item object with the necessary properties (e.g., name, price, image).
// 2. Call the addToCart function with the item object as an argument.
// Example:
// const item = { name: "Cat Toy", price: "9.99", image: "toy.jpg" };
// addToCart(item);

// Save the cart to localStorage
function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Load the cart from localStorage, or return an empty array if it doesn't exist
function loadCart(){
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

// Add an item to the cart (WIP: currently just adds the item to localStorage, no UI updates yet)
export function addToCart(item){
    let cart = loadCart();
    cart.push(item);
    saveCart(cart);
}

// Calculate the total price of items in the cart
function totalPrice(cart){
    let total = 0;
    cart.forEach(item => {
        console.log(item.price);
        total += parseFloat(item.price);
    });
    return total;
}

// Render the cart items and total price on the cart page
function renderCart(){
    const container = document.getElementById("cartItems");
    
    if (!container) return; // Exit if not on the cart page

    const cart = loadCart();
    const totalPriceElement = document.getElementById("totalPrice");

    container.innerHTML = "";
    let total = 0;

    if (!cart || cart.length === 0) {
        container.innerHTML = "<p style=\"text-align: center; font-size: 1.5rem;\">Your cart is empty.</p>";
        totalPriceElement.textContent = "Total: $0.00";
        return;
    }

    const table = document.createElement("table");
    table.style = "margin: 0 auto; border-collapse: collapse; width: 50%;";

    table.innerHTML = `
        <tr>
            <th style="width: 70%; text-align: left; padding: 8px;">Name</th>
            <th style="width: 30%; text-align: left; padding: 8px;">Price</th>
        </tr>`;

        cart.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <tr>
                <td style="text-align: left; padding: 8px;">${item.name}</td>
                <td style="text-align: left; padding: 8px;">$${item.price}</td>
            </tr>
            `;
            table.appendChild(row);
            total += parseFloat(item.price);
        });

    container.appendChild(table);
    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Save the orders to localStorage (this could be expanded to include more order details in a real application)
function saveOrders(orders){
    localStorage.setItem("orders", JSON.stringify(orders));
    console.log("Orders saved:", orders);
}

// Clear the cart by removing it from localStorage and re-rendering the cart page
function clearCart() {
    localStorage.removeItem("cart");
    renderCart();
}

if (document.getElementById("orderForm") !== null){
    document.getElementById("orderForm").addEventListener("submit", function(e) {e.preventDefault();

    console.log("Form submitted!");
    
    const orders = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        cart: loadCart(),
    };

    saveOrders(orders);
    clearCart();
})
};

renderCart();