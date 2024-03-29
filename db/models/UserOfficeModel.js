
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserOfficeSchema = new Schema({
     userId:{type:Schema.Types.String,required:[true, 'Please add user id'],ref: "users"},
     emp_type:{type:Schema.Types.String,required: [true, 'Please add employee type']},
     department:{type:Schema.Types.String,required:[true, 'Please add department']},
     designation:{type:Schema.Types.String,required:[true, 'Please add designation']},
     joining:{type:Schema.Types.String,required:[true, 'Please add joining date']},
     working_days:{type:Schema.Types.String,required:[true, 'Please add working days']},
     working_shift:{type:Schema.Types.String,required:[true, 'Please add working shift']},
     reporting_manager:{type:Schema.Types.String,required:[false, 'Please add Reporting Manager']},
     role_id:{type:Schema.Types.String,required:[false, 'Please add role']},
     team_id:{type:Schema.Types.String},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()},
     dor:{type:Schema.Types.String,required:[false, 'Please add resigning date']},
     team_name:{type:Schema.Types.String},
 },{timestamps:true}); 
 
 const userOfficeToken = connection.model('user_office',UserOfficeSchema);
 module.exports = userOfficeToken;
