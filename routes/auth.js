const express = require("express")
const userAuth = require("../controller/userAuth")
const Routes = express.Router()
Routes.post("/auth/register",userAuth.register)
Routes.post("/auth/login",userAuth.loginUser)
Routes.post("/auth/verifyOtp",userAuth.loginWithPhone)
Routes.post("/auth/password-reset",userAuth.resetUserPassword)
Routes.post("/auth/save-password/:id/:authorization",userAuth.saveResetPassword)
Routes.post("/auth/addUserOffice",userAuth.addUserOffice)
Routes.post("/auth/addUserBank",userAuth.addUserBank)
Routes.post("/auth/addUserLeave",userAuth.addUserLeave)

module.exports = Routes