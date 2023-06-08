/**
 * Maintain User Schema
 * @author Malav Naagar
 * @copyright Amit
 * @version 1.0 
 * @summary User Schema File
 */


 const connection  = require('../connect');
 const {Schema} = require('mongoose');
 const UserSchema = new Schema({
     name:{type:Schema.Types.String,required:true,unique:true,min:3,max:200},
     password:{type:Schema.Types.String,required:true,min:8,max:200},
     userRole:{type:Schema.Types.Number,required:true},
     phone:{type:Schema.Types.String,unique:true,required:true},
     email:{type:Schema.Types.String,unique:true,required:true},
     logintime:{type:Schema.Types.Date,default:new Date().toString()},
     isAdmin:{type:Schema.Types.Boolean,default:false},
     phoneOtp:{type:Schema.Types.String,required:false},
     whatsapp:{type:Schema.Types.String,required:true},
     dob:{type:Schema.Types.String,required:true},
     martial_status:{type:Schema.Types.String,required:true},
     gender:{type:Schema.Types.String,required:true},
     address1:{type:Schema.Types.String,required:true},
     address2:{type:Schema.Types.String,required:false},
     country_id:{type:Schema.Types.String,required:true},
     state_id:{type:Schema.Types.String,required:true},
     city:{type:Schema.Types.String,required:true},
     zipcode:{type:Schema.Types.String,required:true},
     doj:{type:Schema.Types.String,required:true},
     employee_id:{type:Schema.Types.String,required:true},
     status:{type:Schema.Types.String,required:true},
     profile_image:{type:Schema.Types.String,required:true},
 },{timestamps:true}); 
 
 const UserModel = connection.model('users',UserSchema);
 module.exports = UserModel;
 