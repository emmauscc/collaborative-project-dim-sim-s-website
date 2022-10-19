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



getCurrentSizes = () => {
  let sizes = $('.size')
  var available_sizes = []
  sizes.each((index, size) => {
    available_sizes.push(String(size.getElementsByClassName('sizeButton')[0].innerHTML).split('-')[0].trim())
  })
  return available_sizes
}


removeSize = (element) => {
  $(element).parent().remove()
}
addSize = () => {
  let size_value = $('#sizeValue')[0].value
  let size_stock = $("#sizeStock")[0].value
  let existing_values = getCurrentSizes()


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
  $()
}
document.getElementById('addSize').addEventListener('click',addSize)

