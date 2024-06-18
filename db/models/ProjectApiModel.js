
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const ProjectApiSchema = new Schema({
        developerId:{type:Schema.Types.String,required:true},
     project_name:{type:Schema.Types.String,unique:false,required:true},
     project_uid:{type:Schema.Types.String,unique:false,required:true},
     status:{type:Schema.Types.String,required:false},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const projectApi= connection.model('project_apis',ProjectApiSchema);
 module.exports = projectApi;