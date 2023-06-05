
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const DepartmentSchema = new Schema({
     department_name:{type:Schema.Types.String,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const department= connection.model('department',DepartmentSchema);
 module.exports = department;