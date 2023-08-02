
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const TeamSchema = new Schema({
     team_name:{type:Schema.Types.String,required:true},
     status:{type:Schema.Types.Number,required:true},
     is_remove:{type:Schema.Types.Number,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const team= connection.model('team',TeamSchema);
 module.exports = team;