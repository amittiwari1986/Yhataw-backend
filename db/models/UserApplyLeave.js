
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserApplyLeaveSchema = new Schema({
     userId:{type:Schema.Types.String,required:true,ref: "users"},
     leave_type:{type:Schema.Types.String,required:true},
     from_date:{type:Schema.Types.String,required:true},
     to_date:{type:Schema.Types.String,required:true},
     total_days:{type:Schema.Types.String,required:true},
     comments:{type:Schema.Types.String,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const userApplyLeave = connection.model('user_apply_leave',UserApplyLeaveSchema);
 module.exports = userApplyLeave;
