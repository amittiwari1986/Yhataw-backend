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
const LeadStatus = require("../dto/leadstatusto");
const leadStatusOperations = require("../services/leadStatusService");
const LeadSource = require("../dto/leadsourceto");
const leadSourceOperations = require("../services/leadSourceService");
const User = require("../dto/userdto");
const userOfficeOperations = require("../services/userOfficeService");
const leadOperations = require("../services/leadService");
const Lead = require("../dto/leadto");
const projectDetailOperations = require("../services/projectDetailsService");
const ProjectDetail = require("../dto/projectdetailsto");

const propertyListOperations = require("../services/propertyListService");
const PropertyList = require("../dto/propertylistto");

const userOperations = require("../services/userService");
const roleOperations = require("../services/roleService");
const jwt = require("jsonwebtoken");
const db  = require('../db/connect');

const projectApiOperations = require("../services/projectApiService");
const ProjectApi = require("../dto/projectapito");

const projectUidMappingOperations = require("../services/projectUidMappingService");
const projectUidMapping = require("../dto/projectuidmappingto");

const bannerOperations = require("../services/bannerService");
const Banner = require("../dto/bannerto");

const LeadLog = require("../dto/leadlogto");
const leadLogOperations = require("../services/leadLogService");

const UserTeamMapping = require("../dto/userteamto");
const userTeamMappingOperations = require("../services/userTeamService");

//User countru
const getCountry = (req, res) => {
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
            const promise = countryOperations.getAllCountry(query)
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
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};

const addCountry = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    const country = new Country(
      req.body.country_name,
      req.body.country_code,
      req.body.currency,
    );
    const promise = countryOperations.addcountry(country);
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

const getState = (req, res) => {
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
                 const promise = stateOperations.findStateId(id)
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
              const promise = stateOperations.getAllState(query)
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

const addState = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

  //   jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
  //     if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
  //     // return res.status(200).send(decoded.id.id);
  //     setdata = decoded.id.id;
  // });
  if(!setdata){
    const state = new State(
      req.body.countryId,
      req.body.state_name,
    );
    const promise = stateOperations.addstate(state);
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

const addCity = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    const city = new City(
      req.body.stateId,
      req.body.city_name,
    );
    const promise = cityOperations.addcity(city);
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


const getCity = (req, res) => {
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
              const promise = cityOperations.findCityId(id)
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
              const promise = cityOperations.getAllCity(query)
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




//User countru
const getDesignation = (req, res) => {
  let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
             let departmentId = req.params.id
            if(departmentId){
              const promise = designationOperations.findOneDepartmentId(departmentId)
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
            }else{
             const query = req.query.new 
            const promise = designationOperations.getAllDesignation(query)
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

const addDesignation = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    const designation = new Designation(
      req.body.departmentId,
      req.body.designation_name,
    );
    const promise = designationOperations.addDesignation(designation);
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

//User countru
const getDepartment = (req, res) => {
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
            const promise = departmentOperations.getAllDepartment(query)
            promise
            .then((data)=>{
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
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};

const addDepartment = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    const department = new Department(
      req.body.department_name,
    );
    const promise = departmentOperations.addDepartment(department);
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
const deleteDepartment = async (req, res) => {
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
            const promise = departmentOperations.delete(id)
            promise
            .then((data)=>{
                console.log(data)
                res.status(200).json({
                    message : "Delete Successfully",
                    success: 1
                })
            })
            .catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "Internal Server Error", success: 0});
            })
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
    };
    const deleteDesignation = async (req, res) => {
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
            const promise = designationOperations.delete(id)
            promise
            .then((data)=>{
                console.log(data)
                res.status(200).json({
                    message : "Delete Successfully",
                    success: 1
                })
            })
            .catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "Internal Server Error", success: 0});
            })
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
    };

//get list department meta data
    const getDepartmentList = async (req, res) => {
        let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        //   if(setdata){
        //     let id = req.params.id

        //     const promise = departmentOperations.getAllDepartment1()
        //     console.log(promise)
        //     promise
        //     .then((data)=>{
              
        //       var finalData = [];
        //       obj = data;
        //       obj.forEach(element => {

        //         var index = 0
        //          obj1.data.push({
        //                 id: element._id,
        //                 department_name: element.department_name,
        //                 designation: []
        //             });
               
        //       }); 
        //       var index1 = 0
        //        obj.forEach(element => {
        //         var designationData = element.designation;
        //         designationData.forEach(ele => {
        //           //var designationData = ele.designationData
        //           if(ele.designation_name){
        //            obj1.data[index1].designation.push(ele.designation_name);
                   
        //           }
                   
        //         });
        //         index1++;
        //       }); 
        //        data = obj1.data;

        //         if(data.length > 0){
        //            res.status(200).json({
        //             data: data,
        //             success: 1
        //             }) 
        //         }else{
        //             res.status(200).json({
        //             data: [],
        //             message: "No Data found",
        //             success: 0
        //             }) 
        //         }
        //     })
        //     .catch((err)=>{
        //         console.log(err.message)
        //         res.status(500).json({message: "Internal Server Error", success: 0});
        //     })
        // }else{
        //     return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        // }
        if(setdata){
            let id = req.params.id

            const promise = departmentOperations.getAllDepartment1()
            console.log(promise)
            promise
            .then((data)=>{
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
                res.status(500).json({message: "Internal Server Error", success: 0});
            })
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
    };

  const getTimezone = (req, res) => {
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
                 const promise = timezoneOperations.findtimezoneId(id)
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
              const promise = timezoneOperations.getAllTimezone(query)
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



const addProperty = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    const country = new PropertyStatus(
      req.body.name,
      req.body.status,
    );
    const promise = propertyUnitTypeOperations.addPropertyUnitType(country);
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
          // res.status(500).json({message: "duplicate "+duplicate+" data", success: 0, error_msg: err.message});
          res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
        }else{
          res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
        }
      });
    }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }
};

const addDeveloper = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  var checkdata = await developerOperations.getDeveloperByName(req.body.developer_name);
  if(checkdata > 0){
   return res.status(400).send({ auth: false, message: 'This developer name all ready exist.', success: 0});
  }
 
  if(setdata){
    const developer = new Developer(
      req.body.developer_name
    );
    const promise = developerOperations.addDeveloper(developer);
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

const getDeveloper = (req, res) => {
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
                 const promise = developerOperations.findDeveloperId(id)
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
              const promise = developerOperations.getAllDeveloper(query)
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

const addProject = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
    var checkdata = await projectOperations.getProjectByName(req.body.project_name);
  if(checkdata > 0){
   return res.status(400).send({ auth: false, message: 'This project name all ready exist.', success: 0});
  }
  var randomNo = Math.floor(Math.random()*90000) + 10000;
  if(setdata){
    const project = new Project(
      req.body.developerId,
      req.body.project_name,
      'PY_' + randomNo
    );
    const promise = projectOperations.addProject(project);
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

const getProject = (req, res) => {
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
                 const promise = projectOperations.findProjectId(id)
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
              const promise = projectOperations.getAllProjectSimple(query, 'all')
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

const getProjectUnMap = (req, res) => {
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
                 const promise = projectApiOperations.findProjectId(id)
              promise
              .then((data)=>{
                  // console.log(data)
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
              const promise = projectApiOperations.getAllProjectSimple(query, 'all')
              promise
              .then((data)=>{
                  // console.log(data)
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

const getDeveloperTree = (req, res) => {
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
              const promise = developerOperations.getAllDeveloper1(id)
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
              const promise = developerOperations.getAllDeveloper1(query)
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

const deleteProject = async (req, res) => {
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
            const promise = projectOperations.delete(id)
            promise
            .then((data)=>{
                console.log(data)
                res.status(200).json({
                    message : "Delete Successfully",
                    success: 1
                })
            })
            .catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "Internal Server Error", success: 0});
            })
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
    };

  const addTeam = async (req, res) => {
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
    var is_remove = 1;
    const team = new Team(
      req.body.team_name,
      status,
      is_remove
    );
    const promise = teamOperations.addTeam(team);
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

const getTeam = (req, res) => {
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
                 const promise = teamOperations.getTeamById(id)
              promise
              .then((data)=>{
                  console.log(data)
                  // const {others} = data
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
              const promise = teamOperations.getAllTeam(query)
              promise
              .then((data)=>{
                  console.log(data)
                  // const {others} = data
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

const getTeamDropDown = (req, res) => {
  let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
              let leadId = req.params.id;
               const query = req.query.new;
              const promise = teamOperations.getAllTeam(query)
              promise
              .then((data)=>{
                  console.log(data)
                  let arr = [];
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    var query = '';
                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                    dataArray['team_name'] = req.team_name;
                    dataArray['status'] = req.status;
                    dataArray['is_remove'] = req.is_remove;
                    if(leadId){
                      var leadData = await leadOperations.getLeadById(leadId);
                      var ss = leadData.AssignTo;
                      ss = ss.split(',');
                    }else{
                      var ss = [];
                    }
                    var dsf = req._id;
                    if(ss.length > 0){
                      var matches = ss.filter(s => s.includes(dsf));
                    }else{
                      var matches = [];
                    }
                    
                    
                    if(matches.length > 0){
                      dataArray['is_available'] = 1;
                    }else{
                      dataArray['is_available'] = 0;
                    }
                    if(req.projectId != 'NA'){
                      var projectData = await userOfficeOperations.getAllTeamDropDown(req._id.toString());
                      if(projectData){
                          dataArray['team_members'] = projectData;
                      }else{
                        dataArray['team_members'] = '';
                      }
                     
                    }else{
                      dataArray['team_members'] = '';
                    }
                    
                    
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
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};

const getTeamDropDownProject = (req, res) => {
  let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
              let projectId = req.params.id;
               const query = req.query.new;
              const promise = teamOperations.getAllTeam(query)
              promise
              .then((data)=>{
                  console.log(data)
                  let arr = [];
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    var query = '';
                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                    dataArray['team_name'] = req.team_name;
                    dataArray['status'] = req.status;
                    dataArray['is_remove'] = req.is_remove;
                    if(projectId){
                      var leadData = await projectDetailOperations.findOneProjectId(projectId);
                      if(leadData){
                        var ss = leadData.AssignTo;
                      }
                      
                      if(ss){
                        ss = ss.split(',');
                      }else{
                        var ss = [];
                      }
                    }else{
                      var ss = [];
                    }
                    var dsf = req._id;
                    if(ss.length > 0){
                      var matches = ss.filter(s => s.includes(dsf));
                    }else{
                      var matches = [];
                    }
                    
                    
                    if(matches.length > 0){
                      dataArray['is_available'] = 1;
                    }else{
                      dataArray['is_available'] = 0;
                    }
                    if(req.projectId != 'NA'){
                      var projectData = await userOfficeOperations.getAllTeamDropDown(req._id.toString());
                      if(projectData){
                          dataArray['team_members'] = projectData;
                      }else{
                        dataArray['team_members'] = '';
                      }
                     
                    }else{
                      dataArray['team_members'] = '';
                    }
                    
                    
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
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};

const getMultipleTeamWiseDropDown = (req, res) => {
  let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
             
               const query = req.body.team_id;
               const leadId = req.body.lead_id;
               const query1 = query;
              const promise = teamOperations.getMultipleTeam(query)
              promise
              .then((data)=>{
                  let arr = [];
                  let arr1 = [];
                  let dataArray1 = {};
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    var query = '';
                    // console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                    dataArray['team_name'] = req.team_name;
                    dataArray['status'] = req.status;
                    dataArray['is_remove'] = req.is_remove;
                    if(req.projectId != 'NA'){
                      var projectData = await userOfficeOperations.getMultipleTeamWiseDropDown(req._id.toString());
                      if(leadId){
                        var leadData = await leadOperations.getLeadById(leadId);
                        // console.log(leadData.AssignToUser);
                        var ss = leadData.AssignToUser;
                        ss = ss.split(',');
                        }else{
                          var ss = [];
                        }
                        // console.log(projectData);
                      if(projectData){
                        let dataArray1 = {};
                        let arr1 = [];
                        projectData.forEach(ele => {
                          let dataArray1 = {};
                          // console.log(ele);
                          var matchId = ele.userId;
                          if(ss.length > 0){
                            var matches = ss.filter(s => s.includes(matchId));
                          }else{
                            var matches = [];
                          }
                          // console.log(matches);
                          dataArray1['_id'] = ele._id;
                          dataArray1['userId'] = ele.userId;
                          if(matches.length > 0){
                            dataArray1['is_available'] = 1;
                          }else{
                            dataArray1['is_available'] = 0;
                          }
                          dataArray1['users'] = ele.users;
                          arr1.push(dataArray1);
                        });
                        // console.log(dataArray1);
                          dataArray['team_members'] = arr1;
                      }else{
                        dataArray['team_members'] = '';
                      }
                     
                    }else{
                      dataArray['team_members'] = '';
                    }
                    
                    
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
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};

const getMultipleTeamWiseDropDownProject = (req, res) => {
  let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
             
               const query = req.body.team_id;
               const projectId = req.body.project_id;
               const query1 = query;
              const promise = teamOperations.getMultipleTeam(query)
              promise
              .then((data)=>{
                  let arr = [];
                  let arr1 = [];
                  let dataArray1 = {};
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    var query = '';
                    // console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                    dataArray['team_name'] = req.team_name;
                    dataArray['status'] = req.status;
                    dataArray['is_remove'] = req.is_remove;
                    if(req.projectId != 'NA'){
                      var projectData = await userOfficeOperations.getMultipleTeamWiseDropDown(req._id.toString());
                      if(projectData){
                        var leadData = await projectDetailOperations.findOneProjectId(projectId);
                        // console.log(leadData.AssignToUser);
                        if(leadData){
                          var ss = leadData.AssignToUser;
                        }
                        
                        if(ss){
                          ss = ss.split(',');
                        }else{
                          var ss = [];
                        }
                        
                        }else{
                          var ss = [];
                        }
                        // console.log(projectData);
                      if(projectData){
                        let dataArray1 = {};
                        let arr1 = [];
                        projectData.forEach(ele => {
                          let dataArray1 = {};
                          // console.log(ele);
                          var matchId = ele.userId;
                          if(ss.length > 0){
                            var matches = ss.filter(s => s.includes(matchId));
                          }else{
                            var matches = [];
                          }
                          // console.log(matches);
                          dataArray1['_id'] = ele._id;
                          dataArray1['userId'] = ele.userId;
                          if(matches.length > 0){
                            dataArray1['is_available'] = 1;
                          }else{
                            dataArray1['is_available'] = 0;
                          }
                          dataArray1['users'] = ele.users;
                          arr1.push(dataArray1);
                        });
                        // console.log(dataArray1);
                          dataArray['team_members'] = arr1;
                      }else{
                        dataArray['team_members'] = '';
                      }
                     
                    }else{
                      dataArray['team_members'] = '';
                    }
                    
                    
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
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};


const updateTeam= async (req, res) => {
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
        let teamDoc = await teamOperations.getTeamById(id);
        // console.log(req.body.info);
        // console.log(JSON.stringify(req.body.info));

        if (!teamDoc) {
          return res.status(400).json({ success: 0, message: "User Document not found" });
        }
        if(req.body.team_name != '' || req.body.team_name != undefined){
          teamDoc.team_name = req.body.team_name;
        }
        if(req.body.status != '' || req.body.status != undefined){
          teamDoc.status = req.body.status;
        }
        if(req.body.is_remove != '' || req.body.is_remove != undefined){
          teamDoc.is_remove = req.body.is_remove;
        }
      
        
        await teamOperations.updateTeam(teamDoc._id,teamDoc);
        return res.status(200).json({ success: 1, message: "Team Updated Successfully" });
      } catch (error) {
        return res.status(400).json({ success: 0, message: "Details not found" });
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};

const getLeadStatus = (req, res) => {
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
            const promise = leadStatusOperations.getAllLeadStatus(query)
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
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};

const addLeadSource = async (req, res) => {
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
    const leadSource = new LeadSource(
      req.body.source_name,
      status,
    );
    const promise = leadSourceOperations.addLeadSource(leadSource);
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

const getLeadSource = (req, res) => {
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
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};

const addLeadStatus = async (req, res) => {
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
    const leadStatus = new LeadStatus(
      req.body.status_name,
      status,
    );
    const promise = leadStatusOperations.addLeadStatus(leadStatus);
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


const getReportingManagerByRoleWise = async (req, res) => {
  let token=req.headers.token;
        let setdata = "";
       
            let id = req.params.id
            const dataset = []
            var userRoleData = await roleOperations.getRoleById(req.body.role_id);
            if(userRoleData.roleId == 2 || userRoleData.roleId == 3 || userRoleData.roleId == 4){
              var userRole = 1;
            }
            // if(userRoleData.roleId == 4){
            //   var userRole = 2;
            // }
            if(userRoleData.roleId == 5){
              var userRole = 4;
            }
            console.log(userRole);
            const promise = userOperations.getAllManager(userRole);
            promise
            .then((data)=>{
                  let arr = [];
                    var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                    dataArray['name'] = req.name;
                    arr.push(dataArray);
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText[0][0]);
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
            }).catch((err)=>{
                res.status(500).json({message: "Data not found", success: 0});
            })
};
const getPropertyList = (req, res) => {
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
            const promise = propertyListOperations.findPropertyListId(id)
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
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};

const addPropertyList = async (req, res) => {
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
    const propertyList = new PropertyList(
      req.body.propertyTypeId,
      req.body.bedroom,
      req.body.bathroom,
      req.body.balcony,
      JSON.stringify(req.body.furnish_type),
      req.body.car_parking,
      JSON.stringify(req.body.utility),
      JSON.stringify(req.body.study),
      JSON.stringify(req.body.pooja),
      status,
    );
    const promise = propertyListOperations.addPropertyList(propertyList);
    promise
      .then((data) => {
        res.status(201).json({
          message: "Save Successfully",
          success: 1,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
        // res.status(500).json(err.message);
        // res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
        // var keys = Object.keys(err.keyPattern);
        // var duplicate = keys[0];
        // if(err.keyPattern){
        //   res.status(500).json({message: "duplicate "+duplicate+" data", success: 0, error_msg: err.message});
        // }else{
        //   res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
        // }
      });
    }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }
};

const updatePropertyList= async (req, res) => {
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
    let id = req.body._id;
      try {
        let propertyListDoc = await propertyListOperations.getPropertyListById(id);
        // console.log(req.body.id);
        // console.log(JSON.stringify(req.body.info));

        if (!propertyListDoc) {
          return res.status(400).json({ success: 0, message: "Property List Document not found" });
        }
        if(req.body.bedroom != '' || req.body.bedroom != undefined){
          propertyListDoc.bedroom = req.body.bedroom;
        }
        if(req.body.bathroom != '' || req.body.bathroom != undefined){
          propertyListDoc.bathroom = req.body.bathroom;
        }
        if(req.body.balcony != '' || req.body.balcony != undefined){
          propertyListDoc.balcony = req.body.balcony;
        }
        if(req.body.furnish_type != '' || req.body.furnish_type != undefined){
          propertyListDoc.furnish_type = JSON.stringify(req.body.furnish_type);
        }
        if(req.body.car_parking != '' || req.body.car_parking != undefined){
          propertyListDoc.car_parking = req.body.car_parking;
        }
        if(req.body.utility != '' || req.body.utility != undefined){
          propertyListDoc.utility = JSON.stringify(req.body.utility);
        }
        if(req.body.study != '' || req.body.study != undefined){
          propertyListDoc.study = JSON.stringify(req.body.study);
        }
        if(req.body.pooja != '' || req.body.pooja != undefined){
          propertyListDoc.pooja = JSON.stringify(req.body.pooja);
        }
        if(req.body.status != '' || req.body.status != undefined){
          propertyListDoc.status = req.body.status;
        }
      
        
        await propertyListOperations.updatePropertyList(propertyListDoc._id,propertyListDoc);
        return res.status(200).json({ success: 1, message: "Property List Updated Successfully" });
      } catch (error) {
        return res.status(400).json({ success: 0, message: "Details not found" });
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};
const updateProject = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
    var checkdata = await projectOperations.getProjectByName(req.body.project_name);
  if(checkdata > 0){
   return res.status(400).send({ auth: false, message: 'This project name all ready exist.', success: 0});
  }
  if(setdata){
    let data;
    let id = req.body._id;
      try {
        let project = await projectOperations.getProjectById(id);
        if (!project) {
          return res.status(400).json({ success: 0, message: "Project name not found" });
        }
        if(req.body.project_name != '' || req.body.project_name != undefined){
          project.project_name = req.body.project_name;
        }
        if(req.body.developerId != '' || req.body.developerId != undefined){
          project.developerId = req.body.developerId;
        }
        
        await projectOperations.updateProject(project._id,project);
        return res.status(200).json({ success: 1, message: "Project name Updated Successfully" });
      } catch (error) {
        res.status(404);
        res.json({ success: 0, message: `an error occured: ${error}` });
      }
    }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }
};
const updateDeveloper = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  var checkdata = await developerOperations.getDeveloperByName(req.body.developer_name);
  if(checkdata > 0){
   return res.status(400).send({ auth: false, message: 'This developer name all ready exist.', success: 0});
  }
 
  if(setdata){
    let data;
    let id = req.body._id;
      try {
        let propertyListDoc = await developerOperations.getDeveloperById(id);
        if (!propertyListDoc) {
          return res.status(400).json({ success: 0, message: "Developer name not found" });
        }
        if(req.body.developer_name != '' || req.body.developer_name != undefined){
          propertyListDoc.developer_name = req.body.developer_name;
        }
        
        await developerOperations.updateDeveloper(propertyListDoc._id,propertyListDoc);
        return res.status(200).json({ success: 1, message: "Developer name Updated Successfully" });
      } catch (error) {
        res.status(404);
        res.json({ success: 0, message: `an error occured: ${error}` });
      }
      }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }
};

const updateDepartment = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    
    let data;
    let id = req.body._id;
      try {
        let propertyListDoc = await departmentOperations.getdepartmentById(id);
        if (!propertyListDoc) {
          return res.status(400).json({ success: 0, message: "Department name not found" });
        }
        if(req.body.department_name != '' || req.body.department_name != undefined){
          propertyListDoc.department_name = req.body.department_name;
        }
        
        await departmentOperations.updateDepartment(propertyListDoc._id,propertyListDoc);
        return res.status(200).json({ success: 1, message: "Department name Updated Successfully" });
      } catch (error) {
        res.status(404);
        res.json({ success: 0, message: `an error occured: ${error}` });
      }
    }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }
};


const updateProjectUid= async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  
  if(!setdata){
    let data;
    let id = req.body.id;
      try {
        var query = "new";
        //await projectOperations.updateProject(project._id,project);
        let teamDoc = await projectOperations.getListProject(query);
        var i = 1;
        teamDoc.forEach(async function(element) {
          var project = await projectOperations.getProjectById(element._id);
          project.project_uid = 'PY_0000' + i;
           projectOperations.updateProject(project._id,project);
          i = Number(i) + 1;
          console.log(i)
        });
        // console.log(req.body.info);
        // console.log(JSON.stringify(req.body.info));

        
        return res.status(200).json({ success: 1, message: "Team Updated Successfully" });
      } catch (error) {
        return res.status(400).json({ success: 0, message: "Details not found" });
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};

const addProjectApiNew = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
    var checkdata = await projectOperations.getProjectByName(req.body.project_name);
  if(checkdata > 0){
   return res.status(400).send({ auth: false, message: 'This project name all ready exist.', success: 0});
  }
  var randomNo = req.body.project_code;
  if(setdata){
    const project = new Project(
      '64ada7528dc0397c823b3269',
      req.body.project_name,
      'HC_' + randomNo
    );
    const promise = projectOperations.addProject(project);
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

const updateProjectApiNew = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  //   var checkdata = await projectApiOperations.getProjectByName(req.body.projectId);
  // if(checkdata > 0){
  //  return res.status(400).send({ auth: false, message: 'This project name all ready exist.', success: 0});
  // }
  if(setdata){
    let data;
    let id = req.body._id;
      try {
        let project = await projectApiOperations.getProjectById(id);
        if (!project) {
          return res.status(400).json({ success: 0, message: "Project name not found" });
        }
        if(req.body.project_id != '' || req.body.project_id != undefined){
          project.project_uid = req.body.project_id;
        }
        project.status = "3";
        await projectApiOperations.updateProject(project._id,project);
        return res.status(200).json({ success: 1, message: "Project name Mapped Successfully" });
      } catch (error) {
        res.status(404);
        res.json({ success: 0, message: `an error occured: ${error}` });
      }
    }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }
};

const addProjectUidMapping = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    const projectUidMappingData = new projectUidMapping(
      req.body.project_id,
      req.body.type,
      req.body.uid,
    );
    const promise = projectUidMappingOperations.addProjectUidMapping(projectUidMappingData);
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

const getProjectUidMapping = (req, res) => {
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
                 const promise = projectUidMappingOperations.findProjectUidMappingProjectId(id)
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
            }
            //  }else{
            //    const query = req.query.new 
            //   const promise = projectUidMappingOperations.findProjectUidMappingProjectId(query)
            //   promise
            //   .then((data)=>{
            //       console.log(data)
            //       const {others} = data
            //       if(data.length > 0){
            //        res.status(200).json({
            //         data: data,
            //         success: 1
            //         }) 
            //     }else{
            //         res.status(200).json({
            //         data: [],
            //         message: "No Data found",
            //         success: 0
            //         }) 
            //     }
            //   })
            //   .catch((err)=>{
            //       // console.log(err.message)
            //       res.status(500).json({message: "Internal Server Error", success: 0, error: err.message});
            //   });
            // }
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};

const addBanner = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
    var status = 1;
  if(setdata){
    const bannerData = new Banner(
      req.body.title,
      req.body.description,
      req.body.image,
      status
    );
    const promise = bannerOperations.addBanner(bannerData);
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

const getBanner = (req, res) => {
  // let token=req.headers.token;
  //       let setdata = "";
  //       if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
  //         jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
  //           if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
  //           // return res.status(200).send(decoded.id.id);
  //           setdata = decoded.id.id;
  //       });
  //       if(setdata){
             // let id = req.params.id
             // if(id){
          var query = "new";
                 const promise = bannerOperations.getAllBanner(query)
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
            // }
        // }else{
        //     return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        // }
};

const getLeadHistory = (req, res) => {
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
              const promise = leadLogOperations.findLeadLogByLeadId(id)
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
             }
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
};


const getTeamUserWise = (req, res) => {
  let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
             let role_id = req.params.id
             var action = 0;
             if(role_id = "652771c1c5d66b4d6ccb0fd8"){
              var action = 0;
             }else if(role_id = "65277225c5d66b4d6ccb0fde"){
              var action = 0;
             }else if(role_id = "6527725cc5d66b4d6ccb0fe4"){
              var action = 1;
             }else if(role_id = "65277273c5d66b4d6ccb0fe7"){
              var action = 1;
             }
             var action = 0;
             if(action == 1){
                 const promise = teamOperations.getTeamById(role_id)
              promise
              .then((data)=>{
                  console.log(data)
                  // const {others} = data
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
              const promise = teamOperations.getAllTeam(query)
              promise
              .then((data)=>{
                  console.log(data)
                  // const {others} = data
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


const getTeamWiseMember = (req, res) => {
  let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
             let team_id = req.params.id
             if(team_id){
                 const promise = userTeamMappingOperations.getAllDataTeamWise(team_id)
              promise
              .then((data)=>{
                  console.log(data)
                  // const {others} = data
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
              const promise = userTeamMappingOperations.getAlldata(query)
              promise
              .then((data)=>{
                  console.log(data)
                  // const {others} = data
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

module.exports = { getTeamWiseMember,getTeamUserWise,getLeadHistory,getBanner,addBanner,addProjectUidMapping,getProjectUidMapping,updateProjectApiNew,addProjectApiNew,getProjectUnMap,updateProjectUid,updateDepartment,updateDeveloper,updateProject,getTeamDropDownProject,getMultipleTeamWiseDropDownProject,getPropertyList,addPropertyList,updatePropertyList,getMultipleTeamWiseDropDown,getReportingManagerByRoleWise,getTeamDropDown,addLeadSource,getLeadSource,addLeadStatus,getLeadStatus,updateTeam,getTeam,addTeam,deleteProject,getDeveloperTree,addProject,getProject,addDeveloper,getDeveloper,addProperty,getTimezone,getDepartmentList,deleteDepartment,deleteDesignation,getCountry,addCountry,getState,addState,getCity,addCity,addDepartment,getDepartment,addDesignation,getDesignation }