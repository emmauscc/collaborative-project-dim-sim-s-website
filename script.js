let product;
let currentID = "";
let clickedID = "";
let date = "";
let newdate = "";
let filteredProducts = [];
let brandArray = [];
let uniqueBrands = [];
let brandSelected = [];
let newarray = [];

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
    apiKey: "AIzaSyD8THmhiu-yyHXJZVy2BbsL1Vvep7cqds8",
    authDomain: "dim-sim-s-website.firebaseapp.com",
    databaseURL: "https://dim-sim-s-website-default-rtdb.firebaseio.com",
    projectId: "dim-sim-s-website",
    storageBucket: "dim-sim-s-website.appspot.com",
    messagingSenderId: "1079766995401",
    appId: "1:1079766995401:web:96f174fc09f1a09b2f9818"

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

        let date = JSON.stringify(new Date(products[currentID]['release_date']))
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
  
  })
}
readAllData();

function doFilters(){
    filteredProducts = [];
    brandSelected = [];

    const productsArray = Object.values(products)


    $("input:checkbox[name='brands']:checked").each(function(){
        let checkBrand = $(this)[0]['id']
        brandSelected.push(checkBrand);
    });
    console.log(brandSelected)

    for(var i=0; i<productsArray.length; i++){
        for(var j=0; j<brandSelected.length; j++){
            console.log(productsArray[i]['brand'].indexOf(brandSelected[j]))
            if(productsArray[i]['brand'] == brandSelected[j]){
                filteredProducts.push(productsArray[i])
            }
        }
    }

    
    if(brandSelected.length > 0){
        filteredProducts = filteredProducts.filter(searchFilter);
    
    }else{
        filteredProducts = productsArray.filter(searchFilter)

    }

    if(filteredProducts.length == 0){
        $("#productContainer").empty();
    }
    

    function searchFilter(productsArray){
        if($("#searchBar") != ""){
            console.log(productsArray['name'].toLowerCase().includes($("#searchBar").val()))
            return productsArray['name'].toLowerCase().includes($("#searchBar").val())
        }
        console.log(productsArray)
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
    }else{
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
            console.log(currentID)

            let date = JSON.stringify(new Date(filteredProducts[currentID]['release_date']))
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
    for(var i=0; i<uniqueBrands.length; i++){
        $("#brandContainer").append(`
            <div class="options">
                <input type="checkbox" name="brands" id="${uniqueBrands[i]}">
                <label for="${uniqueBrands[i]}">${uniqueBrands[i]}</label>
            </div>
        `)
    }
    
}



function generateModal(clickedID){
    
    console.log(clickedID)
    $(".modal-content").empty();
    modal.style.display = "block"


    if(filteredProducts.length > 0){
        console.log("FILTERED PRODUCTS EXIST")
        $(".modal-content").append(`
    

        <div class="productInformation" product_id="${clickedID}">
          <img class="Image" src="${filteredProducts[clickedID]['image']}">
          <div class="leftContainer">
            <div class="Name">${filteredProducts[clickedID]['name']} -</div>
            <div class="Brand">${filteredProducts[clickedID]['brand']}</div>
            <div class="ReleaseDate">${newdate}</div>
          </div>

          <div class="rightContainer">
            <div class="Available"><b>${filteredProducts[clickedID]['num_available']}</b> More in stock!</div>
            <div class="Price">$${filteredProducts[clickedID]['price']}</div>
          </div>

        <div class="bottomLeftContainer">           
          <div class="Size">
            <label for="size">Product Size:</label>
            <select name="size" id="size">
            </select>
          </div>
        </div>

        <div class="bottomRightContainer">
          <button class="CartButton" type="button">Add to Cart</button>

        </div>`)

        for(var i=0; i<filteredProducts[clickedID]['variants'].length; i++){
            console.log(filteredProducts[clickedID]['variants'][i]['value'])
            $("#size").append(`
            
            <option value="${filteredProducts[clickedID]['variants'][i]['value']}">${filteredProducts[clickedID]['variants'][i]['value']} - ${filteredProducts[clickedID]['variants'][i]['availability']} in stock</option>
            
            `)
        }
    }else{
        $(".modal-content").append(`
    

        <div class="productInformation" product_id="${clickedID}">
          <img class="Image" src="${products[clickedID]['image']}">
          <div class="leftContainer">
            <div class="Name">${products[clickedID]['name']} -</div>
            <div class="Brand">${products[clickedID]['brand']}</div>
            <div class="ReleaseDate">${newdate}</div>
          </div>

          <div class="rightContainer">
            <div class="Available"><b>${products[clickedID]['num_available']}</b> More in stock!</div>
            <div class="Price">$${products[clickedID]['price']}</div>
          </div>

        <div class="bottomLeftContainer">           
          <div class="Size">
            <label for="size">Product Size:</label>
            <select name="size" id="size">
            </select>
          </div>
        </div>

        <div class="bottomRightContainer">
          <button class="CartButton" type="button">Add to Cart</button>

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