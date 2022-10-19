/**
 * Represents a variant object
 */

class Variant{

    constructor(variant_value,variant_stock,variant_product){
        this.product = variant_product
        this.value = variant_value
        this.availability = variant_stock
        this.id = this.generate_variant_id()
        
    }


    generate_variant_id = () => {
        let x  = ''

        x = this.product.id+'-'+this.value+'-'+this.getRandomArbitrary(1000,9999)
        return x
    }


    return_variables_as_object = () => {
        return {value: this.value, availability: this.availability, id: this.id}
    }

    getRandomArbitrary = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
