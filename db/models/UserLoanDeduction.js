
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserLoanDeductionSchema = new Schema({
     userId:{type:Schema.Types.String,required:[true, 'Please add user id'],ref: "users"},
     loan_acc:{type:Schema.Types.String,required:[true, 'Please add loan account']},
     updated_loan_amt:{type:Schema.Types.String,required:[true, 'Please add updated loan amount']},
     loan_emi:{type:Schema.Types.String,required:[true, 'Please add others']},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const userLoanDeduction = connection.model('user_loan_deduction',UserLoanDeductionSchema);
 module.exports = userLoanDeduction;
