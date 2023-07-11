
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const PropertyForSchema = new Schema({
     name:{type:Schema.Types.String,required:true},
     status:{type:Schema.Types.Number,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const property_for= connection.model('property_for',PropertyForSchema);
 module.exports = property_for;