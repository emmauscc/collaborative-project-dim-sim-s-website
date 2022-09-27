var modal = document.getElementById("modalBox");

// Get the button that opens the modal
var btn = document.getElementById("addProduct");


// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
  }


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

$("#newSize").click(function() {
    $("newProduct").append(

    );
});






class Main{

  constructor(){
    this.current_sizes = []
    this.setupEventListenters()
  }



  removeSize = (element) => {
    this.current_sizes.splice(this.current_sizes.indexOf(element.getAttribute('size_value')),1)
    console.log(this.current_sizes)
    $(element).remove()
  }


  addSizeHTML = (size_value,size_stock) => {
    let size_input_div = $('#inputSizes')
    size_input_div.append(`<div class="sizeData" size_value="${size_value}" onclick="structure.removeSize(this)"><div class="sizeName">SIZE VALUE: ${size_value}</div>
    <div class="sizeStock">SIZE STOCK: ${size_stock}</div></div>`)
  }



  addSize = () => {

    let data = this.getSizeValues()
    var size_value = data[0]
    var size_stock = data[1]
    
    if(this.current_sizes.includes(size_value)){
      alert('Size already exists!')
      return 
    }else if(size_value.length == 0 || size_stock.length == 0){
      alert('Size inputs cannot be empty!')
      return
    }

    this.current_sizes.push(size_value)
    this.addSizeHTML(size_value,size_stock)
  }


  setupEventListenters = () => {
    document.getElementById('addSize').addEventListener('click',this.addSize)
  }
  getSizeValues = () => {
    let size_value = document.getElementById('sizeValue').value;
    let size_stock = document.getElementById('sizeStock').value;

    console.log(size_value,size_stock)
    return [size_value,size_stock]
    
  }
}


const structure = new Main()