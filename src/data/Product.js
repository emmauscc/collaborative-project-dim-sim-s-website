
/**
 * Class representing a product
 */


class Product{
    /**
     * Creates a product object
     * @param {String} id // unique identifier for product. eg. 123ASKDIZ2
     * @param {String} name // product name. eg. Red Heating Socks
     */
    constructor(id,name,image,keywords,price){
        this.id = id
        this.name = name
        this.image = image
        this.keywords = keywords.split(',')
        this.price = price
        this.published_date = published_date
        this.num_available = 0
        this.available_sizes = variants.length
        this.variants = []

    }

    newVariant(variant_value,variant_id,variant_availability,this){

        this.variants.push(new Variant(variant_value,variant_id,variant_availability))

    }



}



