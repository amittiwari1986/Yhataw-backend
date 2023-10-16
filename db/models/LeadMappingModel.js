
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const LeadMappingSchema = new Schema({
        lead_id:{type:Schema.Types.String,required:true,ref: "leads"},
       user_id:{type:Schema.Types.String,required:true},
       type:{type:Schema.Types.String,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const leadMapping= connection.model('lead_mapping',LeadMappingSchema);
 module.exports = leadMapping;