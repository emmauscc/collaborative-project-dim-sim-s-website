$( document ).ready(function() {
    console.log(CART_TOTAL)
    if(CART_TOTAL == 0){
        $("#checkout").removeAttr("href");
        $("#checkout").css("background-color", "#aaaaaa")
        $("#checkout").css("color", "black")
        $("#checkout").css("opacity", "0.6")
    }
});




firebaseHandler = new FireBaseHandler()
let CART_TOTAL = 0


getCartItems = () => {
    return JSON.parse(localStorage.getItem('cart'))
}





var cart_items = getCartItems()



removeProduct = (element) => {
    let parent_element = $(element).parent().parent()
    let product_id = parent_element.attr('product_id')

    console.log(cart_items,product_id)


    cart_items.forEach((item,index) => {
        
        if(item.id == product_id){
            cart_items.splice(index,1)
            localStorage.setItem('cart',JSON.stringify(cart_items))

            alert("Removed from cart")
            window.location.reload()
        }
    })





}


cart_items.forEach(cart_item => {
    CART_TOTAL += parseInt(cart_item.price)
    $('.products').append(`
    
        <div class="product" product_id="${cart_item.id}">
        <img src="${cart_item.image}">

        <div class="product-info">
            <h3 class="product-name">${cart_item.name}</h3>

            <h4 class="product-price">$${cart_item.price}</h4>

            <p class="product-size">Size: ${cart_item.carted_size}

            <p class="product-remove" onclick="removeProduct(this)">

                

                <span class="remove svg" >&#xF2ED Remove</span>

            </p>

        </div>

    </div>
    
    `)
})



document.getElementById('total_price').innerHTML = "$"+CART_TOTAL
document.getElementById('item_num').innerHTML = cart_items.length
