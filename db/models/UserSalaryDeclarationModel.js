
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserSalaryDeclarationSchema = new Schema({
     userId:{type:Schema.Types.String,required:true,unique:true,ref: "users"},
     EPF_opt:{type:Schema.Types.String,required:true},
     ESI_opt:{type:Schema.Types.String,required:true},
     EPF_no:{type:Schema.Types.String,required:false},
     ESI_no:{type:Schema.Types.String,required:false},
     basic:{type:Schema.Types.Number,required:true},
     HRA:{type:Schema.Types.Number,required:true},
     medical_allowance:{type:Schema.Types.Number,required:true},
     conbeyance_allowance:{type:Schema.Types.Number,required:true},
     special_allowance:{type:Schema.Types.Number,required:true},
     others:{type:Schema.Types.Number,required:true},
     i_tax:{type:Schema.Types.Number,required:false},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const userSalaryDeclaration = connection.model('user_salary_declaration',UserSalaryDeclarationSchema);
 module.exports = userSalaryDeclaration;
