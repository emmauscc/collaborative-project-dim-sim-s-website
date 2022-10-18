
/**
 * Class representing a product
 */


class Product{
    /**
     * Creates a product object
     * @param {String} id // unique identifier for product. eg. 123ASKDIZ2
     * @param {String} name // product name. eg. Red Heating Socks
     */


    constructor(id,name,image,keywords,price,num_available,available_sizes){

        this.id = id
        this.name = name
        this.image = image
        this.keywords = keywords.split(',')
        this.price = price
        this.release_date = release_date
        this.variants = []
        this.num_available = 0
    }

    addVariant(variant_name,variant_id,variant_value,variant_availability,this){

        this.variants.push(new Variant(variant_name,variant_value,variant_id,variant_availability))
        this.num_available = this.num_available + variant_availability

    }

    



}



