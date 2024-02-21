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
               let team_id = req.query.team_id
             let start_date = req.query.start_date
            let end_date = req.query.end_date
            let page = req.query.page
            let limit = req.query.limit
            var skip = limit * page;
             query = {"team_id":team_id, "start_date": start_date, "end_date": end_date, "limit": Number(limit), "skip": skip, "page": Number(page)};
                 // console.log(query);
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
                  let total_arr = [];
                  var arr2 = {};
                    arr2['total_count'] = 100;
                    arr2['total_new_count'] = 100;
                    arr2['total_answered_count'] = 100;
                    arr2['total_intrested_count'] = 100;
                    arr2['total_call_back_count'] = 100;
                    arr2['total_visit_done_count'] = 100;
                    arr2['total_pipeline_count'] = 100;
                    arr2['total_future_count'] = 100;
                    arr2['total_customer_count'] = 100;
                    arr2['total_booked_count'] = 100;
                  total_arr.push(arr2);
                 var arrrr = Promise.all(data[0].data.map(async (element) => {
                    var req = element;
                    // console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req.user_id; 
                    dataArray['user_name'] = req.name;
                    newQuery = {"user_id":req.user_id, "start_date": start_date, "end_date": end_date};
                    var newData = await leadOperations.getLeadCountStageWiseAndUserWise("new",newQuery);
                    if(newData[0]){
                      dataArray['new_count'] = newData[0].total_records;
                    }else{
                      dataArray['new_count'] = 0;
                    }

                   var not_answered_count = await leadOperations.getLeadCountStageWiseAndUserWise("Not Answered",newQuery);
                     if(not_answered_count[0]){
                        dataArray['not_answered_count'] = not_answered_count[0].total_records;
                      }else{
                        dataArray['not_answered_count'] = 0;
                      }

                    var not_intrested_count = await leadOperations.getLeadCountStageWiseAndUserWise("Not Intrested",newQuery);
                    if(not_intrested_count[0]){
                        dataArray['not_intrested_count'] = not_intrested_count[0].total_records;
                      }else{
                        dataArray['not_intrested_count'] = 0;
                      }

                    var call_back_count = await leadOperations.getLeadCountStageWiseAndUserWise("Call Back",newQuery);
                    if(call_back_count[0]){
                        call_back_count['call_back_count'] = call_back_count[0].total_records;
                      }else{
                        dataArray['call_back_count'] = 0;
                      }

                    // var visit_planned_count = await leadOperations.getLeadCountStageWise("Visit Planned");
                    // dataArray['visit_planned_count'] = visit_planned_count;

                    var visit_done_count = await leadOperations.getLeadCountStageWiseAndUserWise("Visit Done",newQuery);
                    if(visit_done_count[0]){
                        visit_done_count['visit_done_count'] = visit_done_count[0].total_records;
                      }else{
                        dataArray['visit_done_count'] = 0;
                      }

                    var pipeline_count = await leadOperations.getLeadCountStageWiseAndUserWise("Pipeline",newQuery);
                    if(pipeline_count[0]){
                        pipeline_count['pipeline_count'] = pipeline_count[0].total_records;
                      }else{
                        dataArray['pipeline_count'] = 0;
                      }

                    var future_count = await leadOperations.getLeadCountStageWiseAndUserWise("Future",newQuery);
                    if(future_count[0]){
                        future_count['future_count'] = future_count[0].total_records;
                      }else{
                        dataArray['future_count'] = 0;
                      }

                    var customer_count = await leadOperations.getLeadCountStageWiseAndUserWise("Customer",newQuery);
                    if(customer_count[0]){
                        customer_count['customer_count'] = customer_count[0].total_records;
                      }else{
                        dataArray['customer_count'] = 0;
                      }

                    // var Scheduled = await leadOperations.getLeadCountStageWise("Visit Scheduled");
                    // dataArray['visit_scheduled_count'] = Scheduled;

                    var booked_count = await leadOperations.getLeadCountStageWiseAndUserWise("Booked",newQuery);
                    if(booked_count[0]){
                        booked_count['booked_count'] = booked_count[0].total_records;
                      }else{
                        dataArray['booked_count'] = 0;
                      }

                    // var fresh_visit_count = await leadOperations.getLeadCountStageWise("Fresh Visit");
                    // dataArray['fresh_visit_count'] = fresh_visit_count;

                    // var walk_in_count = await leadOperations.getLeadCountStageWise("Walk-In");
                    // dataArray['walk_in_count'] = walk_in_count;

                    var ReleasedData = await leadOperations.getLeadCountStageWiseAndUserWise("Released Pipeline",newQuery);
                    if(ReleasedData[0]){
                        ReleasedData['released_pipeline'] = ReleasedData[0].total_records;
                      }else{
                        ReleasedData['released_pipeline'] = 0;
                      }


                    
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
                          dataTotalCount: total_arr,
                          metadata: data[0].metadata,
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
               let source = req.query.source
             let start_date = req.query.start_date
            let end_date = req.query.end_date
            let page = req.query.page
            let limit = req.query.limit
            var skip = limit * page;
             query = {"source":source, "start_date": start_date, "end_date": end_date, "limit": Number(limit), "skip": skip, "page": Number(page)};
                 // console.log(query);
              const promise = leadSourceOperations.getAllLeadSources(query)
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
                     let total_arr = [];
                  var arr2 = {};
                    arr2['total_count'] = 100;
                    arr2['total_new_count'] = 100;
                    arr2['total_answered_count'] = 100;
                    arr2['total_intrested_count'] = 100;
                    arr2['total_call_back_count'] = 100;
                    arr2['total_visit_done_count'] = 100;
                    arr2['total_pipeline_count'] = 100;
                    arr2['total_future_count'] = 100;
                    arr2['total_customer_count'] = 100;
                    arr2['total_booked_count'] = 100;
                  total_arr.push(arr2);
                 var arrrr = Promise.all(data[0].data.map(async (element) => {
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
                          dataTotalCount: total_arr,
                          metadata: data[0].metadata,
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
             let team_id = req.query.team_id
             let start_date = req.query.start_date
            let end_date = req.query.end_date
            let page = req.query.page
            let limit = req.query.limit
            var skip = limit * page;
             query = {"team_id":team_id, "start_date": start_date, "end_date": end_date, "limit": Number(limit), "skip": skip, "page": Number(page)};
                 console.log(query);
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
                let total_arr = [];
                var arr2 = {};
                    arr2['total_count'] = 100;
                    arr2['total_visit_planned_count'] = 100;
                    arr2['total_visit_done_count'] = 100;
                    arr2['total_pipeline_count'] = 100;
                    arr2['total_visit_scheduled_count'] = 100;
                    arr2['total_fresh_visit_count'] = 100;
                  total_arr.push(arr2);
                 var arrrr = Promise.all(data[0].data.map(async (element) => {
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
                    // dataArray['total_visit_planned_count'] = 100;
                    // dataArray['total_visit_done_count'] = 100;
                    // dataArray['total_pipeline_count'] = 100;
                    // dataArray['total_visit_scheduled_count'] = 100;
                    // dataArray['total_fresh_visit_count'] = 100;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText[0]);
                    if(responseText.length > 0){
                         res.status(200).json({
                          data: responseText[0],
                          dataTotalCount: total_arr,
                          metadata: data[0].metadata,
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
             let project_id = req.query.project_id
             let start_date = req.query.start_date
            let end_date = req.query.end_date
            let page = req.query.page
            let limit = req.query.limit
            var skip = limit * page;
             query = {"project_id":project_id, "start_date": start_date, "end_date": end_date, "limit": Number(limit), "skip": skip, "page": Number(page)};
                 console.log(query);
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
                  let total_arr = [];
                var arr2 = {};
                    arr2['total_count'] = 100;
                    arr2['total_new_count'] = 100;
                    arr2['total_answered_count'] = 100;
                    arr2['total_intrested_count'] = 100;
                    arr2['total_call_back_count'] = 100;
                    arr2['total_visit_done_count'] = 100;
                    arr2['total_pipeline_count'] = 100;
                    arr2['total_future_count'] = 100;
                    arr2['total_customer_count'] = 100;
                    arr2['total_booked_count'] = 100;
                  total_arr.push(arr2);
                 var arrrr = Promise.all(data[0].data.map(async (element) => {
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
                          dataTotalCount: total_arr,
                          metadata: data[0].metadata,
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

const getClosureReport = (req, res) => {
  let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
             let team_id = req.query.team_id
             let start_date = req.query.start_date
            let end_date = req.query.end_date
            let page = req.query.page
            let limit = req.query.limit
            var skip = limit * page;
             query = {"team_id":team_id, "start_date": start_date, "end_date": end_date, "limit": Number(limit), "skip": skip, "page": Number(page)};
                 console.log(query);
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
                let total_arr = [];
                var arr2 = {};
                    arr2['total_count'] = 0;
                    arr2['Jan'] = 0;
                    arr2['Feb'] = 0;
                    arr2['Mar'] = 0;
                    arr2['Apr'] = 0;
                    arr2['May'] = 0;
                    arr2['Jun'] = 0;
                    arr2['Jul'] = 0;
                    arr2['Aug'] = 0;
                    arr2['Sept'] = 0;
                    arr2['Oct'] = 0;
                    arr2['Nov'] = 0;
                    arr2['Dec'] = 0;
                  total_arr.push(arr2);
                 var arrrr = Promise.all(data[0].data.map(async (element) => {
                    var req = element;
                    // console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req.user_id; 
                    dataArray['user_name'] = req.name;

                    // var visit_planned_count = await leadOperations.getLeadCountStageWise("Visit Planned");
                    // dataArray['visit_planned_count'] = visit_planned_count;

                    // var visit_done_count = await leadOperations.getLeadCountSourceWise("Visit Done");
                    // dataArray['visit_done_count'] = visit_done_count;

                    // var pipeline_count = await leadOperations.getLeadCountSourceWise("Pipeline");
                    // dataArray['pipeline_count'] = pipeline_count;

                    // var Scheduled = await leadOperations.getLeadCountStageWise("Visit Scheduled");
                    // dataArray['visit_scheduled_count'] = Scheduled;

                    // var fresh_visit_count = await leadOperations.getLeadCountStageWise("Fresh Visit");
                    // dataArray['fresh_visit_count'] = fresh_visit_count;

                    dataArray['Jan'] = 0;
                    dataArray['Feb'] = 0;
                    dataArray['Mar'] = 0;
                    dataArray['Apr'] = 0;
                    dataArray['May'] = 0;
                    dataArray['Jun'] = 0;
                    dataArray['Jul'] = 0;
                    dataArray['Aug'] = 0;
                    dataArray['Sept'] = 0;
                    dataArray['Oct'] = 0;
                    dataArray['Nov'] = 0;
                    dataArray['Dec'] = 0;
                    arr.push(dataArray);
                    return arr;
                    // dataArray['total_visit_planned_count'] = 100;
                    // dataArray['total_visit_done_count'] = 100;
                    // dataArray['total_pipeline_count'] = 100;
                    // dataArray['total_visit_scheduled_count'] = 100;
                    // dataArray['total_fresh_visit_count'] = 100;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText[0]);
                    if(responseText.length > 0){
                         res.status(200).json({
                          data: responseText[0],
                          dataTotalCount: total_arr,
                          metadata: data[0].metadata,
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


module.exports = { getSalesReport,getSourceReport,getVisitReport,getProjectReport,getClosureReport }