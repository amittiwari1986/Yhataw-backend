
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserLeaveSchema = new Schema({
     userId:{type:Schema.Types.String,unique:true,required:[true, 'Please add user id'],ref: "users"},
     total_leave:{type:Schema.Types.String,required:[true, 'Please add total leave']},
     earned_leave:{type:Schema.Types.String,required:[true, 'Please add earned leave']},
     sick_leave:{type:Schema.Types.String,required:[true, 'Please add sick leave']},
     casual_leave:{type:Schema.Types.String,required:[true, 'Please add casual_leave']},
     total_leave_available:{type:Schema.Types.String,required:true},
     earned_leave_available:{type:Schema.Types.String,required:true},
     sick_leave_available:{type:Schema.Types.String,required:true},
     casual_leave_available:{type:Schema.Types.String,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const userLeaveToken = connection.model('user_Leave',UserLeaveSchema);
 module.exports = userLeaveToken;
