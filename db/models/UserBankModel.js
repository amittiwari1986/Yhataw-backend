
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserBankSchema = new Schema({
     userId:{type:Schema.Types.String,required:true,ref: "users"},
     bank_name:{type:Schema.Types.String,required:true},
     branch_name:{type:Schema.Types.String,required:true},
     holder_name:{type:Schema.Types.String,required:true},
     account_no:{type:Schema.Types.String,required:true},
     ifsc:{type:Schema.Types.String,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const userBankToken = connection.model('user_bank',UserBankSchema);
 module.exports = userBankToken;
