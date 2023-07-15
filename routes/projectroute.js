const express = require("express")
const Routes = express.Router()
const projectdetailController = require("../controller/projectdetailController")
const {verifyTokenAndAuthoreization,verifyTokenAndAdmin,verifyToken} = require("../utils/verifyToken")

Routes.post("/addProjectDetail",verifyToken,projectdetailController.addProjectDetail)
Routes.put("/updateProjectDetail",verifyToken,projectdetailController.updateProjectDetail)
Routes.get("/getProjectDetails/:id",verifyToken,projectdetailController.getProjectDetail)
Routes.get("/getProjectDetails",verifyToken,projectdetailController.getProjectDetail)

module.exports = Routes