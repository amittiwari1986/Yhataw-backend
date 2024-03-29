
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserAttendanceSchema = new Schema({
     userId:{type:Schema.Types.String,required:[true, 'Please add user id'],ref: "users"},
     month:{type:Schema.Types.String,required:[true, 'Please add month']},
     date:{type:Schema.Types.String,required:[true, 'Please add date']},
     punch_in:{type:Schema.Types.String,unique:false,required:[true, 'Please add punch in']},
     punch_out:{type:Schema.Types.String,unique:false,required:[false, 'Please add punch out']},
     working_hours:{type:Schema.Types.String,required:[false, 'Please add working hours']},
     leave_applied:{type:Schema.Types.String,required:[false, 'Please add leave applied']},
     work_type:{type:Schema.Types.String,required:[false, 'Please add work type']},
     approver:{type:Schema.Types.String,required:[false, 'Please add work type']},
     status:{type:Schema.Types.Number,required:[false, 'Please add status']},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const userAttendance = connection.model('user_attendance',UserAttendanceSchema);
 module.exports = userAttendance;
