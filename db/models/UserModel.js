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
     name:{type:Schema.Types.String,required:[true, 'Please add employee name'],unique:true,min:[3, 'Name cannot be less than 3 characters'],max:[50, 'Name cannot be more than 3 characters']},
     password:{type:Schema.Types.String,required:[true, 'Please add password'],min:8,max:200},
     userRole:{type:Schema.Types.Number,required:[true, 'Please add userrole']},
     phone:{type:Schema.Types.String,unique:true,required:[true, 'Please add phone no']},
     email:{type:Schema.Types.String,unique:true,required:[true, 'Please add email']},
     logintime:{type:Schema.Types.Date,default:new Date().toString()},
     isAdmin:{type:Schema.Types.Boolean,default:false},
     phoneOtp:{type:Schema.Types.String,required:false},
     whatsapp:{type:Schema.Types.String,required:[true, 'Please add whatsapp no']},
     dob:{type:Schema.Types.String,required:[true, 'Please add date of birth']},
     martial_status:{type:Schema.Types.String,required:[true, 'Please add marital status']},
     gender:{type:Schema.Types.String,required:[true, 'Please add gender']},
     address1:{type:Schema.Types.String,required:[true, 'Please add address 1']},
     address2:{type:Schema.Types.String,required:false},
     country_id:{type:Schema.Types.String,required:[true, 'Please add country']},
     state_id:{type:Schema.Types.String,required:[true, 'Please add state']},
     city:{type:Schema.Types.String,required:[true, 'Please add city']},
     zipcode:{type:Schema.Types.String,required:[true, 'Please add zip code']},
     doj:{type:Schema.Types.String,required:[false, 'Please add joining date']},
     employee_id:{type:Schema.Types.String,required:[true, 'Please add employee id']},
     status:{type:Schema.Types.String,required:[true, 'Please add status']},
     profile_image:{type:Schema.Types.String,required:[true, 'Please add profile image']},
     in_complete:{type:Schema.Types.String,required:true},
     time_zone:{type:Schema.Types.String,required:false},
     role_id:{type:Schema.Types.String,required:[false, 'Please add role']},
     date:{type:Schema.Types.String,required:false},
 },{timestamps:true}); 
 
 const UserModel = connection.model('users',UserSchema);
 module.exports = UserModel;
 