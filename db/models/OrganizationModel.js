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
    userId:{type:Schema.Types.String,required:true,ref: "users"},
     companyname:{type:Schema.Types.String,required:true,unique:true,min:3,max:200},
     brandname:{type:Schema.Types.String,required:true,min:3,max:200},
     imageUrl:{type:Schema.Types.String,unique:true,required:true},
     phone:{type:Schema.Types.String,unique:true,required:true},
     email:{type:Schema.Types.String,unique:true,required:true},
     whatsapp:{type:Schema.Types.String,required:true},
     dob:{type:Schema.Types.String,required:true},
     address1:{type:Schema.Types.String,required:true},
     address2:{type:Schema.Types.String,required:true},
     country_id:{type:Schema.Types.String,required:true},
     state_id:{type:Schema.Types.String,required:true},
     city:{type:Schema.Types.String,required:true},
     zipcode:{type:Schema.Types.String,required:true},
     status:{type:Schema.Types.String,required:true},
 },{timestamps:true}); 
 
 const OrganizationModel = connection.model('organizations',OrganizationSchema);
 module.exports = OrganizationModel;
 