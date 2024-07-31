const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const ProjectUidMappingSchema = new Schema({
       project_id:{type:Schema.Types.String,required:true,ref: "projects"},
       type:{type:Schema.Types.String,required:true},
       uid:{type:Schema.Types.String,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const projectUidMapping= connection.model('project_uid_mapping',ProjectUidMappingSchema);
 module.exports = projectUidMapping;