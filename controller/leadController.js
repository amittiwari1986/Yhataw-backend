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
const LeadRemark = require("../dto/leadremarkto");
const leadRemarkOperations = require("../services/leadRemarkService");
const jwt = require("jsonwebtoken");
const db  = require('../db/connect');


//User countru
// const getForm = (req, res) => {
//   let token=req.headers.token;
//         let setdata = "";
//         if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
//           jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
//             if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
//             // return res.status(200).send(decoded.id.id);
//             setdata = decoded.id.id;
//         });
//         if(setdata){
//              let id = req.params.id
//              const query = req.query.new 
//             const promise = formOperations.getAllForm(query)
//             promise
//             .then((data)=>{
//                 console.log(data)
//                 const {others} = data
//                if(data.length > 0){
//                    res.status(200).json({
//                     data: data,
//                     success: 1
//                     }) 
//                 }else{
//                     res.status(200).json({
//                     data: [],
//                     message: "No Data found",
//                     success: 0
//                     }) 
//                 }
//             })
//             .catch((err)=>{
//                 // console.log(err.message)
//                 res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
//             });
//         }else{
//             return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
//         }
// };

const addForm = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    statusData = 1;
    const form = new From(
      req.body.form_name,
      req.body.developerId,
      req.body.projectId,
      req.body.projecttypeId,
      req.body.leadName,
      req.body.leadEmail,
      req.body.leadPhone,
      JSON.stringify(req.body.dynamicFields),
      statusData,
    );
    const promise = formOperations.addForm(form);
    promise
      .then((data) => {
        res.status(201).json({
          message: "Save Successfully",
          success: 1,
          data: data,
        });
      })
      .catch((err) => {
        // res.status(500).json(err.message);
        // res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
        // var keys = Object.keys(err.keyPattern);
        // var duplicate = keys[0];
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


const updateForm = async (req, res) => {
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
      try {
        let form = await formOperations.getFormById(id);
        console.log(form);

        if (!form) {
          return res.status(400).json({ success: 0, message: "Form Details not found" });
        }

        form.form_name = req.body.form_name;
        form.developerId = req.body.developerId;
        form.projectId = req.body.projectId;
        form.projecttypeId = req.body.projecttypeId;
        form.leadName = req.body.leadName;
        form.leadEmail = req.body.leadEmail;
        form.leadPhone = req.body.leadPhone;
        form.dynamicFields = JSON.stringify(req.body.dynamicFields);
        form.status = req.body.status;

        await formOperations.updateForm(form._id,form);
        return res.status(200).json({ success: 1, message: "From Details Updated Successfully" });
      } catch (error) {
        return res.status(400).json({ success: 0, message: "Details not found" });
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};

const getForm = (req, res) => {
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
                 const promise = formOperations.getFormById(id)
              promise
              .then((data)=>{
                  console.log(data)
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
                      // console.log(req.projectId);
                      var projectData = await projectOperations.getProjectById(req.projectId);
                      // console.log(projectData);
                      if(projectData){
                          dataArray['projectId'] = req.projectId;
                          dataArray['project_name'] = projectData.project_name;
                      }else{
                        dataArray['projectId'] = '';
                        dataArray['project_name'] = '';
                      }
                     
                    }else{
                      dataArray['projectId'] = '';
                      dataArray['project_name'] = '';
                    }

                    if(req.developerId != 'NA'){
                      var developerData = await developerOperations.getDeveloperById(req.developerId);
                      if(developerData){
                        dataArray['developerId'] = req.developerId;
                        dataArray['developer_name'] = developerData.developer_name;
                      }else{
                        dataArray['developerId'] = '';
                        dataArray['developer_name'] = '';
                      }
                      
                    }else{
                      dataArray['developerId'] = '';
                      dataArray['developer_name'] = '';
                    }
                    
                     if(req.projecttypeId != 'NA'){
                      var projectTypeData = await propertyTypeOperations.getPropertyTypeById(req.projecttypeId);
                      if(projectTypeData){
                        dataArray['projecttypeId'] = req.projecttypeId;
                        dataArray['projecttype_name'] = projectTypeData.name;
                      }else{
                        dataArray['projecttypeId'] = '';
                        dataArray['projecttype_name'] = '';
                      }
                      
                    }else{
                      dataArray['projecttypeId'] = '';
                      dataArray['projecttype_name'] = '';
                    }

                    dataArray['form_name'] = req.form_name;
                    dataArray['leadName'] = req.leadName;
                    dataArray['leadEmail'] = req.leadEmail;
                    dataArray['leadPhone'] = req.leadPhone;
                    dataArray['dynamicFields'] = JSON.parse(req.dynamicFields);
                    // dataArray['status'] = req.status;
                    
                    arr.push(dataArray);
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText[0]);
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
              const promise = formOperations.getAllForm(query)
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
                    console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                    if(req.projectId != 'NA'){
                      // console.log(req.projectId);
                      var projectData = await projectOperations.getProjectById(req.projectId);
                      // console.log(projectData);
                      if(projectData){
                          dataArray['projectId'] = req.projectId;
                          dataArray['project_name'] = projectData.project_name;
                      }else{
                        dataArray['projectId'] = '';
                        dataArray['project_name'] = '';
                      }
                     
                    }else{
                      dataArray['projectId'] = '';
                      dataArray['project_name'] = '';
                    }

                    if(req.developerId != 'NA'){
                      var developerData = await developerOperations.getDeveloperById(req.developerId);
                      if(developerData){
                        dataArray['developerId'] = req.developerId;
                        dataArray['developer_name'] = developerData.developer_name;
                      }else{
                        dataArray['developerId'] = '';
                        dataArray['developer_name'] = '';
                      }
                      
                    }else{
                      dataArray['developerId'] = '';
                      dataArray['developer_name'] = '';
                    }
                    
                     if(req.projecttypeId != 'NA'){
                      var projectTypeData = await propertyTypeOperations.getPropertyTypeById(req.projecttypeId);
                      if(projectTypeData){
                        dataArray['projecttypeId'] = req.projecttypeId;
                        dataArray['projecttype_name'] = projectTypeData.name;
                      }else{
                        dataArray['projecttypeId'] = '';
                        dataArray['projecttype_name'] = '';
                      }
                      
                    }else{
                      dataArray['projecttypeId'] = '';
                      dataArray['projecttype_name'] = '';
                    }

                    dataArray['form_name'] = req.form_name;
                    dataArray['leadName'] = req.leadName;
                    dataArray['leadEmail'] = req.leadEmail;
                    dataArray['leadPhone'] = req.leadPhone;
                    dataArray['dynamicFields'] = JSON.parse(req.dynamicFields);
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
            }
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};


const addLeadForm = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id; 
  });
  if(setdata){

    var dt = new Date();
    year  = dt.getFullYear();
    month = (dt.getMonth() + 1).toString().padStart(2, "0");
    day   = dt.getDate().toString().padStart(2, "0");
    var date = day +'/' + month + '/' + year;


    var random = Math.floor(1000 + Math.random() * 9000);
    var uid = "LD" + random;
    var stage = "new";
    var source = "FACEBOOK";
    var type = "individual";
    var projectDetails = await projectDetailOperations.findOneProjectId(req.body.projectId);
    statusData = 1;
    const lead = new Lead(
      req.body.form_name,
      req.body.formId,
      req.body.developerId,
      req.body.projectId,
      req.body.projecttypeId,
      req.body.leadName,
      req.body.leadEmail,
      req.body.leadPhone,
      JSON.stringify(req.body.dynamicFields),
      statusData,
      projectDetails.AssignTo,
      projectDetails.AssignToUser,
      source,
      uid,
      stage,
      date,
      type,
      '',
      ''
    );
    const promise = leadOperations.addLead(lead);
    promise
      .then((data) => {
        res.status(201).json({
          message: "Save Successfully",
          success: 1,
          data: data,
        });
      })
      .catch((err) => {
        // res.status(500).json(err.message);
        // res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
        // var keys = Object.keys(err.keyPattern);
        // var duplicate = keys[0];
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


const updateLeadForm = async (req, res) => {
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
      try {
        let lead = await leadOperations.getLeadById(id);
        // console.log(lead);

        if (!lead) {
          return res.status(400).json({ success: 0, message: "Lead Details not found" });
        }

        lead.form_name = req.body.form_name;
        lead.formId = req.body.formId;
        lead.developerId = req.body.developerId;
        lead.projectId = req.body.projectId;
        lead.projecttypeId = req.body.projecttypeId;
        lead.leadName = req.body.leadName;
        lead.leadEmail = req.body.leadEmail;
        lead.leadPhone = req.body.leadPhone;
        lead.dynamicFields = JSON.stringify(req.body.dynamicFields);
        lead.status = req.body.status;

        await leadOperations.updateLead(lead._id,lead);
        return res.status(200).json({ success: 1, message: "Lead Details Updated Successfully" });
      } catch (error) {
        return res.status(400).json({ success: 0, message: "Details not found" });
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};
const updateLeadStage = async (req, res) => {
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
    var dataArrayPushLog = [];
      try {
        let lead = await leadOperations.getLeadById(id);

        if (!lead) {
          return res.status(400).json({ success: 0, message: "Lead Details not found" });
        }


        lead.stage = req.body.stage;
        var oneRow3 = {
                          "leadId": lead._id.toString(),
                          "userId": setdata,
                          "old_value": "change stage",
                          "new_value": req.body.stage
                      }
                      dataArrayPushLog.push(oneRow3);

        
        leadLogOperations.addManyLeadLog(dataArrayPushLog);

         let leadUserStage = await leadUserStageOperations.findLeadUserStageByleadIdUserId(lead._id.toString(),setdata);
         // console.log(leadUserStage);
         leadUserStage.stage = req.body.stage;
         await leadUserStageOperations.updateLeadUserStage(leadUserStage._id,leadUserStage);

         let leadUserAllStage = await leadUserStageOperations.findLeadUserStageId(lead._id.toString());
         var leadUserAllStageCount = leadUserAllStage.length;
         var not_intrested_count = 0;
         const addOne = 1;
         leadUserAllStage.forEach(async (element) => {
          if(element.stage == "Not Answered"){
            not_intrested_count = not_intrested_count + addOne;
          }
         });

        //  let lead = await leadOperations.getLeadById(lead._id.toString());

        // if (!lead) {
        //   return res.status(400).json({ success: 0, message: "Lead Details not found" });
        // }

        // lead.stage = "Not Answered";

        // await leadOperations.updateLead(lead._id.toString(),lead);

         if(leadUserAllStageCount == not_intrested_count){
          await leadOperations.updateLead(lead._id,lead); 
         }

        return res.status(200).json({ success: 1, message: "Lead stage Updated Successfully" });
      } catch (error) {
        return res.status(400).json({ success: 0, message: "Details not found" });
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};


const updateLeadAssignTo = async (req, res) => {
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
      try {
        let lead = await leadOperations.getLeadById(id);

        if (!lead) {
          return res.status(400).json({ success: 0, message: "Lead Details not found" });
        }

        lead.AssignTo = JSON.stringify(req.body.AssignTo);

        await leadOperations.updateLead(lead._id,lead);

        // var obj = req.body.AssignTo;
        // obj.forEach(element => {

        //       var leadMapping = new LeadMapping(
        //         req.body.id,
        //         element,
        //         "team",
        //       );

        //         leadMappingOperations.addLeadMapping(leadMapping);
        //   }); 
        return res.status(200).json({ success: 1, message: "Lead Assignment Updated Successfully" });
      } catch (error) {
        return res.status(400).json({ success: 0, message: "Details not found" });
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};

const updateLeadAssignToUser = async (req, res) => {
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
      try {
        let lead = await leadOperations.getLeadById(id);

        if (!lead) {
          return res.status(400).json({ success: 0, message: "Lead Details not found" });
        }

        lead.AssignToUser = JSON.stringify(req.body.AssignToUser);

        await leadOperations.updateLead(lead._id,lead);
        await leadMappingOperations.deleteLeadId(id);
        var obj = req.body.AssignToUser;
        var obj = obj.replace(/["']/g, "");
        obj = obj.split(',');
        obj.forEach(async (element) => {

              var leadMapping = new LeadMapping(
                req.body.id,
                element,
                "user",
              );

                leadMappingOperations.addLeadMapping(leadMapping);
                let leadUserStage = await leadUserStageOperations.findLeadUserStageByleadIdUserId(req.body.id,element);
                // console.log(leadUserStage); 
                if(!leadUserStage){
                  var dataArrayPushStage = [];
                  var oneRow4 = {
                                          "lead_id": req.body.id,
                                          "user_id": element,
                                          "type": "user",
                                          "user_name": "",
                                          "stage": "new",
                                          "status": "1"
                                      }
                  dataArrayPushStage.push(oneRow4); 
                  leadUserStageOperations.addManyLeadUserStage(dataArrayPushStage);
                }
         
          }); 
        return res.status(200).json({ success: 1, message: "Lead Assignment To Users Successfully" });
      } catch (error) {
        return res.status(400).json({ success: 0, message: "Details not found" });
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};

const getLeadForm = (req, res) => {
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
                 const promise = leadOperations.getLeadById(id)
              promise
              .then((data)=>{
                let convertData = [];
                convertData.push(data);
                data = convertData;
                let arr = [];
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    // console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                      if(req.projectId != 'NA'){
                        // console.log(req.projectId);
                        var projectData = projectOperations.getProjectById(req.projectId);
                        // console.log(projectData);
                        if(projectData){
                            dataArray['projectId'] = req.projectId;
                            dataArray['project_name'] = projectData.project_name;
                        }else{
                          dataArray['projectId'] = '';
                          dataArray['project_name'] = '';
                        }
                       
                      }else{
                        dataArray['projectId'] = '';
                        dataArray['project_name'] = '';
                      }

                      if(req.developerId != 'NA'){
                        var developerData = developerOperations.getDeveloperById(req.developerId);
                        if(developerData){
                          dataArray['developerId'] = req.developerId;
                          dataArray['developer_name'] = developerData.developer_name;
                        }else{
                          dataArray['developerId'] = '';
                          dataArray['developer_name'] = '';
                        }
                        
                      }else{
                        dataArray['developerId'] = '';
                        dataArray['developer_name'] = '';
                      }
                    
                       if(req.projecttypeId != 'NA'){
                          var projectTypeData = propertyTypeOperations.getPropertyTypeById(req.projecttypeId);
                          if(projectTypeData){
                            dataArray['projecttypeId'] = req.projecttypeId;
                            dataArray['projecttype_name'] = projectTypeData.name;
                          }else{
                            dataArray['projecttypeId'] = '';
                            dataArray['projecttype_name'] = '';
                          }
                        
                        }else{
                          dataArray['projecttypeId'] = '';
                          dataArray['projecttype_name'] = '';
                        }

                        if(req.AssignTo != 'NA'){
                          var teamId = req.AssignTo;
                          var teamId = teamId.replace(/["']/g, "");
                          teamId = teamId.split(',');
                          console.log(teamId);
                          var teamData = teamOperations.getMultipleTeam(teamId);
                          if(teamData){
                            dataArray['AssignTo'] = teamData;
                          }else{
                            dataArray['AssignTo'] = '';
                          }
                          
                        }else{
                          dataArray['AssignTo'] = '';
                        }

                       if(req.AssignToUser != 'NA'){
                            if(req.stage == "Pipeline"){
                              var projectDetailsData = await projectDetailOperations.findOneProjectId(req.projectId);
                              var userId = projectDetailsData.AssignToUser;
                              var userId = userId1.replace(/["']/g, "");
                              userId = userId1.split(',');
                            }else{
                              var userId = req.AssignToUser;
                              var userId = userId.replace(/["']/g, "");
                              userId = userId.split(',');
                            }
                            var userData = await userOperations.getMultipleUser(userId);
                            var qurData = {"user": userId, "leadId": req._id.toString()}
                            var leadUserStageData = await leadUserStageOperations.getMultipleUser(qurData);
                            var stageArray = [];
                            leadUserStageData.forEach(element => {
                              var userDataSet = userOperations.getUserById(element.user_id);
                              var oneRow = {
                                                "lead_id": element.lead_id,
                                                "user_id": element.user_id,
                                                "type": element.type,
                                                "user_name": userDataSet.name,
                                                "stage": element.stage
                                            }
                              // console.log(oneRow4);
                              stageArray.push(oneRow); 

                            });
                              dataArray['AssignToUserStage'] = stageArray;
                            if(userData){
                              dataArray['AssignToUser'] = userData;
                            }else{
                              dataArray['AssignToUser'] = '';
                              dataArray['AssignToUserStage'] = '';
                            }
                        
                      }else{
                        dataArray['AssignToUser'] = '';
                        dataArray['AssignToUserStage'] = '';
                      }

                    dataArray['form_name'] = req.form_name;
                    dataArray['formId'] = req.formId;
                    dataArray['leadName'] = req.leadName;
                    dataArray['leadEmail'] = req.leadEmail;
                    dataArray['leadPhone'] = req.leadPhone;
                    dataArray['status'] = req.status;
                    // dataArray['AssignToUser'] = req.AssignToUser;
                    dataArray['source'] = req.source;
                    dataArray['stage'] = req.stage;
                    dataArray['uid'] = req.uid;
                    dataArray['updatedAt'] = req.updatedAt;
                    dataArray['lead_type'] = req.lead_type;
                    dataArray['createdAt'] = req.createdAt;
                    if(req.dynamicFields){
                      dataArray['dynamicFields'] = JSON.parse(req.dynamicFields);
                    }


                    // if(req.formId != 'NA'){
                    //   var formData = await formOperations.findFormId(req.formId);
                    //   if(formData){
                    //     dataArray['dynamicFields'] = JSON.parse(formData.dynamicFields);
                    //   }else{
                    //     dataArray['dynamicFields'] = '';
                    //   }
                      
                    // }else{
                    //   dataArray['dynamicFields'] = '';
                    // }
                    
                    arr.push(dataArray);
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText);
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
               let start_date = req.query.start_date
                let end_date = req.query.end_date
                let page = req.query.page
                let limit = req.query.limit
                var skip = limit * page;

                let id = req.query.searchUserId;
                var userId1 = id;
                        var userId1 = userId1.replace(/["']/g, "");
                        userId1 = userId1.split(',');
                if(id=='undefined'){
                  var userId1 = "";
                }
                
                        
                        console.log(userId1);
                var dt = new Date();
                year  = dt.getFullYear();
                month = (dt.getMonth() + 1).toString().padStart(2, "0");
                day   = dt.getDate().toString().padStart(2, "0");
                var query = {};

                // if(start_date == ''){
                //     start_date = day + '/' + month + '/2022';
                // }
                // if(end_date == ''){
                //     end_date = day + '/' + month + '/' + year;
                // }
                 query = {"start_date": start_date, "end_date": end_date, "limit": Number(limit), "skip": skip, "page": Number(page), "user_id": userId1};
                 // console.log(query);

              const promise = leadOperations.getAllLead(query)
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
                 var arrrr = Promise.all(data[0].data.map(async (element) => {
                    var req = element;
                    //console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                    if(req.projectId != 'NA'){
                      // console.log(req.projectId);
                      var projectData = await projectOperations.getProjectById(req.projectId);
                      // console.log(projectData);
                      if(projectData){
                          dataArray['projectId'] = req.projectId;
                          dataArray['project_name'] = projectData.project_name;
                      }else{
                        dataArray['projectId'] = '';
                        dataArray['project_name'] = '';
                      }
                     
                    }else{
                      dataArray['projectId'] = '';
                      dataArray['project_name'] = '';
                    }

                    if(req.developerId != 'NA'){
                      var developerData = await developerOperations.getDeveloperById(req.developerId);
                      if(developerData){
                        dataArray['developerId'] = req.developerId;
                        dataArray['developer_name'] = developerData.developer_name;
                      }else{
                        dataArray['developerId'] = '';
                        dataArray['developer_name'] = '';
                      }
                      
                    }else{
                      dataArray['developerId'] = '';
                      dataArray['developer_name'] = '';
                    }
                    
                     if(req.projecttypeId != 'NA'){
                      var projectTypeData = await propertyTypeOperations.getPropertyTypeById(req.projecttypeId);
                      if(projectTypeData){
                        dataArray['projecttypeId'] = req.projecttypeId;
                        dataArray['projecttype_name'] = projectTypeData.name;
                      }else{
                        dataArray['projecttypeId'] = '';
                        dataArray['projecttype_name'] = '';
                      }
                      
                    }else{
                      dataArray['projecttypeId'] = '';
                      dataArray['projecttype_name'] = '';
                    }

                    if(req.AssignTo != 'NA'){
                      var teamId = req.AssignTo;
                      var teamId = teamId.replace(/["']/g, "");
                      teamId = teamId.split(',');
                      console.log(teamId);
                      var teamData = req;
                      if(teamId.length > 0){
                        var teamData = await teamOperations.getMultipleTeam(teamId);
                      }
                      
                      if(teamData){
                        dataArray['AssignTo'] = teamData;
                      }else{
                        dataArray['AssignTo'] = '';
                      }
                      
                    }else{
                      dataArray['AssignTo'] = '';
                    }

                    if(req.AssignToUser != 'NA'){
                      // var userId =JSON.parse(req.AssignToUser);
                      if(req.stage == "Pipeline"){
                        var projectDetailsData = await projectDetailOperations.findOneProjectId(req.projectId);
                        var userId = projectDetailsData.AssignToUser;
                        var userId = userId.replace(/["']/g, "");
                        userId = userId.split(',');
                      }else{
                        var userId = req.AssignToUser;
                        var userId = userId.replace(/["']/g, "");
                        userId = userId.split(',');
                      }
                      
                      // console.log(userId);
                      var userData = await userOperations.getMultipleUser(userId);
                      var qurData = {"user": userId, "leadId": req._id.toString()}
                      var leadUserStageData = await leadUserStageOperations.getMultipleUser(qurData);
                      var stageArray = [];
                      leadUserStageData.forEach((ele) => {
                        var userDataSet = userOperations.getUserById(ele.user_id);
                        var oneRow = {
                                          "lead_id": ele.lead_id,
                                          "user_id": ele.user_id,
                                          "type": ele.type,
                                          "user_name": userDataSet.name,
                                          "stage": ele.stage
                                      }
                        // console.log(oneRow4);
                        stageArray.push(oneRow); 
                        // console.log(stageArray);

                      });
                        dataArray['AssignToUserStage'] = stageArray;
                      if(userData){
                        dataArray['AssignToUser'] = userData;
                      }else{
                        dataArray['AssignToUser'] = '';
                        dataArray['AssignToUserStage'] = '';
                      }
                      
                    }else{
                      dataArray['AssignToUser'] = '';
                      dataArray['AssignToUserStage'] = '';
                    }

                    dataArray['form_name'] = req.form_name;
                    dataArray['formId'] = req.formId;
                    dataArray['leadName'] = req.leadName;
                    dataArray['leadEmail'] = req.leadEmail;
                    dataArray['leadPhone'] = req.leadPhone;
                    dataArray['status'] = req.status;
                    // dataArray['AssignToUser'] = req.AssignToUser;
                    dataArray['source'] = req.source;
                    dataArray['stage'] = req.stage;
                    dataArray['uid'] = req.uid;
                    dataArray['updatedAt'] = req.updatedAt;
                    dataArray['lead_type'] = req.lead_type;
                    dataArray['createdAt'] = req.createdAt;
                    if(req.dynamicFields){
                      dataArray['dynamicFields'] = JSON.parse(req.dynamicFields);
                    }
                    console.log(dataArray);
                    

                    // if(req.formId != 'NA'){
                    //   var formData = await formOperations.findFormId(req.formId);
                    //   if(formData){
                    //     dataArray['dynamicFields'] = JSON.parse(formData[0].dynamicFields);
                    //   }else{
                    //     dataArray['dynamicFields'] = '';
                    //   }
                      
                    // }else{
                    //   dataArray['dynamicFields'] = '';
                    // }
                    arr.push(dataArray);
                    arr.sort(function compare(a, b) {
                      var dateA = new Date(a.updatedAt);
                      var dateB = new Date(b.updatedAt);
                      return dateB - dateA;
                    });
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText);
                    if(responseText.length > 0){
                         res.status(200).json({
                          data: responseText[0],
                          metadata: data[0].metadata,
                          success: 1
                          }) 
                      }else{
                          res.status(200).json({
                          data: [],
                          metadata: [],
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
            }
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};


const getMyLeadForm = (req, res) => { 
  let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
             let id = setdata;
             let start_date = req.query.start_date
            let end_date = req.query.end_date
            let page = req.query.page
            let limit = req.query.limit
            var skip = limit * page;
             query = {"user_id":id, "start_date": start_date, "end_date": end_date, "limit": Number(limit), "skip": skip, "page": Number(page)};
                 console.log(query);
                 const promise = leadOperations.getAllMyLead(query)
              promise
              .then((data)=>{
                 console.log(data);
                let arr = [];
                 var arrrr = Promise.all(data[0].data.map(async (element) => {
                    var req = element;
                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                    if(req.projectId != 'NA'){
                      // console.log(req);
                      var projectData = await projectOperations.getProjectById(req.projectId);
                      // console.log(projectData);
                      if(projectData){
                          dataArray['projectId'] = req.projectId;
                          dataArray['project_name'] = projectData.project_name;
                      }else{
                        dataArray['projectId'] = '';
                        dataArray['project_name'] = '';
                      }
                     
                    }else{
                      dataArray['projectId'] = '';
                      dataArray['project_name'] = '';
                    }

                    if(req.developerId != 'NA'){
                      var developerData = await developerOperations.getDeveloperById(req.developerId);
                      if(developerData){
                        dataArray['developerId'] = req.developerId;
                        dataArray['developer_name'] = developerData.developer_name;
                      }else{
                        dataArray['developerId'] = '';
                        dataArray['developer_name'] = '';
                      }
                      
                    }else{
                      dataArray['developerId'] = '';
                      dataArray['developer_name'] = '';
                    }
                    
                     if(req.projecttypeId != 'NA'){
                      var projectTypeData = await propertyTypeOperations.getPropertyTypeById(req.projecttypeId);
                      if(projectTypeData){
                        dataArray['projecttypeId'] = req.projecttypeId;
                        dataArray['projecttype_name'] = projectTypeData.name;
                      }else{
                        dataArray['projecttypeId'] = '';
                        dataArray['projecttype_name'] = '';
                      }
                      
                    }else{
                      dataArray['projecttypeId'] = '';
                      dataArray['projecttype_name'] = '';
                    }

                    // if(req.AssignTo != 'NA'){
                    //   var userData = await teamOperations.getTeamById(req.AssignTo);
                    //   if(userData){
                    //     dataArray['AssignTo'] = req.AssignTo;
                    //     dataArray['AssignTo_name'] = userData.team_name;
                    //   }else{
                    //     dataArray['AssignTo'] = '';
                    //     dataArray['AssignTo_name'] = '';
                    //   }
                      
                    // }else{
                    //   dataArray['AssignTo'] = '';
                    //   dataArray['AssignTo_name'] = '';
                    // }
                    // var leadUserStageData = await leadUserStageOperations.findLeadUserStageId(req._id.toString());
                    // dataArray['AssignToUserStage'] = leadUserStageData;

                    
                    var leadUserStageData = await leadUserStageOperations.findLeadUserStageByleadIdUserId(req._id.toString(), setdata);
                    if(leadUserStageData){
                      var stage = leadUserStageData.stage;
                    }else{
                      var stage = req.stage;
                    }
                    dataArray['form_name'] = req.form_name;
                    dataArray['formId'] = req.formId;
                    dataArray['leadName'] = req.leadName;
                    dataArray['leadEmail'] = req.leadEmail;
                    dataArray['leadPhone'] = req.leadPhone;
                    dataArray['status'] = req.status;
                    dataArray['AssignTo'] = req.AssignTo;
                    dataArray['AssignToUser'] = req.AssignToUser;
                    dataArray['source'] = req.source;
                    dataArray['stage'] = stage;
                    dataArray['uid'] = req.uid;
                    dataArray['lead_type'] = req.lead_type;
                    dataArray['updatedAt'] = req.updatedAt;
                    dataArray['createdAt'] = req.createdAt;
                    if(req.dynamicFields){
                      dataArray['dynamicFields'] = JSON.parse(req.dynamicFields);
                    }


                    // if(req.formId != 'NA'){
                    //   var formData = await formOperations.findFormId(req.formId);
                    //   if(formData){
                    //     dataArray['dynamicFields'] = JSON.parse(formData.dynamicFields);
                    //   }else{
                    //     dataArray['dynamicFields'] = '';
                    //   }
                      
                    // }else{
                    //   dataArray['dynamicFields'] = '';
                    // }
                    
                    arr.push(dataArray);
                    arr.sort(function compare(a, b) {
                      var dateA = new Date(a.updatedAt);
                      var dateB = new Date(b.updatedAt);
                      return dateB - dateA;
                    });
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText);
                    if(responseText.length > 0){
                         res.status(200).json({
                          data: responseText[0],
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
                     
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
              });
             

        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};


const addLeadReminder = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id; 
  });
  if(setdata){
    statusData = 1;
    const leadreminder = new LeadReminder(
      req.body.leadId,
      setdata,
      req.body.title,
      req.body.notes,
      req.body.date,
      req.body.time,
      statusData,
    );
    const promise = leadReminderOperations.addLeadReminder(leadreminder);
    promise
      .then((data) => {
        res.status(201).json({
          message: "Save Successfully",
          success: 1,
          data: data,
        });
      })
      .catch((err) => {
        // res.status(500).json(err.message);
        // res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
        // var keys = Object.keys(err.keyPattern);
        // var duplicate = keys[0];
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


const updateLeadReminder = async (req, res) => {
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
      try {
        let leadreminder = await leadReminderOperations.getLeadReminderById(id);
        console.log(leadreminder);

        if (!leadreminder) {
          return res.status(200).json({ success: 0, message: "Lead Reminder Details not found" });
        }

        leadreminder.status = req.body.status;

        await leadReminderOperations.updateLeadReminder(leadreminder._id,leadreminder);
        return res.status(200).json({ success: 1, message: "Lead Reminder Updated Successfully" });
      } catch (error) {
        return res.status(400).json({ success: 0, message: "Details not found" });
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};

const getLeadReminder = (req, res) => {
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
             var checkUserData = userOperations.getUserById(setdata);

                    // if(checkUserData.role == "65277273c5d66b4d6ccb0fe7"){
                    //   var getUserId = setdata;
                    // }else{
                    //   var getUserId = 'NA';
                    // }
                    var getUserId = setdata;
                    
             if(id){
                 const promise = leadReminderOperations.findLeadReminderLeadId(id,getUserId)
              promise
              .then((data)=>{
                // console.log(data);
                // let convertData = [];
                // convertData.push(data);
                // data = convertData;
                let arr = [];
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                    if(req.leadId != 'NA'){
                      var leadData = leadOperations.getLeadById(req.leadId);
                      if(leadData){
                          dataArray['leadId'] = req.leadId;
                          dataArray['lead_name'] = leadData.uid;
                      }else{
                        dataArray['leadId'] = '';
                        dataArray['lead_name'] = '';
                      }
                     
                    }else{
                      dataArray['leadId'] = '';
                      dataArray['lead_name'] = '';
                    }

                    if(req.userId != 'NA'){
                      var userData = userOperations.getUserById(req.userId);
                      if(userData){
                        dataArray['userId'] = req.userId;
                        dataArray['user_name'] = userData.name;
                      }else{
                        dataArray['userId'] = '';
                        dataArray['user_name'] = '';
                      }
                      
                    }else{
                      dataArray['userId'] = '';
                      dataArray['user_name'] = '';
                    }
                    
                    dataArray['title'] = req.title;
                    dataArray['notes'] = req.notes;
                    dataArray['date'] = req.date;
                    dataArray['time'] = req.time;
                    dataArray['status'] = req.status;
                    
                    arr.push(dataArray);
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText);
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
              const promise = leadReminderOperations.getAllLeadReminder(query)
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
                    if(req.leadId != 'NA'){
                      var leadData = await leadOperations.getLeadById(req.leadId);
                      if(leadData){
                          dataArray['leadId'] = req.leadId;
                          dataArray['lead_name'] = leadData.uid;
                      }else{
                        dataArray['leadId'] = '';
                        dataArray['lead_name'] = '';
                      }
                     
                    }else{
                      dataArray['leadId'] = '';
                      dataArray['lead_name'] = '';
                    }

                    if(req.userId != 'NA'){
                      var userData = await userOperations.getUserById(req.userId);
                      if(userData){
                        dataArray['userId'] = req.userId;
                        dataArray['user_name'] = userData.name;
                      }else{
                        dataArray['userId'] = '';
                        dataArray['user_name'] = '';
                      }
                      
                    }else{
                      dataArray['userId'] = '';
                      dataArray['user_name'] = '';
                    }
                    
                    dataArray['title'] = req.title;
                    dataArray['notes'] = req.notes;
                    dataArray['date'] = req.date;
                    dataArray['time'] = req.time;
                    dataArray['status'] = req.status;

                    arr.push(dataArray);
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText);
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
            }
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};

const addLeadRemark = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id; 
  });
  if(setdata){
    statusData = 1;
    const leadremark = new LeadRemark(
      req.body.leadId,
      setdata,
      req.body.title,
      req.body.notes,
      req.body.date,
      req.body.time,
      statusData,
    );
    const promise = leadRemarkOperations.addLeadRemark(leadremark);
    promise
      .then((data) => {
        res.status(201).json({
          message: "Save Successfully",
          success: 1,
          data: data,
        });
      })
      .catch((err) => {
        // res.status(500).json(err.message);
        // res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
        // var keys = Object.keys(err.keyPattern);
        // var duplicate = keys[0];
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


const updateLeadRemark = async (req, res) => {
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
    // console.log(id);
      try {
        let leadremark = await leadRemarkOperations.getLeadRemarkById(id);
        // console.log(leadremark);

        if (!leadremark) {
          return res.status(200).json({ success: 0, message: "Lead Remark Details not found" });
        }

        // leadreminder.leadId = req.body.leadId;
        // leadreminder.userId = req.body.userId;
        // leadreminder.title = req.body.title;
        // leadreminder.notes = req.body.notes;
        // leadreminder.date = req.body.date;
        // leadreminder.time = req.body.time;
        leadremark.status = req.body.status;

        await leadRemarkOperations.updateLeadRemark(leadremark._id,leadremark);
        return res.status(200).json({ success: 1, message: "Lead Remark Updated Successfully" });
      } catch (error) {
        return res.status(400).json({ success: 0, message: "Details not found" });
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};

const getLeadRemark = (req, res) => {
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
             var checkUserData = userOperations.getUserById(setdata);

                    if(checkUserData.role == "65277273c5d66b4d6ccb0fe7"){
                      var getUserId = setdata;
                    }else{
                      var getUserId = 'NA';
                    }
                    
             if(id){
                 const promise = leadRemarkOperations.findLeadRemarkLeadId(id,getUserId)
              promise
              .then((data)=>{
                // console.log(data);
                // let convertData = [];
                // convertData.push(data);
                // data = convertData;
                let arr = [];
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                    if(req.leadId != 'NA'){
                      var leadData = leadOperations.getLeadById(req.leadId);
                      if(leadData){
                          dataArray['leadId'] = req.leadId;
                          dataArray['lead_name'] = leadData.uid;
                      }else{
                        dataArray['leadId'] = '';
                        dataArray['lead_name'] = '';
                      }
                     
                    }else{
                      dataArray['leadId'] = '';
                      dataArray['lead_name'] = '';
                    }

                    if(req.userId != 'NA'){
                      var userData = userOperations.getUserById(req.userId);
                      if(userData){
                        dataArray['userId'] = req.userId;
                        dataArray['user_name'] = userData.name;
                      }else{
                        dataArray['userId'] = '';
                        dataArray['user_name'] = '';
                      }
                      
                    }else{
                      dataArray['userId'] = '';
                      dataArray['user_name'] = '';
                    }
                    
                    dataArray['title'] = req.title;
                    dataArray['notes'] = req.notes;
                    dataArray['date'] = req.date;
                    dataArray['time'] = req.time;
                    dataArray['status'] = req.status;
                    
                    arr.push(dataArray);
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText);
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
              const promise = leadRemarkOperations.getAllLeadRemark(query)
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
                    if(req.leadId != 'NA'){
                      var leadData = await leadOperations.getLeadById(req.leadId);
                      if(leadData){
                          dataArray['leadId'] = req.leadId;
                          dataArray['lead_name'] = leadData.uid;
                      }else{
                        dataArray['leadId'] = '';
                        dataArray['lead_name'] = '';
                      }
                     
                    }else{
                      dataArray['leadId'] = '';
                      dataArray['lead_name'] = '';
                    }

                    if(req.userId != 'NA'){
                      var userData = await userOperations.getUserById(req.userId);
                      if(userData){
                        dataArray['userId'] = req.userId;
                        dataArray['user_name'] = userData.name;
                      }else{
                        dataArray['userId'] = '';
                        dataArray['user_name'] = '';
                      }
                      
                    }else{
                      dataArray['userId'] = '';
                      dataArray['user_name'] = '';
                    }
                    
                    dataArray['title'] = req.title;
                    dataArray['notes'] = req.notes;
                    dataArray['date'] = req.date;
                    dataArray['time'] = req.time;
                    dataArray['status'] = req.status;

                    arr.push(dataArray);
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText);
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
            }
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};

const getLeadFormNotIntrested = (req, res) => {
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
                 const promise = leadOperations.getLeadById(id)
              promise
              .then((data)=>{
                let convertData = [];
                convertData.push(data);
                data = convertData;
                let arr = [];
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    // console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                    if(req.projectId != 'NA'){
                      // console.log(req.projectId);
                      var projectData = projectOperations.getProjectById(req.projectId);
                      // console.log(projectData);
                      if(projectData){
                          dataArray['projectId'] = req.projectId;
                          dataArray['project_name'] = projectData.project_name;
                      }else{
                        dataArray['projectId'] = '';
                        dataArray['project_name'] = '';
                      }
                     
                    }else{
                      dataArray['projectId'] = '';
                      dataArray['project_name'] = '';
                    }

                    if(req.developerId != 'NA'){
                      var developerData = developerOperations.getDeveloperById(req.developerId);
                      if(developerData){
                        dataArray['developerId'] = req.developerId;
                        dataArray['developer_name'] = developerData.developer_name;
                      }else{
                        dataArray['developerId'] = '';
                        dataArray['developer_name'] = '';
                      }
                      
                    }else{
                      dataArray['developerId'] = '';
                      dataArray['developer_name'] = '';
                    }
                    
                     if(req.projecttypeId != 'NA'){
                      var projectTypeData = propertyTypeOperations.getPropertyTypeById(req.projecttypeId);
                      if(projectTypeData){
                        dataArray['projecttypeId'] = req.projecttypeId;
                        dataArray['projecttype_name'] = projectTypeData.name;
                      }else{
                        dataArray['projecttypeId'] = '';
                        dataArray['projecttype_name'] = '';
                      }
                      
                    }else{
                      dataArray['projecttypeId'] = '';
                      dataArray['projecttype_name'] = '';
                    }

                    if(req.AssignTo != 'NA'){
                      var teamId = req.AssignTo;
                      var teamId = teamId.replace(/["']/g, "");
                      teamId = teamId.split(',');
                      console.log(teamId);
                      var teamData = teamOperations.getMultipleTeam(teamId);
                      if(teamData){
                        dataArray['AssignTo'] = teamData;
                      }else{
                        dataArray['AssignTo'] = '';
                      }
                      
                    }else{
                      dataArray['AssignTo'] = '';
                    }

                     if(req.AssignToUser != 'NA'){
                      if(req.stage == "Pipeline"){
                        var projectDetailsData = await projectDetailOperations.findOneProjectId(req.projectId);
                        var userId = projectDetailsData.AssignToUser;
                        var userId = userId1.replace(/["']/g, "");
                        userId = userId1.split(',');
                      }else{
                        var userId = req.AssignToUser;
                        var userId = userId.replace(/["']/g, "");
                        userId = userId.split(',');
                      }
                      var userData = await userOperations.getMultipleUser(userId);
                      var qurData = {"user": userId, "leadId": req._id.toString()}
                      var leadUserStageData = await leadUserStageOperations.getMultipleUser(qurData);
                      var stageArray = [];
                      leadUserStageData.forEach(element => {
                        var userDataSet = userOperations.getUserById(element.user_id);
                        var oneRow = {
                                          "lead_id": element.lead_id,
                                          "user_id": element.user_id,
                                          "type": element.type,
                                          "user_name": userDataSet.name,
                                          "stage": element.stage
                                      }
                        // console.log(oneRow4);
                        stageArray.push(oneRow); 

                      });
                        dataArray['AssignToUserStage'] = stageArray;
                      if(userData){
                        dataArray['AssignToUser'] = userData;
                      }else{
                        dataArray['AssignToUser'] = '';
                        dataArray['AssignToUserStage'] = '';
                      }
                      
                    }else{
                      dataArray['AssignToUser'] = '';
                      dataArray['AssignToUserStage'] = '';
                    }

                    dataArray['form_name'] = req.form_name;
                    dataArray['formId'] = req.formId;
                    dataArray['leadName'] = req.leadName;
                    dataArray['leadEmail'] = req.leadEmail;
                    dataArray['leadPhone'] = req.leadPhone;
                    dataArray['status'] = req.status;
                    // dataArray['AssignToUser'] = req.AssignToUser;
                    dataArray['source'] = req.source;
                    dataArray['stage'] = req.stage;
                    dataArray['uid'] = req.uid;
                    dataArray['lead_type'] = req.lead_type;
                    if(req.dynamicFields){
                      dataArray['dynamicFields'] = JSON.parse(req.dynamicFields);
                    }


                    // if(req.formId != 'NA'){
                    //   var formData = await formOperations.findFormId(req.formId);
                    //   if(formData){
                    //     dataArray['dynamicFields'] = JSON.parse(formData.dynamicFields);
                    //   }else{
                    //     dataArray['dynamicFields'] = '';
                    //   }
                      
                    // }else{
                    //   dataArray['dynamicFields'] = '';
                    // }
                    
                    arr.push(dataArray);
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText);
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
               let start_date = req.query.start_date
                let end_date = req.query.end_date
                let page = req.query.page
                let limit = req.query.limit
                var skip = limit * page;

                var dt = new Date();
                year  = dt.getFullYear();
                month = (dt.getMonth() + 1).toString().padStart(2, "0");
                day   = dt.getDate().toString().padStart(2, "0");
                var query = {};

                // if(start_date == ''){
                //     start_date = day + '/' + month + '/2022';
                // }
                // if(end_date == ''){
                //     end_date = day + '/' + month + '/' + year;
                // }
                 query = {"start_date": start_date, "end_date": end_date, "limit": Number(limit), "skip": skip, "page": Number(page)};
                 console.log(query);

              const promise = leadOperations.getAllLead(query)
              promise
              .then((data)=>{
                  // console.log(data[0].data)
                  // const {others} = data
                  // if(data.length > 0){
                  //  res.status(200).json({
                  //   data: data,
                  //   success: 1
                  //   }) 

                let arr = [];
                 var arrrr = Promise.all(data[0].data.map(async (element) => {
                    var req = element;
                    console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                    if(req.projectId != 'NA'){
                      // console.log(req.projectId);
                      var projectData = await projectOperations.getProjectById(req.projectId);
                      // console.log(projectData);
                      if(projectData){
                          dataArray['projectId'] = req.projectId;
                          dataArray['project_name'] = projectData.project_name;
                      }else{
                        dataArray['projectId'] = '';
                        dataArray['project_name'] = '';
                      }
                     
                    }else{
                      dataArray['projectId'] = '';
                      dataArray['project_name'] = '';
                    }

                    if(req.developerId != 'NA'){
                      var developerData = await developerOperations.getDeveloperById(req.developerId);
                      if(developerData){
                        dataArray['developerId'] = req.developerId;
                        dataArray['developer_name'] = developerData.developer_name;
                      }else{
                        dataArray['developerId'] = '';
                        dataArray['developer_name'] = '';
                      }
                      
                    }else{
                      dataArray['developerId'] = '';
                      dataArray['developer_name'] = '';
                    }
                    
                     if(req.projecttypeId != 'NA'){
                      var projectTypeData = await propertyTypeOperations.getPropertyTypeById(req.projecttypeId);
                      if(projectTypeData){
                        dataArray['projecttypeId'] = req.projecttypeId;
                        dataArray['projecttype_name'] = projectTypeData.name;
                      }else{
                        dataArray['projecttypeId'] = '';
                        dataArray['projecttype_name'] = '';
                      }
                      
                    }else{
                      dataArray['projecttypeId'] = '';
                      dataArray['projecttype_name'] = '';
                    }

                    if(req.AssignTo != 'NA'){
                      var teamId = req.AssignTo;
                      var teamId = teamId.replace(/["']/g, "");
                      teamId = teamId.split(',');
                      // console.log(teamId);
                      var teamData = await teamOperations.getMultipleTeam(teamId);
                      if(teamData){
                        dataArray['AssignTo'] = teamData;
                      }else{
                        dataArray['AssignTo'] = '';
                      }
                      
                    }else{
                      dataArray['AssignTo'] = '';
                    }

                    if(req.AssignToUser != 'NA'){
                      // var userId =JSON.parse(req.AssignToUser);
                      if(req.stage == "Pipeline"){
                        var projectDetailsData = await projectDetailOperations.findOneProjectId(req.projectId);
                        var userId = projectDetailsData.AssignToUser;
                        var userId = userId.replace(/["']/g, "");
                        userId = userId.split(',');
                      }else{
                        var userId = req.AssignToUser;
                        var userId = userId.replace(/["']/g, "");
                        userId = userId.split(',');
                      }
                      
                      // console.log(userId);
                      var userData = await userOperations.getMultipleUser(userId);
                      var qurData = {"user": userId, "leadId": req._id.toString()}
                      var leadUserStageData = await leadUserStageOperations.getMultipleUser(qurData);
                      var stageArray = [];
                      leadUserStageData.forEach((ele) => {
                        var userDataSet = userOperations.getUserById(ele.user_id);
                        var oneRow = {
                                          "lead_id": ele.lead_id,
                                          "user_id": ele.user_id,
                                          "type": ele.type,
                                          "user_name": userDataSet.name,
                                          "stage": ele.stage
                                      }
                        // console.log(oneRow4);
                        stageArray.push(oneRow); 
                        // console.log(stageArray);

                      });
                        dataArray['AssignToUserStage'] = stageArray;
                      if(userData){
                        dataArray['AssignToUser'] = userData;
                      }else{
                        dataArray['AssignToUser'] = '';
                        dataArray['AssignToUserStage'] = '';
                      }
                      
                    }else{
                      dataArray['AssignToUser'] = '';
                      dataArray['AssignToUserStage'] = '';
                    }

                    dataArray['form_name'] = req.form_name;
                    dataArray['formId'] = req.formId;
                    dataArray['leadName'] = req.leadName;
                    dataArray['leadEmail'] = req.leadEmail;
                    dataArray['leadPhone'] = req.leadPhone;
                    dataArray['status'] = req.status;
                    // dataArray['AssignToUser'] = req.AssignToUser;
                    dataArray['source'] = req.source;
                    dataArray['stage'] = req.stage;
                    dataArray['uid'] = req.uid;
                    dataArray['updatedAt'] = req.updatedAt;
                    dataArray['lead_type'] = req.lead_type;
                    if(req.dynamicFields){
                      dataArray['dynamicFields'] = JSON.parse(req.dynamicFields);
                    }
                    

                    // if(req.formId != 'NA'){
                    //   var formData = await formOperations.findFormId(req.formId);
                    //   if(formData){
                    //     dataArray['dynamicFields'] = JSON.parse(formData[0].dynamicFields);
                    //   }else{
                    //     dataArray['dynamicFields'] = '';
                    //   }
                      
                    // }else{
                    //   dataArray['dynamicFields'] = '';
                    // }
                    arr.push(dataArray);
                    arr.sort(function compare(a, b) {
                      var dateA = new Date(a.updatedAt);
                      var dateB = new Date(b.updatedAt);
                      return dateB - dateA;
                    });
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText);
                    if(responseText.length > 0){
                         res.status(200).json({
                          data: responseText[0],
                          metadata: data[0].metadata,
                          success: 1
                          }) 
                      }else{
                          res.status(200).json({
                          data: [],
                          metadata: [],
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
            }
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
      };
const leadTrasfer = async (req, res) => {
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
    var userId = req.body.user_id;
    var arrayUserId = userId.split(",");
    var leadId = req.body.lead_id;
    var arrayLeadId = leadId.split(",");
    //foreach(arrayLeadId as arrayLead_id){
      arrayLeadId.forEach(async (eleData) => {
        var deleteLead = eleData.replace(/["']/g, "");
        let lead = await leadOperations.getLeadById(deleteLead);
        lead.AssignToUser = JSON.stringify(req.body.user_id);
        await leadOperations.updateLead(lead._id,lead);

        await leadMappingOperations.deleteLeadId(deleteLead);
        var obj = req.body.user_id;
        var obj = obj.replace(/["']/g, "");
        obj = obj.split(',');
        obj.forEach(async (element) => {

              var leadMapping = new LeadMapping(
                deleteLead,
                element,
                "user",
              );

                leadMappingOperations.addLeadMapping(leadMapping);
                let leadUserStage = await leadUserStageOperations.findLeadUserStageByleadIdUserId(deleteLead,element);
                // console.log(leadUserStage);
                if(!leadUserStage){
                  var dataArrayPushStage = [];
                  var oneRow4 = {
                                          "lead_id": deleteLead,
                                          "user_id": element,
                                          "type": "user",
                                          "user_name": "",
                                          "stage": "new",
                                          "status": "1"
                                      }
                  dataArrayPushStage.push(oneRow4); 
                  leadUserStageOperations.addManyLeadUserStage(dataArrayPushStage);
                }
         
          }); 

    });
      return res.status(200).json({ success: 1, message: "Lead Assign Successfully" });
    
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }
};


module.exports = { leadTrasfer,getLeadFormNotIntrested,addLeadRemark,updateLeadRemark,getLeadRemark,getMyLeadForm,getForm,addForm,updateForm,getLeadForm,addLeadForm,updateLeadForm,updateLeadAssignToUser,updateLeadAssignTo,updateLeadStage,addLeadReminder,updateLeadReminder,getLeadReminder }

