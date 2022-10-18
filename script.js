

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