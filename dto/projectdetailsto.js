class ProjectDetails{
    constructor(developerId,projectId,countryId,stateId,city,description,location,zipcode,status,projectforId,projecttypeId,projectunittypeId,projectstatusId,bathroom,washroom,property_image,edm_image,property_broucher,study,pooja,utility,furnish_type,AssignTo,AssignToUser,car_parking){
        this.developerId = developerId
        this.projectId = projectId
        this.countryId = countryId
        this.stateId = stateId
        this.city = city
        this.description = description
        this.location = location
        this.zipcode = zipcode
        this.status = status
        this.projectforId = projectforId
        this.projecttypeId = projecttypeId
        this.projectunittypeId = projectunittypeId
        this.projectstatusId = projectstatusId
        this.bathroom = bathroom
        this.washroom = washroom
        this.property_image = property_image
        this.edm_image = edm_image
        this.property_broucher = property_broucher
        this.study = study
        this.pooja = pooja
        this.utility = utility
        this.furnish_type = furnish_type
        this.AssignTo = AssignTo
        this.AssignToUser = AssignToUser
        this.car_parking - car_parking
    }
}

module.exports = ProjectDetails;

