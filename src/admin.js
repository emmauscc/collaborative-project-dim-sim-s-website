// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("add_product");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

firebaseHandler = new FireBaseHandler()

getCurrentSizes = (type="None") => {
  let sizes = $('.size')
  var available_sizes = []
  sizes.each((index, size) => {
    type == 'sizeOnly' ? available_sizes.push(String(size.getElementsByClassName('sizeButton')[0].innerHTML).split('-')[0].trim()) : available_sizes.push(String(size.getElementsByClassName('sizeButton')[0].innerHTML.replace('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✖','')))
  })
  return available_sizes
}


removeSize = (element) => {
  $(element).parent().remove()
}




addSize = () => {
  let size_value = $('#sizeValue')[0].value
  let size_stock = $("#sizeStock")[0].value
  let existing_values = getCurrentSizes('sizeOnly')


  if(size_value.length == 0 || size_stock.length == 0){
    alert('Size value and stock must be filled')
    return false
  }

  if(existing_values.includes(size_value)){
    alert('Size already exists!')
    return false
  }

  $('.addedSizes').append(`<div class="size">
  <button class="sizeButton" onclick="removeSize(this)">${size_value} - ${size_stock}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#10006;</button>
</div>`)

  
}


addProduct = () => {
  let product_name = $('#productNameInput')[0].value
  let product_image = $('#productImageInput')[0].value
  let price = $('#productPriceInput')[0].value
  let keywords = $('#keywordsInput')[0].value
  let sizes = this.getCurrentSizes()


  if(product_name.length == 0 || product_image.length == 0 || price.length == 0 || keywords.length == 0 || sizes.length == 0){
    alert('All fields must be filled')
    return false
  }

  
  let product = new Product(product_name,product_image,keywords,price)
  sizes.forEach(size => {
    let size_value = size.split('-')[0].trim()
    let size_stock = size.split('-')[1].trim()

    product.addVariant(size_value,size_stock)
  })


  firebaseHandler.add_new_product(product.return_variables_as_object())

  alert('Added to database')
  window.location.reload()
  


}

document.getElementById('addSize').addEventListener('click',addSize)




class Structure{
  constructor(){
    this.on_page_load()

  }

  on_page_load = async () => {
    let products = await firebaseHandler.get_all_data()
    Object.keys(products).forEach(product => {
      this.add_new_product(products[product])
    })
  }


  parseProductVariants = async (variants) => {
    let variant_string = ''
    variants.forEach(variant => {
      variant_string = variant_string + variant.value + ':'+variant.availability + ','
    })

    return variant_string
  }

  removeProduct = async (element) => {
    $(element).parent().parent().parent().remove()
    console.log($(element).parent().parent().parent()[0].getAttribute('product_id'))
    firebaseHandler.remove_specific_product($(element).parent().parent().parent()[0].getAttribute('product_id'))

  }
  add_new_product = async (product) => {
    $('.products').prepend(`
    
    <tbody class="product" product_id="${product.id}">
  <tr scope="row">
    <td class="productImage">
      <img src="${product.image}" style="height:3.5vw; width: 3.5vw;""></img>
    </td>
    
    <td class="pTitle">${product.name}</td>
    <td class="productSizes">${await this.parseProductVariants(product.variants)}</td>  
    <td class="productSizes">${product.num_available}</td>    
    <td class="actions"><button onclick="k.removeProduct(this)">DELETE</button></td>
  
  </tr>
</tbody>
    
    
    `)
  }
}



let k = new Structure()

