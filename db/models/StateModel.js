
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const StateSchema = new Schema({
        countryId:{type:Schema.Types.String,required:true,ref: "countries"},
     state_name:{type:Schema.Types.String,required:true},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const state = connection.model('state',StateSchema);
 module.exports = state;