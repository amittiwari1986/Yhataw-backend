const express = require("express")
const userAuth = require("../controller/userAuth")
const Routes = express.Router()
Routes.post("/auth/register",userAuth.register)
Routes.post("/auth/login",userAuth.loginUser)
Routes.post("/auth/verifyOtp",userAuth.loginWithPhone)
Routes.post("/auth/password-reset",userAuth.resetUserPassword)
Routes.post("/auth/save-password/:id/:authorization",userAuth.saveResetPassword)
Routes.post("/auth/change-password",userAuth.saveChangePassword)
Routes.post("/addUserOffice",userAuth.addUserOffice)
Routes.post("/addUserBank",userAuth.addUserBank)
Routes.post("/addUserLeave",userAuth.addUserLeave)
Routes.post("/addUserSalary",userAuth.addUserSalary)
Routes.post("/addUserLoan",userAuth.addUserLoan)
Routes.post("/addOrganiation",userAuth.addOrganiation)
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