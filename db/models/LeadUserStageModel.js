
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const LeadUserStageSchema = new Schema({
        lead_id:{type:Schema.Types.String,required:true,ref: "leads"},
       user_id:{type:Schema.Types.String,required:true},
       type:{type:Schema.Types.String,required:true},
       user_name:{type:Schema.Types.String,required:false},
       stage:{type:Schema.Types.String,required:false},
       status:{type:Schema.Types.String,required:false},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const leadUserStage= connection.model('lead_user_stage',LeadUserStageSchema);
 module.exports = leadUserStage;