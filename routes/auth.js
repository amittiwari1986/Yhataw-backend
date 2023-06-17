const express = require("express")
const Joi = require("@hapi/joi");
const userAuth = require("../controller/userAuth")
const { userValidation } = require("../validation/users/user.validation")
const Routes = express.Router()
Routes.post("/auth/register",registerValidationSchema,userAuth.register)
Routes.post("/auth/login",userAuth.loginUser)
Routes.post("/auth/verifyOtp",userAuth.loginWithPhone)
Routes.post("/auth/password-reset",userAuth.resetUserPassword)
Routes.post("/auth/save-password/:id/:authorization",userAuth.saveResetPassword)
Routes.post("/auth/change-password",userAuth.saveChangePassword)
Routes.post("/addUserOffice",userOfficeValidationSchema,userAuth.addUserOffice)
Routes.post("/addUserBank",userBankValidationSchema,userAuth.addUserBank)
Routes.post("/addUserLeave",userLeaveValidationSchema,userAuth.addUserLeave)
Routes.post("/addUserSalary",userSalaryValidationSchema,userAuth.addUserSalary)
Routes.post("/addUserLoan",userLoanValidationSchema,userAuth.addUserLoan)
Routes.post("/addOrganiation",addOrganizationValidationSchema,userAuth.addOrganiation)
Routes.post("/punchIn",userAuth.punchIn)
Routes.put("/punchOut",userAuth.punchOut)
Routes.put("/addUserApplyLeave",userAuth.addUserApplyLeave)
Routes.put("/updateUserBank",userAuth.updateUserBank)
Routes.put("/updateUserPersonal",userAuth.updateUserPersonal)
Routes.put("/updateUserOffice",userAuth.updateUserOffice)
Routes.put("/updateUserSalary",userAuth.updateUserSalary)
Routes.put("/updateUserLeave",userAuth.updateUserLeave)
Routes.put("/userStatusUpdate",userAuth.deactivateUser)
Routes.put("/updateOrganization",userAuth.updateOrganization)
module.exports = Routes


function registerValidationSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().max(3).message("Name cannot be less than 3 characters").max(30).message("Name cannot be more than 30 characters").required(),
		email: Joi.string().email().required(),
		userRole: Joi.string(),
		gender: Joi.string().valid("Male","Female").required(),
		phone: Joi.number().integer().min(1000000000).message("Invalid mobile no").max(9999999999).message("Invalid mobile no").required(),
	     whatsapp:Joi.number().integer().min(1000000000).message("Invalid whatsApp no").max(9999999999).message("Invalid whatsApp no").required(),
	     dob:Joi.string().required(),
	     martial_status:Joi.string().required(),
	     address1:Joi.string().required(),
	     address2:Joi.string(),
	     country_id:Joi.string().required(),
	     state_id:Joi.string().required(),
	     city:Joi.string().required(),
	     zipcode:Joi.string().required(),
	     doj:Joi.string().required(),
	     employee_id:Joi.string().required(),
	     status:Joi.string(),
	     profile_image:Joi.string().required(),
	     in_complete:Joi.string(),
	     time_zone:Joi.string(),
	     password:Joi.string(),
    });
    validateRequest(req, res, schema, next);
}

function userOfficeValidationSchema(req, res, next) {
    const schema = Joi.object({
		 userId:Joi.string().required(),
	     emp_type:Joi.string().required(),
	     department:Joi.string().required(),
	     designation:Joi.string().required(),
	     joining:Joi.string().required(),
	     working_days:Joi.string().required(),
	     working_shift:Joi.string().required(),
    });
    validateRequest(req, res, schema, next);
}

function userBankValidationSchema(req, res, next) {
    const schema = Joi.object({
		 userId:Joi.string().required(),
	     bank_name:Joi.string().required(),
	     branch_name:Joi.string().required(),
	     holder_name:Joi.string().required(),
	     account_no:Joi.string().required(),
	     ifsc:Joi.string().required(),
    });
    validateRequest(req, res, schema, next);
}

function userLeaveValidationSchema(req, res, next) {
    const schema = Joi.object({
		 userId:Joi.string().required(),
	     total_leave:Joi.string().required(),
	     earned_leave:Joi.string().required(),
	     sick_leave:Joi.string().required(),
	     casual_leave:Joi.string().required(),
    });
    validateRequest(req, res, schema, next);
}

function userLoanValidationSchema(req, res, next) {
    const schema = Joi.object({
		 userId:Joi.string().required(),
	     loan_acc:Joi.string().required(),
	     loan_amt:Joi.string().required(),
	     loan_emi:Joi.string().required(),
	     start_from:Joi.string().required(),
	     updated_amt:Joi.string().required(),
	     status:Joi.string().required(),
    });
    validateRequest(req, res, schema, next);
}

function userSalaryValidationSchema(req, res, next) {
    const schema = Joi.object({
		 userId:Joi.string().required(),
	     EPF_opt:Joi.string().required(),
	     ESI_opt:Joi.string().required(),
	     EPF_no:Joi.string(),
	     ESI_no:Joi.string(),
	     basic:Joi.string().required(),
	     HRA:Joi.string().required(),
	     medical_allowance:Joi.string().required(),
	     conbeyance_allowance:Joi.string().required(),
	     special_allowance:Joi.string().required(),
	     others:Joi.string().required(),
	     i_tax:Joi.string(),
    });
    validateRequest(req, res, schema, next);
}

function addOrganizationValidationSchema(req, res, next) {
    const schema = Joi.object({
		 userId:Joi.string().required(),
	     companyname:Joi.string().max(3).message("Name cannot be less than 3 characters").max(150).message("Name cannot be more than 30 characters").required(),
	     brandname:Joi.string().max(3).message("Name cannot be less than 3 characters").max(150).message("Name cannot be more than 30 characters").required(),
	     imageUrl:Joi.string().required(),
	     address1:Joi.string().required(),
	     address2:Joi.string(),
	     country_id:Joi.string().required(),
	     state_id:Joi.string().required(),
	     city:Joi.string().required(),
	     zipcode:Joi.string().required(),
	     status:Joi.string(),
	     time_zone:Joi.string().required(),
	     website:Joi.string().required(),
	     company_type:Joi.string(),
    });
    validateRequest(req, res, schema, next);
}

function validateRequest(req, res, schema, next) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
    	res.status(400).json({
				success: 0,
				message: `error: ${error.details.map(x => x.message).join(', ')}`
			});
        //next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}