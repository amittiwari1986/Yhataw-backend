
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const PropertyUnitTypeSchema = new Schema({
    propertyTypeId:{type:Schema.Types.String,required:true,ref:"property_types"},
     name:{type:Schema.Types.String,required:true},
     status:{type:Schema.Types.Number,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const property_unit_type= connection.model('property_unit_type',PropertyUnitTypeSchema);
 module.exports = property_unit_type;