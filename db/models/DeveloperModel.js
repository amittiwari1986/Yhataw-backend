const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const DeveloperSchema = new Schema({
     developer_name:{type:Schema.Types.String,required:[true, 'Please add developer name']},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const developer= connection.model('developer',DeveloperSchema);
 module.exports = developer;