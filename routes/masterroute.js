const express = require("express")
const Routes = express.Router()
const mastercontroller = require("../controller/masterController")
Routes.get("/getCountry",mastercontroller.getCountry)
Routes.post("/addCountry",mastercontroller.addCountry)
Routes.get("/getState",mastercontroller.getState)
Routes.post("/addState",mastercontroller.addState)
module.exports = Routes