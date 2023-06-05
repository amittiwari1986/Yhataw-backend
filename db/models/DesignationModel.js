
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const DesignationSchema = new Schema({
    departmentId:{type:Schema.Types.String,required:true,ref: "departments"},
     designation_name:{type:Schema.Types.String,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const designation= connection.model('designation',DesignationSchema);
 module.exports = designation;