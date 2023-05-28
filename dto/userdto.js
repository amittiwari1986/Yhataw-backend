class User{
    constructor(name,password,userRole,phone,email,phoneOtp,whatsapp,dob,martial_status,gender,address,country_id,state_id,city,zipcode,doj,employee_id){
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
        this.address = address
        this.country_id = country_id
        this.state_id = state_id
        this.city = city
        this.zipcode = zipcode
        this.doj = doj
        this.employee_id = employee_id
    }
}

module.exports = User;