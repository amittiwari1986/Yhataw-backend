const express = require("express");
const aws = require("aws-sdk");
const bodyParser = require("body-parser");
const multer = require("multer");
const multerS3 = require("multer-s3");
const uploadfile = multer({ dest: 'uploads/' })
const csvtojson = require('csvtojson');
const csv = require('@fast-csv/parse');

const User = require("../dto/userdto");
const userOperations = require("../services/userService");
const LeadRejected = require("../dto/leadrejectedto");
const leadRejectedOperations = require("../services/leadRejectedService");
const Lead = require("../dto/leadto");
const leadOperations = require("../services/leadService");
const uploadLeadOperations = require("../services/uploadLeadService");
const UploadLead = require("../dto/uploadleadto");
const From = require("../dto/formto");
const formOperations = require("../services/formService");
const projectDetailOperations = require("../services/projectDetailsService");
const ProjectDetail = require("../dto/projectdetailsto");
const LeadMapping = require("../dto/leadmappingto");
const leadMappingOperations = require("../services/leadMappingService");
const LeadLog = require("../dto/leadlogto");
const leadLogOperations = require("../services/leadLogService");
const LeadUserStage = require("../dto/leaduserstageto");
const leadUserStageOperations = require("../services/leadUserStageService");
const uploadMultipleLeadOperations = require("../services/uploadMultipleLeadService");
const UploadMultipleLead = require("../dto/uploadmultipleleadto");
const projectOperations = require("../services/projectService");
const Project = require("../dto/projectto");

aws.config.update({
	secretAccessKey: 'pSD+OEcgsCzItA1bVzIuDICxg/bM+U1hps19638Q',
	accessKeyId: 'AKIAX2FIBN4ISHL3RGIQ',
	region: 'us-east-1'
});

var app = express();
var s3 = new aws.S3();

app.use(bodyParser.json());

var upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'team-document',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});




const uploadImage = async (req, res) => {

var dg = uploadfile.single('file')

	console.log(dg.file);
return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
	// upload.single('file')

};

const insertLead = async (req, res) => {
    var query = "";
    const promise = uploadLeadOperations.getAllUploadLead(query)
      promise
      .then((dataStart)=>{
          // console.log(dataStart)
          const {others} = dataStart
          dataStart.forEach(async function(element) { 
          if(element.status == '1'){
            const myArray = element.file_path.split("/");
            var getMapData = JSON.parse(element.mapping_info);
            
            // console.log(myArray[3]);
            // exit;
            var formDetails = await formOperations.getFormById(element.formId);
            var projectDetails = await projectDetailOperations.findOneProjectId(formDetails.projectId);
                const params = {
                    Bucket: 'team-document',
                    Key: myArray[3],
                  };
              const csvFile = s3.getObject(params).createReadStream();


            let csvParsePromise = new Promise((resolve, reject) => {
                    var dataArray = [];
                    var dataArrayError = [];
                        const parser = csv.parseStream(csvFile, { headers: true }).on("data", function (data) {
                            // console.log(data);
                            var objec = {};
                            var Things = Object.keys(data);
                            var dynamic = [];
                            getMapData.forEach(function(eleData) { 
                                 for (var i = 0; i < Things.length; i++) {
                                     Things[i]
                                     var notdat = Object.keys(eleData)[0];
                                    if(Things[i] == Object.values(eleData)[0]){
                                        // console.log(Object.keys(eleData)[0] != "lead_name");
                                        if((notdat == "lead_name") || (notdat == "lead_email") || (notdat == "lead_phone") || (notdat == "lead_source")){
                                            
                                        }else{
                                            objec[Object.keys(eleData)[0]] = data[Things[i]];
                                        }
                                    }
                                 }
                            });
                            dynamic.push(objec);
                                var lead_name = data.lead_name;
                                var source = data.lead_source;
                                var lead_phone = data.lead_phone;
                                var date = data.date;
                                if(data.lead_email != '' && data.lead_email != undefined){
                                    var email = data.lead_email;
                                    var emailStatus = 1;
                                }else{
                                    var email = "";
                                    var emailStatus = 0;
                                }
                                if(data.lead_name != '' && data.lead_name != undefined){
                                    var lead_name = data.lead_name;
                                    var nameStatus = 1;
                                }else{
                                    var lead_name = "";
                                    var nameStatus = 0;
                                }
                                if(data.lead_phone != '' && data.lead_phone != undefined){
                                    var lead_phone = data.lead_phone;
                                    var phoneStatus = 1;
                                }else{
                                    var email = "";
                                    var phoneStatus = 0;
                                }
                            if(nameStatus == 1 && phoneStatus == 1 && emailStatus == 1){
                                // parser.pause();
                                // var lead_name = data.lead_name;
                                // var email = data.lead_email;
                                // var lead_phone = data.lead_phone;
                                // var source = data.lead_source;
                                // var date = data.date;
                                // var dynamic = [];
                                // var dataAssign = data;
                                // delete dataAssign.lead_name;
                                // delete dataAssign.email;
                                // delete dataAssign.lead_phone;
                                // delete dataAssign.source;
                                // dynamic.push(dataAssign);
                                dynamic = JSON.stringify(dynamic);
                            //console.log('One line from .csv >> ', data);
                            var random = Math.floor(1000 + Math.random() * 9000);
                                        var uid = "LD" + random;
                                        var stage = "new";
                                        statusData = 1;
                            var oneRow = {
                                     
                                        // const lead = new Lead(
                                          "form_name": formDetails.form_name,
                                          "formId": element.formId,
                                          "developerId": formDetails.developerId,
                                          "projectId": formDetails.projectId,
                                          "projecttypeId": formDetails.projecttypeId,
                                          "leadName": lead_name,
                                          "leadEmail": email,
                                          "leadPhone": lead_phone,
                                          "dynamicFields": dynamic,
                                          "status": statusData,
                                          "AssignTo": projectDetails.AssignTo,
                                          "AssignToUser": projectDetails.AssignToUser,
                                          "source": source,
                                          "uid": uid,
                                          "stage": stage,
                                          "date": date,
                                          "lead_type": "upload_file",
                                          "upload_file_name": element.formId,
                                          "uploadLeadId": element._id.toString()
                                 }
                                 dataArray.push(oneRow);
                             }else{

                                var oneRow1 = {
                                     
                                        // const lead = new Lead(
                                          "form_name": formDetails.form_name,
                                          "formId": element.formId,
                                          "developerId": formDetails.developerId,
                                          "projectId": formDetails.projectId,
                                          "projecttypeId": formDetails.projecttypeId,
                                          "leadName": lead_name,
                                          "leadEmail": email,
                                          "leadPhone": lead_phone,
                                          "dynamicFields": "",
                                          "status": "1",
                                          "AssignTo": projectDetails.AssignTo,
                                          "AssignToUser": projectDetails.AssignToUser,
                                          "source": source,
                                          "uid": "",
                                          "stage": "",
                                          "date": date,
                                          "type": "upload_file",
                                          "upload_file_name": element.formId,
                                          "uploadLeadId": element._id.toString()
                                 }
                                 dataArrayError.push(oneRow1);

                             }
                                
                        }).on("end", async function () {
                            // console.log(dataArray);
                            const addLead = await leadOperations.addManyLead(dataArray);
                            const rejected = await leadRejectedOperations.addManyLead(dataArrayError);

                            let getLead = await leadOperations.getLeadByUploadLeadId(element._id.toString());
                                var obj = projectDetails.AssignToUser;
                                var obj = obj.replace(/["']/g, "");
                                obj = obj.split(',');
                                var dataArrayPush = [];
                                var dataArrayPushLog = [];
                                var dataArrayPushStage = [];
                            getLead.forEach(ele => {
                                 var oneRow3 = {
                                          "leadId": ele._id.toString(),
                                          "userId": "6540ee334deef597cddbd055",
                                          "old_value": "create new",
                                          "new_value": "create new"
                                      }
                                      dataArrayPushLog.push(oneRow3);
                                obj.forEach(element => {
                                    // var userData = await userOperations.getUserById(element);
                                    // console.log(userData);
                                     var oneRow2 = {
                                          "lead_id": ele._id.toString(),
                                          "user_id": element,
                                          "type": "user"
                                      }
                                      dataArrayPush.push(oneRow2);
                                      var oneRow4 = {
                                          "lead_id": ele._id.toString(),
                                          "user_id": element,
                                          "type": "user",
                                          "user_name": "",
                                          "stage": "new",
                                          "status": "1"
                                      }
                                      // console.log(oneRow4);
                                      dataArrayPushStage.push(oneRow4); 
                                  }); 
                            });
                             leadMappingOperations.addManyLeadMapping(dataArrayPush);
                            leadUserStageOperations.addManyLeadUserStage(dataArrayPushStage);
                            leadLogOperations.addManyLeadLog(dataArrayPushLog);
                            let lead = await uploadLeadOperations.getUploadLeadById(element._id.toString());
                            lead.fail_count = dataArrayError.length;
                            lead.success_count = dataArray.length;
                            lead.status = "3";

                            await uploadLeadOperations.updateUploadLead(lead._id,lead);

                            return res.status(200).send({ auth: true,data: dataArray, message: 'csv parse process finished', success: 1});
                        }).on("error", function () {
                            reject('csv parse process failed')
                            return res.status(400).send({ auth: false, message: 'csv parse process failed', success: 0});
                        });
                });
            }
        });
     })
      .catch((err)=>{
          // console.log(err.message)
          res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
      });

    // try { await csvParsePromise; }
    // catch(err) {
    //     console.log('an error has occurred');
    //     return res.status(500).send({ auth: false, message: 'an error has occurred', success: 0});
    // }

};

// const insertMultipleLead = async (req, res) => {
//     var query = "";
//     const promise = uploadMultipleLeadOperations.getAllUploadMultipleLead(query)
//       promise
//       .then((dataStart)=>{
//           // console.log(dataStart)
//           const {others} = dataStart
//           dataStart.forEach(async function(element) { 
//           if(element.status == '1'){
//             const myArray = element.file_path.split("/");
//             var getMapData = JSON.parse(element.mapping_info);
            
//             // console.log(myArray[3]);
//             // exit;
            
//                 const params = {
//                     Bucket: 'team-document',
//                     Key: myArray[3],
//                   };
//               const csvFile = s3.getObject(params).createReadStream();


//             let csvParsePromise = new Promise((resolve, reject) => {
//                     var dataArray = [];
//                     var dataArrayError = [];
//                         const parser = csv.parseStream(csvFile, { headers: true }).on("data", async (data) => {
// var dataArray = [];
//                     var dataArrayError = [];
//                             var objec = {};
//                             var Things = Object.keys(data);

//                             var dynamic = [];
//                             getMapData.forEach(function(eleData) {


//                                  for (var i = 0; i < Things.length; i++) {
//                                      Things[i]
//                                      var notdat = Object.keys(eleData)[0];
//                                     if(Things[i] == Object.values(eleData)[0]){
//                                         // console.log(Object.keys(eleData)[0] != "lead_name");
//                                         if((notdat == "lead_name") || (notdat == "lead_email") || (notdat == "lead_phone") || (notdat == "lead_source") || (notdat == "lead_project")){
                                            
//                                         }else{
//                                             objec[Object.keys(eleData)[0]] = data[Things[i]];
//                                         }
//                                     }
//                                  }
//                             });
//                             dynamic.push(objec);
//                                 //console.log(data.lead_project);
//                                 var projectid = await projectOperations.findProjectUid(data.lead_project);
//                                 //console.log(projectid[0]._id.toString());
//                                 var formDetails = await formOperations.findFormByProjectId(projectid[0]._id.toString());
//                                 var projectDetails = await projectDetailOperations.findOneProjectId(formDetails[0].projectId);
                                
//                                 var lead_name = data.lead_name;
//                                 var source = data.lead_source;
//                                 var lead_phone = data.lead_phone;
//                                 var date = data.date;
//                                 if(data.lead_email != '' && data.lead_email != undefined){
//                                     var email = data.lead_email;
//                                     var emailStatus = 1;
//                                 }else{
//                                     var email = "";
//                                     var emailStatus = 0;
//                                 }
//                                 if(data.lead_name != '' && data.lead_name != undefined){
//                                     var lead_name = data.lead_name;
//                                     var nameStatus = 1;
//                                 }else{
//                                     var lead_name = "";
//                                     var nameStatus = 0;
//                                 }
//                                 if(data.lead_phone != '' && data.lead_phone != undefined){
//                                     var lead_phone = data.lead_phone;
//                                     var phoneStatus = 1;
//                                 }else{
//                                     var email = "";
//                                     var phoneStatus = 0;
//                                 }
//                             if(nameStatus == 1 && phoneStatus == 1 && emailStatus == 1){
//                                 dynamic = JSON.stringify(dynamic);
//                             //console.log('One line from .csv >> ', data);
//                             var random = Math.floor(1000 + Math.random() * 9000);
//                                         var uid = "LD" + random;
//                                         var stage = "new";
//                                         statusData = 1;
//                             var oneRow = {
                                     
//                                         // const lead = new Lead(
//                                           "form_name": formDetails[0].form_name,
//                                           "formId": formDetails[0]._id.toString(),
//                                           "developerId": formDetails[0].developerId,
//                                           "projectId": formDetails[0].projectId,
//                                           "projecttypeId": formDetails[0].projecttypeId,
//                                           "leadName": lead_name,
//                                           "leadEmail": email,
//                                           "leadPhone": lead_phone,
//                                           "dynamicFields": dynamic,
//                                           "status": statusData,
//                                           "AssignTo": projectDetails.AssignTo,
//                                           "AssignToUser": projectDetails.AssignToUser,
//                                           "source": source,
//                                           "uid": uid,
//                                           "stage": stage,
//                                           "date": date,
//                                           "lead_type": "upload_file",
//                                           "upload_file_name": element.formId,
//                                           "uploadLeadId": element._id.toString()
//                                  }
//                                  dataArray.push(oneRow);
//                              }else{

//                                 var oneRow1 = {
                                     
//                                         // const lead = new Lead(
//                                           "form_name": formDetails[0].form_name,
//                                           "formId": formDetails[0]._id.toString(),
//                                           "developerId": formDetails[0].developerId,
//                                           "projectId": formDetails[0].projectId,
//                                           "projecttypeId": formDetails[0].projecttypeId,
//                                           "leadName": lead_name,
//                                           "leadEmail": email,
//                                           "leadPhone": lead_phone,
//                                           "dynamicFields": "",
//                                           "status": "1",
//                                           "AssignTo": projectDetails.AssignTo,
//                                           "AssignToUser": projectDetails.AssignToUser,
//                                           "source": source,
//                                           "uid": "",
//                                           "stage": "",
//                                           "date": date,
//                                           "type": "upload_file",
//                                           "upload_file_name": element.formId,
//                                           "uploadLeadId": element._id.toString()
//                                  }
//                                  dataArrayError.push(oneRow1);

//                              }
//                              // console.log(dataArray);
                             
//                              const addLead = await leadOperations.addManyLead(dataArray);
//                              let getLead = await leadOperations.getLeadByUploadLeadId(element._id.toString());
//                              // console.log(getLead)
//                                 var obj = projectDetails.AssignToUser;
//                                 var obj = obj.replace(/["']/g, "");
//                                 obj = obj.split(',');
//                                 var dataArrayPush = [];
//                                 var dataArrayPushLog = [];
//                                 var dataArrayPushStage = [];
//                             getLead.forEach(ele => {
//                                  var oneRow3 = {
//                                           "leadId": ele._id.toString(),
//                                           "userId": "6540ee334deef597cddbd055",
//                                           "old_value": "create new",
//                                           "new_value": "create new"
//                                       }
//                                       dataArrayPushLog.push(oneRow3);
//                                 obj.forEach(element => {
//                                     // var userData = await userOperations.getUserById(element);
//                                     // console.log(userData);
//                                      var oneRow2 = {
//                                           "lead_id": ele._id.toString(),
//                                           "user_id": element,
//                                           "type": "user"
//                                       }
//                                       dataArrayPush.push(oneRow2);
//                                       var oneRow4 = {
//                                           "lead_id": ele._id.toString(),
//                                           "user_id": element,
//                                           "type": "user",
//                                           "user_name": "",
//                                           "stage": "new",
//                                           "status": "1"
//                                       }
//                                       // console.log(oneRow4);
//                                       dataArrayPushStage.push(oneRow4); 
//                                   }); 
//                             });

                            
//                             console.log(dataArrayPushStage);
//                             const rejected = await leadRejectedOperations.addManyLead(dataArrayError);
//                              await leadMappingOperations.addManyLeadMapping(dataArrayPush);
//                             await leadUserStageOperations.addManyLeadUserStage(dataArrayPushStage);
//                             await leadLogOperations.addManyLeadLog(dataArrayPushLog);

//                             let leadMultiple = await uploadMultipleLeadOperations.getUploadMultipleLeadById(element._id.toString());
//                             console.log(leadMultiple);
//                             leadMultiple.fail_count = dataArrayError.length;
//                             leadMultiple.success_count = dataArray.length;
//                             leadMultiple.status = "3";

//                             await uploadMultipleLeadOperations.updateUploadMultipleLead(leadMultiple._id,leadMultiple);
//                                 return res.status(200).send({ auth: true,data: dataArray, message: 'csv parse process finished', success: 1});
//                         }).on("end", async function () {
//                             return res.status(200).send({ auth: true,data: dataArray, message: 'csv parse process finished', success: 1});
//                         }).on("error", function () {
//                             reject('csv parse process failed')
//                             return res.status(400).send({ auth: false, message: 'csv parse process failed', success: 0});
//                         });
//                 });
//             }
//         });
//         // return res.status(200).send({ auth: true,data: [], message: 'csv parse process finished', success: 1});
//      })
//       .catch((err)=>{
//           // console.log(err.message)
//           res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
//       });

//     // try { await csvParsePromise; }
//     // catch(err) {
//     //     console.log('an error has occurred');
//     //     return res.status(500).send({ auth: false, message: 'an error has occurred', success: 0});
//     // }

// };

const insertMultipleLead = async (req, res) => {
    var query = "";
    const promise = uploadMultipleLeadOperations.getAllUploadMultipleLead(query)
      promise
      .then((dataStart)=>{
          // console.log(dataStart)
          const {others} = dataStart
          dataStart.forEach(async function(element) { 
          if(element.status == '1'){
            const myArray = element.file_path.split("/");
            var getMapData = JSON.parse(element.mapping_info);
            
            // console.log(myArray[3]);
            // exit;
            
                const params = {
                    Bucket: 'team-document',
                    Key: myArray[3],
                  };
              const csvFile = s3.getObject(params).createReadStream();


            let csvParsePromise = new Promise((resolve, reject) => {
                    
                    var dataArrayMain = [];
                        const parser = csv.parseStream(csvFile, { headers: true }).on("data", async (data) => {
                            var oneRow1 = data;
                                         dataArrayMain.push(oneRow1);
                            
                        }).on("end", async function () {
                              
                            //     console.log(dataArrayMain[i].lead_name);
                            // }
                            let okCount = 0;
                            let errorCount = 0;
                            for(let i = 0; i < dataArrayMain.length; i++) { 
                                var dataArray = [];
                    var dataArrayError = [];
                                var data = dataArrayMain[i];
                                // console.log(elementData);
                            var objec = {};
                            var Things = Object.keys(data);

                            var dynamic = [];
                            getMapData.forEach(function(eleData) {


                                 for (var i = 0; i < Things.length; i++) {
                                     Things[i]
                                     var notdat = Object.keys(eleData)[0];
                                    if(Things[i] == Object.values(eleData)[0]){
                                        // console.log(Object.keys(eleData)[0] != "lead_name");
                                        if((notdat == "lead_name") || (notdat == "lead_email") || (notdat == "lead_phone") || (notdat == "lead_source") || (notdat == "lead_project")){
                                            
                                        }else{
                                            objec[Object.keys(eleData)[0]] = data[Things[i]];
                                        }
                                    }
                                 }
                            });
                            dynamic.push(objec);
                                    
                                        var projectid = await projectOperations.findProjectUid(data.lead_project);
                                        // console.log(projectid);
                                        // console.log(projectid[0]._id.toString());
                                        var formDetails = await formOperations.findFormByProjectId(projectid[0]._id.toString());
                                        // console.log(formDetails);
                                        var projectDetails = await projectDetailOperations.findOneProjectId(formDetails[0].projectId);
                                        // console.log(projectDetails);
                                        // exit;
                                        var lead_name = data.lead_name;
                                        var source = data.lead_source;
                                        var lead_phone = data.lead_phone;
                                        var date = data.date;
                                        if(data.lead_email != '' && data.lead_email != undefined){
                                            var email = data.lead_email;
                                            var emailStatus = 1;
                                        }else{
                                            var email = "";
                                            var emailStatus = 0;
                                        }
                                        if(data.lead_name != '' && data.lead_name != undefined){
                                            var lead_name = data.lead_name;
                                            var nameStatus = 1;
                                        }else{
                                            var lead_name = "";
                                            var nameStatus = 0;
                                        }
                                        if(data.lead_phone != '' && data.lead_phone != undefined){
                                            var lead_phone = data.lead_phone;
                                            var phoneStatus = 1;
                                        }else{
                                            var email = "";
                                            var phoneStatus = 0;
                                        }
                                    if(nameStatus == 1 && phoneStatus == 1 && emailStatus == 1){
                                        dynamic = JSON.stringify(dynamic);
                                    //console.log('One line from .csv >> ', data);
                                    var random = Math.floor(1000 + Math.random() * 9000);
                                                var uid = "LD" + random;
                                                var stage = "new";
                                                statusData = 1;
                                    var oneRow = {
                                             
                                                // const lead = new Lead(
                                                  "form_name": formDetails[0].form_name,
                                                  "formId": formDetails[0]._id.toString(),
                                                  "developerId": formDetails[0].developerId,
                                                  "projectId": formDetails[0].projectId,
                                                  "projecttypeId": formDetails[0].projecttypeId,
                                                  "leadName": lead_name,
                                                  "leadEmail": email,
                                                  "leadPhone": lead_phone,
                                                  "dynamicFields": dynamic,
                                                  "status": statusData,
                                                  "AssignTo": projectDetails.AssignTo,
                                                  "AssignToUser": projectDetails.AssignToUser,
                                                  "source": source,
                                                  "uid": uid,
                                                  "stage": stage,
                                                  "date": date,
                                                  "lead_type": "upload_file",
                                                  "upload_file_name": element.formId,
                                                  "uploadLeadId": element._id.toString()
                                         }
                                         dataArray.push(oneRow);
                                         okCount++;
                                     }else{

                                        var oneRow1 = {
                                             
                                                // const lead = new Lead(
                                                  "form_name": formDetails[0].form_name,
                                                  "formId": formDetails[0]._id.toString(),
                                                  "developerId": formDetails[0].developerId,
                                                  "projectId": formDetails[0].projectId,
                                                  "projecttypeId": formDetails[0].projecttypeId,
                                                  "leadName": lead_name,
                                                  "leadEmail": email,
                                                  "leadPhone": lead_phone,
                                                  "dynamicFields": "",
                                                  "status": "1",
                                                  "AssignTo": projectDetails.AssignTo,
                                                  "AssignToUser": projectDetails.AssignToUser,
                                                  "source": source,
                                                  "uid": "",
                                                  "stage": "",
                                                  "date": date,
                                                  "type": "upload_file",
                                                  "upload_file_name": element.formId,
                                                  "uploadLeadId": element._id.toString()
                                         }
                                         dataArrayError.push(oneRow1);
                                         errorCount++;

                                     }

                                     const addLead = await leadOperations.addManyLead(dataArray);
                                     // console.log(addLead);

                                     let getLead = await leadOperations.getLeadById(addLead[0]._id.toString());
                                     // console.log(getLead)
                                        var obj = projectDetails.AssignToUser;
                                        var obj = obj.replace(/["']/g, "");
                                        obj = obj.split(',');
                                         var dataArrayPush = [];
                                        var dataArrayPushLog = [];
                                        var dataArrayPushStage = [];
                                    // getLead.forEach(ele => {
                                         var oneRow3 = {
                                                  "leadId": getLead._id.toString(),
                                                  "userId": "6540ee334deef597cddbd055",
                                                  "old_value": "create new",
                                                  "new_value": "create new"
                                              }
                                              dataArrayPushLog.push(oneRow3);
                                        obj.forEach(elementD => {
                                            // var userData = await userOperations.getUserById(elementD);
                                            // console.log(userData);
                                             var oneRow2 = {
                                                  "lead_id": getLead._id.toString(),
                                                  "user_id": elementD,
                                                  "type": "user"
                                              }
                                              dataArrayPush.push(oneRow2);
                                              var oneRow4 = {
                                                  "lead_id": getLead._id.toString(),
                                                  "user_id": elementD,
                                                  "type": "user",
                                                  "user_name": "",
                                                  "stage": "new",
                                                  "status": "1"
                                              }
                                              // console.log(oneRow4);
                                              dataArrayPushStage.push(oneRow4); 
                                          }); 
                                    // });

                                      const rejected = await leadRejectedOperations.addManyLead(dataArrayError);
                                         await leadMappingOperations.addManyLeadMapping(dataArrayPush);
                                        await leadUserStageOperations.addManyLeadUserStage(dataArrayPushStage);
                                        await leadLogOperations.addManyLeadLog(dataArrayPushLog);

                                        let leadMultiple = await uploadMultipleLeadOperations.getUploadMultipleLeadById(element._id.toString());
                                        // console.log(leadMultiple);
                                        leadMultiple.fail_count = errorCount;
                                        leadMultiple.success_count = okCount;
                                        leadMultiple.status = "3";
                                        await uploadMultipleLeadOperations.updateUploadMultipleLead(leadMultiple._id,leadMultiple);
                                 }
                             // console.log(dataArray);
                             
                        
                            
                            // console.log(dataArray);
                            // return res.status(200).send({ auth: true,data: dataArray, message: 'csv parse process finished', success: 1});
                          

                            
                                return res.status(200).send({ auth: true,data: dataArray, message: 'csv parse process finished', success: 1});
                        }).on("error", function () {
                            reject('csv parse process failed')
                            return res.status(400).send({ auth: false, message: 'csv parse process failed', success: 0});
                        });
                });
            }
        });
        // return res.status(200).send({ auth: true,data: [], message: 'csv parse process finished', success: 1});
     })
      .catch((err)=>{
          // console.log(err.message)
          res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
      });


};

const importHousingLead = async (req, res) => {
    var moment = require('moment');
    var crypto = require('crypto');
    const axios = require('axios');
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1);

    Date.prototype.toUnixTime = function() { return this.getTime()/1000|0 };
    Date.time = function() { return new Date().toUnixTime(); }

    var startTime = '1715711400';
    var endTime = Date.time();
    var currentTime = Date.time();
    //var currentTimeStamp = date('h:i:s', $currentTime);
    var secretKey = 'e50a97895066c91ba4745271828cd9e9';
    var id = '5349396';
    const hash = crypto.createHmac('sha256', secretKey).update(JSON.stringify(currentTime)).digest('hex');

    var url = 'https://pahal.housing.com/api/v0/get-builder-leads?start_date=' + startTime + '&end_date=' + endTime + '&current_time=' + currentTime + '&hash=' + hash + '&id=' + id;

    var options = {
        'method': 'GET',
        'url': url
    };
  
    const result = await axios(options);
    res.status(200).json({message: "get data", success: 1, data: result.data});

};

const import99AcersLead = async (req, res) => {
//     var d = new Date();
// d.setDate(d.getDate() - 1);
// d.setHours(0,0,0,0);

     Date.prototype.toUnixTime = function() { return this.getTime()/1000|0 };
    Date.time = function() { return new Date().toUnixTime(); }

     const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    Date.timew = function() { return new yesterday.toUnixTime(); }

console.log(Date.timew);
    res.status(200).json({message: "get data", success: 1, data: result.data});

};




	module.exports = { importHousingLead,import99AcersLead,uploadImage,insertLead,insertMultipleLead }