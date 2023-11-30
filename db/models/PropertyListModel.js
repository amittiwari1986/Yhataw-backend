
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const PropertyListSchema = new Schema({
    propertyTypeId:{type:Schema.Types.String,required:true,ref:"property_types"},
     bedroom:{type:Schema.Types.String,required:false},
     bathroom:{type:Schema.Types.String,required:false},
     balcony:{type:Schema.Types.String,required:false},
     furnish_type:{type:Schema.Types.String,required:false},
     car_parking:{type:Schema.Types.String,required:false},
     utility:{type:Schema.Types.String,required:false},
     study:{type:Schema.Types.String,required:false},
     pooja:{type:Schema.Types.String,required:false},
     status:{type:Schema.Types.Number,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const property_list= connection.model('property_list',PropertyListSchema);
 module.exports = property_list;