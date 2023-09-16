
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const LeadReminderSchema = new Schema({
            leadId:{type:Schema.Types.String,required:true,ref: "leads"},
            userId:{type:Schema.Types.String,required:true,ref: "users"},
            title:{type:Schema.Types.String,required:false},
            notes:{type:Schema.Types.String,required:false},
            date:{type:Schema.Types.String,required:false},
            time:{type:Schema.Types.String,required:false},
            status:{type:Schema.Types.String,required:[true, 'Please add status']},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const leadreminder= connection.model('lead_reminder',LeadReminderSchema);
 module.exports = leadreminder;