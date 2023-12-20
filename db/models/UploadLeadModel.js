
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UploadLeadSchema = new Schema({
       upload_file_name:{type:Schema.Types.String,required:false},
        formId:{type:Schema.Types.String,required:true,ref: "forms"},
     file_path:{type:Schema.Types.String,required:false},
     mapping_info:{type:Schema.Types.String,required:false},
     status:{type:Schema.Types.String,required:[true, 'Please add status']},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const uploadLead= connection.model('upload_lead',UploadLeadSchema);
 module.exports = uploadLead;