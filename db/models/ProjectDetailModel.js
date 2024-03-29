
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
     zipcode:{type:Schema.Types.String,required:[false, 'Please add location']},
     status:{type:Schema.Types.Number,required:[true, 'Please add status']},
     projectforId:{type:Schema.Types.String,required:[false, 'Please add projectforId']},
     projecttypeId:{type:Schema.Types.String,required:[false, 'Please add projecttypeId']},
     projectunittypeId:{type:Schema.Types.String,required:[false, 'Please add projectunittypeId']},
     projectstatusId:{type:Schema.Types.String,required:[false, 'Please add projectstatusId']},
     bathroom:{type:Schema.Types.Number,required:[false, 'Please add bathroom']},
     washroom:{type:Schema.Types.Number,required:[false, 'Please add washroom']},
     property_image:{type:Schema.Types.String,required:[false, 'Please add property_image']},
     edm_image:{type:Schema.Types.String,required:[false, 'Please add edm_image']},
     property_broucher:{type:Schema.Types.String,required:[false, 'Please add property_broucher']},
     utility:{type:Schema.Types.String,required:[false, 'Please add utility']},
     study:{type:Schema.Types.String,required:[false, 'Please add study']},
     furnish_type:{type:Schema.Types.String,required:[false, 'Please add furnish_type']},
     pooja:{type:Schema.Types.String,required:[false, 'Please add pooja']},
     AssignTo:{type:Schema.Types.String,required:false},
     AssignToUser:{type:Schema.Types.String,required:false},
     car_parking:{type:Schema.Types.String,required:false},
     bedroom:{type:Schema.Types.String,required:false},
     createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const projectdetails= connection.model('project_detail',ProjectDetailSchema);
 module.exports = projectdetails;