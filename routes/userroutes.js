const express = require("express")
const Routes = express.Router()
const userController = require("../controller/userController")
const {verifyTokenAndAuthoreization,verifyTokenAndAdmin} = require("../utils/verifyToken")
Routes.put("/updateUser/:id",verifyTokenAndAuthoreization,userController.updateUser)
Routes.delete("/deleteUser/:id",verifyTokenAndAuthoreization,userController.deleteUser)
Routes.get("/allUser",userController.fetchAllUser)
// Routes.get("/find/:id",verifyTokenAndAdmin,userController.getUserByIds)
Routes.get("/find/:id",verifyTokenAndAuthoreization,userController.getUserByIds)

module.exports = Routes