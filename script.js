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

var items = [new Product("0001","Test Product",null,"test, product",69.99)]


items[0].variants.push(new Variant())




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