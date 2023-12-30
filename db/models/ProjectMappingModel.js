
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const ProjectMappingSchema = new Schema({
        project_id:{type:Schema.Types.String,required:true,ref: "projects"},
       user_id:{type:Schema.Types.String,required:true},
       type:{type:Schema.Types.String,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const projectMapping= connection.model('project_mapping',ProjectMappingSchema);
 module.exports = projectMapping;