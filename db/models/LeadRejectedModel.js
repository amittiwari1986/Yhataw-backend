
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const LeadRejectedSchema = new Schema({
            form_name:{type:Schema.Types.String,required:true},
            formId:{type:Schema.Types.String,required:true,ref: "forms"},
            developerId:{type:Schema.Types.String,required:true,ref: "developers"},
            projectId:{type:Schema.Types.String,required:true,ref: "projects"},
            projecttypeId:{type:Schema.Types.String,required:false},
            leadName:{type:Schema.Types.String,required:false},
            leadEmail:{type:Schema.Types.String,required:false},
            leadPhone:{type:Schema.Types.String,required:false},
            dynamicFields:{type:Schema.Types.String,required:false},
            status:{type:Schema.Types.String,required:[true, 'Please add status']},
            AssignTo:{type:Schema.Types.String,required:false},
            AssignToUser:{type:Schema.Types.String,required:false},
            source:{type:Schema.Types.String,required:false},
            uid:{type:Schema.Types.String,required:false},
            stage:{type:Schema.Types.String,required:false},
            date:{type:Schema.Types.String,required:false},
            lead_type:{type:Schema.Types.String,required:false},
            upload_file_name:{type:Schema.Types.String,required:false},
            uploadLeadId:{type:Schema.Types.String,required:false},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const lead_rejected= connection.model('lead_rejected',LeadRejectedSchema);
 module.exports = lead_rejected;