
const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const ProjectListSchema = new Schema({
        propertyTypeId:{type:Schema.Types.String,required:true,unique:true,ref:"property_types"},
            bathroom:{type:Schema.Types.String,required:false},
            bedroom:{type:Schema.Types.String,required:false},
            balcony:{type:Schema.Types.String,required:false},
            furnish_type:{type:Schema.Types.String,required:false},
            car_parking:{type:Schema.Types.String,required:false},
            utility:{type:Schema.Types.String,required:false},
            study:{type:Schema.Types.String,required:false},
            poja:{type:Schema.Types.String,required:false},
            status:{type:Schema.Types.Number,required:false},
            createdAt:{type:Schema.Types.Date,default:new Date().toString()}
 },{timestamps:true}); 
 
 const project_list= connection.model('project_list',ProjectListSchema);
 module.exports = project_list;