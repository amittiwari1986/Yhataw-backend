
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const LeadApiSchema = new Schema({
            lead_date:{type:Schema.Types.String,required:false},
            apartment_name:{type:Schema.Types.String,required:false},
            country_code:{type:Schema.Types.String,required:false},
            service_type:{type:Schema.Types.String,required:false},
            category_type:{type:Schema.Types.String,required:false},
            locality_name:{type:Schema.Types.String,required:false},
            city_name:{type:Schema.Types.String,required:false},
            lead_name:{type:Schema.Types.String,required:false},
            lead_email:{type:Schema.Types.String,required:false},
            lead_phone:{type:Schema.Types.String,required:false},
            min_price:{type:Schema.Types.String,required:false},
            max_price:{type:Schema.Types.String,required:false},
            project_id:{type:Schema.Types.String,required:false},
            project_name:{type:Schema.Types.String,required:false},
            property_field:{type:Schema.Types.String,required:false},
            info:{type:Schema.Types.String,required:false},
            lead_source:{type:Schema.Types.String,required:false}
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const leadApi= connection.model('lead_from_api',LeadApiSchema);
 module.exports = leadApi;