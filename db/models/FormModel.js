
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const FromSchema = new Schema({
            form_name:{type:Schema.Types.String,required:true},
            developerId:{type:Schema.Types.String,required:true,ref: "developers"},
            projectId:{type:Schema.Types.String,required:true,ref: "projects"},
            projecttypeId:{type:Schema.Types.String,required:false},
            leadName:{type:Schema.Types.String,required:false},
            leadEmail:{type:Schema.Types.String,required:false},
            leadPhone:{type:Schema.Types.Number,required:false},
            dynamicFields:{type:Schema.Types.String,required:false},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const form= connection.model('form',FromSchema);
 module.exports = form;