/**
 * Maintain User Schema
 * @author Malav Naagar
 * @copyright Amit
 * @version 1.0 
 * @summary User Schema File
 */


 const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const OrganizationSchema = new Schema({ 
    userId:{type:Schema.Types.String,required:[true, 'Please add user id'],ref: "users"},
     companyname:{type:Schema.Types.String,required:[true, 'Please add company name'],unique:true,min:3,max:200},
     brandname:{type:Schema.Types.String,required:[true, 'Please add brand name'],min:3,max:200},
     imageUrl:{type:Schema.Types.String,unique:true,required:[true, 'Please add imageUrl']},
     address1:{type:Schema.Types.String,required:[true, 'Please add address1']},
     address2:{type:Schema.Types.String,required:false},
     country_id:{type:Schema.Types.String,required:[true, 'Please add country id']},
     state_id:{type:Schema.Types.String,required:[true, 'Please add state id']},
     city:{type:Schema.Types.String,required:[true, 'Please add city']},
     zipcode:{type:Schema.Types.String,required:[true, 'Please add zipcode']},
     status:{type:Schema.Types.String,required:[true, 'Please add status']},
     time_zone:{type:Schema.Types.String,required:[true, 'Please add time zone']},
     website:{type:Schema.Types.String,required:[true, 'Please add website']},
     company_type:{type:Schema.Types.String,required:[true, 'Please add company type']},
     currency:{type:Schema.Types.String,required:false},
     country_code:{type:Schema.Types.String,required:false},
 },{timestamps:true}); 
 
 const OrganizationModel = connection.model('organizations',OrganizationSchema);
 module.exports = OrganizationModel;
 