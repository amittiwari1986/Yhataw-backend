const express = require("express")
const Routes = express.Router()
const leadController = require("../controller/leadController")
const {verifyTokenAndAuthoreization,verifyTokenAndAdmin,verifyToken} = require("../utils/verifyToken")

Routes.post("/addForm",leadController.addForm)
Routes.put("/updateForm",leadController.updateForm)
//Routes.put("/updateProjectDetail",verifyToken,projectdetailController.updateProjectDetail)
Routes.get("/getForm/:id",verifyToken,leadController.getForm)
Routes.get("/getForm",verifyToken,leadController.getForm)
Routes.post("/addLead",leadController.addLeadForm)
Routes.put("/updateLead",leadController.updateLeadForm)
Routes.get("/getLead/:id",verifyToken,leadController.getLeadForm)
Routes.get("/getLeadList",verifyToken,leadController.getLeadForm)
Routes.put("/updateLeadAssignToUser",leadController.updateLeadAssignToUser)
Routes.put("/updateLeadAssignTo",leadController.updateLeadAssignTo)
Routes.put("/updateLeadStage",leadController.updateLeadStage)



module.exports = Routes