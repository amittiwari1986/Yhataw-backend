
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const PropertyStatusSchema = new Schema({
     name:{type:Schema.Types.String,required:true},
     status:{type:Schema.Types.Number,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const property_status= connection.model('property_status',PropertyStatusSchema);
 module.exports = property_status;