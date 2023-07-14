
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserApplyLeaveSchema = new Schema({
     userId:{type:Schema.Types.String,required:[true, 'Please add user id'],ref: "users"},
     leave_type:{type:Schema.Types.String,required:[true, 'Please add leave type']},
     from_date:{type:Schema.Types.String,required:[true, 'Please add from date']},
     to_date:{type:Schema.Types.String,required:[true, 'Please add to date']},
     comments:{type:Schema.Types.String,required:[true, 'Please add comments']},
     total_days:{type:Schema.Types.String,required:false},
     status:{type:Schema.Types.Number,required:false},
     approver:{type:Schema.Types.String,required:false},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const userApplyLeave = connection.model('user_apply_leave',UserApplyLeaveSchema);
 module.exports = userApplyLeave;
