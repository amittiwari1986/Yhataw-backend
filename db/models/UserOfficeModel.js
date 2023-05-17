
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserOfficeSchema = new Schema({
     userId:{type:Schema.Types.String,required:true,ref: "users"},
     emp_type:{type:Schema.Types.String,required:true},
     department:{type:Schema.Types.String,required:true},
     designation:{type:Schema.Types.String,required:true},
     joining:{type:Schema.Types.String,required:true},
     working_days:{type:Schema.Types.String,required:true},
     working_shift:{type:Schema.Types.String,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const userOfficeToken = connection.model('user_office',UserOfficeSchema);
 module.exports = userOfficeToken;
