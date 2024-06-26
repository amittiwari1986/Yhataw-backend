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
const {ObjectID} = require('mongodb');
const uploadLeadOperations = require("../services/uploadLeadService");
const UploadLead = require("../dto/uploadleadto");
const projectMappingOperations = require("../services/projectMappingService");
const ProjectMapping = require("../dto/projectmappingto");
const uploadMultipleLeadOperations = require("../services/uploadMultipleLeadService");
const UploadMultipleLead = require("../dto/uploadmultipleleadto");
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
      req.body.zipcode,
      status,
      'NA',
      'NA',
      'NA',
      'NA',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      JSON.stringify(req.body.AssignTo),
      JSON.stringify(req.body.AssignToUser),
      '',
      '',
    );
    // await leadOperations.updateLead(lead._id,lead);
    //     await leadMappingOperations.deleteLeadId(id);
      var obj = req.body.AssignToUser;
      var obj = obj.replace(/["']/g, "");
      obj = obj.split(',');
      obj.forEach(element => {

            var projectMapping = new ProjectMapping(
              req.body.id,
              element,
              "user",
            );

              projectMappingOperations.addProjectMapping(projectMapping);
        }); 


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
        if(req.body.zipcode != '' || req.body.zipcode != undefined){
          pDetails.zipcode = req.body.zipcode;
        }
        if(req.body.status != '' || req.body.status != undefined){
        	pDetails.status = req.body.status;
        }
        if(req.body.projectforId != '' || req.body.projectforId != undefined){
        	pDetails.projectforId = req.body.projectforId;
        }
        if(req.body.projecttypeId != '' || req.body.projecttypeId != undefined){
        	pDetails.projecttypeId = req.body.projecttypeId;
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
        if(req.body.utility != '' || req.body.utility != undefined){
        	pDetails.utility = req.body.utility;
        }
        if(req.body.study != '' || req.body.study != undefined){
        	pDetails.study = req.body.study;
        }
        if(req.body.pooja != '' || req.body.pooja != undefined){
        	pDetails.pooja = req.body.pooja;
        }
        if(req.body.furnish_type != '' || req.body.furnish_type != undefined){
        	pDetails.furnish_type = req.body.furnish_type;
        }
        if(req.body.AssignTo != '' || req.body.AssignTo != undefined){
          pDetails.AssignTo = JSON.stringify(req.body.AssignTo);
        }
        if(req.body.car_parking != '' || req.body.car_parking != undefined){
          pDetails.car_parking = req.body.car_parking;
        }
        if(req.body.bedroom != '' || req.body.bedroom != undefined){
          pDetails.bedroom = req.body.bedroom;
        }
        if(req.body.AssignToUser != '' || req.body.AssignToUser != undefined){
          pDetails.AssignToUser = JSON.stringify(req.body.AssignToUser);

          // await projectMappingOperations.deleteProjectId(id);
          // var obj = req.body.AssignToUser;
          // var obj = obj.replace(/["']/g, "");
          // obj = obj.split(',');
          // obj.forEach(element => {

          //       var projectMapping = new ProjectMapping(
          //         req.body.id,
          //         element,
          //         "user",
          //       );

          //         projectMappingOperations.addProjectMapping(projectMapping);
          //   }); 

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
                console.log(data);
                let convertData = [];
                convertData.push(data);
                data = convertData;
                  let arr = [];
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                    if(req.projectId != 'NA'){
                      var projectData = await projectOperations.getProjectById(req.projectId);
                      dataArray['projectId'] = req.projectId;
                      dataArray['project_name'] = projectData.project_name;
                      dataArray['project_uid'] = projectData.project_uid;
                    }else{
                      dataArray['projectId'] = '';
                      dataArray['project_name'] = '';
                      dataArray['project_uid'] = '';
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
                      var projectForData = await propertyForOperations.getPropertyForById(new ObjectID(req.projectforId));
                      dataArray['projectforId'] = req.projectforId;
                      dataArray['property_for_name'] = projectForData.name;
                    }else{
                      dataArray['projectforId'] = '';
                      dataArray['property_for_name'] = '';
                    }
                    // console.log(req.projectstatusId);
                     if(req.projectstatusId != 'NA'){
                      var projectStatusData = await propertyStatusOperations.getPropertyStatusById(req.projectstatusId);
                      // console.log(projectStatusData);
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
                     if(req.projecttypeId != 'NA'){
                      var projectTypeData = await propertyTypeOperations.getPropertyTypeById(req.projecttypeId);
                      dataArray['projecttypeId'] = req.projecttypeId;
                      dataArray['projecttype_name'] = projectTypeData.name;
                    }else{
                      dataArray['projecttypeId'] = '';
                      dataArray['projecttype_name'] = '';
                    }

                    dataArray['washroom'] = req.washroom;
                    dataArray['bathroom'] = req.bathroom;
                    dataArray['zipcode'] = req.zipcode;
                    dataArray['edm_image'] = req.edm_image;
                    dataArray['property_broucher'] = req.property_broucher;
                    dataArray['property_image'] = req.property_image;
                    dataArray['utility'] = req.utility;
                    dataArray['study'] = req.study;
                    dataArray['pooja'] = req.pooja;
                    dataArray['furnish_type'] = req.furnish_type;
                    dataArray['AssignTo'] = req.AssignTo;
                    dataArray['AssignToUser'] = req.AssignToUser;
                    dataArray['car_parking'] = req.car_parking;
                    dataArray['bedroom'] = req.bedroom;
                    
                    arr.push(dataArray);
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText[0][0]);
                    if(responseText.length > 0){
                         res.status(200).json({
                          data: responseText[0][0],
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
                // console.log(data);
                  let arr = [];
                 Promise.all(data.map(async (element) => {
                    var req = element;

                    var dataArray = {}; 
                    dataArray['_id'] = req._id;
                    if(req.projectId != 'NA'){
                      var projectData = await projectOperations.getProjectById(req.projectId);
                      dataArray['projectId'] = req.projectId;
                      dataArray['project_name'] = projectData.project_name;
                      dataArray['project_uid'] = projectData.project_uid;
                    }else{
                      dataArray['projectId'] = '';
                      dataArray['project_name'] = '';
                      dataArray['project_uid'] = '';
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
                      // var gg = ObjectID.Types.ObjectId(req.projectforId); 
                      // console.log(gg);
                      var projectForData = await propertyForOperations.getPropertyForById(new ObjectID(req.projectforId));
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
                     if(req.projecttypeId != 'NA'){
                      var projectTypeData = await propertyTypeOperations.getPropertyTypeById(req.projecttypeId);
                      dataArray['projecttypeId'] = req.projecttypeId;
                      dataArray['projecttype_name'] = projectTypeData.name;
                    }else{
                      dataArray['projecttypeId'] = '';
                      dataArray['projecttype_name'] = '';
                    }

                    dataArray['washroom'] = req.washroom;
                    dataArray['bathroom'] = req.bathroom;
                    dataArray['zipcode'] = req.zipcode;
                    dataArray['createdAt'] = req.createdAt;
                    dataArray['edm_image'] = req.edm_image;
                    dataArray['property_broucher'] = req.property_broucher;
                    dataArray['property_image'] = req.property_image;
                    dataArray['utility'] = req.utility;
                    dataArray['study'] = req.study;
                    dataArray['pooja'] = req.pooja;
                    dataArray['furnish_type'] = req.furnish_type;
                    dataArray['AssignTo'] = req.AssignTo;
                    dataArray['AssignToUser'] = req.AssignToUser;
                    dataArray['car_parking'] = req.car_parking;
                    dataArray['bedroom'] = req.bedroom;
                    
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

const getPropertyType = (req, res) => {
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
                 const promise = propertyTypeOperations.findPropertyTypeId(id)
              promise
              .then((data)=>{
                  console.log(data)
                  const {others} = data
                  res.status(200).json({
                      data: data,
                      success: 1
                  })
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
              });
             }else{
               const query = req.query.new 
              const promise = propertyTypeOperations.getAllPropertyType(query)
              promise
              .then((data)=>{
                  console.log(data)
                  const {others} = data
                  if(data.length > 0){
                   res.status(200).json({
                    data: data,
                    success: 1
                    }) 
                }else{
                    res.status(200).json({
                    data: [],
                    message: "No Data found",
                    success: 0
                    }) 
                }
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
              });
            }
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};

const getPropertyUnitType = (req, res) => {
  let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
             let propertyTypeId = req.params.id
             if(propertyTypeId){
                 const promise = propertyUnitTypeOperations.findPropertyUnitTypeId(propertyTypeId)
              promise
              .then((data)=>{
                  console.log(data)
                  const {others} = data
                  res.status(200).json({
                      data: data,
                      success: 1
                  })
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
              });
             }else{
               const query = req.query.new
              const promise = propertyUnitTypeOperations.getAllPropertyUnitType(query)
              promise
              .then((data)=>{
                  console.log(data)
                  const {others} = data
                  if(data.length > 0){
                   res.status(200).json({
                    data: data,
                    success: 1
                    }) 
                }else{
                    res.status(200).json({
                    data: [],
                    message: "No Data found",
                    success: 0
                    }) 
                }
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
              });
            }
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};

const getPropertyFor = (req, res) => {
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
                 const promise = propertyForOperations.findPropertyForId(id)
              promise
              .then((data)=>{
                  console.log(data)
                  const {others} = data
                  res.status(200).json({
                      data: data,
                      success: 1
                  })
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
              });
             }else{
               const query = req.query.new 
              const promise = propertyForOperations.getAllPropertyFor(query)
              promise
              .then((data)=>{
                  console.log(data)
                  const {others} = data
                  if(data.length > 0){
                   res.status(200).json({
                    data: data,
                    success: 1
                    }) 
                }else{
                    res.status(200).json({
                    data: [],
                    message: "No Data found",
                    success: 0
                    }) 
                }
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
              });
            }
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};

const getPropertyStatus = (req, res) => {
  let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
             let propertyTypeId = req.params.id
             // console.log(req.params.id);
             if(propertyTypeId){
                 const promise = propertyStatusOperations.findPropertyStatusId(propertyTypeId)
              promise
              .then((data)=>{
                  console.log(data)
                  const {others} = data
                  res.status(200).json({
                      data: data,
                      success: 1
                  })
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
              });
             }else{
               const query = req.query.new 
              const promise = propertyStatusOperations.getAllPropertyStatus(query)
              promise
              .then((data)=>{
                  console.log(data)
                  const {others} = data
                  if(data.length > 0){
                   res.status(200).json({
                    data: data,
                    success: 1
                    }) 
                }else{
                    res.status(200).json({
                    data: [],
                    message: "No Data found",
                    success: 0
                    }) 
                }
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
              });
            }
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};

const addPropertyType = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    var status = 1;
    const ptype = new PropertyType(
      req.body.name,
      status,
    );
    const promise = propertyTypeOperations.addPropertyType(ptype);
    promise
      .then((data) => {
        res.status(201).json({
          message: "Save Successfully",
          success: 1,
          data: data,
        });
      })
      .catch((err) => {
        if(err.keyPattern){
          res.status(500).json({message: "duplicate "+duplicate+" data", success: 0, error_msg: err.message});
        }else{
          res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
        }
      });
    }else{
          return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      }
};
const addPropertyUnitType = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    var status = 1;
    const punittype = new PropertyUnitType(
      req.body.propertyTypeId,
      req.body.name,
      status,
    );
    const promise = propertyUnitTypeOperations.addPropertyUnitType(punittype);
    promise
      .then((data) => {
        res.status(201).json({
          message: "Save Successfully",
          success: 1,
          data: data,
        });
      })
      .catch((err) => {
        if(err.keyPattern){
          // res.status(500).json({message: "duplicate "+duplicate+" data", success: 0, error_msg: err.message});
          var keys = Object.keys(err.keyPattern);
        var duplicate = keys[0];
          res.status(500).json({message: "duplicate "+duplicate+" data", success: 0, error_msg: err.message});
        }else{
          res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
        }
      });
    }else{
          return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      }
};
const addPropertyStatus = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    var status = 1;
    const pStatus = new PropertyStatus(
      req.body.propertyTypeId,
      req.body.name,
      status,
    );
    const promise = propertyStatusOperations.addPropertyStatus(pStatus);
    promise
      .then((data) => {
        res.status(201).json({
          message: "Save Successfully",
          success: 1,
          data: data,
        });
      })
      .catch((err) => {
        // if(err.keyPattern){
        //   res.status(500).json({message: "duplicate "+duplicate+" data", success: 0, error_msg: err.message});
        // }else{
          res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
        // }
      });
    }else{
          return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      }
};
const addPropertyFor = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    var status = 1;
    const pFor = new PropertyFor(
      req.body.name,
      status,
    );
    const promise = propertyForOperations.addPropertyFor(pFor);
    promise
      .then((data) => {
        res.status(201).json({
          message: "Save Successfully",
          success: 1,
          data: data,
        });
      })
      .catch((err) => {
        if(err.keyPattern){
          res.status(500).json({message: "duplicate "+duplicate+" data", success: 0, error_msg: err.message});
        }else{
          res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
        }
      });
    }else{
          return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      }
};

const updatePropertyType= async (req, res) => {
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
    let id = req.body.id;
      // try {
        let propertyType = await propertyTypeOperations.getPropertyTypeById(id);
        // console.log(req.body.info);
        // console.log(JSON.stringify(req.body.info));

        if (!propertyType) {
          return res.status(400).json({ success: 0, message: "User Document not found" });
        }
        if(req.body.name != '' || req.body.name != undefined){
          propertyType.name = req.body.name;
        }
        if(req.body.status != '' || req.body.status != undefined){
          propertyType.status = req.body.status;
        }
        
        await propertyTypeOperations.updatePropertyType(propertyType._id,propertyType);
        return res.status(200).json({ success: 1, message: "Role Updated Successfully" });
     
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};

const updatePropertyFor= async (req, res) => {
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
    let id = req.body.id;
      // try {
        let propertyFor = await propertyForOperations.getPropertyForById(id);
        // console.log(req.body.info);
        // console.log(JSON.stringify(req.body.info));

        if (!propertyFor) {
          return res.status(400).json({ success: 0, message: "User Document not found" });
        }
        if(req.body.name != '' || req.body.name != undefined){
          propertyFor.name = req.body.name;
        }
        if(req.body.status != '' || req.body.status != undefined){
          propertyFor.status = req.body.status;
        }
        
        await propertyForOperations.updatePropertyFor(propertyFor._id,propertyFor);
        return res.status(200).json({ success: 1, message: "Role Updated Successfully" });
     
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};

const updatePropertyUnitType= async (req, res) => {
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
    let id = req.body.id;
      // try {
        let propertyUnitType = await propertyUnitTypeOperations.getPropertyUnitTypeById(id);
        // console.log(req.body.info);
        // console.log(JSON.stringify(req.body.info));

        if (!propertyUnitType) {
          return res.status(400).json({ success: 0, message: "User Document not found" });
        }
        if(req.body.propertyTypeId != '' || req.body.propertyTypeId != undefined){
          propertyUnitType.propertyTypeId = req.body.propertyTypeId;
        }
        if(req.body.name != '' || req.body.name != undefined){
          propertyUnitType.name = req.body.name;
        }
        if(req.body.status != '' || req.body.status != undefined){
          propertyUnitType.status = req.body.status;
        }
        
        await propertyUnitTypeOperations.updatePropertyUnitType(propertyUnitType._id,propertyUnitType);
        return res.status(200).json({ success: 1, message: "Role Updated Successfully" });
     
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};

const updatePropertyStatus= async (req, res) => {
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
    let id = req.body.id;
      // try {
        let propertyStatus = await propertyStatusOperations.getPropertyStatusById(id);
        // console.log(req.body.info);
        // console.log(JSON.stringify(req.body.info));

        if (!propertyStatus) {
          return res.status(400).json({ success: 0, message: "User Document not found" });
        }
        if(req.body.propertyTypeId != '' || req.body.propertyTypeId != undefined){
          propertyUnitType.propertyTypeId = req.body.propertyTypeId;
        }
        if(req.body.name != '' || req.body.name != undefined){
          propertyStatus.name = req.body.name;
        }
        if(req.body.status != '' || req.body.status != undefined){
          propertyStatus.status = req.body.status;
        }
        
        await propertyStatusOperations.updatePropertyStatus(propertyStatus._id,propertyStatus);
        return res.status(200).json({ success: 1, message: "Role Updated Successfully" });
     
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};
const addUploadLeadDetail = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){

    // let projectCheck = await uploadLeadOperations.findOneUploadId(req.body.projectId);
    // console.log(projectCheck);
    // if(projectCheck){
    //   return res.status(400).json({message: "duplicate data Please check name", success: 0});
    // }

    let status = 1;
    const uploadLead = new UploadLead(
      req.body.upload_file_name,
      req.body.formId,
      '',
      '',
      status,
      '',
      '',
      ''
    );


    const promise = uploadLeadOperations.addUploadLead(uploadLead); 
    promise
      .then((data) => {
       return res.status(201).json({
          message: "create upload Lead details Successfully",
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

const updateUploadLead = async (req, res) => {
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
    let id = req.body.uploadLeadId;
      try {
        let pDetails = await uploadLeadOperations.getUploadLeadById(id);
        console.log(pDetails);

        if (!pDetails) {
          return res.status(400).json({ success: 0, message: "record not found" });
        }


        if(req.body.file_path != '' || req.body.file_path != undefined){
          pDetails.file_path = req.body.file_path;
        }
        if(req.body.mapping_info != '' || req.body.mapping_info != undefined){
          pDetails.mapping_info = JSON.stringify(req.body.mapping_info);
        }
        if(req.body.status != '' || req.body.status != undefined){
          pDetails.status = req.body.status;
        }
        

        await uploadLeadOperations.updateUploadLead(pDetails._id,pDetails);
        return res.status(200).json({ success: 1, message: "upload lead Details Updated Successfully" });
      } catch (error) {
        return res.status(400).json({ success: 0, message: "Details not found" });
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};

const getUploadLead = (req, res) => {
  let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
             let propertyTypeId = req.params.id
             // console.log(req.params.id);
             if(propertyTypeId){
                 const promise = uploadLeadOperations.findUploadLeadId(propertyTypeId)
              promise
              .then((data)=>{
                  console.log(data)
                  const {others} = data
                  res.status(200).json({
                      data: data,
                      success: 1
                  })
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
              });
             }else{
               const query = req.query.new 
              const promise = uploadLeadOperations.getAllUploadLead(query)
              promise
              .then((data)=>{
                  console.log(data)
                  const {others} = data
                  if(data.length > 0){
                   res.status(200).json({
                    data: data,
                    success: 1
                    }) 
                }else{
                    res.status(200).json({
                    data: [],
                    message: "No Data found",
                    success: 0
                    }) 
                }
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
              });
            }
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};
const addUploadMultipleLeadDetail = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){


    let status = 1;
    const uploadMultipleLead = new UploadMultipleLead(
      req.body.upload_file_name,
      '',
      '',
      status,
      '',
      '',
      ''
    );


    const promise = uploadMultipleLeadOperations.addUploadMultipleLead(uploadMultipleLead); 
    promise
      .then((data) => {
       return res.status(201).json({
          message: "create upload Lead details Successfully",
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

const updateUploadMultipleLead = async (req, res) => {
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
    let id = req.body.uploadLeadId;
      try {
        let pDetails = await uploadMultipleLeadOperations.getUploadMultipleLeadById(id);

        if (!pDetails) {
          return res.status(400).json({ success: 0, message: "record not found" });
        }


        if(req.body.file_path != '' || req.body.file_path != undefined){
          pDetails.file_path = req.body.file_path;
        }
        if(req.body.mapping_info != '' || req.body.mapping_info != undefined){
          pDetails.mapping_info = JSON.stringify(req.body.mapping_info);
        }
        if(req.body.status != '' || req.body.status != undefined){
          pDetails.status = req.body.status;
        }
        

        await uploadMultipleLeadOperations.updateUploadMultipleLead(pDetails._id,pDetails);
        return res.status(200).json({ success: 1, message: "upload lead Details Updated Successfully" });
      } catch (error) {
        return res.status(400).json({ success: 0, message: "Details not found" });
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};

const getUploadMultipleLead = (req, res) => {
  let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
             let propertyTypeId = req.params.id
             // console.log(req.params.id);
             if(propertyTypeId){
                 const promise = uploadMultipleLeadOperations.findUploadMultipleLeadId(propertyTypeId)
              promise
              .then((data)=>{
                  console.log(data)
                  const {others} = data
                  res.status(200).json({
                      data: data,
                      success: 1
                  })
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
              });
             }else{
               const query = req.query.new 
              const promise = uploadMultipleLeadOperations.getAllUploadMultipleLead(query)
              promise
              .then((data)=>{
                  console.log(data)
                  const {others} = data
                  if(data.length > 0){
                   res.status(200).json({
                    data: data,
                    success: 1
                    }) 
                }else{
                    res.status(200).json({
                    data: [],
                    message: "No Data found",
                    success: 0
                    }) 
                }
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
              });
            }
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};


module.exports = { getUploadMultipleLead,addUploadMultipleLeadDetail,updateUploadMultipleLead,getUploadLead,addUploadLeadDetail,updateUploadLead,addProjectDetail,updateProjectDetail,getProjectDetail,getPropertyType,getPropertyUnitType,getPropertyStatus,getPropertyFor,addPropertyType,addPropertyUnitType,addPropertyStatus,addPropertyFor,updatePropertyType,updatePropertyUnitType,updatePropertyStatus,updatePropertyFor };
