const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const LeadStatusSchema = new Schema({
     status_name:{type:Schema.Types.String,required:true},
     status:{type:Schema.Types.String,required:false},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const leadStatus= connection.model('lead_status',LeadStatusSchema);
 module.exports = leadStatus;