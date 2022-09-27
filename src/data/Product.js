
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
        this.published_date = published_date
        this.num_available = num_available
        this.available_sizes = available_sizes.split(',')

    }
}

