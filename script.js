let product;
let currentID = "";
let clickedID = "";
let date = "";
let newdate = "";


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
  
  })
}
readAllData();


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


function generateModal(clickedID){
  modal.style.display = "block"

  console.log(clickedID)

  console.log(products)

  $("body").append(`
    <div id="Modal${clickedID}" class="modal">
      <div class="modal-content">
        <span class="close"></span>

        <div class="productInformation">
          <img class="Image" src="${products[clickedID]['image']}">
          <div class="leftContainer">
            <div class="Name">${products[clickedID]['name']} -</div>
            <div class="Brand">${products[clickedID]['brand']}</div>
            <div class="ReleaseDate">${newdate}</div>
          </div>

          <div class="rightContainer">
            <div class="Available"><b>${products[clickedID]['num_available']}</b> More in stock!</div>
            <div class="Price">${products[clickedID]['price']}</div>
          </div>
  `)
}


var modal = document.getElementById("Modal"+clickedID);

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// var items = [new Product("0001","Test Product",null,"test, product",69.99)]


// items[0].variants.push(new Variant())




class Structure{
    constructor(){
        this.firebase_handler = new FireBaseHandler()






        this.test()
    }



    test = async () => {
        console.log(await this.firebase_handler.get_specific_product('69420'))
        
    }
}




new Structure()