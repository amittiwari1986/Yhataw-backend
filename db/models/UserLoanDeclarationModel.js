
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserLoanDeclarationSchema = new Schema({
     userId:{type:Schema.Types.String,required:[true, 'Please add user id'],ref: "users"},
     loan_acc:{type:Schema.Types.String,unique:true,required:[true, 'Please add loan account']},
     loan_amt:{type:Schema.Types.Number,required:[true, 'Please add loan amount']},
     loan_emi:{type:Schema.Types.Number,required:[true, 'Please add loan emi']},
     start_from:{type:Schema.Types.String,required:[true, 'Please add start from']},
     updated_amt:{type:Schema.Types.Number,required:[true, 'Please add updated amount']},
     status:{type:Schema.Types.Number,required:[true, 'Please add status']},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const userLoanDeclaration = connection.model('user_loan_declaration',UserLoanDeclarationSchema);
 module.exports = userLoanDeclaration;
