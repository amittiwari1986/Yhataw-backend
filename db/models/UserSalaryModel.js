
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserSalarySchema = new Schema({
     userId:{type:Schema.Types.String,required:true,ref: "users"},
     basic:{type:Schema.Types.Number,required:true},
     HRA:{type:Schema.Types.Number,required:true},
     medical_allowance:{type:Schema.Types.Number,required:true},
     conbeyance_allowance:{type:Schema.Types.Number,required:true},
     special_allowance:{type:Schema.Types.Number,required:true},
     others:{type:Schema.Types.Number,required:true},
     EPF_deduction:{type:Schema.Types.Number,required:true},
     ESI_deduction:{type:Schema.Types.Number,required:true},
     i_tax:{type:Schema.Types.Number,required:true},
     loan_deduction:{type:Schema.Types.Number,required:true},
     total_salary:{type:Schema.Types.Number,required:true},
     total_deduction:{type:Schema.Types.Number,required:true},
     net_pay:{type:Schema.Types.Number,required:true},
     month:{type:Schema.Types.Number,required:true},
     year:{type:Schema.Types.Number,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const userSalary = connection.model('user_salary',UserSalarySchema);
 module.exports = userSalary;
