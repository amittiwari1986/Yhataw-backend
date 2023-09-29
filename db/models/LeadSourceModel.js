const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const LeadSourceSchema = new Schema({
     source_name:{type:Schema.Types.String,required:true},
     status:{type:Schema.Types.String,required:false},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const leadSource= connection.model('lead_source',LeadSourceSchema);
 module.exports = leadSource;