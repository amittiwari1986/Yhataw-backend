class Form{
    constructor(lead_date,apartment_name,country_code,service_type,category_type,locality_name,city_name,lead_name,lead_email,lead_phone,min_price,max_price,project_id,project_name,property_field,info,lead_source){
        this.lead_date = lead_date
        this.apartment_name = apartment_name
        this.country_code = country_code
        this.service_type = service_type
        this.category_type = category_type
        this.locality_name = locality_name
        this.city_name = city_name
        this.lead_name = lead_name
        this.lead_email = lead_email
        this.lead_phone = lead_phone
        this.min_price = min_price
        this.max_price = max_price
        this.project_id = project_id
        this.project_name = project_name
        this.property_field = property_field
        this.info = info
        this.lead_source = lead_source
    }
}

module.exports = Form;