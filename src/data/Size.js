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
    constructor(variant_value,variant_id,variant_availability){
        this.variant_id = variant_id
        this.variant_value = variant_value
        this.variant_availability = variant_availability
        
    }


    generate_variant_id = () => {
        let x  = ''
        return x
    }
}
