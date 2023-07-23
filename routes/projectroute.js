const express = require("express")
const Routes = express.Router()
const projectdetailController = require("../controller/projectdetailController")
const {verifyTokenAndAuthoreization,verifyTokenAndAdmin,verifyToken} = require("../utils/verifyToken")

Routes.post("/addProjectDetail",verifyToken,projectdetailController.addProjectDetail)
Routes.put("/updateProjectDetail",verifyToken,projectdetailController.updateProjectDetail)
Routes.get("/getProjectDetails/:id",verifyToken,projectdetailController.getProjectDetail)
Routes.get("/getProjectDetails",verifyToken,projectdetailController.getProjectDetail)

Routes.get("/getPropetyFor",projectdetailController.getPropertyFor)
Routes.get("/getPropetyUnitType",projectdetailController.getPropertyUnitType)
Routes.get("/getPropetyType",projectdetailController.getPropertyType)
Routes.get("/getPropetyStatus",projectdetailController.getPropertyStatus)
Routes.post("/addPropetyFor",projectdetailController.addPropertyFor)
Routes.post("/addPropetyUnitType",projectdetailController.addPropertyUnitType)
Routes.post("/addPropetyType",projectdetailController.addPropertyType)
Routes.post("/addPropetyStatus",projectdetailController.addPropertyStatus)
Routes.put("/updatePropetyFor",projectdetailController.updatePropertyFor)
Routes.put("/updatePropetyUnitType",projectdetailController.updatePropertyUnitType)
Routes.put("/updatePropetyType",projectdetailController.updatePropertyType)
Routes.put("/updatePropetyStatus",projectdetailController.updatePropertyStatus)


module.exports = Routes