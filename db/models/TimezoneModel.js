const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const TimezoneSchema = new Schema({
        countryId:{type:Schema.Types.String,required:true,ref: "countries"},
     time_zone:{type:Schema.Types.String,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const timezone = connection.model('timezone',TimezoneSchema);
 module.exports = timezone;