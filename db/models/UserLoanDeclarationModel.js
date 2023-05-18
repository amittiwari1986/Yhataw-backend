
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserLoanDeclarationSchema = new Schema({
     userId:{type:Schema.Types.String,required:true,ref: "users"},
     loan_acc:{type:Schema.Types.String,required:true},
     loan_amt:{type:Schema.Types.String,required:true},
     loan_emi:{type:Schema.Types.String,required:true},
     start_from:{type:Schema.Types.String,required:true},
     status:{type:Schema.Types.String,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const userLoanDeclaration = connection.model('user_loan_declaration',UserLoanDeclarationSchema);
 module.exports = userLoanDeclaration;
