
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserDocumentSchema = new Schema({
        userId:{type:Schema.Types.String,required:true,ref: "users"},
     aadhar:{type:Schema.Types.String,required:true},
     pan:{type:Schema.Types.String,required:true},
     passport:{type:Schema.Types.String,required:true},
     medical:{type:Schema.Types.String,required:true},
     voterId:{type:Schema.Types.String,required:true},
     others:{type:Schema.Types.String,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const user_document= connection.model('user_document',UserDocumentSchema);
 module.exports = user_document;