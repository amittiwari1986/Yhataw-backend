const express = require("express")
const userAuth = require("../controller/userAuth")
const Routes = express.Router()
Routes.post("/auth/register",userAuth.register)
Routes.post("/auth/login",userAuth.loginUser)
Routes.post("/auth/verifyOtp",userAuth.loginWithPhone)
Routes.post("/auth/password-reset",userAuth.resetUserPassword)
Routes.post("/auth/save-password/:id/:authorization",userAuth.saveResetPassword)

module.exports = Routes