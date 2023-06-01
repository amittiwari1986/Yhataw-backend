
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const CountrySchema = new Schema({
     country_name:{type:Schema.Types.String,required:true},
     country_code:{type:Schema.Types.String,required:true},
     currency:{type:Schema.Types.String,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const country = connection.model('country',CountrySchema);
 module.exports = country;
