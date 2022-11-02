    


firebaseHandler = new FireBaseHandler()
let CART_TOTAL = 0

characters = ["QWERTYUIOPASDFGHJKLZXCVBNM1234567890"]

getCartItems = () => {
    return JSON.parse(localStorage.getItem('cart'))
}

var cart_items = getCartItems()

let subtotal = 0


cart_items.forEach(cart_item => {
    CART_TOTAL += parseInt(cart_item.price)
    $('.checkoutCart').append(`
    
        <div class="checkoutProduct" product_id="${cart_item.id}">${cart_item.name} ${cart_item.carted_size} - $${cart_item.price}</div><br>

    
    `)
})

$('.checkoutCart').append(`<div id="subtotal"></div>`)

document.getElementById('subtotal').innerHTML = "Subtotal: $"+CART_TOTAL

generate_id = (n) => {
    return this.name.substring(n).toUpperCase()+'-'+this.getRandomArbitrary(1000,9999)
}

getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

invoiceNum = generate_id(8);

console.log(invoiceNum)


