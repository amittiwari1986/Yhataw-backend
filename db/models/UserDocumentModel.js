
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserDocumentSchema = new Schema({
        userId:{type:Schema.Types.String,required:true,ref: "users"},
     aadhar:{type:Schema.Types.String,required:false},
     pan:{type:Schema.Types.String,required:false},
     passport:{type:Schema.Types.String,required:false},
     medical:{type:Schema.Types.String,required:false},
     voterId:{type:Schema.Types.String,required:false},
     others:{type:Schema.Types.String,required:false},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const user_document= connection.model('user_document',UserDocumentSchema);
 module.exports = user_document;