class Organization{
    constructor(userId,companyname,brandname,imageUrl,phone,email,whatsapp,dob,address1,address2,country_id,state_id,city,zipcode,status){
        this.userId = userId
        this.companyname = companyname
        this.brandname = brandname
        this.imageUrl = imageUrl
        this.phone = phone
        this.email = email
        this.whatsapp = whatsapp
        this.dob = dob
        this.address1 = address1
        this.address2 = address2
        this.country_id = country_id
        this.state_id = state_id
        this.city = city
        this.zipcode = zipcode
        this.status = status
    }
}

module.exports = Organization;