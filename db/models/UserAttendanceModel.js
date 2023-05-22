
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserAttendanceSchema = new Schema({
     userId:{type:Schema.Types.String,required:true,ref: "users"},
     month:{type:Schema.Types.String,required:true},
     date:{type:Schema.Types.String,required:true},
     punch_in:{type:Schema.Types.String,unique:true,required:true},
     punch_out:{type:Schema.Types.String,unique:true,required:false},
     working_hours:{type:Schema.Types.String,required:false},
     leave_applied:{type:Schema.Types.String,required:false},
     work_type:{type:Schema.Types.String,required:false},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const userAttendance = connection.model('user_attendance',UserAttendanceSchema);
 module.exports = userAttendance;
