const projectDetailOperations = require("../services/projectDetailsService");
const ProjectDetail = require("../dto/projectdetailsto");
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
const bcrypt = require("../utils/encrypt");
const token = require("../utils/token");
const otpGenerator = require('otp-generator');
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");

const {
  PHONE_NOT_FOUND_ERR,

  PHONE_ALREADY_EXISTS_ERR,
  USER_NOT_FOUND_ERR,
  INCORRECT_OTP_ERR,
  ACCESS_DENIED_ERR,
} = require("../messages/errors");

//User Registration
const addProjectDetail = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){

    let projectCheck = await projectDetailOperations.findOneProjectId(req.body.projectId);
    console.log(projectCheck);
    // if(projectCheck){
    //   return res.status(400).json({message: "duplicate data Please check name", success: 0});
    // }

    let status = 1;
    const projectDetail = new ProjectDetail(
      req.body.developerId,
      req.body.projectId,
      req.body.countryId,
      req.body.stateId,
      req.body.city,
      req.body.description,
      req.body.location,
      status,
      'NA',
      'NA',
      'NA',
      'NA',
      '',
      '',
    );


    const promise = projectDetailOperations.addProjectDetail(projectDetail); 
    promise
      .then((data) => {
       return res.status(201).json({
          message: "Project Details Added Successfully",
          success: 1,
          data: data,
        });
      })
      .catch((err) => {
      return  res.status(400).json({message: err.message, success: 0, error_msg: err.message});
     
        });
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }
};

const updateProjectDetail = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    let data;
    let id = req.body.projectDetailId;
      try {
        let pDetails = await projectDetailOperations.getProjectDetailById(id);
        console.log(pDetails);

        if (!pDetails) {
          return res.status(400).json({ success: 0, message: "Organization Details not found" });
        }


        if(req.body.developerId != '' || req.body.developerId != undefined){
        	pDetails.developerId = req.body.developerId;
        }
        if(req.body.projectId != '' || req.body.projectId != undefined){
        	pDetails.projectId = req.body.projectId;
        }
        if(req.body.countryId != '' || req.body.countryId != undefined){
        	pDetails.countryId = req.body.countryId;
        }
        if(req.body.stateId != '' || req.body.stateId != undefined){
        	pDetails.stateId = req.body.stateId;
        }
        if(req.body.city != '' || req.body.city != undefined){
        	pDetails.city = req.body.city;
        }
        if(req.body.description != '' || req.body.description != undefined){
        	pDetails.description = req.body.description;
        }
        if(req.body.location != '' || req.body.location != undefined){
        	pDetails.location = req.body.location;
        }
        if(req.body.status != '' || req.body.status != undefined){
        	pDetails.status = req.body.status;
        }
        if(req.body.projectforId != '' || req.body.projectforId != undefined){
        	pDetails.projectforId = req.body.projectforId;
        }
        if(req.body.projectypeId != '' || req.body.projectypeId != undefined){
        	pDetails.projectypeId = req.body.projectypeId;
        }
        if(req.body.projectunittypeId != '' || req.body.projectunittypeId != undefined){
        	pDetails.projectunittypeId = req.body.projectunittypeId;
        }
        if(req.body.projectstatusId != '' || req.body.projectstatusId != undefined){
        	pDetails.projectstatusId = req.body.projectstatusId;
        }
        if(req.body.bathroom != '' || req.body.bathroom != undefined){
        	pDetails.bathroom = req.body.bathroom;
        }
        if(req.body.washroom != '' || req.body.washroom != undefined){
        	pDetails.washroom = req.body.washroom;
        }
        if(req.body.property_image != '' || req.body.property_image != undefined){
        	pDetails.property_image = req.body.property_image;
        }
        if(req.body.edm_image != '' || req.body.edm_image != undefined){
        	pDetails.edm_image = req.body.edm_image;
        }
        if(req.body.property_broucher != '' || req.body.property_broucher != undefined){
        	pDetails.property_broucher = req.body.property_broucher;
        }

        await projectDetailOperations.updateProjectDetail(pDetails._id,pDetails);
        return res.status(200).json({ success: 1, message: "Project Details Updated Successfully" });
      } catch (error) {
        return res.status(400).json({ success: 0, message: "Details not found" });
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};


   // function updateUser(req){

   //  var dataArray = {}; 
   //  if(req.projectId != '' || req.projectId != undefined){
   //    var projectData = await projectOperations.getProjectById(req.projectId);
   //    dataArray['projectId'] = req.projectId;
   //    dataArray['project_name'] = projectData.project_name;
   //  }else{
   //    dataArray['projectId'] = '';
   //    dataArray['project_name'] = '';
   //  }
   //  if(req.developerId != '' || req.developerId != undefined){
   //    var developerData = await developerOperations.getDeveloperById(req.developerId);
   //    dataArray['developerId'] = req.developerId;
   //    dataArray['developer_name'] = developerData.developer_name;
   //  }else{
   //    dataArray['developerId'] = '';
   //    dataArray['developer_name'] = '';
   //  }
   //  if(req.countryId != '' || req.countryId != undefined){
   //    var countryData = await countryOperations.getcountryById(req.countryId);
   //    dataArray['countryId'] = req.countryId;
   //    dataArray['country_name'] = countryData.country_name;
   //  }else{
   //    dataArray['countryId'] = '';
   //    dataArray['country_name'] = '';
   //  }
   //  if(req.stateId != '' || req.stateId != undefined){
   //    var stateData = await stateOperations.getstateById(req.stateId);
   //    dataArray['stateId'] = req.stateId;
   //    dataArray['state_name'] = stateData.state_name;
   //  }else{
   //    dataArray['stateId'] = '';
   //    dataArray['state_name'] = '';
   //  }
   //  dataArray['city'] = req.city;
   //  dataArray['description'] = req.description;
   //  dataArray['status'] = req.status;

   //   if(req.projectforId != '' || req.projectforId != undefined){
   //    var projectForData = await propertyForOperations.getPropertyForById(req.projectforId);
   //    dataArray['projectforId'] = req.projectforId;
   //    dataArray['property_for_name'] = projectForData.name;
   //  }else{
   //    dataArray['projectforId'] = '';
   //    dataArray['property_for_name'] = '';
   //  }
   //   if(req.projectstatusId != '' || req.projectstatusId != undefined){
   //    var projectStatusData = await propertyStatusOperations.getPropertyStatusById(req.projectstatusId);
   //    dataArray['projectstatusId'] = req.projectstatusId;
   //    dataArray['projectstatus_name'] = projectStatusData.name;
   //  }else{
   //    dataArray['projectstatusId'] = '';
   //    dataArray['projectstatus_name'] = '';
   //  }
   //   if(req.projectunittypeId != '' || req.projectunittypeId != undefined){
   //    var projectUnitTypeData = await propertyUnitTypeOperations.getPropertyUnitTypeById(req.projectunittypeId);
   //    dataArray['projectunittypeId'] = req.projectunittypeId;
   //    dataArray['projectunittype_name'] = projectUnitTypeData.name;
   //  }else{
   //    dataArray['projectunittypeId'] = '';
   //    dataArray['projectunittype_name'] = '';
   //  }
   //   if(req.projectypeId != '' || req.projectypeId != undefined){
   //    var projectTypeData = await propertyTypeOperations.getPropertyTypeById(req.projectypeId);
   //    dataArray['projecttypeId'] = req.projectypeId;
   //    dataArray['projecttype_name'] = projectTypeData.name;
   //  }else{
   //    dataArray['projecttypeId'] = '';
   //    dataArray['projecttype_name'] = '';
   //  }

   //  dataArray['washroom'] = req.washroom;
   //  dataArray['bathroom'] = req.bathroom;
    
   //  console.log(dataArray);
        
   //          return { data: dataArray, message: 'No token provided.', success: 0};
        
   //  };

const getProjectDetail = (req, res) => {
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
             if(id){
                 const promise = projectDetailOperations.getProjectDetailById(id)
              promise
              .then((data)=>{
                let convertData = [];
                convertData.push(data);
                data = convertData;
                  let arr = [];
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;

                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                    if(req.projectId != 'NA'){
                      var projectData = await projectOperations.getProjectById(req.projectId);
                      dataArray['projectId'] = req.projectId;
                      dataArray['project_name'] = projectData.project_name;
                    }else{
                      dataArray['projectId'] = '';
                      dataArray['project_name'] = '';
                    }
                    if(req.developerId != 'NA'){
                      var developerData = await developerOperations.getDeveloperById(req.developerId);
                      dataArray['developerId'] = req.developerId;
                      dataArray['developer_name'] = developerData.developer_name;
                    }else{
                      dataArray['developerId'] = '';
                      dataArray['developer_name'] = '';
                    }
                    if(req.countryId != 'NA'){
                      var countryData = await countryOperations.getcountryById(req.countryId);
                      dataArray['countryId'] = req.countryId;
                      dataArray['country_name'] = countryData.country_name;
                    }else{
                      dataArray['countryId'] = '';
                      dataArray['country_name'] = '';
                    }
                    if(req.stateId != 'NA'){
                      var stateData = await stateOperations.getstateById(req.stateId);
                      dataArray['stateId'] = req.stateId;
                      dataArray['state_name'] = stateData.state_name;
                    }else{
                      dataArray['stateId'] = '';
                      dataArray['state_name'] = '';
                    }
                    dataArray['city'] = req.city;
                    dataArray['description'] = req.description;
                    dataArray['status'] = req.status;

                     if(req.projectforId != 'NA'){
                      var projectForData = await propertyForOperations.getPropertyForById(req.projectforId);
                      dataArray['projectforId'] = req.projectforId;
                      dataArray['property_for_name'] = projectForData.name;
                    }else{
                      dataArray['projectforId'] = '';
                      dataArray['property_for_name'] = '';
                    }
                    // console.log(req.projectstatusId);
                     if(req.projectstatusId != 'NA'){
                      var projectStatusData = await propertyStatusOperations.getPropertyStatusById(req.projectstatusId);
                      dataArray['projectstatusId'] = req.projectstatusId;
                      dataArray['projectstatus_name'] = projectStatusData.name;
                    }else{
                      dataArray['projectstatusId'] = '';
                      dataArray['projectstatus_name'] = '';
                    }
                     if(req.projectunittypeId != 'NA'){
                      var projectUnitTypeData = await propertyUnitTypeOperations.getPropertyUnitTypeById(req.projectunittypeId);
                      dataArray['projectunittypeId'] = req.projectunittypeId;
                      dataArray['projectunittype_name'] = projectUnitTypeData.name;
                    }else{
                      dataArray['projectunittypeId'] = '';
                      dataArray['projectunittype_name'] = '';
                    }
                     if(req.projectypeId != 'NA'){
                      var projectTypeData = await propertyTypeOperations.getPropertyTypeById(req.projectypeId);
                      dataArray['projecttypeId'] = req.projectypeId;
                      dataArray['projecttype_name'] = projectTypeData.name;
                    }else{
                      dataArray['projecttypeId'] = '';
                      dataArray['projecttype_name'] = '';
                    }

                    dataArray['washroom'] = req.washroom;
                    dataArray['bathroom'] = req.bathroom;
                    
                    arr.push(dataArray);
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  
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
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
              });
             }else{
              
               const query = req.query.new 
              const promise = projectDetailOperations.getAllProjectDetail(query)
              promise
              .then((data)=>{
               
                  let arr = [];
                 Promise.all(data.map(async (element) => {
                    var req = element;

                    var dataArray = {}; 
                    dataArray['_id'] = req._id;
                    if(req.projectId != 'NA'){
                      var projectData = await projectOperations.getProjectById(req.projectId);
                      dataArray['projectId'] = req.projectId;
                      dataArray['project_name'] = projectData.project_name;
                    }else{
                      dataArray['projectId'] = '';
                      dataArray['project_name'] = '';
                    }
                    if(req.developerId != 'NA'){
                      var developerData = await developerOperations.getDeveloperById(req.developerId);
                      dataArray['developerId'] = req.developerId;
                      dataArray['developer_name'] = developerData.developer_name;
                    }else{
                      dataArray['developerId'] = '';
                      dataArray['developer_name'] = '';
                    }
                    if(req.countryId != 'NA'){
                      var countryData = await countryOperations.getcountryById(req.countryId);
                      dataArray['countryId'] = req.countryId;
                      dataArray['country_name'] = countryData.country_name;
                    }else{
                      dataArray['countryId'] = '';
                      dataArray['country_name'] = '';
                    }
                    if(req.stateId != 'NA'){
                      var stateData = await stateOperations.getstateById(req.stateId);
                      dataArray['stateId'] = req.stateId;
                      dataArray['state_name'] = stateData.state_name;
                    }else{
                      dataArray['stateId'] = '';
                      dataArray['state_name'] = '';
                    }
                    dataArray['city'] = req.city;
                    dataArray['description'] = req.description;
                    dataArray['status'] = req.status;

                     if(req.projectforId != 'NA'){
                      var projectForData = await propertyForOperations.getPropertyForById(req.projectforId);
                      dataArray['projectforId'] = req.projectforId;
                      dataArray['property_for_name'] = projectForData.name;
                    }else{
                      dataArray['projectforId'] = '';
                      dataArray['property_for_name'] = '';
                    }
                    // console.log(req.projectstatusId);
                     if(req.projectstatusId != 'NA'){
                      var projectStatusData = await propertyStatusOperations.getPropertyStatusById(req.projectstatusId);
                      dataArray['projectstatusId'] = req.projectstatusId;
                      dataArray['projectstatus_name'] = projectStatusData.name;
                    }else{
                      dataArray['projectstatusId'] = '';
                      dataArray['projectstatus_name'] = '';
                    }
                     if(req.projectunittypeId != 'NA'){
                      var projectUnitTypeData = await propertyUnitTypeOperations.getPropertyUnitTypeById(req.projectunittypeId);
                      dataArray['projectunittypeId'] = req.projectunittypeId;
                      dataArray['projectunittype_name'] = projectUnitTypeData.name;
                    }else{
                      dataArray['projectunittypeId'] = '';
                      dataArray['projectunittype_name'] = '';
                    }
                     if(req.projectypeId != 'NA'){
                      var projectTypeData = await propertyTypeOperations.getPropertyTypeById(req.projectypeId);
                      dataArray['projecttypeId'] = req.projectypeId;
                      dataArray['projecttype_name'] = projectTypeData.name;
                    }else{
                      dataArray['projecttypeId'] = '';
                      dataArray['projecttype_name'] = '';
                    }

                    dataArray['washroom'] = req.washroom;
                    dataArray['bathroom'] = req.bathroom;
                    
                    arr.push(dataArray);
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  
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
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
              });
            }
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
        //64ad9c7381d27d514b01e22c
};

module.exports = { addProjectDetail,updateProjectDetail,getProjectDetail };
