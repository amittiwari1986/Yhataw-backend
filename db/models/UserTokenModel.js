
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserSchema = new Schema({
     userId:{type:Schema.Types.String,required:true,ref: "users"},
     token:{type:Schema.Types.String,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const userToken = connection.model('user_tokens',UserSchema);
 module.exports = userToken;
