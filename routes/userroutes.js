const express = require("express")
const Routes = express.Router()
const userController = require("../controller/userController")
const {verifyTokenAndAuthoreization,verifyTokenAndAdmin} = require("../utils/verifyToken")
Routes.put("/updateUser/:id",verifyTokenAndAuthoreization,userController.updateUser)
Routes.delete("/deleteUser/:id",verifyTokenAndAuthoreization,userController.deleteUser)
Routes.get("/allUser",userController.fetchAllUser)
// Routes.get("/find/:id",verifyTokenAndAdmin,userController.getUserByIds)
Routes.get("/find/:id",verifyTokenAndAuthoreization,userController.getUserByIds)

Routes.get("/findUserBank/:id",verifyTokenAndAuthoreization,userController.getUserBankByIds)
Routes.get("/findUserLeave/:id",verifyTokenAndAuthoreization,userController.getUserLeaveByIds)
Routes.get("/findUserOffice/:id",verifyTokenAndAuthoreization,userController.getUserOfficeByIds)

module.exports = Routes