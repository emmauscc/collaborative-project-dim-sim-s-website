






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