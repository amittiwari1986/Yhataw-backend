
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const PropertyTypeSchema = new Schema({
     name:{type:Schema.Types.String,required:true},
     status:{type:Schema.Types.Number,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const property_type= connection.model('property_type',PropertyTypeSchema);
 module.exports = property_type;