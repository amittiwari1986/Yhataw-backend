const express = require("express")
const Routes = express.Router()
const userController = require("../controller/userController")
const {verifyTokenAndAuthoreization,verifyTokenAndAdmin,verifyToken} = require("../utils/verifyToken")
Routes.put("/updateUser/:id",verifyTokenAndAuthoreization,userController.updateUser)
Routes.delete("/deleteUser/:id",verifyTokenAndAuthoreization,userController.deleteUser)
Routes.get("/allUser",userController.fetchAllUser)
// Routes.get("/find/:id",verifyTokenAndAdmin,userController.getUserByIds)
Routes.get("/find/:id",verifyToken,userController.getUserByIds)

Routes.get("/findUserBank/:id",verifyTokenAndAuthoreization,userController.getUserBankByIds)
Routes.get("/findUserLeave/:id",verifyTokenAndAuthoreization,userController.getUserLeaveByIds)
Routes.get("/findUserOffice/:id",verifyTokenAndAuthoreization,userController.getUserOfficeByIds)
Routes.get("/getUserAllInfo/:id",verifyTokenAndAuthoreization,userController.getallUserByIds)
Routes.get("/findUserSalaryDeclaration/:id",verifyTokenAndAuthoreization,userController.getUserSalaryDeclarationByIds)
Routes.get("/findUserLoanDeclaration/:id",verifyTokenAndAuthoreization,userController.getUserLoanDeclarationByIds)
Routes.get("/findUserAttendance/:id",verifyTokenAndAuthoreization,userController.getUserAttendanceByIds)

Routes.get("/getUserApplyLeaveByIds/:id",verifyTokenAndAuthoreization,userController.getUserApplyLeaveByIds)

module.exports = Routes