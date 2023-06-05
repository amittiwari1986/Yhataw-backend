
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const CitySchema = new Schema({
        stateId:{type:Schema.Types.String,required:true,ref: "states"},
     city_name:{type:Schema.Types.String,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const city= connection.model('city',CitySchema);
 module.exports = city;