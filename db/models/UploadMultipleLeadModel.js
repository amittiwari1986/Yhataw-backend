
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UploadMultipleLeadSchema = new Schema({
      upload_file_name:{type:Schema.Types.String,required:false},
     file_path:{type:Schema.Types.String,required:false},
     mapping_info:{type:Schema.Types.String,required:false},
     status:{type:Schema.Types.String,required:[true, 'Please add status']},
     success_count:{type:Schema.Types.String,required:false},
     fail_count:{type:Schema.Types.String,required:false},
     error_file_path:{type:Schema.Types.String,required:false},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const uploadMultipleLead= connection.model('upload_multiple_lead',UploadMultipleLeadSchema);
 module.exports = uploadMultipleLead;
