/**
 * Represents a size object
 */

class Size{
    /**
     * Creates a size oject
     * @param {String} size_name // size_name eg. SIZE 8
     * @param {String} size_id  // size ig eg. AS123AS
     * @param {Boolean} size_availability  // size_availity eg. True
     */
    constructor(size_value,size_id,size_availability){
        this.size_availability = size_availability
        this.size_id = size_id
        this.size_value = size_value
    }
}