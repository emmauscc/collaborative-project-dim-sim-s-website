/**
 * Represents a variant object
 */

class Variant{
    /**
     * Creates a variant oject
     * @param {String} variant_name // variant_name eg. variant 8
     * @param {String} variant_id  // variant ig eg. AS123AS
     * @param {String} variant_availability //  
     */
    constructor(variant_name,variant_id,variant_value,variant_availability,variant_product){
        this.name = variant_name
        this.id = variant_id
        this.value = variant_value
        this.availability = variant_availability
        this.product = variant_product
    }


    generate_variant_id = () => {
        let x  = ''
        return x
    }
}
