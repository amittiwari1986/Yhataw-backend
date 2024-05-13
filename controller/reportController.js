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
               var team_id = req.query.team_id
             var start_date = req.query.start_date
            var end_date = req.query.end_date
            var page = req.query.page
            var limit = req.query.limit
            var skip = limit * page;
             query = {"team_id":team_id, "start_date": start_date, "end_date": end_date, "limit": Number(limit), "skip": skip, "page": Number(page)};
                 // console.log(query);
              const promise = userOperations.getAllUserData(query,team_id)
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
                    var total_count = 0;
                    
                    var total_new_count = 0;
                    var total_answered_count = 0;
                    var total_intrested_count = 0;
                    var total_call_back_count = 0;
                    var total_visit_done_count = 0;
                    var total_pipeline_count = 0;
                    var total_future_count = 0;
                    var total_customer_count = 0;
                    var total_booked_count = 0;
                    var total_released_pipeline = 0;
                  // total_arr.push(arr2);
                 var arrrr = Promise.all(data[0].data.map(async (element) => {
                    var req = element;
                    // console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req.user_id; 
                    dataArray['user_name'] = req.name;
                    // newQuery = {"user_id":req.user_id, "start_date": start_date, "end_date": end_date};
                    newQuery = req.user_id;
                    var newData = await leadUserStageOperations.findLeadUserStageByleadIdUserIdCount(newQuery);
                    var allDataExpectNew = 0;
                    dataArray['new_count'] = 0;
                    dataArray['call_done'] = 0;
                    dataArray['not_answered_count'] = 0;
                    dataArray['not_intrested_count'] = 0;
                    dataArray['call_back_count'] = 0;
                    dataArray['visit_done_count'] = 0;
                    dataArray['pipeline_count'] = 0;
                    dataArray['future_count'] = 0;
                    dataArray['customer_count'] = 0;
                    dataArray['booked_count'] = 0;
                    dataArray['released_pipeline'] = 0;
                    

                    // if(newData.length > 0){
                    // console.log(newData);
                      newData.forEach(function(item) {
                        if(item._id == "new"){
                          dataArray["new_count"] = item.total_records;
                          total_new_count = Number(total_new_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                        }
                        if(item._id == "Pipeline"){
                          dataArray["pipeline_count"] = item.total_records;
                          total_pipeline_count = Number(total_pipeline_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Not Answered"){
                          dataArray["not_answered_count"] = item.total_records;
                          total_answered_count = Number(total_answered_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Not Interested"){
                          dataArray["not_intrested_count"] = item.total_records;
                          total_intrested_count = Number(total_intrested_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Call Back"){
                          dataArray["call_back_count"] = item.total_records;
                          call_back_count = 0 + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Visit Done"){
                          dataArray["visit_done_count"] = item.total_records;
                          total_visit_done_count = Number(total_visit_done_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Future"){
                          dataArray["future_count"] = item.total_records;
                          total_future_count = Number(total_future_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Customer"){
                          dataArray["customer_count"] = item.total_records;
                          total_customer_count = Number(total_customer_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Booked"){
                          dataArray["customer_count"] = item.total_records;
                          total_booked_count = Number(total_booked_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Released Pipeline"){
                          dataArray['released_pipeline'] = item.total_records;
                          total_released_pipeline = Number(total_released_pipeline) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        dataArray['call_done'] = allDataExpectNew;
                      });
                      
                    // }


                    arr.push(dataArray);
                    console.log(arr);
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText);
                  var arr2 = {};
                    arr2['total_count'] = total_count;
                    arr2['total_new_count'] = total_new_count;
                    arr2['total_answered_count'] = total_answered_count;
                    arr2['total_intrested_count'] = total_intrested_count;
                    arr2['total_call_back_count'] = total_call_back_count;
                    arr2['total_visit_done_count'] = total_visit_done_count;
                    arr2['total_pipeline_count'] = total_pipeline_count;
                    arr2['total_future_count'] = total_future_count;
                    arr2['total_customer_count'] = total_customer_count;
                    arr2['total_booked_count'] = total_booked_count;
                    arr2['total_released_pipeline'] = total_released_pipeline;
                    total_arr.push(arr2);
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
                    var total_count = 0;
                    var total_new_count = 0;
                    var total_answered_count = 0;
                    var total_intrested_count = 0;
                    var total_call_back_count = 0;
                    var total_visit_done_count = 0;
                    var total_pipeline_count =0 ;
                    var total_future_count = 0;
                    var total_customer_count = 0;
                    var total_booked_count = 0;
                    var total_released_pipeline = 0;
                 var arrrr = Promise.all(data[0].data.map(async (element) => {
                    var req = element;
                    // console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                    dataArray['source_name'] = req.source_name;
                    var allDataExpectNew = 0;
                    dataArray['new_count'] = 0;
                    dataArray['call_done'] = 0;
                    dataArray['not_answered_count'] = 0;
                    dataArray['not_intrested_count'] = 0;
                    dataArray['call_back_count'] = 0;
                    dataArray['visit_done_count'] = 0;
                    dataArray['pipeline_count'] = 0;
                    dataArray['future_count'] = 0;
                    dataArray['customer_count'] = 0;
                    dataArray['booked_count'] = 0;
                    dataArray['released_pipeline'] = 0;
                    //
                    var sourceWiseData = await leadOperations.getAllleadData(req.source_name);
                    var df = [];
                    sourceWiseData.forEach(function(items) {
                      newQuery = items._id.toString();
                      df.push(newQuery);
                    });
                    // console.log(df);
                     var newData = await leadUserStageOperations.findLeadUserStageByUserIdLeadIdCount(df);
                     // console.log(newQuery);
                     // console.log(newData);
                     
                     newData.forEach(function(item) {
                        if(item._id == "new"){
                          dataArray["new_count"] = item.total_records;
                          total_new_count = Number(total_new_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                        }
                        if(item._id == "Pipeline"){
                          dataArray["pipeline_count"] = item.total_records;
                          total_pipeline_count = Number(total_pipeline_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Not Answered"){
                          dataArray["not_answered_count"] = item.total_records;
                          total_answered_count = Number(total_answered_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Not Interested"){
                          dataArray["not_intrested_count"] = item.total_records;
                          total_intrested_count = Number(total_intrested_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Call Back"){
                          dataArray["call_back_count"] = item.total_records;
                          call_back_count = 0 + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Visit Done"){
                          dataArray["visit_done_count"] = item.total_records;
                          total_visit_done_count = Number(total_visit_done_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Future"){
                          dataArray["future_count"] = item.total_records;
                          total_future_count = Number(total_future_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Customer"){
                          dataArray["customer_count"] = item.total_records;
                          total_customer_count = Number(total_customer_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Booked"){
                          dataArray["customer_count"] = item.total_records;
                          total_booked_count = Number(total_booked_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Released Pipeline"){
                          dataArray['released_pipeline'] = item.total_records;
                          total_released_pipeline = Number(total_released_pipeline) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        dataArray['call_done'] = allDataExpectNew;
                      });

                    
                    arr.push(dataArray);
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText[0]);
                  var arr2 = {};
                    arr2['total_count'] = total_count;
                    arr2['total_new_count'] = total_new_count;
                    arr2['total_answered_count'] = total_answered_count;
                    arr2['total_intrested_count'] = total_intrested_count;
                    arr2['total_call_back_count'] = total_call_back_count;
                    arr2['total_visit_done_count'] = total_visit_done_count;
                    arr2['total_pipeline_count'] = total_pipeline_count;
                    arr2['total_future_count'] = total_future_count;
                    arr2['total_customer_count'] = total_customer_count;
                    arr2['total_booked_count'] = total_booked_count;
                    arr2['total_released_pipeline'] = total_released_pipeline;
                    total_arr.push(arr2);
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
              const promise = userOperations.getAllUserData(query,team_id)
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
                    var total_count = 0;
                    var total_visit_planned_count = 0;
                    var total_visit_done_count = 0;
                    var total_pipeline_count = 0;
                    var total_visit_scheduled_count = 0;
                    var total_fresh_visit_count = 0;
                 var arrrr = Promise.all(data[0].data.map(async (element) => {
                    var req = element;
                    // console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req.user_id; 
                    dataArray['user_name'] = req.name;

                    newQuery = req.user_id;
                    var newData = await leadUserStageOperations.findLeadUserStageByleadIdUserIdCount(newQuery);

                     dataArray['new_count'] = 0;
                    dataArray['visit_planned_count'] = 0;
                    dataArray['visit_done_count'] = 0;
                    dataArray['pipeline_count'] = 0;
                    dataArray['visit_scheduled_count'] = 0;
                    dataArray['fresh_visit_count'] = 0;
                    dataArray['booked_count'] = 0;

                    if(newData.length > 0){
                      newData.forEach(function(item) {
                        if(item._id == "Fresh Visit"){
                          dataArray["fresh_visit_count"] = item.total_records;
                          total_fresh_visit_count = Number(total_fresh_visit_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                        }
                        if(item._id == "Visit Scheduled"){
                          dataArray["visit_scheduled_count"] = item.total_records;
                          total_visit_scheduled_count = Number(total_visit_scheduled_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                        }
                        if(item._id == "Pipeline"){
                          dataArray["pipeline_count"] = item.total_records;
                          total_pipeline_count = Number(total_pipeline_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                        }
                        if(item._id == "Visit Done"){
                          dataArray["visit_done_count"] = item.total_records;
                          total_visit_done_count = Number(total_visit_done_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                        }
                        if(item._id == "Visit Planned"){
                          dataArray["visit_planned_count"] = item.total_records;
                          total_visit_planned_count = Number(total_visit_planned_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                        }
                        
                      });
                    }

                    arr.push(dataArray);
                    return arr;
                    }
                  )
                ).then((responseText) => {
                  console.log(responseText[0]);
                  var arr2 = {};
                    arr2['total_count'] = total_count;
                    arr2['total_visit_planned_count'] = total_visit_planned_count;
                    arr2['total_visit_done_count'] = total_visit_done_count;
                    arr2['total_pipeline_count'] = total_pipeline_count;
                    arr2['total_visit_scheduled_count'] = total_visit_scheduled_count;
                    arr2['total_fresh_visit_count'] = total_fresh_visit_count;
                    total_arr.push(arr2);
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
             let project_id = req.query.projectId
             let start_date = req.query.start_date
            let end_date = req.query.end_date
            let page = req.query.page
            let limit = req.query.limit
            var skip = limit * page;
             query = {"project_id":project_id, "start_date": start_date, "end_date": end_date, "limit": Number(limit), "skip": skip, "page": Number(page)};
                 // console.log(query);
             const promise = projectOperations.getListProject(query)
              // const promise = projectOperations.getListProject(query,project_id)
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
                    var total_count = 0;
                    var total_new_count = 0;
                    var total_answered_count = 0;
                    var total_intrested_count = 0;
                    var total_call_back_count = 0;
                    var total_visit_done_count = 0;
                    var total_pipeline_count = 0;
                    var total_future_count = 0;
                    var total_customer_count = 0;
                    var total_booked_count = 0;
                    var total_released_pipeline = 0;
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                    dataArray['project_name'] = req.project_name;
                    var projectDetails = await projectDetailOperations.findOneProjectId(req._id);
                    dataArray['project_details'] = projectDetails;
var allDataExpectNew = 0;
                    dataArray['new_count'] = 0;
                    dataArray['call_done'] = 0;
                    dataArray['not_answered_count'] = 0;
                    dataArray['not_intrested_count'] = 0;
                    dataArray['call_back_count'] = 0;
                    dataArray['visit_done_count'] = 0;
                    dataArray['pipeline_count'] = 0;
                    dataArray['future_count'] = 0;
                    dataArray['customer_count'] = 0;
                    dataArray['booked_count'] = 0;
                    dataArray['released_pipeline'] = 0;
                    //
                    var projectWiseData = await leadOperations.getAllleadDataByProjectId(req._id.toString());
                    var df = [];
                    // console.log(projectWiseData);
                    projectWiseData.forEach(function(items) {
                      newQuery = items._id.toString();
                      df.push(newQuery);
                    });
                    // console.log(df);
                     var newData = await leadUserStageOperations.findLeadUserStageByUserIdLeadIdCount(df);
                     // console.log(newQuery);
                     // console.log(newData);
                     
                     newData.forEach(function(item) {
                        if(item._id == "new"){
                          dataArray["new_count"] = item.total_records;
                          total_new_count = Number(total_new_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                        }
                        if(item._id == "Pipeline"){
                          dataArray["pipeline_count"] = item.total_records;
                          total_pipeline_count = Number(total_pipeline_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Not Answered"){
                          dataArray["not_answered_count"] = item.total_records;
                          total_answered_count = Number(total_answered_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Not Interested"){
                          dataArray["not_intrested_count"] = item.total_records;
                          total_intrested_count = Number(total_intrested_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Call Back"){
                          dataArray["call_back_count"] = item.total_records;
                          call_back_count = 0 + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Visit Done"){
                          dataArray["visit_done_count"] = item.total_records;
                          total_visit_done_count = Number(total_visit_done_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Future"){
                          dataArray["future_count"] = item.total_records;
                          total_future_count = Number(total_future_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Customer"){
                          dataArray["customer_count"] = item.total_records;
                          total_customer_count = Number(total_customer_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Booked"){
                          dataArray["customer_count"] = item.total_records;
                          total_booked_count = Number(total_booked_count) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        if(item._id == "Released Pipeline"){
                          dataArray['released_pipeline'] = item.total_records;
                          total_released_pipeline = Number(total_released_pipeline) + Number(item.total_records);
                          total_count = Number(total_count) + Number(item.total_records);
                          allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                        }
                        dataArray['call_done'] = allDataExpectNew;
                      });

                    
                    arr.push(dataArray);
                    return arr;

                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText[0]);
                  var arr2 = {};
                    arr2['total_count'] = total_count;
                    arr2['total_new_count'] = total_new_count;
                    arr2['total_answered_count'] = total_answered_count;
                    arr2['total_intrested_count'] = total_intrested_count;
                    arr2['total_call_back_count'] = total_call_back_count;
                    arr2['total_visit_done_count'] = total_visit_done_count;
                    arr2['total_pipeline_count'] = total_pipeline_count;
                    arr2['total_future_count'] = total_future_count;
                    arr2['total_customer_count'] = total_customer_count;
                    arr2['total_booked_count'] = total_booked_count;
                    arr2['total_released_pipeline'] = total_released_pipeline;
                    total_arr.push(arr2);
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
              const promise = userOperations.getAllUserData(query,team_id)
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