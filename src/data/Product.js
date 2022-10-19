
/**
 * Class representing a product
 */


class Product{
    /**
     * Creates a product object
     * @param {String} id // unique identifier for product. eg. 123ASKDIZ2
     * @param {String} name // product name. eg. Red Heating Socks
     */


    constructor(name,image,keywords,price){

        
        this.name = name
        this.id = this.generate_id()
        this.image = image
        this.keywords = keywords.split(',')
        this.price = price
        this.release_date = Date.now()
        this.variants = []
        this.num_available = 0
    }



    return_variables_as_object = () => {

        var k = []

        this.variants.forEach(variant => {
            k.push(variant.return_variables_as_object())
        })
        return {name: this.name, id: this.id, image: this.image, keywords: this.keywords, price: this.price, release_date: this.release_date, variants: k, num_available: this.num_available}
    }

    addVariant(variant_value,variant_stock){

        this.variants.push(new Variant(variant_value,variant_stock,this))
        this.num_available = parseInt(this.num_available) + parseInt(variant_stock)

    }



    generate_id = () => {
        return this.name.substring(0,4).toUpperCase()+'-'+this.getRandomArbitrary(1000,9999)
    }

    getRandomArbitrary = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }
    



}



