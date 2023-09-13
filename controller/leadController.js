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
const From = require("../dto/formto");
const formOperations = require("../services/formService");
const Team = require("../dto/teamto");
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
              const promise = formOperations.getAllForm(query)
              promise
              .then((data)=>{
                  // console.log(data)
                  const {others} = data
                  if(data.length > 0){
                   res.status(200).json({
                    data: data,
                    success: 1
                    }) 

                  //  let convertData = [];
                // convertData.push(data);
                // data = convertData;
                //   let arr = [];
                //  var arrrr = Promise.all(data.map(async (element) => {
                //     var req = element[0];
                //     // console.log(req);
                //     var dataArray = {};
                //     dataArray['_id'] = req._id; 
                //     if(req.projectId != 'NA'){
                //       // console.log(req.projectId);
                //       var projectData = await projectOperations.getProjectById(req.projectId);
                //       // console.log(projectData);
                //       if(projectData){
                //           dataArray['projectId'] = req.projectId;
                //           dataArray['project_name'] = projectData.project_name;
                //       }else{
                //         dataArray['projectId'] = '';
                //         dataArray['project_name'] = '';
                //       }
                     
                //     }else{
                //       dataArray['projectId'] = '';
                //       dataArray['project_name'] = '';
                //     }

                //     if(req.developerId != 'NA'){
                //       var developerData = await developerOperations.getDeveloperById(req.developerId);
                //       if(developerData){
                //         dataArray['developerId'] = req.developerId;
                //         dataArray['developer_name'] = developerData.developer_name;
                //       }else{
                //         dataArray['developerId'] = '';
                //         dataArray['developer_name'] = '';
                //       }
                      
                //     }else{
                //       dataArray['developerId'] = '';
                //       dataArray['developer_name'] = '';
                //     }
                    
                //      if(req.projecttypeId != 'NA'){
                //       var projectTypeData = await propertyTypeOperations.getPropertyTypeById(req.projecttypeId);
                //       if(projectTypeData){
                //         dataArray['projecttypeId'] = req.projecttypeId;
                //         dataArray['projecttype_name'] = projectTypeData.name;
                //       }else{
                //         dataArray['projecttypeId'] = '';
                //         dataArray['projecttype_name'] = '';
                //       }
                      
                //     }else{
                //       dataArray['projecttypeId'] = '';
                //       dataArray['projecttype_name'] = '';
                //     }

                //     dataArray['form_name'] = req.form_name;
                //     dataArray['leadName'] = req.leadName;
                //     dataArray['leadEmail'] = req.leadEmail;
                //     dataArray['leadPhone'] = req.leadPhone;
                //     dataArray['dynamicFields'] = req.dynamicFields;
                //     // dataArray['status'] = req.status;
                    
                //     arr.push(dataArray);
                //     return arr;
                   
                //     }
                //   )
                // ).then((responseText) => {
                //   // console.log(responseText);
                //     if(responseText.length > 0){
                //          res.status(200).json({
                //           data: responseText[0][0],
                //           success: 1
                //           }) 
                //       }else{
                //           res.status(200).json({
                //           data: [],
                //           message: "No Data found",
                //           success: 0
                //         }) 
                //       }
                //   });

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



module.exports = { getForm,addForm,updateForm }