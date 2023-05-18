
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserTokenSchema = new Schema({
     userId:{type:Schema.Types.String,required:true,ref: "users"},
     token:{type:Schema.Types.String,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const userToken = connection.model('user_tokens',UserTokenSchema);
 module.exports = userToken;
