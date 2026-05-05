function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(item){
    const cart = loadCart();
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if(existingItem){
        existingItem.quantity += item.quantity;
    } else {
        cart.push(item);
    }
    saveCart(cart);
    updateCart();
}

function loadCart(){
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

function removeFromCart(itemId){
    const cart = loadCart().filter(item => item.id !== itemId);
    saveCart(cart);
    updateCart();
}