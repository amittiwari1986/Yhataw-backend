class Organization{
    constructor(userId,companyname,brandname,imageUrl,address1,address2,country_id,state_id,city,zipcode,status,time_zone,website){
        this.userId = userId
        this.companyname = companyname
        this.brandname = brandname
        this.imageUrl = imageUrl
        this.address1 = address1
        this.address2 = address2
        this.country_id = country_id
        this.state_id = state_id
        this.city = city
        this.zipcode = zipcode
        this.status = status
        this.time_zone = time_zone
        this.website = website
    }
}

module.exports = Organization;