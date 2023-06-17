
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserBankSchema = new Schema({
     userId:{type:Schema.Types.String,required:[true, 'Please add user id'],ref: "users"},
     bank_name:{type:Schema.Types.String,required:[true, 'Please add bank name']},
     branch_name:{type:Schema.Types.String,required:[true, 'Please add branch name']},
     holder_name:{type:Schema.Types.String,required:[true, 'Please add holder name']},
     account_no:{type:Schema.Types.String,required:[true, 'Please add account no']},
     ifsc:{type:Schema.Types.String,required:[true, 'Please add ifsc']},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const userBankToken = connection.model('user_bank',UserBankSchema);
 module.exports = userBankToken;
