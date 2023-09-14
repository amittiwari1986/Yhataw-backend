
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const LeadSchema = new Schema({
            form_name:{type:Schema.Types.String,required:true},
            formId:{type:Schema.Types.String,required:true,ref: "forms"},
            developerId:{type:Schema.Types.String,required:true,ref: "developers"},
            projectId:{type:Schema.Types.String,required:true,ref: "projects"},
            projecttypeId:{type:Schema.Types.String,required:false},
            leadName:{type:Schema.Types.String,required:false},
            leadEmail:{type:Schema.Types.String,required:false},
            leadPhone:{type:Schema.Types.Number,required:false},
            dynamicFields:{type:Schema.Types.String,required:false},
            status:{type:Schema.Types.String,required:[true, 'Please add status']},
            AssignTo:{type:Schema.Types.String,required:false},
            AssignToUser:{type:Schema.Types.String,required:false},
            source:{type:Schema.Types.String,required:false},
            uid:{type:Schema.Types.String,required:false},
            stage:{type:Schema.Types.String,required:false},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const lead= connection.model('lead',LeadSchema);
 module.exports = lead;