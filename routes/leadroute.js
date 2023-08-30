const express = require("express")
const Routes = express.Router()
const leadController = require("../controller/leadController")
const {verifyTokenAndAuthoreization,verifyTokenAndAdmin,verifyToken} = require("../utils/verifyToken")

Routes.post("/addForm",leadController.addForm)
//Routes.put("/updateProjectDetail",verifyToken,projectdetailController.updateProjectDetail)
Routes.get("/getForm/:id",verifyToken,leadController.getForm)
Routes.get("/getForm",verifyToken,leadController.getForm)



module.exports = Routes