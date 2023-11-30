class PropertyList{
    constructor(propertyTypeId,bedroom,bathroom,balcony,furnish_type,car_parking,utility,study,pooja,status){
        this.propertyTypeId = propertyTypeId
        this.bedroom = bedroom
        this.bathroom = bathroom
        this.balcony = balcony
        this.furnish_type = furnish_type
        this.car_parking = car_parking
        this.utility = utility
        this.study = study
        this.pooja = pooja
        this.status = status
    }
}

module.exports = PropertyList;