
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserSalaryDeclarationSchema = new Schema({
     userId:{type:Schema.Types.String,required:[true, 'Please add user id'],unique:true,ref: "users"},
     EPF_opt:{type:Schema.Types.String,required:[true, 'Please add EPF']},
     ESI_opt:{type:Schema.Types.String,required:[true, 'Please add ESI']},
     EPF_no:{type:Schema.Types.String,required:false},
     ESI_no:{type:Schema.Types.String,required:false},
     basic:{type:Schema.Types.Number,required:[true, 'Please add Basic']},
     HRA:{type:Schema.Types.Number,required:[true, 'Please add HRA']},
     medical_allowance:{type:Schema.Types.Number,required:[true, 'Please add medical allowance']},
     conbeyance_allowance:{type:Schema.Types.Number,required:[true, 'Please add conbeyance allowance']},
     special_allowance:{type:Schema.Types.Number,required:[true, 'Please add special allowance']},
     others:{type:Schema.Types.Number,required:[true, 'Please add others']},
     i_tax:{type:Schema.Types.Number,required:false},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const userSalaryDeclaration = connection.model('user_salary_declaration',UserSalaryDeclarationSchema);
 module.exports = userSalaryDeclaration;
