class UnmergeLead{
    constructor(lead_date,apartment_names,country_code,service_type,category_type,locality_name,city_name,lead_name,lead_phone,lead_email,max_area,min_price,project_id,project_name,property_field){
        this.lead_date = lead_date
        this.apartment_names = apartment_names
        this.country_code = country_code
        this.service_type = service_type
        this.category_type = category_type
        this.locality_name = locality_name
        this.city_name = city_name
        this.lead_name = lead_name
        this.lead_phone = lead_phone
        this.lead_email = lead_email
        this.max_area = max_area
        this.min_area = min_area
        this.min_price = min_price
        this.project_id = project_id
        this.project_name = project_name
        this.property_field = property_field
    }
}

module.exports = UnmergeLead;