
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const ProjectSchema = new Schema({
        developerId:{type:Schema.Types.String,required:true,ref: "developers"},
     project_name:{type:Schema.Types.String,unique:true,required:true},
     project_uid:{type:Schema.Types.String,unique:true,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const project= connection.model('project',ProjectSchema);
 module.exports = project;