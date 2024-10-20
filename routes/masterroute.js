const express = require("express")
const Routes = express.Router()
const mastercontroller = require("../controller/masterController")
Routes.get("/getCountry",mastercontroller.getCountry)
Routes.post("/addCountry",mastercontroller.addCountry)
Routes.get("/getState",mastercontroller.getState)
Routes.post("/addState",mastercontroller.addState)
Routes.get("/getCity",mastercontroller.getCity)
Routes.post("/addCity",mastercontroller.addCity)
Routes.get("/getDesignation/:id",mastercontroller.getDesignation)
Routes.get("/getDesignation",mastercontroller.getDesignation)
Routes.post("/addDesignation",mastercontroller.addDesignation)
Routes.get("/getDepartment",mastercontroller.getDepartment)
Routes.post("/addDepartment",mastercontroller.addDepartment)
Routes.delete("/deleteDesignation/:id",mastercontroller.deleteDesignation)
Routes.delete("/deleteDepartment/:id",mastercontroller.deleteDepartment)
Routes.get("/getCity/:id",mastercontroller.getCity)
Routes.get("/getState/:id",mastercontroller.getState)
Routes.get("/getDepartmentList",mastercontroller.getDepartmentList)
Routes.get("/getTimezone/:id",mastercontroller.getTimezone)
Routes.post("/addProperty",mastercontroller.addProperty)
Routes.post("/addProject",mastercontroller.addProject)
Routes.post("/addDeveloper",mastercontroller.addDeveloper)
Routes.get("/getDeveloper",mastercontroller.getDeveloper)
Routes.get("/getProject",mastercontroller.getProject)
Routes.get("/getProject/:id",mastercontroller.getProject)
Routes.get("/getDeveloperTree",mastercontroller.getDeveloperTree)
Routes.get("/getDeveloperTree/:id",mastercontroller.getDeveloperTree)
Routes.delete("/deleteProject/:id",mastercontroller.deleteProject)
Routes.get("/getTeamList",mastercontroller.getTeam)
Routes.get("/getTeam/:id",mastercontroller.getTeam)
Routes.post("/addTeam",mastercontroller.addTeam)
Routes.put("/updateTeam",mastercontroller.updateTeam)
Routes.post("/addLeadStatus",mastercontroller.addLeadStatus)
Routes.get("/getLeadStatus",mastercontroller.getLeadStatus)
Routes.post("/addLeadSource",mastercontroller.addLeadSource)
Routes.get("/getLeadSource",mastercontroller.getLeadSource)
Routes.get("/getTeamDropDown",mastercontroller.getTeamDropDown)
Routes.get("/getTeamDropDown/:id",mastercontroller.getTeamDropDown)
Routes.post("/getReportingManagerByRoleWise",mastercontroller.getReportingManagerByRoleWise)
Routes.post("/getMultipleTeamWiseDropDown",mastercontroller.getMultipleTeamWiseDropDown)
Routes.get("/getPropertyList/:id",mastercontroller.getPropertyList)
Routes.post("/addPropertyList",mastercontroller.addPropertyList)
Routes.put("/updatePropertyList",mastercontroller.updatePropertyList)
Routes.post("/getMultipleTeamWiseDropDownProject",mastercontroller.getMultipleTeamWiseDropDownProject)
Routes.get("/getTeamDropDownProject",mastercontroller.getTeamDropDownProject)
Routes.get("/getTeamDropDownProject/:id",mastercontroller.getTeamDropDownProject)
Routes.put("/updateProject",mastercontroller.updateProject)
Routes.put("/updateDeveloper",mastercontroller.updateDeveloper)
Routes.put("/updateDepartment",mastercontroller.updateDepartment)
Routes.get("/updateProjectUid",mastercontroller.updateProjectUid)
Routes.get("/getProjectUnMap",mastercontroller.getProjectUnMap)
Routes.post("/addProjectApiNew",mastercontroller.addProjectApiNew)
Routes.put("/updateProjectApiNew",mastercontroller.updateProjectApiNew)
Routes.post("/addProjectUidMapping",mastercontroller.addProjectUidMapping)
Routes.post("/addBanner",mastercontroller.addBanner)
Routes.get("/getProjectUidMapping/:id",mastercontroller.getProjectUidMapping)
Routes.get("/getBanner",mastercontroller.getBanner)
Routes.get("/getLeadHistory/:id",mastercontroller.getLeadHistory)
Routes.get("/getTeamUserWise/:id",mastercontroller.getTeamUserWise)
Routes.get("/getTeamWiseMember/:id",mastercontroller.getTeamWiseMember)
module.exports = Routes

