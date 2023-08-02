const UserService = require("../services/userService")
const UserTokenService = require("../services/userTokenService")
const UserBankService = require("../services/userBankService")
const UserLeaveService = require("../services/userLeaveService")
const UserOfficeService = require("../services/userOfficeService")
const UserSalaryDeclarationService = require("../services/userSalaryDeclarationService")
const UserLoanDeclarationService = require("../services/userLoanDeclarationService")
const UserAttendanceService = require("../services/userAttendanceService")
const UserApplyLeaveService = require("../services/userApplyLeaveService")
const organizationService = require("../services/organizationService")
const roleService = require("../services/roleService")
const countryService = require("../services/countryService")
const stateService = require("../services/stateService")
const userTeamService = require("../services/userTeamService")
const jwt = require("jsonwebtoken")
const {verifyTokenAndAuthoreization,verifyTokenAndAdmin,verifyToken,verifyTokenUser} = require("../utils/verifyToken")

const userController = {
    //User Update By Verify Token
    updateUser(req,res){
        let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
            let id  = req.params.id
            let userData = req.body
            const promise = UserService.updateUser(id,userData)
            promise.then((data)=>{
                console.log(data)
                res.status(201).json({
                    message : "Update Successfully",
                    success: 1
                })
            }).catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "Internal Server Error", success: 0});
            })
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
    },
    // Delete User
    deleteUser(req,res){
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
            const promise = UserService.delete(id)
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
    },
    
    // Get all user details User By id
    getallUserByIds(req,res){
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
            const dataset = []
            const promises = [
                    UserService.getUserById(id),
                    UserBankService.findOneUserId(id),
                    UserOfficeService.findOneUserId(id),
                ]

            Promise.all(promises).then((data) => {
                console.log(data);
                var i = 0;
                 data.forEach(function(item) {
                    if(i==0){
                        sd = {personal: item}
                        dataset.push(sd);
                    }
                    if(i==1){
                        sd = {bank: item}
                        dataset.push(sd);
                    }
                    if(i==2){
                        sd = {office: item}
                        dataset.push(sd);
                    }
      
                  i++;
                });

                    res.status(200).json({
                    data: dataset,
                    success: 1
                    })
                });
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
        
    },
    // Get User By id
    getUserByIds(req,res){
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
            const promise = UserService.getUserById(id)
            promise
            .then((data)=>{
                // console.log(data)
                // const {password,...others} = data._doc
                // res.status(200).json({
                //     data: others,
                //     success: 1
                // })

            if(data){
                 let convertData = [];
                convertData.push(data);
                data = convertData;
                  let arr = [];
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    // console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                    // if(req.role_id != 'NA'){
                    //   var roleData = await roleService.getRoleById(req.role_id);
                    //   dataArray['role_id'] = req.role_id;
                    //   dataArray['role_name'] = roleData.role_name;
                    // }else{
                    //   dataArray['role_id'] = '';
                    //   dataArray['role_name'] = '';
                    // }
                    dataArray['name'] = req.name;
                    dataArray['userRole'] = req.userRole;
                    dataArray['phone'] = req.phone;
                    dataArray['whatsapp'] = req.whatsapp;
                    dataArray['email'] = req.email;
                    dataArray['logintime'] = req.logintime;
                    dataArray['dob'] = req.dob;
                    dataArray['martial_status'] = req.martial_status;
                    dataArray['gender'] = req.gender;
                    dataArray['address1'] = req.address1;
                    dataArray['address2'] = req.address2;
                    dataArray['city'] = req.city;


                    if(req.country_id != 'NA'){
                      var countryData = await countryService.getcountryById(req.country_id);
                      dataArray['country_id'] = req.country_id;
                      dataArray['country_name'] = countryData.country_name;
                    }else{
                      dataArray['country_id'] = '';
                      dataArray['country_name'] = '';
                    }
                    if(req.state_id != 'NA'){
                      var stateData = await stateService.getstateById(req.state_id);
                      dataArray['state_id'] = req.state_id;
                      dataArray['state_name'] = stateData.state_name;
                    }else{
                      dataArray['state_id'] = '';
                      dataArray['state_name'] = '';
                    }

                    dataArray['zipcode'] = req.zipcode;
                    dataArray['doj'] = req.doj;
                    dataArray['employee_id'] = req.employee_id;
                    dataArray['profile_image'] = req.profile_image;
                    dataArray['status'] = req.status;
                    dataArray['in_complete'] = req.in_complete;
                    dataArray['time_zone'] = req.time_zone;
                    dataArray['createdAt'] = req.createdAt;
                    
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
            }else{
                res.status(200).json({message: "Internal Server Error", success: 0});
            }
            })
            .catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "Internal Server Error", success: 0});
            })
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
    },
    // fetch All Users
    fetchAllUser(req,res){
        let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
          console.log(setdata);
        if(setdata){
            const query = req.query.new 
            const promise = UserService.getAllUsers(setdata);
            promise.then((data)=>{
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
                
                console.log(data)
            }).catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "Internal Server Error", success: 0});
            })
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
    },

    // Get User Bank By userid
    getUserBankByIds(req,res){
        let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
            let userId = req.params.id
            const promise = UserBankService.findOneUserId(userId)
            promise
            .then((data)=>{
                // console.log(data)
                const {others} = data._doc
                res.status(200).json({
                    data: data,
                    success: 1
                    }) 
                // if(data.length > 0){
                //    res.status(200).json({
                //     data: data,
                //     success: 1
                //     }) 
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
                res.status(500).json({message: "Data not found", success: 0});
            })
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
    },

    // Get User leave By userid
    getUserLeaveByIds(req,res){
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
            const promise = UserLeaveService.findOneUserId(id)
            promise
            .then((data)=>{
                console.log(data)
                // const {others} = data._doc

                  let convertData = [];
                    convertData.push(data);
                    data = convertData;
                  let arr = [];
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;

                    var dataArray = {};
                    dataArray['_id'] = req._id;
                    dataArray['total_leave'] = req.total_leave; 
                    dataArray['earned_leave'] = req.earned_leave; 
                    dataArray['sick_leave'] = req.sick_leave; 
                    dataArray['casual_leave'] = req.casual_leave;  
                    dataArray['total_leave_available'] = req.total_leave_available; 
                    dataArray['earned_leave_available'] = req.earned_leave_available;
                    dataArray['sick_leave_available'] = req.sick_leave_available; 
                    dataArray['casual_leave_available'] = req.casual_leave_available; 
                    dataArray['createdAt'] = req.createdAt;
                    dataArray['updatedAt'] = req.updatedAt;    

                    if(req.userId){
                      var userData = await UserService.getUserById(req.userId);
                      dataArray['userId'] = req.userId;
                      dataArray['user_name'] = userData.name;
                    }

                     arr.push(dataArray);
                    return arr;

                 })).then((responseText) => {
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
                // res.status(200).json({
                //     data: data,
                //     success: 1
                //     }) 
            })
            .catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "Data not found", success: 0});
            })
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
    },

    // Get User office By userid
    getUserOfficeByIds(req,res){
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
            const promise = UserOfficeService.findOneUserId(id)
            promise
            .then((data)=>{
                // console.log(data)
                if(data){
                 let convertData = [];
                convertData.push(data);
                data = convertData;
                  let arr = [];
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req._id; 
                    if(req.role_id != 'NA'){
                      var roleData = await roleService.getRoleById(req.role_id);
                      dataArray['role_id'] = req.role_id;
                      dataArray['role_name'] = roleData.role_name;
                    }else{
                      dataArray['role_id'] = '';
                      dataArray['role_name'] = '';
                    }
                    dataArray['emp_type'] = req.emp_type;
                    dataArray['department'] = req.department;
                    dataArray['designation'] = req.designation;
                    dataArray['joining'] = req.joining;
                    dataArray['working_days'] = req.working_days;
                    dataArray['working_shift'] = req.working_shift;
                    dataArray['createdAt'] = req.createdAt;
                    
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
              }else{
                res.status(200).json({message: "Data not found", success: 0});
              }
                
            })
            .catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "Data not found", success: 0});
            })
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
    },
    // Get User salary By userid
    getUserSalaryDeclarationByIds(req,res){
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
            const promise = UserSalaryDeclarationService.findOneUserId(id)
            promise
            .then((data)=>{
                // console.log(data)
                const {others} = data._doc
                res.status(200).json({
                    data: data,
                    success: 1
                    }) 
               // if(data.length > 0){
               //     res.status(200).json({
               //      data: data,
               //      success: 1
               //      }) 
               //  }else{
               //      res.status(200).json({
               //      data: [],
               //      message: "No Data found",
               //      success: 0
               //      }) 
               //  }
                
            })
            .catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "Data not found", success: 0});
            })
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
    },
    // Get User Loan By userid
    getUserLoanDeclarationByIds(req,res){
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
            const promise = UserLoanDeclarationService.findOneUserId(id)
            promise
            .then((data)=>{
                // console.log(data)
                const {others} = data._doc
                res.status(200).json({
                    data: data,
                    success: 1
                    }) 
                // if(data.length > 0){
                //    res.status(200).json({
                //     data: data,
                //     success: 1
                //     }) 
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
                res.status(500).json({message: "Data not found", success: 0});
            })
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
    },
    // Get User Loan By userid
    getUserAttendanceByIds(req,res){
        let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
            let id = req.query.id
            let start_date = req.query.start_date
            let end_date = req.query.end_date

            var dt = new Date();
            year  = dt.getFullYear();
            month = (dt.getMonth() + 1).toString().padStart(2, "0");
            day   = dt.getDate().toString().padStart(2, "0");
            var query = {};
            if(id != ''){
                if(start_date == ''){
                    start_date = '01/' + month + '/' + year;
                }
                if(end_date == ''){
                    end_date = '31/' + month + '/' + year;
                }
                 query = {"userId":id,"start_date": start_date, "end_date": end_date};
            }else{

                if(start_date == ''){
                    start_date = day + '/' + month + '/' + year;
                }
                if(end_date == ''){
                    end_date = day + '/' + month + '/' + year;
                }
                 query = {"userId":"","start_date": start_date, "end_date": end_date};
                 console.log(query);
            }

            if(id == undefined){
                if(start_date == '' || start_date == undefined){
                    start_date = day + '/' + month + '/' + year;
                }
                if(end_date == '' || end_date == undefined){
                    end_date = day + '/' + month + '/' + year;
                }
                 query = {"userId":"","start_date": start_date, "end_date": end_date};
                 console.log(query);
            }
                
             
                const promise = UserAttendanceService.getAllAttendance(query)
                promise
                .then((data)=>{
                    // console.log(data)
                    // const {password,...others} = data._doc
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
    },
    getUserApplyLeaveByIds(req,res){
        let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
            let userId = req.params.id
           
                if(userId){
                    // console.log(userId)
                const promise = UserApplyLeaveService.findUserApplyLeaveId(userId)
                    promise
                    .then((data)=>{
                        // console.log(data)

                  let arr = [];
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;


                    var dataArray = {};
                    dataArray['_id'] = req._id;
                    dataArray['leave_type'] = req.leave_type; 
                    dataArray['from_date'] = req.from_date; 
                    dataArray['to_date'] = req.to_date; 
                    dataArray['comments'] = req.comments;  
                    dataArray['total_days'] = req.total_days; 
                    dataArray['is_status'] = req.is_status;
                    dataArray['createdAt'] = req.createdAt;
                    dataArray['updatedAt'] = req.updatedAt;    

                    if(req.userId){
                      var userData = await UserService.getUserById(req.userId);
                      dataArray['userId'] = req.userId;
                      dataArray['user_name'] = userData.name;
                    }

                     arr.push(dataArray);
                    return arr;

                 })).then((responseText) => {
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
                    res.status(500).json({message: "No Data found", success: 0});
                })
                }else{
                    const query = req.query.new 
                const promise = UserApplyLeaveService.getAllUserApplyLeave(query)
                    promise
                    .then((data)=>{
                        console.log(data)


                    // let convertData = [];
                    // convertData.push(data);
                    // data = convertData;
                  let arr = [];
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;

                    var dataArray = {};
                    dataArray['_id'] = req._id;
                    dataArray['leave_type'] = req.leave_type; 
                    dataArray['from_date'] = req.from_date; 
                    dataArray['to_date'] = req.to_date; 
                    dataArray['comments'] = req.comments;  
                    dataArray['total_days'] = req.total_days; 
                    dataArray['is_status'] = req.is_status;
                    dataArray['createdAt'] = req.createdAt;
                    dataArray['updatedAt'] = req.updatedAt;    

                    if(req.userId){
                      var userData = await UserService.getUserById(req.userId);
                      dataArray['userId'] = req.userId;
                      dataArray['user_name'] = userData.name;
                    }

                     arr.push(dataArray);
                    return arr;

                 })).then((responseText) => {
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
                 })
            .catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "No Data found", success: 0});
            })

                }
                
                // if(data.length > 0){
                //    res.status(200).json({
                //     data: data,
                //     success: 1
                //     }) 
                // }else{
                //     res.status(200).json({
                //     data: [],
                //     message: "No Data found",
                //     success: 0
                //     }) 
                // }
                
            
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
    },
    getOrganizationByIds(req,res){
        let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
        });
        if(setdata){
            // let orgId = req.params.id
            const promise = organizationService.findOneUserId(setdata)
            promise
            .then((data)=>{
                console.log(data)
                // const {others} = data._doc
                res.status(200).json({
                    data: data,
                    success: 1
                    }) 
                // if(data.length > 0){
                //    res.status(200).json({
                //     data: data,
                //     success: 1
                //     }) 
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
                res.status(500).json({message: "Data not found", success: 0});
            })
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
    },
     getAllSalesHead(req,res){
        let token=req.headers.token;
        let setdata = "";
        // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
        //   jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
        //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
        //     // return res.status(200).send(decoded.id.id);
        //     setdata = decoded.id.id;
        // });
        // if(setdata){
            let id = req.params.id
            const dataset = []
            var userRole = 1;
            const promise = UserService.getAllSalesHead(userRole);
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
        
    },
    getAllSalesHead(req,res){
        let token=req.headers.token;
        let setdata = "";
       
            let id = req.params.id
            const dataset = []
            var userRole = req.params.id;
            const promise = UserService.getAllSalesHead(userRole);
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
        
    },
    getAllManagerByTeamWise(req,res){
        let token=req.headers.token;
        let setdata = "";
            const dataset = []
            let teamId = req.params.id;
            const promise = UserOfficeService.getAllManagerByTeamWise(teamId);
            promise
            .then((data)=>{
                  let arr = [];
                    var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    var userData = await UserService.getUserById(req.userId);
                      if(userData.userRole == 5){
                        var dataArray = {};
                        dataArray['id'] = req.userId;
                        dataArray['user_name'] = userData.name;
                        arr.push(dataArray);
                      }
                    
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
        
    }

}

module.exports = userController