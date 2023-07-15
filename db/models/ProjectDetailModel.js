
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const ProjectDetailSchema = new Schema({
     developerId:{type:Schema.Types.String,required:true,ref: "developers"},
     projectId:{type:Schema.Types.String,required:true,ref: "projects"},
     countryId:{type:Schema.Types.String,required:[true, 'Please add country id']},
     stateId:{type:Schema.Types.String,required:[true, 'Please add state id']},
     city:{type:Schema.Types.String,required:[true, 'Please add city']},
     description:{type:Schema.Types.String,required:[false, 'Please add designation']},
     location:{type:Schema.Types.String,required:[false, 'Please add location']},
     status:{type:Schema.Types.Number,required:[true, 'Please add status']},
     projectforId:{type:Schema.Types.String,required:[false, 'Please add projectforId']},
     projectypeId:{type:Schema.Types.String,required:[false, 'Please add projectypeId']},
     projectunittypeId:{type:Schema.Types.String,required:[false, 'Please add projectunittypeId']},
     projectstatusId:{type:Schema.Types.String,required:[false, 'Please add projectstatusId']},
     bathroom:{type:Schema.Types.Number,required:[false, 'Please add bathroom']},
     washroom:{type:Schema.Types.Number,required:[false, 'Please add washroom']},
     property_image:{type:Schema.Types.String,required:[false, 'Please add property_image']},
     edm_image:{type:Schema.Types.String,required:[false, 'Please add edm_image']},
     property_broucher:{type:Schema.Types.String,required:[false, 'Please add property_broucher']},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const projectdetails= connection.model('project_detail',ProjectDetailSchema);
 module.exports = projectdetails;