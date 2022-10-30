let product;
let currentID = "";
let clickedID = "";
let date = "";
let newdate = "";
let filteredProducts = [];
let brandArray = [];
let uniqueBrands = [];
let brandSelected = [];
let sizeArray = [];
let uniqueSizes = [];
let sizeSelected = [];

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
  });
}


const firebaseConfig2 = {
    apiKey: "AIzaSyBV4nXWhsM0VRWUTUXpb5C3UesQgk9eOuA",
    authDomain: "dimsims-webste.firebaseapp.com",
    databaseURL: "https://dimsims-webste-default-rtdb.firebaseio.com",
    projectId: "dimsims-webste",
    storageBucket: "dimsims-webste.appspot.com",
    messagingSenderId: "1048491640592",
    appId: "1:1048491640592:web:b26493fb73ac7af8fbc795",
    measurementId: "G-JK4SQYC925"

};

firebase.initializeApp(firebaseConfig2);

var modal = document.getElementById("myModal");

// Get the button that opens the modal

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        $(".productInformation").remove();
    }
}


function readAllData(){
    var getUserId = firebase.database().ref();

    getUserId.on('value', (snapshot) => {
    const data = snapshot.val();

    console.log(data);

    products = data['data']['products']
    console.log(products)




    for(var i=0; i<Object.keys(products).length; i++){

        currentID = products[Object.keys(products)[i]]['id']
        console.log(currentID)

        brandArray.push(products[currentID]['brand'])

        for(var j=0; j<Object.keys(products[currentID]['variants']).length; j++){
            sizeArray.push(products[currentID]['variants'][j]['value'])
        }

        date = JSON.stringify(new Date(products[currentID]['release_date']))
        newdate = date.substr(0, date.indexOf("T")).slice(1)
        $("#productContainer").append(`

        <div class="product" onclick="generateModal(this.id)" id="${currentID}">
          <img class="productImg" src="${products[currentID]['image']}">
          <div class="productName">${products[currentID]['name']}</div>
          <div class="productBrand">${products[currentID]['brand']}</div>
          <div class="productPrice">$${products[currentID]['price']}</div>
        </div>

      `)
    }
    console.log(brandArray)
    uniqueBrands = [...new Set(brandArray)]
    console.log(uniqueBrands)
    for(var i=0; i<uniqueBrands.length; i++){
        $("#brandContainer").append(`
            <div class="options">
                <input type="checkbox" name="brands" id="${uniqueBrands[i]}">
                <label for="${uniqueBrands[i]}">${uniqueBrands[i]}</label>
            </div>
        `)
    }

    uniqueSizes = [...new Set(sizeArray)]
    console.log(uniqueSizes)
    uniqueSizes.sort();
    for(var i=0; i<uniqueSizes.length; i++){
        $("#sizeContainer").append(`
        <div class="options">
            <input type="checkbox" name="sizes" id="${uniqueSizes[i]}">
            <label for="${uniqueSizes[i]}">${uniqueSizes[i]}</label>
        `)
    }
  
  })
}
readAllData();

function doFilters(){
    filteredProducts = [];
    brandSelected = [];
    sizeSelected = [];

    const productsArray = Object.values(products)


    

    function searchFilter(productsArray){
        if($("#searchBar") != ""){
            console.log(productsArray['name'].toLowerCase().includes($("#searchBar").val()))
            return productsArray['name'].toLowerCase().includes($("#searchBar").val())
        }
        console.log(productsArray)
    }

    $("input:checkbox[name='sizes']:checked").each(function(){
        let checkSize = $(this)[0]['id']
        sizeSelected.push(checkSize)
    })
    console.log(sizeSelected)
    console.log(productsArray)

    for(var i=0; i<productsArray.length; i++){
        for(var j=0; j<sizeSelected.length; j++){
            for(var k=0; k<Object.keys(productsArray[i]['variants']).length; k++){
                if(productsArray[i]['variants'][k]['value'] == sizeSelected[j]){
                    filteredProducts.push(productsArray[i])
                }
            }
        }
    }
    filteredProducts = [...new Set(filteredProducts)]
    console.log(filteredProducts)


    $("input:checkbox[name='brands']:checked").each(function(){
        let checkBrand = $(this)[0]['id']
        brandSelected.push(checkBrand);
    });
    console.log(brandSelected)

    if(sizeSelected.length > 0){
        newarray = [...new Set(filteredProducts)]
        console.log(newarray)
        for(var i=0; i<newarray.length; i++){
            for(var j=0; j<brandSelected.length; j++){
                console.log(newarray[i]['brand'].indexOf(brandSelected[j]))
                if(newarray[i]['brand'] == brandSelected[j]){
                    console.log(newarray[i])
                    filteredProducts.push(newarray[i])
                }else{
                    filteredProducts = [];
                }
            }
        }
    
    }else{
        for(var i=0; i<productsArray.length; i++){
            for(var j=0; j<brandSelected.length; j++){
                console.log(productsArray[i]['brand'].indexOf(brandSelected[j]))
                if(productsArray[i]['brand'] == brandSelected[j]){
                    filteredProducts.push(productsArray[i])
                }
            }
        }
    
    }
    filteredProducts = [...new Set(filteredProducts)]
    console.log(filteredProducts)

    

    
    if(brandSelected.length > 0 || sizeSelected.length > 0){
        filteredProducts = filteredProducts.filter(searchFilter);
    
    }else{
        filteredProducts = productsArray.filter(searchFilter)

    }

    if(filteredProducts.length == 0){
        $("#productContainer").empty();
    }
    

    
    console.log(filteredProducts)

    if(filteredProducts.length > 0){
        if($('input[name="radios"]:checked').val() == "New"){
            console.log(_.sortBy(filteredProducts, ['release_date']))
            filteredProducts = _.sortBy(filteredProducts, ['release_date'])
    
        }else if($('input[name="radios"]:checked').val() == "PriceL"){
    
            filteredProducts.forEach(u => u.price*=1)
            filteredProducts = _.sortBy(filteredProducts, ['price'])
    
        }else if($('input[name="radios"]:checked').val() == "PriceH"){
    
            filteredProducts.forEach(u => u.price*=1)
            filteredProducts = _.sortBy(filteredProducts, ['price']).reverse();
        
        }else if($('input[name="radios"]:checked').val() == "Name"){
    
            filteredProducts = _.sortBy(filteredProducts, ['name'])
        }
    }else if (filteredProducts.length < 1 && brandSelected.length < 1){
        if($('input[name="radios"]:checked').val() == "New"){
            console.log(_.sortBy(productsArray, ['release_date']))
            filteredProducts = _.sortBy(productsArray, ['release_date'])
    
        }else if($('input[name="radios"]:checked').val() == "PriceL"){
    
            productsArray.forEach(u => u.price*=1)
            filteredProducts = _.sortBy(productsArray, ['price'])
    
        }else if($('input[name="radios"]:checked').val() == "PriceH"){
    
            productsArray.forEach(u => u.price*=1)
            filteredProducts = _.sortBy(productsArray, ['price']).reverse();
        
        }else if($('input[name="radios"]:checked').val() == "Name"){
    
            filteredProducts = _.sortBy(productsArray, ['name'])
        }

    }
    
    

    
    if(filteredProducts.length > 0){
        $("div.product").remove();
        console.log(filteredProducts)
        for(var i=0; i<filteredProducts.length; i++){

            currentID = i;

            date = JSON.stringify(new Date(filteredProducts[currentID]['release_date']))
            newdate = date.substr(0, date.indexOf("T")).slice(1)
            $("#productContainer").append(`

            <div class="product" onclick="generateModal(this.id)" id="${currentID}">
            <img class="productImg" src="${filteredProducts[currentID]['image']}">
            <div class="productName">${filteredProducts[currentID]['name']}</div>
            <div class="productBrand">${filteredProducts[currentID]['brand']}</div>
            <div class="productPrice">$${filteredProducts[currentID]['price']}</div>
            </div>
            `)
        }
    }


    $("#brandContainer").empty();
    if(filteredProducts.length > 0){
        brandArray = [];
        for(var i=0; i<filteredProducts.length; i++){
            brandArray.push(filteredProducts[i]['brand'])
        }
        uniqueBrands = [...new Set(brandArray)]
        uniqueBrands.sort();
    }
    console.log(uniqueBrands)

    for(var i=0; i<uniqueBrands.length; i++){
        $("#brandContainer").append(`
            <div class="options">
                <input type="checkbox" name="brands" id="${uniqueBrands[i]}">
                <label for="${uniqueBrands[i]}">${uniqueBrands[i]}</label>
            </div>
        `)
    }

    $("#sizeContainer").empty();
    if(filteredProducts.length> 0){
        sizeArray = []
        for(var i=0; i<filteredProducts.length; i++){
            for(var j=0; j<filteredProducts[i]['variants'].length; j++){
                sizeArray.push(filteredProducts[i]['variants'][j]['value'])
            }
        }
        uniqueSizes = [...new Set(sizeArray)]
        uniqueSizes.sort();
    }
    console.log(uniqueSizes)

    for(var i=0; i<uniqueSizes.length; i++){
        $("#sizeContainer").append(`
            <div class="options">
                <input type="checkbox" name="sizes" id="${uniqueSizes[i]}">
                <label for="${uniqueSizes[i]}">${uniqueSizes[i]}</label>
            </div>
        `)
    }
    
}


initaliseLocalStorage = () => {
    if(localStorage.getItem('cart') == null){
        localStorage.setItem('cart', JSON.stringify([]))
        console.log('Local Storage Ready.')
    }
}

initaliseLocalStorage()


getCartData = () => {
    return JSON.parse(localStorage.getItem('cart'))
}

addToCart = (element) => {
    let parent_div = $(element).parent().parent()
    let product_id = $(parent_div).attr('product_id')
    let selected_size = document.getElementById('size').value

    let product_info = firebase.database().ref('data/products/'+product_id)
    product_info.on('value',snapshot => {
        var product = snapshot.val()
        product.carted_size = selected_size
        let cart_data = getCartData()

        cart_data.push(product)
        localStorage.setItem('cart',JSON.stringify(cart_data))

    })

  

    alert('Product Added To Cart!')


}



function generateModal(clickedID){
    
    console.log(clickedID)
    $(".modal-content").empty();
    modal.style.display = "block"




    if(filteredProducts.length > 0){
        date = JSON.stringify(new Date(filteredProducts[clickedID]['release_date']))
        newdate = date.substr(0, date.indexOf("T")).slice(1)
        console.log("FILTERED PRODUCTS EXIST")
        $(".modal-content").append(`


        <div class="productInformation" product_id="${clickedID}">
          <img class="Image" src="${filteredProducts[clickedID]['image']}">
          <div class="centreContainer">
            <div class="Name">${filteredProducts[clickedID]['name']}</div>
            <div class="Brand">${filteredProducts[clickedID]['brand']}</div>
            <div class="Price">$${filteredProducts[clickedID]['price']}</div>
          </div>

          <div class="secondContainer">
            <div class="ReleaseDate">Avaliable from: ${newdate}</div>
            <div class="Available">${filteredProducts[clickedID]['num_available']} In Stock</div>
          </div>

        <div class="bottomLeftContainer">           
          <div class="Size">
            <label for="size">Product Size:</label>
            <select name="size" id="size">
            </select>
          </div>
        </div>

        <div class="bottomRightContainer">
          <button class="CartButton" type="button" onclick="addToCart(this)">Add to Cart</button>

        </div>`)

        for(var i=0; i<filteredProducts[clickedID]['variants'].length; i++){
            console.log(filteredProducts[clickedID]['variants'][i]['value'])
            $("#size").append(`
            
            <option value="${filteredProducts[clickedID]['variants'][i]['value']}">${filteredProducts[clickedID]['variants'][i]['value']} - ${filteredProducts[clickedID]['variants'][i]['availability']} in stock</option>
            
            `)
        }
    }else{
        date = JSON.stringify(new Date(products[clickedID]['release_date']))
        newdate = date.substr(0, date.indexOf("T")).slice(1)
        $(".modal-content").append(`
    

        <div class="productInformation" product_id="${clickedID}">
          <img class="Image" src="${products[clickedID]['image']}">
          <div class="centreContainer">
            <div class="Name">${products[clickedID]['name']}</div>
            <div class="Brand">${products[clickedID]['brand']}</div>
            <div class="Price">$${products[clickedID]['price']}</div>
          </div>

          <div class="secondContainer">
            <div class="ReleaseDate">Avaliable from: ${newdate}</div>
            <div class="Available">${products[clickedID]['num_available']} In Stock</div>
          </div>

        <div class="bottomLeftContainer">           
          <div class="Size">
            <label for="size">Product Size:</label>
            <select name="size" id="size">
            </select>
          </div>
        </div>

        <div class="bottomRightContainer">
          <button class="CartButton" type="button" onclick="addToCart(this)">Add to Cart</button>

        </div>
        `)

        for(var i=0; i<products[clickedID]['variants'].length; i++){
            console.log(products[clickedID]['variants'][i]['value'])
            $("#size").append(`
            
            <option value="${products[clickedID]['variants'][i]['value']}">${products[clickedID]['variants'][i]['value']} - ${products[clickedID]['variants'][i]['availability']} in stock</option>
            
            `)
        }
    }

    
}




// var items = [new Product("0001","Test Product",null,"test, product",69.99)]


// items[0].variants.push(new Variant())





/**
class Structure{
    constructor(){
        this.firebase_handler = new FireBaseHandler()
        this.on_page_load()






    }

    function_name = async function(){

    }

    change_modal_data = async (element) => {
      modal.style.display = 'block';

      console.log(element)
    }

    on_page_load = async () => {
      this.products = await this.firebase_handler.get_all_data()
      Object.keys(this.products).forEach(product_id => {
        let product = this.products[product_id]
        $("#productContainer").append(`
        
        <div class="product" onclick="k.change_modal_data(this)" product_id="${product.id}">
          <img class="productImg" src="${product.image}">
          <div class="productName">${product.name}</div>
          <div class="productBrand">${product.brand}</div>
          <div class="productPrice">$${product.price}</div>
        </div>

        
      `)
      })
    }
}




let k = new Structure()

*/