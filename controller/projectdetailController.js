const projectDetailOperations = require("../services/projectDetailsService");
const ProjectDetail = require("../dto/projectdetailsto");
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
              const promise = projectDetailOperations.getAllProjectDetail(query)
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

module.exports = { addProjectDetail,updateProjectDetail,getProjectDetail };
