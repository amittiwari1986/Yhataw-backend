
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const LeadLogSchema = new Schema({
        leadId:{type:Schema.Types.String,required:true,ref: "leads"},
     userId:{type:Schema.Types.String,required:true},
     old_value:{type:Schema.Types.String,required:false},
     new_value:{type:Schema.Types.String,required:false},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const lead_log= connection.model('lead_log',LeadLogSchema);
 module.exports = lead_log;