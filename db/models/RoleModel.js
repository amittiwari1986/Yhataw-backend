
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const RoleSchema = new Schema({
        role_name:{type:Schema.Types.String,required:true},
     description:{type:Schema.Types.String,required:false},
     info:{type:Schema.Types.String,required:false},
     slug:{type:Schema.Types.String,required:false},
     roleId:{type:Schema.Types.Number,required:false},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const role= connection.model('role',RoleSchema);
 module.exports = role;