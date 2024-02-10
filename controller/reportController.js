const User = require("../dto/userdto");
const userOperations = require("../services/userService");
const countryOperations = require("../services/countryService");
const Country = require("../dto/countryto");
const stateOperations = require("../services/stateService");
const State = require("../dto/stateto");
const cityOperations = require("../services/cityService");
const City = require("../dto/cityto");
const designationOperations = require("../services/designationService");
const Designation = require("../dto/designationto");
const departmentOperations = require("../services/departmentService");
const Department = require("../dto/departmentto");
const timezoneOperations = require("../services/timezoneService");
const Timezone = require("../dto/timezoneto");
const propertyTypeOperations = require("../services/propertyTypeService");
const PropertyType = require("../dto/propertytypeto");
const propertyUnitTypeOperations = require("../services/propertyUnitTypeService");
const PropertyUnitType = require("../dto/propertyunittypeto");
const propertyStatusOperations = require("../services/propertyStatusService");
const PropertyStatus = require("../dto/propertystatusto");
const propertyForOperations = require("../services/propertyForService");
const PropertyFor = require("../dto/propertyforto");
const developerOperations = require("../services/developerService");
const Developer = require("../dto/developerto");
const projectOperations = require("../services/projectService");
const Project = require("../dto/projectto");
const teamOperations = require("../services/teamService");
const Team = require("../dto/teamto");
const From = require("../dto/formto");
const formOperations = require("../services/formService");
const Lead = require("../dto/leadto");
const leadOperations = require("../services/leadService");
const LeadReminder = require("../dto/leadreminderto");
const leadReminderOperations = require("../services/leadReminderService");
const LeadMapping = require("../dto/leadmappingto");
const leadMappingOperations = require("../services/leadMappingService");
const projectDetailOperations = require("../services/projectDetailsService");
const ProjectDetail = require("../dto/projectdetailsto");
const LeadLog = require("../dto/leadlogto");
const leadLogOperations = require("../services/leadLogService");
const LeadUserStage = require("../dto/leaduserstageto");
const leadUserStageOperations = require("../services/leadUserStageService");
const LeadSource = require("../dto/leadsourceto");
const leadSourceOperations = require("../services/leadSourceService");
const jwt = require("jsonwebtoken");
const db  = require('../db/connect');


const getSalesReport = (req, res) => {
  let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
             let id = req.params.id
            
               const query = req.query.new 
              const promise = userOperations.getAllUserData(query)
              promise
              .then((data)=>{
                  console.log(data)
                  // const {others} = data
                  // if(data.length > 0){
                  //  res.status(200).json({
                  //   data: data,
                  //   success: 1
                  //   }) 

                  let arr = [];
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req.user_id; 
                    dataArray['user_name'] = req.name;
                    var newData = await leadOperations.getLeadCountStageWise("new");
                    dataArray['new_count'] = newData;

                    var not_answered_count = await leadOperations.getLeadCountStageWise("Not Answered");
                    dataArray['not_answered_count'] = not_answered_count;

                    var not_intrested_count = await leadOperations.getLeadCountStageWise("Not Intrested");
                    dataArray['not_intrested_count'] = not_intrested_count;

                    var call_back_count = await leadOperations.getLeadCountStageWise("Call Back");
                    dataArray['call_back_count'] = call_back_count;

                    // var visit_planned_count = await leadOperations.getLeadCountStageWise("Visit Planned");
                    // dataArray['visit_planned_count'] = visit_planned_count;

                    var visit_done_count = await leadOperations.getLeadCountStageWise("Visit Done");
                    dataArray['visit_done_count'] = visit_done_count;

                    var pipeline_count = await leadOperations.getLeadCountStageWise("Pipeline");
                    dataArray['pipeline_count'] = pipeline_count;

                    var future_count = await leadOperations.getLeadCountStageWise("Future");
                    dataArray['future_count'] = future_count;

                    var customer_count = await leadOperations.getLeadCountStageWise("Customer");
                    dataArray['customer_count'] = customer_count;

                    // var Scheduled = await leadOperations.getLeadCountStageWise("Visit Scheduled");
                    // dataArray['visit_scheduled_count'] = Scheduled;

                    var booked_count = await leadOperations.getLeadCountStageWise("Booked");
                    dataArray['booked_count'] = booked_count;

                    // var fresh_visit_count = await leadOperations.getLeadCountStageWise("Fresh Visit");
                    // dataArray['fresh_visit_count'] = fresh_visit_count;

                    // var walk_in_count = await leadOperations.getLeadCountStageWise("Walk-In");
                    // dataArray['walk_in_count'] = walk_in_count;

					var Released = await leadOperations.getLeadCountStageWise("Released Pipeline");
                    dataArray['released_pipeline'] = Released;


                    
                    // dataArray['status'] = req.status;
                    
                    arr.push(dataArray);
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText[0]);
                    if(responseText.length > 0){
                         res.status(200).json({
                          data: responseText[0],
                          success: 1
                          }) 
                      }else{
                          res.status(200).json({
                          data: [],
                          message: "No Data found",
                          success: 0
                        }) 
                      }
                  });

                // }else{
                //     res.status(200).json({
                //     data: [],
                //     message: "No Data found",
                //     success: 0
                //     }) 
                // }
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
              });
            
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};

const getSourceReport = (req, res) => {
  let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
             let id = req.params.id
            
               const query = req.query.new 
              const promise = leadSourceOperations.getAllLeadSource(query)
              promise
              .then((data)=>{
                  console.log(data)
                  // const {others} = data
                  // if(data.length > 0){
                  //  res.status(200).json({
                  //   data: data,
                  //   success: 1
                  //   }) 

                  let arr = [];
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                    dataArray['source_name'] = req.source_name;
                    var newData = await leadOperations.getLeadCountSourceWise("new",req.source_name);
                    dataArray['new_count'] = newData;

                    var not_answered_count = await leadOperations.getLeadCountSourceWise("Not Answered",req.source_name);
                    dataArray['not_answered_count'] = not_answered_count;

                    var not_intrested_count = await leadOperations.getLeadCountSourceWise("Not Intrested",req.source_name);
                    dataArray['not_intrested_count'] = not_intrested_count;

                    var call_back_count = await leadOperations.getLeadCountSourceWise("Call Back",req.source_name);
                    dataArray['call_back_count'] = call_back_count;

                    // var visit_planned_count = await leadOperations.getLeadCountStageWise("Visit Planned");
                    // dataArray['visit_planned_count'] = visit_planned_count;

                    var visit_done_count = await leadOperations.getLeadCountSourceWise("Visit Done",req.source_name);
                    dataArray['visit_done_count'] = visit_done_count;

                    var pipeline_count = await leadOperations.getLeadCountSourceWise("Pipeline",req.source_name);
                    dataArray['pipeline_count'] = pipeline_count;

                    var future_count = await leadOperations.getLeadCountSourceWise("Future",req.source_name);
                    dataArray['future_count'] = future_count;

                    var customer_count = await leadOperations.getLeadCountSourceWise("Customer",req.source_name);
                    dataArray['customer_count'] = customer_count;

                    // var Scheduled = await leadOperations.getLeadCountStageWise("Visit Scheduled");
                    // dataArray['visit_scheduled_count'] = Scheduled;

                    var booked_count = await leadOperations.getLeadCountSourceWise("Booked",req.source_name);
                    dataArray['booked_count'] = booked_count;

                    // var fresh_visit_count = await leadOperations.getLeadCountStageWise("Fresh Visit");
                    // dataArray['fresh_visit_count'] = fresh_visit_count;

                    // var walk_in_count = await leadOperations.getLeadCountStageWise("Walk-In");
                    // dataArray['walk_in_count'] = walk_in_count;

					var Released = await leadOperations.getLeadCountSourceWise("Released Pipeline",req.source_name);
                    dataArray['released_pipeline'] = Released;


                    
                    // dataArray['status'] = req.status;
                    
                    arr.push(dataArray);
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText[0]);
                    if(responseText.length > 0){
                         res.status(200).json({
                          data: responseText[0],
                          success: 1
                          }) 
                      }else{
                          res.status(200).json({
                          data: [],
                          message: "No Data found",
                          success: 0
                        }) 
                      }
                  });

                // }else{
                //     res.status(200).json({
                //     data: [],
                //     message: "No Data found",
                //     success: 0
                //     }) 
                // }
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
              });
            
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};

const getVisitReport = (req, res) => {
  let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
             let id = req.params.id
            
               const query = req.query.new 
              const promise = userOperations.getAllUserData(query)
              promise
              .then((data)=>{
                  // console.log(data)
                  // const {others} = data
                  // if(data.length > 0){
                  //  res.status(200).json({
                  //   data: data,
                  //   success: 1
                  //   }) 

                  let arr = [];
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    // console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req.user_id; 
                    dataArray['user_name'] = req.name;

                    var visit_planned_count = await leadOperations.getLeadCountStageWise("Visit Planned");
                    dataArray['visit_planned_count'] = visit_planned_count;

                    var visit_done_count = await leadOperations.getLeadCountSourceWise("Visit Done");
                    dataArray['visit_done_count'] = visit_done_count;

                    var pipeline_count = await leadOperations.getLeadCountSourceWise("Pipeline");
                    dataArray['pipeline_count'] = pipeline_count;

                    var Scheduled = await leadOperations.getLeadCountStageWise("Visit Scheduled");
                    dataArray['visit_scheduled_count'] = Scheduled;

                    var fresh_visit_count = await leadOperations.getLeadCountStageWise("Fresh Visit");
                    dataArray['fresh_visit_count'] = fresh_visit_count;
                    
                    arr.push(dataArray);
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText[0]);
                    if(responseText.length > 0){
                         res.status(200).json({
                          data: responseText[0],
                          success: 1
                          }) 
                      }else{
                          res.status(200).json({
                          data: [],
                          message: "No Data found",
                          success: 0
                        }) 
                      }
                  });

                // }else{
                //     res.status(200).json({
                //     data: [],
                //     message: "No Data found",
                //     success: 0
                //     }) 
                // }
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
              });
            
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};

const getProjectReport = (req, res) => {
  let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
             let id = req.params.id
            
               const query = req.query.new 
              const promise = projectOperations.getAllProject(query)
              promise
              .then((data)=>{
                  // console.log(data)
                  // const {others} = data
                  // if(data.length > 0){
                  //  res.status(200).json({
                  //   data: data,
                  //   success: 1
                  //   }) 

                  let arr = [];
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    // console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                    dataArray['project_name'] = req.project_name;

                    var projectDetails = await projectDetailOperations.findOneProjectId(req._id);
                    dataArray['project_details'] = projectDetails;

                    var newData = await leadOperations.getLeadCountProjectWise("new",req._id);
                    dataArray['new_count'] = newData;

                    var not_answered_count = await leadOperations.getLeadCountProjectWise("Not Answered",req._id);
                    dataArray['not_answered_count'] = not_answered_count;

                    var not_intrested_count = await leadOperations.getLeadCountProjectWise("Not Intrested",req._id);
                    dataArray['not_intrested_count'] = not_intrested_count;

                    var call_back_count = await leadOperations.getLeadCountProjectWise("Call Back",req._id);
                    dataArray['call_back_count'] = call_back_count;

                    // var visit_planned_count = await leadOperations.getLeadCountStageWise("Visit Planned");
                    // dataArray['visit_planned_count'] = visit_planned_count;

                    var visit_done_count = await leadOperations.getLeadCountProjectWise("Visit Done",req._id);
                    dataArray['visit_done_count'] = visit_done_count;

                    var pipeline_count = await leadOperations.getLeadCountProjectWise("Pipeline",req._id);
                    dataArray['pipeline_count'] = pipeline_count;

                    var future_count = await leadOperations.getLeadCountProjectWise("Future",req._id);
                    dataArray['future_count'] = future_count;

                    var customer_count = await leadOperations.getLeadCountProjectWise("Customer",req._id);
                    dataArray['customer_count'] = customer_count;

                    // var Scheduled = await leadOperations.getLeadCountStageWise("Visit Scheduled");
                    // dataArray['visit_scheduled_count'] = Scheduled;

                    var booked_count = await leadOperations.getLeadCountProjectWise("Booked",req._id);
                    dataArray['booked_count'] = booked_count;

                    // var fresh_visit_count = await leadOperations.getLeadCountStageWise("Fresh Visit");
                    // dataArray['fresh_visit_count'] = fresh_visit_count;

                    // var walk_in_count = await leadOperations.getLeadCountStageWise("Walk-In");
                    // dataArray['walk_in_count'] = walk_in_count;

					var Released = await leadOperations.getLeadCountProjectWise("Released Pipeline",req._id);
                    dataArray['released_pipeline'] = Released;


                    
                    // dataArray['status'] = req.status;
                    
                    arr.push(dataArray);
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText[0]);
                    if(responseText.length > 0){
                         res.status(200).json({
                          data: responseText[0],
                          success: 1
                          }) 
                      }else{
                          res.status(200).json({
                          data: [],
                          message: "No Data found",
                          success: 0
                        }) 
                      }
                  });

                // }else{
                //     res.status(200).json({
                //     data: [],
                //     message: "No Data found",
                //     success: 0
                //     }) 
                // }
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
              });
            
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};


module.exports = { getSalesReport,getSourceReport,getVisitReport,getProjectReport }