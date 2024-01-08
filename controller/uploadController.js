const express = require("express");
const aws = require("aws-sdk");
const bodyParser = require("body-parser");
const multer = require("multer");
const multerS3 = require("multer-s3");
const uploadfile = multer({ dest: 'uploads/' })
const csvtojson = require('csvtojson');
const csv = require('@fast-csv/parse');

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
    // const filename = require("https://team-document.s3.ap-south-1.amazonaws.com/IIRXfgqgj-helooooooooooooooooo.csv");
    // var arrayToInsert = [];
    // csvtojson().fromFile(filename).then(sourse => {
    //     for (var i = 0; i < sourse.length; i++){
    //         // var oneRow = {
    //         //     first: sourse[i]
    //         // }
    //         console.log(sourse.length);
    //     }
    // })
    var query = "";
    const promise = uploadLeadOperations.getAllUploadLead(query)
      promise
      .then((dataStart)=>{
          // console.log(dataStart)
          const {others} = dataStart
          dataStart.forEach(async function(element) { 
          if(element.status == '1'){
            const myArray = element.file_path.split("/");
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
                            // parser.pause();  // can pause reading using this at a particular row
                            if(data.email != ''){
                                // parser.pause();
                            
                            console.log('One line from .csv >> ', data);
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
                                          "leadName": data.lead_name,
                                          "leadEmail": data.email,
                                          "leadPhone": data.lead_phone,
                                          "dynamicFields": "",
                                          "status": statusData,
                                          "AssignTo": projectDetails.AssignTo,
                                          "AssignToUser": projectDetails.AssignToUser,
                                          "source": data.source,
                                          "uid": uid,
                                          "stage": stage,
                                          "date": data.date,
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
                                          "leadName": data.Name,
                                          "leadEmail": data.email,
                                          "leadPhone": data.work_phone_number,
                                          "dynamicFields": "",
                                          "status": "1",
                                          "AssignTo": projectDetails.AssignTo,
                                          "AssignToUser": projectDetails.AssignToUser,
                                          "source": data.Source,
                                          "uid": "",
                                          "stage": "",
                                          "date": data.Date,
                                          "type": "upload_file",
                                          "upload_file_name": element.formId,
                                          "uploadLeadId": element._id.toString()
                                 }
                                 dataArrayError.push(oneRow1);

                             }
                                // leadMappingOperations.deleteLeadId(id);
                                // var obj = projectDetails.AssignToUser;
                                // var obj = obj.replace(/["']/g, "");
                                // obj = obj.split(',');
                                // obj.forEach(element => {

                                //       var leadMapping = new LeadMapping(
                                //         req.body.id,
                                //         element,
                                //         "user",
                                //       );

                                //         leadMappingOperations.addLeadMapping(leadMapping);
                                //   }); 
                            // parser.resume(); // to continue reading
                        }).on("end", async function () {
                            // console.log(dataArrayError);
                            const sdf = await leadOperations.addManyLead(dataArray);
                            const rejected = await leadRejectedOperations.addManyLead(dataArrayError);

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


// import * as AWS from 'aws-sdk';
// const s3 = new AWS.S3();
// const csv = require('@fast-csv/parse');




  

  


	module.exports = { uploadImage,insertLead }