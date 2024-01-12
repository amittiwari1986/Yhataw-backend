class User{
    constructor(name,password,userRole,phone,email,phoneOtp,whatsapp,dob,martial_status,gender,address1,address2,country_id,state_id,city,zipcode,doj,employee_id,status,profile_image,in_complete,time_zone,role_id,date,phoneCountryCode,whatsappCountryCode,team_id,team_name){
        this.name = name
        this.password = password
        this.userRole = userRole
        this.phone = phone
        this.email = email
        this.phoneOtp = phoneOtp
        this.whatsapp = whatsapp
        this.dob = dob
        this.martial_status = martial_status
        this.gender = gender
        this.address1 = address1
        this.address2 = address2
        this.country_id = country_id
        this.state_id = state_id
        this.city = city
        this.zipcode = zipcode
        this.doj = doj
        this.employee_id = employee_id
        this.status = status
        this.profile_image = profile_image
        this.in_complete = in_complete
        this.time_zone = time_zone
        this.role_id = role_id
        this.date = date
        this.phoneCountryCode = phoneCountryCode
        this.whatsappCountryCode = whatsappCountryCode
        this.team_id = team_id
        this.team_name = team_name

    }
}

module.exports = User;