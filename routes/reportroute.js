const express = require("express")
const Routes = express.Router()
const reportController = require("../controller/reportController")
const {verifyTokenAndAuthoreization,verifyTokenAndAdmin,verifyToken} = require("../utils/verifyToken")

Routes.get("/getSalesReport",verifyToken,reportController.getSalesReport)
Routes.get("/getSourceReport",verifyToken,reportController.getSourceReport)
Routes.get("/getVisitReport",verifyToken,reportController.getVisitReport)
Routes.get("/getProjectReport",verifyToken,reportController.getProjectReport)
Routes.get("/getClosureReport",verifyToken,reportController.getClosureReport)

module.exports = Routes