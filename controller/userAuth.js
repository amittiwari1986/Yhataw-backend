const userOperations = require("../services/userService");
const userOfficeOperations = require("../services/userOfficeService");
const userBankOperations = require("../services/userBankService");
const userLeaveOperations = require("../services/userLeaveService");
const userApplyLeaveOperations = require("../services/userApplyLeaveService");
const userSalaryDeclarationOperations = require("../services/userSalaryDeclarationService");
const userLoanDeclarationOperations = require("../services/userLoanDeclarationService");
const userAttendanceOperations = require("../services/userAttendanceService");
const organizationOperations = require("../services/organizationService");
const userSalaryOperations = require("../services/userSalaryService");
const roleOperations = require("../services/roleService");
const userTeamOperations = require("../services/userTeamService");
const userTokens = require("../services/userTokenService");
const userDocumentOperations = require("../services/userDocumentService");
const User = require("../dto/userdto");
const UserToken = require("../dto/usertokendto");
const UserOffice = require("../dto/userofficeto");
const UserBank = require("../dto/userbankto");
const UserApplyLeave = require("../dto/userapplyleaveto");
const UserLeave = require("../dto/userleaveto");
const UserSalaryDeclaration = require("../dto/usersalarydeclarationto");
const UserLoanDeclaration = require("../dto/userloandeclarationto");
const UserAttendance = require("../dto/userattendanceto");
const Organization = require("../dto/organizationto");
const UserDocument = require("../dto/userdocumentto");
const UserSalary = require("../dto/usersalaryto");
const Role = require("../dto/roleto");
const UserTeam = require("../dto/userteamto");
const bcrypt = require("../utils/encrypt");
const token = require("../utils/token");
const otpGenerator = require('otp-generator');
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const LeadUserStage = require("../dto/leaduserstageto");
const leadUserStageOperations = require("../services/leadUserStageService");
const Project = require("../dto/projectto");
const projectOperations = require("../services/projectService");
const projectDetails = require("../dto/projectdetailsto");
const projectDetailsOperations = require("../services/projectDetailsService");

const {
  PHONE_NOT_FOUND_ERR,

  PHONE_ALREADY_EXISTS_ERR,
  USER_NOT_FOUND_ERR,
  INCORRECT_OTP_ERR,
  ACCESS_DENIED_ERR,
} = require("../messages/errors");

//User Registration
const register = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){

    let empIdCheck = await userOperations.checkEmpId(req.body.employee_id);
    if(empIdCheck){
      return res.status(400).json({message: "duplicate data Please check Employee Id", success: 0});
    }

    let nameCheck = await userOperations.checkName(req.body.name);
    if(nameCheck){
      return res.status(400).json({message: "duplicate data Please check name", success: 0});
    }

    let emailCheck = await userOperations.login(req.body.email);
    if(emailCheck){
      return res.status(400).json({message: "duplicate data Please check email", success: 0});
    }

    let phoneCheck = await userOperations.loginWithMobile(req.body.phone);
    if(phoneCheck){
      return res.status(400).json({message: "duplicate data Please check phone", success: 0});
    }
    
    var dt = new Date();
    year  = dt.getFullYear();
    month = (dt.getMonth() + 1).toString().padStart(2, "0");
    day   = dt.getDate().toString().padStart(2, "0");
    var date = day +'/' + month + '/' + year;

    let role = 6;
    let hashPassword = bcrypt.doEncrypt(req.body.password);
    let role_id = "64ca0c1d186d6338aaed3118";
    let status = 1;
    let inComplete = 0;
    let email = req.body.email.toLowerCase();
    const user = new User(
      req.body.name,
      hashPassword,
      role,
      req.body.phone,
      email,
      req.body.phoneOtp,
      req.body.whatsapp,
      req.body.dob,
      req.body.martial_status,
      req.body.gender,
      req.body.address1,
      req.body.address2,
      req.body.country_id,
      req.body.state_id,
      req.body.city,
      req.body.zipcode,
      req.body.doj,
      req.body.employee_id,
      status,
      req.body.profile_image,
      inComplete,
      role_id,
      date,
      req.body.phoneCountryCode,
      req.body.whatsappCountryCode,
      ''
    );


    const promise = userOperations.addUser(user); 
    promise
      .then((data) => {
       return res.status(201).json({
          message: "Registration Successfully",
          success: 1,
          data: data,
        });
      })
      .catch((err) => {
      return  res.status(400).json({message: err.message, success: 0, error_msg: err.message});
        //res.status(500).json(err.message);
        // var tset = for (var key in err.keyPattern) { var t = key}
        // console.log(err.keyPattern);
        // var keys = Object.keys(err.keyPattern);
        // var duplicate = keys[0];
        // if(err.keyPattern){
        //   res.status(500).json({message: "duplicate "+duplicate+" data", success: 0, error_msg: err.message});
        // }else{
        //   let isnum = err.message.includes("@");
        // if(isnum == false){
        //         res.status(500).json({message: "duplicate data Please check phone", success: 0, error_msg: err.message});
        //       }else{
        //         res.status(500).json({message: "duplicate data Please check email", success: 0, error_msg: err.message});
        //       }
        //   // res.status(500).json({message: "duplicate data Please check email/phone/username", success: 0});
        //     }
        });
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }
};

const addUserOffice = async (req, res) => {
  let id = req.body.userId;
  console.log(req.body);

     // console.log(id);
     // return res.status(401).send({ auth: false, message: 'No token pffghgrovided.', success: 0});
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
    if(setdata){
    
      let roledata = req.body.role_id;
      let getrole = await roleOperations.getRoleById(roledata);

      // if(getrole.length>0){
        let id = req.body.userId;
        if(req.body.team_id){
          teamId = req.body.team_id;
          team_name = req.body.team_name;
        }else{
          teamId = 'NA';
          team_name = '';
        }
        let user = await userOperations.getUserById(id);
        // console.log(user);
        user.userRole = getrole.roleId;
        user.role_id = req.body.role_id;
        user.team_id = teamId;
        user.team_name = team_name;
       await userOperations.updateUser(user._id,user);
      // }

       if(getrole.roleId == 5 || getrole.roleId == 6){
        const userTeam = new UserTeam(
              req.body.team_id,
              req.body.userId,
              req.body.role_id,
            );
        await userTeamOperations.addUserTeam(userTeam);
       }

      

    const promise = userOperations.getUserById(id);
    promise
      .then((data) => {
        // console.log(data);
        if(req.body.reporting_manager){
          rManger = req.body.reporting_manager;
        }else{
          rManger = 'NA';
        }
        if(req.body.team_id){
          teamId = req.body.team_id;
          team_name = req.body.team_name;
        }else{
          teamId = 'NA';
          team_name = '';
        }
        if(data){
          const userOffice = new UserOffice(
              req.body.userId,
              req.body.emp_type,
              req.body.department,
              req.body.designation,
              req.body.joining,
              req.body.working_days,
              req.body.working_shift,
              rManger,
              req.body.role_id,
              teamId,
              '',
              team_name
            );


            const promise = userOfficeOperations.addUserOffice(userOffice);
            promise
              .then((data) => {
                res.status(201).json({
                  message: "Save Successfully",
                  success: 1,
                  data: data,
                });
              })
              .catch((err) => {
                res.status(400).json({message: err.message, success: 0, error_msg: err.message});
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
                    return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
                }
        
      })
      .catch((err) => {
          res.status(500).json({message: "Please check userId", success: 0, error_msg: err.message});
      });
    }
  };
    


const addUserBank = (req, res) => {
  let id = req.body.userId;
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    const promise = userOperations.getUserById(id);
    promise
      .then((data) => {
        // console.log(data);
        if(data){
          const userBank = new UserBank(
            req.body.userId,
            req.body.bank_name,
            req.body.branch_name,
            req.body.holder_name,
            req.body.account_no,
            req.body.ifsc,
          );
          const promise = userBankOperations.addUserBank(userBank);
          promise
            .then((data) => {
              res.status(201).json({
                message: "Save Successfully",
                success: 1,
                data: data,
              });
            })
            .catch((err) => {
              res.status(400).json({message: err.message, success: 0, error_msg: err.message});
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
                return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
            }
        
      })
      .catch((err) => {
          res.status(500).json({message: "Please check userId", success: 0, error_msg: err.message});
      });
    }
  };
    

const addUserLeave = (req, res) => {
  let id = req.body.userId;
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    const promise = userOperations.getUserById(id);
    promise
      .then((data) => {
        // console.log(data);
        if(data){
          var total_leave_available = req.body.total_leave;
          var earned_leave_available = req.body.earned_leave;
          var sick_leave_available = req.body.sick_leave;
          var casual_leave_available = req.body.casual_leave;
          const userLeave = new UserLeave(
            req.body.userId,
            req.body.total_leave,
            req.body.earned_leave,
            req.body.sick_leave,
            req.body.casual_leave,
            total_leave_available,
            earned_leave_available,
            sick_leave_available,
            casual_leave_available,
          );
          const promise = userLeaveOperations.addUserLeave(userLeave);
          promise
            .then((data) => {
              res.status(201).json({
                message: "Save Successfully",
                success: 1,
                data: data,
              });
            })
            .catch((err) => {
              res.status(400).json({message: err.message, success: 0, error_msg: err.message});
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
                return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
            }
        
      })
      .catch((err) => {
          res.status(500).json({message: "Please check userId", success: 0, error_msg: err.message});
      });
    }
  };

const addUserSalary = async (req, res) => {
  let id = req.body.userId;
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    let user = await userOperations.getUserById(id);
        user.in_complete = "1";
         await userOperations.updateUser(user._id,user);

         var dt = new Date();
           year  = dt.getFullYear();
            month = (dt.getMonth() + 1).toString().padStart(2, "0");
            day   = dt.getDate().toString().padStart(2, "0");
         

          var day1 = '';
          var datetime = '00:00';

        for (var i = 1; i < 31; i++) {
          if(i == 1){
             day1 = '01/' + month + '/' + year;
          }else if(i == 2){
             day1 = '02/' + month + '/' + year;
          }else if(i == 3){
             day1 = '03/' + month + '/' + year;
          }else if(i == 4){
             day1 = '04/' + month + '/' + year;
          }else if(i == 5){
             day1 = '05/' + month + '/' + year;
          }else if(i == 6){
             day1 = '06/' + month + '/' + year;
          }else if(i == 7){
             day1 = '07/' + month + '/' + year;
          }else if(i == 8){
             day1 = '08/' + month + '/' + year;
          }else if(i == 9){
             day1 = '09/' + month + '/' + year;
          }else{
             day1 = i + '/' + month + '/' + year;
          }
        
          const userAttendance = new UserAttendance(
            req.body.userId,
            month,
            day1,
            datetime,
            datetime,
            datetime,
            '',
            '',
            '',
            0,
          );
          
          await userAttendanceOperations.addUserAttendance(userAttendance);
        }

    const promise = userOperations.getUserById(id);
    promise
      .then((data) => {
        console.log(data);
        if(data){

        const userSalaryDeclaration = new UserSalaryDeclaration(
          req.body.userId,
          req.body.EPF_opt,
          req.body.ESI_opt,
          req.body.EPF_no,
          req.body.ESI_no,
          req.body.basic,
          req.body.HRA,
          req.body.medical_allowance,
          req.body.conbeyance_allowance,
          req.body.special_allowance,
          req.body.others,
          req.body.i_tax,
        );
        const promise = userSalaryDeclarationOperations.addUserSalaryDeclaration(userSalaryDeclaration);
        promise
          .then((data) => {
            

            res.status(201).json({
              message: "Save Successfully",
              data: data,
              success: 1,
            });
          })
          .catch((err) => {
            res.status(400).json({message: err.message, success: 0, error_msg: err.message});
            // res.status(500).json(err.message);
            // var keys = Object.keys(err.keyPattern);
            // var duplicate = keys[0];
            // if(err.keyPattern){
            //   res.status(500).json({message: "duplicate "+duplicate+" data", success: 0, error_msg: err.message});
            // }else{
            //   res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
            // }
          });
        }else{
              return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
          }
        
      })
      .catch((err) => {
          res.status(500).json({message: "Please check userId", success: 0, error_msg: err.message});
      });
    }
  };

const addUserLoan = (req, res) => {
  let id = req.body.userId;
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    const promise = userOperations.getUserById(id);
    promise
      .then((data) => {
        // console.log(data);
        if(data){
          const userLoanDeclaration = new UserLoanDeclaration(
            req.body.userId,
            req.body.loan_acc,
            req.body.loan_amt,
            req.body.loan_emi,
            req.body.start_from,
            req.body.updated_amt,
            req.body.status,
          );
          const promise = userLoanDeclarationOperations.addUserLoanDeclaration(userLoanDeclaration);
          promise
            .then((data) => {
              res.status(201).json({
                message: "Save Successfully",
                success: 1,
                data: data,
              });
            })
            .catch((err) => {
              res.status(400).json({message: err.message, success: 0, error_msg: err.message});
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
                return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
            }
        
      })
      .catch((err) => {
          res.status(500).json({message: "Please check userId", success: 0, error_msg: err.message});
      });
    }
  };
//User Login With JWT and Encrypt Password
const loginUser = async (req, res) => {
  let data;
  let uname = req.body.username;
  let isnum = uname.includes("@");
  // console.log(isnum);

  if(isnum == false){

    let phone = req.body.username;
    var user = await userOperations.loginWithMobile(phone);

    if (!user) {
      data = {
        data: undefined,
        settings: {
          success: 0,
          message: `User not found!`,
        },
      };
      return res.status(400).json({ message: data });
    }
    // const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false, alphabets: false });
    // // save otp to user collection
    // const otp = Math.floor(100000 + Math.random() * 900000);
    // user.phoneOtp = otp;

    // data = {
    //       userId: user._id,
    //       data: [],
    //       settings: {
    //         success: 1,
    //         message: `OTP sended to your registered phone number. otp is ${otp}`,
    //       },
    //     };
    
    // res.status(200).json({ message: data });
    // // // user.isAccountVerified = true;
    // await userOperations.updateUser(user._id,user);

  } else {

    let email = req.body.username;
    
    var user = await userOperations.login(email);
    
    // let tokens = await userTokens.checkToken(user._id);
    if (user) {
      let password = req.body.password;
      if (!password) {
        data = {
          data: email,
          settings: {
            success: 1,
            message: `Email Found`,
          },
        };
        return res.status(200).json({ message: data });
      }
    }
  }
  let role = "";
    if (user) {
      let password = req.body.password;
      let pass = bcrypt.compare(password, user.password);
      if (pass) {
        const { password, ...others } = user._doc;
        const accessToken = token.createToken({
          id: user._id,
          isAdmin: user.isAdmin,
        });
        // if(!tokens){
        //     const userT = new UserToken(
        //       user._id,
        //       accessToken
        //     );
        //     const promise = userTokens.addUserToken(userT);
        //   }
        // console.log(user);
        if(user.userRole == 1){
           role = "Admin";
        }else if(user.userRole == 2){
           role = "Hr";
        }else if(user.userRole == 3){
          role = "User";
        }else{
          role = "Executive";
        }
        // console.log(user)
        const userRole = await roleOperations.getRoleById(user.role_id);
        // console.log(userRole);
        user = {
          _id: user._id,
          accessToken,
          fullName: user.name,
          email: user.email,
          role: role,
          lastUpdate: new Date(),
          name: user.name,
          role_privileges: JSON.parse(userRole.info),
        };
        data = {
          data: { user },
          settings: {
            success: 1,
            message: `Welcome ${user && user.name}`,
          },
        };
      } else {
        data = {
          data: undefined,
          settings: {
            success: 0,
            message: `Password Not Match`,
          },
        };
      }
    } else {
      data = {
        data: undefined,
        settings: {
          success: 0,
          message: `User not found!`,
        },
      };
    }
    return res.status(200).json({ message: data });
  //}
  
};
//User Login With Mobile JWT and Encrypt Password
const loginWithPhone = async (req, res) => {
  let data;

    try {
      const { otp, userId } = req.body;
      const user = await userOperations.getUserById(userId);
      // console.log(user);
      if (!user) {
        return res.status(400).json({ message: "User not found",success: 0});
      }

      if (user.phoneOtp !== otp) {
        return res.status(400).json({ message: "Please check OTP and enter again" ,success: 0 });
      }
      const accessToken = token.createToken({
        id: user._id,
        isAdmin: false,
      });
      // console.log(accessToken);
      res.status(200).json({
        data: {
        _id: user._id,
        accessToken,
        fullName: user.name,
        email: user.email,
        role: "Admin",
        lastUpdate: new Date(),
        name: user.name,
        },
        settings: {
          success: 1,
          message: `OTP verified successfully`,
        }
      });

    } catch (error) {
      return res.status(400).json({ success: 1, message: "User not found" });
    }

};

const updateUser = async (req, res) => {
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

      try {
        let user = await userOperations.loginWithMobile(phone);

        if (!user) {
          return res.status(400).json({ success: 0, message: "User not found" });
        }


        user.phoneOtp = otp;
        await userOperations.updateUser(user._id,user);
      } catch (error) {
        return res.status(400).json({ success: 0, message: "User not found" });
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};


const updateUserPersonal = async (req, res) => {
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
    console.log(req.body);
    // if(!req.body.userId){
      let id = req.body.id;
    // }else{
    //   let id = req.body.userId;
    // }
    
      try {
        let user = await userOperations.getUserById(id);
        // console.log(user);

        if (!user) {
          return res.status(400).json({ success: 0, message: "User Details not found" });
        }

        user.name = req.body.name;
        user.dob = req.body.dob;
        user.phone = req.body.phone;
        user.martial_status = req.body.martial_status;
        user.gender = req.body.gender;
        user.address1 = req.body.address1;
        user.address2 = req.body.address2;
        user.country_id = req.body.country_id;
        user.state_id = req.body.state_id;
        user.city = req.body.city;
        user.zipcode = req.body.zipcode;
        user.doj = req.body.doj;
        user.employee_id = req.body.employee_id;
        user.profile_image = req.body.profile_image;
        user.phoneCountryCode =req.body.phoneCountryCode;
        user.whatsappCountryCode =req.body.whatsappCountryCode;
        user.whatsapp =req.body.whatsapp;

        await userOperations.updateUser(user._id,user);
        return res.status(200).json({ success: 1, message: "User Personal Details Updated Successfully" });
      } catch (err) {
        return res.status(400).json({message: err.message, success: 0, error_msg: err.message});
        // return res.status(400).json({ success: 0, message: "Details not found" });
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};



const updateUserBank = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    const mongo = require('mongodb');
    let data;
    let id = req.body.id;
      try {

        let user = await userBankOperations.getUserBankById(id);
        // console.log(user[0]._id);

        // if (!user) {
        //   return res.status(400).json({ success: 0, message: "Details not found" });
        // }

        // user.userId = req.body.userId;
        user.bank_name = req.body.bank_name;
        user.branch_name = req.body.branch_name;
        user.holder_name = req.body.holder_name;
        user.account_no = req.body.account_no;
        user.ifsc = req.body.ifsc;
        await userBankOperations.updateUserBank(user._id,user);
        return res.status(200).json({ success: 1, message: "User Bank Details Updated Successfully" });
      } catch (err) {
        return res.status(400).json({message: err.message, success: 0, error_msg: err.message});
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};

const updateUserOffice = async (req, res) => {
  
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
        let user = await userOfficeOperations.getUserOfficeById(id);
        let finalUser = user;
        if (!user) {
          return res.status(400).json({ success: 0, message: "Details not found" });
        };
        // user.userId = req.body.userId;
        user.emp_type = req.body.emp_type;
        user.department = req.body.department;
        user.designation = req.body.designation;
        user.joining = req.body.joining;
        user.working_days = req.body.working_days;
        user.working_shift = req.body.working_shift;
        if(req.body.reporting_manager != undefined){
          user.reporting_manager = req.body.reporting_manager;
        }else{
          user.reporting_manager = 'NA';
        }
        if(req.body.role_id != undefined){
          user.role_id = req.body.role_id;
        }else{
           user.role_id = 'NA';
        }
        if(req.body.team_id != undefined){
          user.team_id = req.body.team_id;
          user.team_name = req.body.team_name;
        }else{
           user.team_id = 'NA';
           user.team_name = '';
        }
        if(req.body.dor != undefined){
          user.dor = req.body.dor;
        }else{
          user.dor = '';
        }
        
        
        await userOfficeOperations.updateUserOffice(user._id,user);
        // var role = 0;
        // if(req.body.role_id != undefined){
        //   if(req.body.role_id == "64b6941c5336901025cca02b"){
        //       var role = 1;
        //     }
        //     if(req.body.role_id == "64b6d7ca3ef534e0899482a2"){
        //       var role = 2;
        //     }
        //     if(req.body.role_id == "64b6d7fb3ef534e0899482a5"){
        //       var role = 3;
        //     }
        //     if(req.body.role_id == "64bcb3be8cc78ad4d4439f2c"){
        //       var role = 4;
        //     }
        //   }
        //   // console.log(role);
        //   if(role>0){
        //     var mUser = await userOperations.getUserById(finalUser.userId);
        //     console.log(finalUser);
        //     mUser.userRole = role;
        //     mUser.role_id = req.body.role_id;
        //  await userOperations.updateUser(mUser._id,mUser);
        //   }

        let roledata = req.body.role_id;
        let getrole = await roleOperations.getRoleById(roledata);

          let uid = finalUser.userId;
          let userD = await userOperations.getUserById(uid);
          // console.log(user);
          userD.userRole = getrole.roleId;
          userD.role_id = req.body.role_id;
          userD.team_id = req.body.team_id;
          userD.team_name = req.body.team_name;
         await userOperations.updateUser(userD._id,userD);

         if(getrole.roleId == 5 || getrole.roleId == 6){

          let checkUserTeam = await userTeamOperations.findOneUserId(req.body.userId);
          var Gid = checkUserTeam._id
          // console.log(Gid.toString());
           if(checkUserTeam){
            await userTeamOperations.delete(Gid.toString());
           }
          const userTeam = new UserTeam(
                req.body.team_id,
                req.body.userId,
                req.body.role_id,
              );
          await userTeamOperations.addUserTeam(userTeam);
         }
          

        return res.status(200).json({ success: 1, message: "User Office Details Updated Successfully" });
      } catch (err) {
        return res.status(400).json({message: err.message, success: 0, error_msg: err.message});
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }

};


const updateUserLeave = async (req, res) => {
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
        let user = await userLeaveOperations.getUserLeaveById(id);

        if (!user) {
          return res.status(400).json({ success: 0, message: "Details not found" });
        };

          // user.userId = req.body.userId;
          user.total_leave = req.body.total_leave;
          user.earned_leave = req.body.earned_leave;
          user.sick_leave = req.body.sick_leave;
          user.casual_leave = req.body.casual_leave;
          user.total_leave_available = req.body.total_leave;
          user.earned_leave_available = req.body.earned_leave;
          user.sick_leave_available = req.body.sick_leave;
          user.casual_leave_available = req.body.casual_leave;

        await userLeaveOperations.updateUserLeave(user._id,user);
        return res.status(200).json({ success: 1, message: "User Leave Details Updated Successfully" });
      } catch (err) {
        return res.status(400).json({message: err.message, success: 0, error_msg: err.message});
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }

};

const updateUserLoan = async (req, res) => {
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
        let user = await userLoanDeclarationOperations.getUserLoanDeclarationById(id);

        if (!user) {
          return res.status(400).json({ success: 0, message: "Details not found" });
        };

          // user.userId = req.body.userId;
          user.loan_acc = req.body.loan_acc;
          user.loan_amt = req.body.loan_amt;
          user.loan_emi = req.body.loan_emi;
          user.start_from = req.body.start_from;
          user.updated_amt = req.body.updated_amt;
          user.status = req.body.status;

        await userLoanDeclarationOperations.updateUserLoanDeclaration(user._id,user);
        return res.status(200).json({ success: 1, message: "User Loan Details Updated Successfully" });
      } catch (err) {
        return res.status(400).json({message: err.message, success: 0, error_msg: err.message});
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }

};


const updateUserSalary = async (req, res) => {
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
        let user = await userSalaryDeclarationOperations.getUserSalaryDeclarationById(id);

        if (!user) {
          return res.status(400).json({ success: 0, message: "Details not found" });
        };

      
       // user.userId = req.body.userId;
       user.EPF_opt = req.body.EPF_opt;
       user.ESI_opt = req.body.ESI_opt;
       user.EPF_no = req.body.EPF_no;
       user.ESI_no = req.body.ESI_no;
       user.basic = req.body.basic;
       user.HRA = req.body.HRA;
       user.medical_allowance = req.body.medical_allowance;
       user.conbeyance_allowance = req.body.conbeyance_allowance;
       user.special_allowance = req.body.special_allowance;
       user.others = req.body.others;
       user.i_tax = req.body.i_tax;

        await userSalaryDeclarationOperations.updateUserSalaryDeclaration(user._id,user);
        return res.status(200).json({ success: 1, message: "User Salary Details Updated Successfully" });
      } catch (err) {
        return res.status(400).json({message: err.message, success: 0, error_msg: err.message});
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};

const resetUserPassword = async (req, res) => {
 const { email } = req.body;
  const user = await userOperations.findOneEmail(email);
  const tokens = {};
  if (!user) {
    res.status(404);
    res.json({ success: 0,message: "the email provided was not found" });
  } else if (user) {
    // const token = AuthToken(user._id);
     const getToken = token.createToken({
          id: user._id,
          isAdmin: user.isAdmin,
        });
        let tokenData = await userTokens.checkToken(user._id);
        if(!tokenData){
            const userT = new UserToken(
              user._id,
              getToken
            );
            const promise = userTokens.addUserToken(userT);
          }else{
            tokens.token = getToken;
            await userTokens.updateUserToken(tokenData._id,tokens);

          }
          res.json({
            success: 1, message: `a link to reset your password has been sent to: ${user.email} please go with http://localhost:5000/reset-password?token=${getToken}`,
            getToken,
            user_id: user._id,
          });
    // try {
    //   let subject = 'Reset Password Link - Amit.com';
    //   let html = '<p>You requested for reset password, kindly use this <a href="http://localhost:5000/reset-password?token=' + token + '">link</a> to reset your password</p>';
    //   await sendEmail.sendEmail(user.email, subject, html);
    //   res.status(200);
    //   res.json({
    //     success: 1, message: `a link to reset your password has been sent to: ${user.email}`,
    //   });
    // } catch (error) {
    //   res.status(500);
    //   // res.json({ success: 0, message: error });
    //   res.json({ success: 0, message: "Internal Server Error" });
    // }
  } else {
    res.status(500);
    res.json({ success: 0, message: "Internal Server Error" });
  }
}

const saveResetPassword = async (req, res) => {
  const { id, authorization } = req.params;

  const user = await userOperations.getUserById(req.params.id);
  // console.log(user);
  const private_key=process.env.JWT_SCRT
  const payload = await jwt.verify(authorization, private_key);
  if (user._id === id || payload.id) {
    try {
      user.password = bcrypt.doEncrypt(req.body.password);
      await userOperations.updateUser(user._id,user);
      res.status(200);
      res.json({ success: 1, message: `Password change Successfully` });
    } catch (error) {
      res.status(404);
      res.json({ success: 0, message: `an error occured: ${error}` });
    }
  }else{
    res.status(500)
    res.json({success: 0, message: "an error occured"})
  }
};

const saveChangePassword = async (req, res) => {
  
  let old_password = req.body.old_password;
  let id = req.body.id;
  const user = await userOperations.getUserById(id);
  if (!user) {
          return res.status(400).json({ success: 0, message: "User Id not found" });
        };
  const pass = bcrypt.compare(old_password, user.password);
  if (!pass) {
          return res.status(400).json({ success: 0, message: "old Password not Matched!" });
        };

  
  // if (user._id === id ) {
    try {
      user.password = bcrypt.doEncrypt(req.body.password);
      await userOperations.updateUser(user._id,user);
      res.status(200);
      res.json({ success: 1, message: `Password change Successfully` });
    } catch (error) {
      res.status(404);
      res.json({ success: 0, message: `an error occured: ${error}` });
    }
  // }else{
  //   res.status(500)
  //   res.json({success: 0, message: "an error occured"})
  // }
};

const saveChangePasswordByAdmin = async (req, res) => {
   let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    let id = req.body.id;
    const user = await userOperations.getUserById(id);
    if (!user) {
            return res.status(400).json({ success: 0, message: "User Id not found" });
          };
   
      try {
        user.password = bcrypt.doEncrypt(req.body.password);
        await userOperations.updateUser(user._id,user);
        res.status(200);
        res.json({ success: 1, message: `Password change Successfully` });
      } catch (error) {
        res.status(404);
        res.json({ success: 0, message: `an error occured: ${error}` });
      }
    }else{
          return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      }
  
};

const checkPunchIn = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    const { id, authorization } = req.params;
    // var datetime = new Date();
    var dt = new Date();
    let uid = req.body.userId;
    const user = await userOperations.getUserById(uid);
      // console.log(user);
      if (!user) {
        return res.status(400).json({ message: "User Id not found",success: 0});
      }

  year  = dt.getFullYear();
  month = (dt.getMonth() + 1).toString().padStart(2, "0");
  day   = dt.getDate().toString().padStart(2, "0");
  var day1 = day +'/' + month + '/' + year;

  let userAtt = await userAttendanceOperations.findUserByMultipleData(uid,day1);
  
  if (userAtt[0].punch_in != "00:00") {
            return res.status(200).json({ success: 0, message: "", data: userAtt[0] });
            
          }
    
     res.status(200).json({
      message: "Punch-In Successfully",
      success: 1,
      data: userAtt,
    });

    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }

};

const punchIn = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

  //   jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
  //     if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      
  //     // return res.status(200).send(decoded.id.id);
  //     setdata = decoded.id.id;
  // });
  if(!setdata){
    const { id, authorization } = req.params;
    // var datetime = new Date();
    var dt = new Date();
    let uid = req.body.userId;
    const user = await userOperations.getUserById(uid);
      // console.log(user);
      if (!user) {
        return res.status(400).json({ message: "User Id not found",success: 0});
      }

  year  = dt.getFullYear();
  month = (dt.getMonth() + 1).toString().padStart(2, "0");
  day   = dt.getDate().toString().padStart(2, "0");
  // current hours
  let hours = dt.getHours() + 5;
  let minutes = dt.getMinutes() + 30;
  let seconds = dt.getSeconds();
  // let date = ("0" + dt.getDate()).slice(-2);

  var day1 = day +'/' + month + '/' + year;

  let userAtt = await userAttendanceOperations.findUserByMultipleData(uid,day1);
  
    // var datetimeC = dt.toLocaleTimeString('en-US', {
    //   timeZone: 'Asia/Calcutta'
    // });
  var datetimeC = hours + ':' + minutes;
  if (userAtt[0].punch_in != "00:00") {
          if(userAtt[0].punch_out == "00:00"){
            return res.status(200).json({ success: 0, message: "You have already punch-in for Today", data: userAtt[0] });
          }else{
            return res.status(400).json({ success: 0, message: "You have already punch-in for Today", data: userAtt[0] });
          }
            
          }
    
    userAtt[0].punch_in = datetimeC;
    userAtt[0].work_type = "Present";
    const myJSON = userAtt[0]._id; 
    const updateId = myJSON.toString().replace(/ObjectId\("(.*)"\)/, "$1");
    await userAttendanceOperations.updateUserAttendance(updateId,userAtt[0]);
     res.status(200).json({
      message: "Punch-In Successfully",
      success: 1,
      data: userAtt,
    });

    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }

};

const punchOut = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
      const { userId, id, authorization, punch_in } = req.params;
      // var datetime = new Date();
      var dt = new Date();
       let uid = req.body.userId;
        const user = await userOperations.getUserById(uid);
          // console.log(user);
          if (!user) {
            return res.status(400).json({ message: "User Id not found",success: 0});
          }

    year  = dt.getFullYear();
    month = (dt.getMonth() + 1).toString().padStart(2, "0");
    day   = dt.getDate().toString().padStart(2, "0");
    // current hours
    let hours = dt.getHours();
    let minutes = dt.getMinutes();
    let seconds = dt.getSeconds();
    // let date = ("0" + dt.getDate()).slice(-2);

    var current_datetime = hours  + ':' + minutes;
    var current_datetimecheck = year + '/' + month + '/' + day  + ' ' + hours  + ':' + minutes;
    var getpunch_in = year + '/' + month + '/' + day  + ' ' + req.body.punch_in;


    try {
      // console.log(req.body.id);
          let userAtt = await userAttendanceOperations.getUserAttendanceById(req.body.id);

          var startTime = new Date(getpunch_in); 
          var endTime = new Date(current_datetimecheck);
          var differenceHours = endTime.getHours() - startTime.getHours(); // This will give difference in milliseconds

          var diffstart = 60 - startTime.getMinutes();
          var diffmint = diffstart + endTime.getMinutes();
          var mintHour = Math.round(diffmint / 60);
          var mint = diffmint % 60;

          // console.log(diff);
           // console.log(differenceHours);

           //  console.log(mint);
          // var resultInMinutes = Math.round(difference / 60000);
          // var hourss = Math.round(resultInMinutes / 60);
          // var mint = resultInMinutes % 60;
          

          if (!userAtt) {
            return res.status(400).json({ success: 0, message: "User Attendence not found" });
          }
          if (userAtt.punch_out != "00:00") {
            return res.status(400).json({ success: 0, message: "User Attendence All ready updated" });
          }
           // var datetimeC = dt.toLocaleTimeString('en-US', {
           //    timeZone: 'Asia/Calcutta'
           //  });

          var minutesDta = minutes % 60;

          let hours1 = hours + 5;
          let minutes1 = minutesDta + 30;

          let hourss1 = differenceHours + mintHour + 5 ;
          let mint1 = mint + 30;

          var datetimeC = hours1 + ':' + minutes1;

          userAtt.punch_out = datetimeC;
          userAtt.working_hours = hourss1+":"+mint1;

          await userAttendanceOperations.updateUserAttendance(userAtt._id,userAtt);
           res.status(200).json({
            message: "Punch-out Successfully",
            success: 1,
            data: userAtt,
          });
        } catch (error) {
          return res.status(400).json({ success: 0, message: "User Attendence not found" });
        }

   }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }
};

const addUserApplyLeave = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0 });

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
     let id = req.body.userId;
    const user = await userOperations.getUserById(id);
     console.log(req.body);
      if (!user) {
        return res.status(400).json({ message: "User Id not found",success: 0});
      }
    let status = 0;
    let date1 = req.body.from_date;
    let dates1 = date1.split("-")
    // console.log(dates1);
    var date_1 = dates1[0] + '/' + dates1[1] + '/' + dates1[2]  + ' 00:00';
    let date2 = req.body.to_date;
    let date1_1 = new Date(date_1);

    let dates2 = date2.split("-")
    var date_2 = dates2[0] + '/' + dates2[1] + '/' + dates2[2]  + ' 00:00';
    let date2_2 = new Date(date_2);
    var dateDiff = date2_2.getTime() - date1_1.getTime();
    if(req.body.leave_take_type === "half"){
      var days = 0.5;
      checkdate2 = date2_2.getDate();
      checkdate1 = date1_1.getDate();

      if(checkdate2 != checkdate1){
        return res.status(400).json({message: "Please Check Leave Applied Dates", success: 0});
      }
      

    }else{
    var resultInMinutes = Math.round(dateDiff / 60000);
          var hourss = Math.round(resultInMinutes / 60);
          var day = Math.round(hourss / 24);
          if(hourss < 5){
            var days = 0.5;
          }else{
            var days = day+1;
          }
          
      }   

    const userApplyLeave = new UserApplyLeave(
      req.body.userId,
      req.body.leave_type,
      req.body.from_date,
      req.body.to_date,
      req.body.comments,
      days,
      status,
    );
    const promise = userApplyLeaveOperations.addUserApplyLeave(userApplyLeave);
    promise
      .then((data) => {
        res.status(201).json({
          message: "Save Successfully",
          success: 1,
          data: data,
        });
      })
      .catch((err) => {
        return res.status(400).json({message: err.message, success: 0, error_msg: err.message});
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
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }
};


const deactivateUser = async (req, res) => {
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

      try {
        console.log(req.body.id);
        let id = req.body.id;
          const user = await userOperations.getUserById(id);
            // console.log(user);
            if (!user) {
              return res.status(400).json({ message: "User Id not found",success: 0});
            }


        user.status = req.body.status;
        let don = await userOperations.updateUser(user._id,user);
        if(req.body.status == 1){
          return res.status(200).json({ success: 1, message: "User activated Successfully" });
        }else{
          return res.status(200).json({ success: 1, message: "User deactivate Successfully" });
        }
        
      } catch (error) {
        return res.status(400).json({ success: 0, message: "User not found" });
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};

//User Registration
const addOrganiation = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    const org = await organizationOperations.findOrganizationId(setdata);
            console.log(setdata);
      if (org.length > 0) {
        return res.status(200).json({ message: "Organization Allready added for this user",success: 0});
      }
    let role = 2;
    let status = 1;
    let company_type = "Real State";
    const organization = new Organization(
      setdata,
      req.body.companyname,
      req.body.brandname,
      req.body.imageUrl,
      req.body.address1,
      req.body.address2,
      req.body.country_id,
      req.body.state_id,
      req.body.city,
      req.body.zipcode,
      status,
      req.body.time_zone,
      req.body.website,
      company_type,
      req.body.country_code,
      req.body.currency,
    );


    const promise = organizationOperations.addOrganization(organization); 
    promise
      .then((data) => {
        res.status(201).json({
          message: "Organization Registration Done",
          success: 1,
          data: data,
        });
      })
      .catch((err) => {
        return res.status(400).json({message: err.message, success: 0, error_msg: err.message});
        //res.status(500).json(err.message);
        // var tset = for (var key in err.keyPattern) { var t = key}
        // console.log(err.keyPattern);
        // var keys = Object.keys(err.keyPattern);
        // var duplicate = keys[0];
        // if(err.keyPattern){
        //   res.status(500).json({message: "duplicate "+duplicate+" data", success: 0, error_msg: err.message});
        // }else{
        //   let isnum = err.message.includes("@");
        // if(isnum == false){
        //         res.status(500).json({message: "duplicate data Please check phone", success: 0, error_msg: err.message});
        //       }else{
        //         res.status(500).json({message: "duplicate data Please check email", success: 0, error_msg: err.message});
        //       }
        //   // res.status(500).json({message: "duplicate data Please check email/phone/username", success: 0});
        //     }
        });
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }
};

const updateOrganization = async (req, res) => {
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
    let id = req.body.organizationId;
      try {
        let company = await organizationOperations.getOrganizationById(id);
        console.log(company);

        if (!company) {
          return res.status(400).json({ success: 0, message: "Organization Details not found" });
        }

        company.companyname = req.body.companyname;
        company.brandname = req.body.brandname;
        company.address1 = req.body.address1;
        company.address2 = req.body.address2;
        company.country_id = req.body.country_id;
        company.state_id = req.body.state_id;
        company.city = req.body.city;
        company.zipcode = req.body.zipcode;
        company.imageUrl = req.body.imageUrl;
        company.time_zone = req.body.time_zone;
        company.website = req.body.website;
        company.country_code = req.body.country_code;
        company.currency = req.body.currency;

        await organizationOperations.updateOrganization(company._id,company);
        return res.status(200).json({ success: 1, message: "Organization Details Updated Successfully" });
      } catch (error) {
        return res.status(400).json({ success: 0, message: "Details not found" });
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};

const addAttendanceDummy = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

  //   jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
  //     if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      
  //     // return res.status(200).send(decoded.id.id);
  //     setdata = decoded.id.id;
  // });
  if(!setdata){
    const { id, authorization } = req.params;
    // var datetime = new Date();
    var dt = new Date();
    let uid = req.body.userId;
     year  = dt.getFullYear();
      month = (dt.getMonth() + 1).toString().padStart(2, "0");
      day   = dt.getDate().toString().padStart(2, "0");
   

    var day1 = '';
    var datetime = '00:00';
    try {
    const users = await userOperations.getAllActiveUsers();
     
      users.forEach(async function(element) {
        // console.log(element.user_id);
        for (var i = 1; i < 31; i++) {
          if(i == 1){
             day1 = '01/' + month + '/' + year;
          }else if(i == 2){
             day1 = '02/' + month + '/' + year;
          }else if(i == 3){
             day1 = '03/' + month + '/' + year;
          }else if(i == 4){
             day1 = '04/' + month + '/' + year;
          }else if(i == 5){
             day1 = '05/' + month + '/' + year;
          }else if(i == 6){
             day1 = '06/' + month + '/' + year;
          }else if(i == 7){
             day1 = '07/' + month + '/' + year;
          }else if(i == 8){
             day1 = '08/' + month + '/' + year;
          }else if(i == 9){
             day1 = '09/' + month + '/' + year;
          }else{
             day1 = i + '/' + month + '/' + year;
          }
        
          const userAttendance = new UserAttendance(
            element.user_id,
            month,
            day1,
            datetime,
            datetime,
            datetime,
            '',
            '',
            '',
            0,
          );
          
          await userAttendanceOperations.addUserAttendance(userAttendance);
        }
        return res.status(201).json({ success: 1, message: "Details inserted" });
      });
      } catch (error) {
        return res.status(400).json({ success: 0, message: "Details not found"+error });
      }
      
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }

};

const leaveApprove = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

  //   jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
  //     if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      
  //     // return res.status(200).send(decoded.id.id);
  //     setdata = decoded.id.id;
  // });
  if(!setdata){
      const { userId, id, status, authorization } = req.params;
      // var datetime = new Date();
      var dt = new Date();
       let loginid = req.body.userId;
       let statusId = req.body.status;
        const user = await userOperations.getUserById(loginid);
          // console.log(user);
          if (!user) {
            return res.status(400).json({ message: "User Id not found",success: 0});
          }

    try {
      // console.log(req.body.id);
          let userApplyLeave = await userApplyLeaveOperations.getUserApplyLeaveById(req.body.id);
          var uid = userApplyLeave.userId;

           if (!userApplyLeave) {
            return res.status(200).json({ success: 0, message: "User Leave not found" });
          }

           if (userApplyLeave.status == "1") {
            return res.status(200).json({ success: 0, message: "User Leave Allready Approved By Approver" });
          }
         
          var ddDate  = userApplyLeave.from_date;
          var applyDays  = userApplyLeave.total_days;
          let dates1 = ddDate.split("-");
          let month = dates1[1];
          let day = dates1[2];
          let year = dates1[0];

          for(var d = 1; d <= 10; d++){
            if(day == d){
              day = '0' + day;
            }
          }

          if(applyDays  == "0.5"){
              var date = day +'/' + month + '/' + year;
              let userAtt = await userAttendanceOperations.findUserByMultipleData(uid,date);

              userAtt[0].leave_applied = "yes";
              userAtt[0].working_hours = "4:00";
              userAtt[0].work_type = "Half Leave";
              const myJSON = userAtt[0]._id; 
              const updateId = myJSON.toString().replace(/ObjectId\("(.*)"\)/, "$1");

              if(statusId == 1){
                await userAttendanceOperations.updateUserAttendance(updateId,userAtt[0]);
              }
          }else{

            var sta = 0;
            var day1 = day;
             for(var i=0; i<applyDays; i++){
              var day1 = parseInt(day1) + parseInt(i);
              var date = day1 +'/' + month + '/' + year;
              // console.log(date);
              let userAtt = await userAttendanceOperations.findUserByMultipleData(uid,date);
              // console.log(userAtt);
              if(userAtt){
                userAtt[0].leave_applied = "yes";
                userAtt[0].working_hours = "8:00";
                userAtt[0].work_type = "Leave";
                const myJSON = userAtt[0]._id; 
                const updateId = myJSON.toString().replace(/ObjectId\("(.*)"\)/, "$1");
                // console.log(updateId);
                // console.log(userAtt[0]);
                if(statusId == 1){
                  await userAttendanceOperations.updateUserAttendance(updateId,userAtt[0]);

                }
              }else{
                var sta = 1;
              }
            }
          }
          

          let userWiseData = await userLeaveOperations.findOneUserId(uid);
          var total_leave = parseInt(userWiseData.total_leave_available) - parseInt(applyDays);
          userWiseData.total_leave_available = total_leave;
          if(userApplyLeave.leave_type === "Earned Leave"){
            var earned_leave = parseInt(userWiseData.earned_leave_available) - parseInt(applyDays);
            userWiseData.earned_leave_available = earned_leave;
          }
          if(userApplyLeave.leave_type === "Sick Leave"){
            var sick_leave = parseInt(userWiseData.sick_leave_available) - parseInt(applyDays);
            userWiseData.sick_leave_available = sick_leave;
          }
          if(userApplyLeave.leave_type === "Casual Leave"){
            var casual_leave = parseInt(userWiseData.casual_leave_available) - parseInt(applyDays);
            userWiseData.casual_leave_available = casual_leave;
          }

          // res.status(200).json({
          //   message:'sdsa',
          //   success: 1,
          //   data: userWiseData,
          // });


          if(statusId == 1){
            await userLeaveOperations.updateUserLeave(userWiseData._id,userWiseData);

          }

          userApplyLeave.status = statusId;
          userApplyLeave.approver = loginid;


          if(statusId == 1){
            let updatedata = await userApplyLeaveOperations.updateUserApplyLeave(userApplyLeave._id,userApplyLeave);
          }
          if(statusId == 1){
              message = "Leave Approved Successfully";
            }else{
              message = "Leave Rejected Successfully";
            }
           res.status(200).json({
            message: message,
            success: 1,
          });
        } catch (error) {
          return res.status(400).json({ success: 0, message: "User Leave not found" });
        }

   }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }
};

const attendanceApprove = async (req, res) => {
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
      //const { userId, id, status, authorization } = req.params;
      // var datetime = new Date();
      var dt = new Date();
       let uid = req.body.userId;
       let statusId = req.body.status;
        const user = await userOperations.getUserById(uid);
          // console.log(user);
          if (!user) {
            return res.status(400).json({ message: "User Id not found",success: 0});
          }

    

    try {
      // console.log(req.body.id);
          let userAttendance = await userAttendanceOperations.getUserAttendanceById(req.body.id);
          console.log(userAttendance);
          if (!userAttendance) {
            return res.status(400).json({ success: 0, message: "User Attendence not found" });
          }

          userAttendance.status = statusId;
          userAttendance.approver = user.name;
          await userAttendanceOperations.updateUserAttendance(userAttendance._id,userAttendance);
          var message = "";
            if(statusId == 1){
              message = "Attendence Approved Successfully";
            }else{
              message = "Attendence Rejected Successfully";
            }
            res.status(200).json({
            message: message,
            success: 1,
            data: userAttendance,
          });
        } catch (error) {
          return res.status(400).json({ success: 0, message: "User Attendence not found", err: error });
        }

   }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }
};


const addUserDoc = (req, res) => {
  // let id = req.body.userId;
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    const promise = userOperations.getUserById(setdata);
    promise
      .then((data) => {
        // console.log(data);
        if(data){
          const userDoc = new UserDocument(
            req.body.userId,
            req.body.aadhar,
            req.body.pan,
            req.body.passport,
            req.body.medical,
            req.body.voterId,
            req.body.others,
          );
          const promise = userDocumentOperations.addUserDocument(userDoc);
          promise
            .then((data) => {
              res.status(201).json({
                message: "Save Successfully",
                success: 1,
                data: data,
              });
            })
            .catch((err) => {
              res.status(400).json({message: err.message, success: 0, error_msg: err.message});
              
            });
        }else{
                return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
            }
        
      })
      .catch((err) => {
          res.status(500).json({message: "Please check userId", success: 0, error_msg: err.message});
      });
    }
  };

const updateUserDoc= async (req, res) => {
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
        let userDoc = await userDocumentOperations.getUserDocumentById(id);
        console.log(userDoc);

        if (!userDoc) {
          return res.status(400).json({ success: 0, message: "User Document not found" });
        }
        if(req.body.aadhar != '' || req.body.aadhar != undefined){
          userDoc.aadhar = req.body.aadhar;
        }
        if(req.body.pan != '' || req.body.pan != undefined){
          userDoc.pan = req.body.pan;
        }
        if(req.body.passport != '' || req.body.passport != undefined){
          userDoc.passport = req.body.passport;
        }
        if(req.body.medical != '' || req.body.medical != undefined){
          userDoc.medical = req.body.medical;
        }
        if(req.body.voterId != '' || req.body.voterId != undefined){
          userDoc.voterId = req.body.voterId;
        }
        if(req.body.others != '' || req.body.others != undefined){
          userDoc.others = req.body.others;
        }
        
        await userDocumentOperations.updateUserDocument(userDoc._id,userDoc);
        return res.status(200).json({ success: 1, message: "Documents Updated Successfully" });
      } catch (error) {
        return res.status(400).json({ success: 0, message: "Details not found" });
      }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};

const getUserDoc= async (req, res) => {
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
            const promise = userDocumentOperations.findOneUserDocumentId(id)
            promise
            .then((data)=>{
                // console.log(data)
                const {others} = data._doc
                res.status(200).json({
                    data: data,
                    success: 1
                    }) 
               
                
            })
            .catch((err)=>{
                // console.log(err.message)
                res.status(200).json({message: "Documents has not been uploaded", success: 0});
            })
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
    };

    const addRole = async (req, res) => {
  // let id = req.body.userId;
  let token=req.headers.token;
  let setdata = "";
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

    jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
      
      // return res.status(200).send(decoded.id.id);
      setdata = decoded.id.id;
  });
  if(setdata){
    var query = '';
    let role = await roleOperations.getAllRole(query);
    var roleId  = role.length + 1;
    var slug_name = req.body.role_name;
    var slug=slug_name.split(' ').join('_').toLowerCase();
    console.log(slug);
    const promise = userOperations.getUserById(setdata);
    promise
      .then((data) => {
        // console.log(data);
        if(data){
          const role = new Role(
            req.body.role_name,
            req.body.description,
            JSON.stringify(req.body.info),
            slug,
            roleId,
          );
          const promise = roleOperations.addRole(role);
          promise
            .then((data) => {
              res.status(201).json({
                message: "Save Successfully",
                success: 1,
                info: JSON.parse(data.info),
                data: data,
              });
            })
            .catch((err) => {
              res.status(400).json({message: err.message, success: 0, error_msg: err.message});
              
            });
        }else{
                return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
            }
        
      })
      .catch((err) => {
          res.status(500).json({message: "Please check userId", success: 0, error_msg: err.message});
      });
    }
  };

const updateRole= async (req, res) => {
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
        let userDoc = await roleOperations.getRoleById(id);
        console.log(req.body.info);
        // console.log(JSON.stringify(req.body.info));

        if (!userDoc) {
          return res.status(400).json({ success: 0, message: "User Document not found" });
        }
        if(req.body.role_name != '' || req.body.role_name != undefined){
          userDoc.role_name = req.body.role_name;
        }
        if(req.body.description != '' || req.body.description != undefined){
          userDoc.description = req.body.description;
        }
        if(req.body.info != '' || req.body.info != undefined){
          userDoc.info = JSON.stringify(req.body.info);
        }
        if(req.body.slug != '' || req.body.slug != undefined){
          userDoc.slug = JSON.stringify(req.body.slug);
        }
        
        
        await roleOperations.updateRole(userDoc._id,userDoc);
        return res.status(200).json({ success: 1, message: "Role Updated Successfully" });
      // } catch (error) {
      //   return res.status(400).json({ success: 0, message: "Details not found" });
      // }
    }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }

};

function someFunction(parameter) {
  // create array of promises
  return parameter.info.map((info) =>
    fetch(info)
      // parse JSON
      .then((res) => res.json())
      // Merge data with url property
      .then((data) => ({ ...data, info }))
  );
}

const getRole= async (req, res) => {
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
              const promise = roleOperations.getRoleById(id)
              promise
              .then((data)=>{
                let sendData = {};
                sendData = {"_id": data._id,"role_name": data.role_name,"description": data.description,"info": JSON.parse(data.info)}
                  res.status(200).json({
                     data: sendData,
                      success: 1
                      }) 
               
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Data not found", success: 0});
              })
            }else{
              const query = req.query.new;
              const promise = roleOperations.getAllRole(query)
              promise
              .then((data)=>{
                  console.log(data)
                  //const {others} = data._doc
                  res.status(200).json({
                      data: data,
                      success: 1
                      }) 
                 
                  
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Data not found", success: 0});
              })

            }
            
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
    };

    const createSalary = (req, res) => {
    // let id = req.body.userId;
    let token=req.headers.token;
    let setdata = "";
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});

      jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
        if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        
        // return res.status(200).send(decoded.id.id);
        setdata = decoded.id.id;
    });
    if(setdata){
      const promise = userOperations.getUserById(setdata);
      promise
        .then((data) => {
          // console.log(data);
          if(data){
            // const userSalary = new UserSalary(
            //   req.body.userId,
            //   req.body.basic,
            //   req.body.HRA,
            //   req.body.medical_allowance,
            //   req.body.conbeyance_allowance,
            //   req.body.special_allowance,
            //   req.body.others,
            //   req.body.EPF_deduction,
            //   req.body.ESI_deduction,
            //   req.body.i_tax,
            //   req.body.loan_deduction, 
            //   req.body.total_salary,
            //   req.body.total_deduction,
            //   req.body.net_pay,
            // );
             const userSalary = new UserSalary(
              "6540ee334deef597cddbd055",
              6667.00,
              5000.00,
              734.00,
              3334.00,
              4000.00,
              0.00,
              0.00,
              0.00,
              0.00,
              0.00, 
              19735.00,
              0.00,
              19735.00,
              11,
              2023,
            );
            const promise = userSalaryOperations.addUserSalary(userSalary);
            promise
              .then((data) => {
                res.status(201).json({
                  message: "Save Successfully",
                  success: 1,
                  data: data,
                });
              })
              .catch((err) => {
                res.status(400).json({message: err.message, success: 0, error_msg: err.message});
                
              });
          }else{
                  return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
              }
          
        })
        .catch((err) => {
            res.status(500).json({message: "Please check userId", success: 0, error_msg: err.message});
        });
      }
    };

    const getSalary= async (req, res) => {
        let token=req.headers.token;
        let setdata = "";
        // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
        //   jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
        //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
        //     // return res.status(200).send(decoded.id.id);
        //     setdata = decoded.id.id;
        // });
        if(!setdata){
          // console.log(req);
            let id = req.params.id
            let uid = req.params.userId
            if(!uid){
              res.status(500).json({message: "User Id not found", success: 0});
            }
            if(!id){
              // console.log("sfds");
              const promise = userSalaryOperations.findUserSalaryId(uid)
              promise
              .then((data)=>{
                console.log("sfds");
                  console.log(data)
                  // const {others} = data._doc

                 // let convertData = [];
                 //    convertData.push(data);
                 //    data = convertData;
                  let arr = [];
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;

                    var dataArray = {};
                    dataArray['_id'] = req._id;
                    dataArray['userId'] = req.userId; 
                    dataArray['basic'] = req.basic; 
                    dataArray['HRA'] = req.HRA; 
                    dataArray['medical_allowance'] = req.medical_allowance; 
                    dataArray['conbeyance_allowance'] = req.conbeyance_allowance;  
                    dataArray['special_allowance'] = req.special_allowance; 
                    dataArray['others'] = req.others;
                    dataArray['EPF_deduction'] = req.EPF_deduction; 
                    dataArray['ESI_deduction'] = req.ESI_deduction;
                    dataArray['i_tax'] = req.i_tax;
                    dataArray['loan_deduction'] = req.loan_deduction;
                    dataArray['total_salary'] = req.total_salary;
                    dataArray['total_deduction'] = req.total_deduction;
                    dataArray['i_tax'] = req.i_tax; 
                    dataArray['net_pay'] = req.net_pay;
                    dataArray['month'] = req.month;
                    dataArray['year'] = req.year;
                    dataArray['emp_id'] = req.employee_id;
                    dataArray['createdAt'] = req.createdAt;
                    dataArray['updatedAt'] = req.updatedAt;    

                    if(req.userId){
                      var userData = await userOperations.getUserById(req.userId);
                      dataArray['user_name'] = userData.name;
                      var userOfficeData = await userOfficeOperations.findOneUserId(req.userId);
                      if(userOfficeData){
                        dataArray['emp_type'] = userOfficeData.emp_type;
                        dataArray['department'] = userOfficeData.department;
                        dataArray['designation'] = userOfficeData.designation;
                        dataArray['joining'] = userOfficeData.joining;
                      }else{
                        dataArray['emp_type'] = '';
                        dataArray['department'] = '';
                        dataArray['designation'] = '';
                        dataArray['joining'] = '';
                      }
                      
                      var userSalaryDeclarationData = await userSalaryDeclarationOperations.findOneUserId(req.userId);
                      
                      if(userSalaryDeclarationData){
                        dataArray['EPF_no'] = userSalaryDeclarationData.EPF_no;
                        dataArray['ESI_no'] = userSalaryDeclarationData.ESI_no;
                      }else{
                        dataArray['EPF_no'] = '';
                        dataArray['ESI_no'] = '';
                      }
                      dataArray['working_days'] = '';
                      dataArray['absence'] = '';
                      dataArray['leave'] = '';
                    }
                    // console.log(dataArray);

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
              console.log("fgfdgdfgdfg");
              const query = req.query.new;
              console.log(id);
              const promise = userSalaryOperations.getUserSalaryById(id)
              promise
              .then((data)=>{
                  console.log(id)
                  //const {others} = data._doc
                  let convertData = [];
                    convertData.push(data);
                    data = convertData;
                  let arr = [];
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;

                    var dataArray = {};
                    dataArray['_id'] = req._id;
                    dataArray['userId'] = req.userId; 
                    dataArray['basic'] = req.basic; 
                    dataArray['HRA'] = req.HRA; 
                    dataArray['medical_allowance'] = req.medical_allowance; 
                    dataArray['conbeyance_allowance'] = req.conbeyance_allowance;  
                    dataArray['special_allowance'] = req.special_allowance; 
                    dataArray['others'] = req.others;
                    dataArray['EPF_deduction'] = req.EPF_deduction; 
                    dataArray['ESI_deduction'] = req.ESI_deduction;
                    dataArray['i_tax'] = req.i_tax;
                    dataArray['loan_deduction'] = req.loan_deduction;
                    dataArray['total_salary'] = req.total_salary;
                    dataArray['total_deduction'] = req.total_deduction;
                    dataArray['i_tax'] = req.i_tax;  
                    dataArray['net_pay'] = req.net_pay;
                    dataArray['month'] = req.month;
                    dataArray['year'] = req.year;
                    dataArray['emp_id'] = req.employee_id;
                    dataArray['createdAt'] = req.createdAt;
                    dataArray['updatedAt'] = req.updatedAt;    

                    if(req.userId){
                      var userData = await userOperations.getUserById(req.userId);
                      dataArray['user_name'] = userData.name;
                      var userOfficeData = await userOfficeOperations.findUserId(req.userId);
                      console.log(userOfficeData);
                      if(userOfficeData){
                        dataArray['emp_type'] = userOfficeData[0].emp_type;
                        dataArray['department'] = userOfficeData[0].department;
                        dataArray['designation'] = userOfficeData[0].designation;
                        dataArray['joining'] = userOfficeData[0].joining;
                      }else{
                        dataArray['emp_type'] = '';
                        dataArray['department'] = '';
                        dataArray['designation'] = '';
                        dataArray['joining'] = '';
                      }
                      
                      var userSalaryDeclarationData = await userSalaryDeclarationOperations.findOneUserId(req.userId);
                      
                      if(userSalaryDeclarationData){
                        dataArray['EPF_no'] = userSalaryDeclarationData.EPF_no;
                        dataArray['ESI_no'] = userSalaryDeclarationData.ESI_no;
                      }else{
                        dataArray['EPF_no'] = '';
                        dataArray['ESI_no'] = '';
                      }
                      dataArray['working_days'] = '30';
                      dataArray['absence'] = '0.00';
                      dataArray['leave'] = '0.00';
                    }
                    // console.log(dataArray);

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
                 
                  
              })
              .catch((err)=>{
                  // console.log(err.message)
                  res.status(500).json({message: "Data not found", success: 0});
              })

            }
            
        }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0 });
        }
    };

const testDT = async (req, res) => {
  var dt = new Date();
  let hours = dt.getHours() + 5;
  let minutes = dt.getMinutes() + 30;
  let seconds = dt.getSeconds();
  res.status(200).json({
      message: "Punch-In Successfully",
      success: 1,
      data: hours +':' + minutes,
    });
  };

  const dashboard = async (req, res) => {

    let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
            console.log(decoded);
        });
  var dt = new Date();
  let hours = dt.getHours() + 5;
  let minutes = dt.getMinutes() + 30;
  let seconds = dt.getSeconds();

var start_date = ""; 
var end_date = "" ;
var team_id = 'all';
var page = 0;
var limit = 25;
var skip = limit * page;
var users = await userOperations.findOneUserId(setdata);
console.log(users.userRole);

if(users.userRole == 6){

}
  
  query = {"team_id":team_id, "start_date": start_date, "end_date": end_date, "limit": Number(limit), "skip": skip, "page": page};
    const promise = userOperations.getAllUserData(query,team_id)
              promise
              .then((data)=>{

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
                    var projects_total = 0;
                    var projects_commercial = 0;
                    var projects_residencial = 0;
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
                          total_released_pipeline1 = Number(total_new_count) + Number(item.total_records);
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
                    // setQuery = "new";
                    // var projectData = await projectOperations.getListProject(setQuery);
                    // var prsidentailCountData = await projectDetailsOperations.findProjectDetailPropertyTypeId('654bca8dc9a73c31e42056f2');
                    // var commercialCountData = await projectDetailsOperations.findProjectDetailPropertyTypeId('654bca94c9a73c31e42056f5');
                    // console.log(prsidentailCountData.length);
                    // projects_total = projectData.length;
                    // var projects_commercial = commercialCountData.length;
                    // var projects_residencial = prsidentailCountData.length;

                    arr.push(dataArray);
                    // console.log(arr);
                    return arr;
                   
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText);
                  var arr2 = {};
                    arr2['lead_total_count'] = total_count;
                    arr2['lead_total_new_count'] = total_new_count;
                    arr2['lead_total_answered_count'] = total_answered_count;
                    arr2['lead_total_intrested_count'] = total_intrested_count;
                    arr2['lead_total_call_back_count'] = total_call_back_count;
                    arr2['lead_total_visit_done_count'] = total_visit_done_count;
                    arr2['lead_total_pipeline_count'] = total_pipeline_count;
                    arr2['lead_total_future_count'] = total_future_count;
                    arr2['lead_total_customer_count'] = total_customer_count;
                    arr2['lead_total_booked_count'] = total_booked_count;
                    arr2['lead_total_released_pipeline'] = total_released_pipeline;
                    // arr2['projects_total'] = projects_total;
                    // arr2['projects_commercial'] = projects_commercial;
                    // arr2['projects_residencial'] = projects_residencial;
                    // arr2['attendence_total_emp'] = 40;
                    // arr2['attendence_present_today'] = 33;
                    // arr2['attendence_absent_today'] = 7;
                    // arr2['attendence_leave_today'] = 2;
                    // arr2['attendence_late_today'] = 1;
                    // arr2['attendence_my_current_month'] = 30;
                    // arr2['attendence_my_current_month_present'] = 12;
                    // arr2['attendence_my_current_month_absent'] = 7;
                    // arr2['attendence_my_current_month_leave'] = 2;
                    // arr2['attendence_my_current_month_late'] = 1;
                    total_arr.push(arr2);
                    if(responseText.length > 0){
                         res.status(200).json({
                          data: total_arr,
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
                });
  };


  const dashboardMylead = async (req, res) => {

    let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
            console.log(decoded);
        });
      const promise = userOperations.findByUserId(setdata)
              promise
              .then((data)=>{
                console.log(data);
                  let arr = [];
                  let total_arr = [];
                  var arr2 = {};
                    var total_count = 0;
                    

                    var lead_my_total_count = 0;
                    var lead_my_new_count = 0;
                    var lead_my_answered_count = 0;
                    var lead_my_intrested_count = 0;
                    var lead_my_call_back_count = 0;
                    var lead_my_visit_done_count = 0;
                    var lead_my_pipeline_count = 0;
                    var lead_my_future_count = 0;
                    var lead_my_customer_count = 0;
                    var lead_my_booked_count = 0;
                    var lead_my_released_pipeline = 0;

                    var total_lead_my_new_count = 0;
                    var total_lead_my_answered_count = 0;
                    var total_lead_my_intrested_count = 0;
                    var total_lead_my_call_back_count = 0;
                    var total_lead_my_visit_done_count = 0;
                    var total_lead_my_pipeline_count = 0;
                    var total_lead_my_future_count = 0;
                    var total_lead_my_customer_count = 0;
                    var total_lead_my_booked_count = 0;
                    var total_lead_my_released_pipeline = 0;
                  // total_arr.push(arr2);
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    // console.log(req);
                    var dataArray = {};
                    dataArray['_id'] = req._id.toString(); 
                    dataArray['user_name'] = req.name;
                    // newQuery = {"user_id":req.user_id, "start_date": start_date, "end_date": end_date};
                    newQuery = req._id.toString();
                    var newData = await leadUserStageOperations.findLeadUserStageByleadIdUserIdCount(newQuery);
                    var allDataExpectNew = 0;
                    dataArray['total_lead_my_new_count'] = 0;
                    dataArray['total_lead_my_call_done'] = 0;
                    dataArray['total_lead_my_not_answered_count'] = 0;
                    dataArray['total_lead_my_not_intrested_count'] = 0;
                    dataArray['total_lead_my_call_back_count'] = 0;
                    dataArray['total_lead_my_visit_done_count'] = 0;
                    dataArray['total_lead_my_pipeline_count'] = 0;
                    dataArray['total_lead_my_future_count'] = 0;
                    dataArray['total_lead_my_customer_count'] = 0;
                    dataArray['total_lead_my_booked_count'] = 0;
                    dataArray['total_lead_my_released_pipeline'] = 0;
                    

                    // if(newData.length > 0){
                    // console.log(newData);
                      newData.forEach(function(item) {
                            if(item._id == "new"){
                              //dataArray["new_count"] = item.total_records;
                              total_new_count = Number(total_new_count) + Number(item.total_records);
                              total_count = Number(total_count) + Number(item.total_records);
                            }
                            if(item._id == "Pipeline"){
                              //dataArray["pipeline_count"] = item.total_records;
                              total_pipeline_count = Number(total_pipeline_count) + Number(item.total_records);
                              total_count = Number(total_count) + Number(item.total_records);
                              allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                            }
                            if(item._id == "Not Answered"){
                              //dataArray["not_answered_count"] = item.total_records;
                              total_answered_count = Number(total_answered_count) + Number(item.total_records);
                              total_count = Number(total_count) + Number(item.total_records);
                              allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                            }
                            if(item._id == "Not Interested"){
                              //dataArray["not_intrested_count"] = item.total_records;
                              total_intrested_count = Number(total_intrested_count) + Number(item.total_records);
                              total_count = Number(total_count) + Number(item.total_records);
                              allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                            }
                            if(item._id == "Call Back"){
                              //dataArray["call_back_count"] = item.total_records;
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
                              //dataArray["future_count"] = item.total_records;
                              total_future_count = Number(total_future_count) + Number(item.total_records);
                              total_count = Number(total_count) + Number(item.total_records);
                              allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                            }
                            if(item._id == "Customer"){
                              //dataArray["customer_count"] = item.total_records;
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
                              //dataArray['released_pipeline'] = item.total_records;
                              total_released_pipeline = Number(total_released_pipeline) + Number(item.total_records);
                              total_count = Number(total_count) + Number(item.total_records);
                              allDataExpectNew = Number(allDataExpectNew) + Number(item.total_records);
                            }
                            //dataArray['call_done'] = allDataExpectNew;
                      });
                       

                      arr.push(dataArray);
                          // console.log(arr);
                          return arr;
                   
                    }
                  )
                ).then((responseText) => {
                   console.log(responseText);
                  var arr2 = {};
                    arr2['lead_my_total_count'] = total_count;
                    arr2['lead_my_new_count'] = total_new_count;
                    arr2['lead_my_answered_count'] = total_answered_count;
                    arr2['lead_my_intrested_count'] = total_intrested_count;
                    arr2['lead_my_call_back_count'] = total_call_back_count;
                    arr2['lead_my_visit_done_count'] = total_visit_done_count;
                    arr2['lead_my_pipeline_count'] = total_pipeline_count;
                    arr2['lead_my_future_count'] = total_future_count;
                    arr2['lead_my_customer_count'] = total_customer_count;
                    arr2['lead_my_booked_count'] = total_booked_count;
                    arr2['lead_my_released_pipeline'] = total_released_pipeline;
                   
                    total_arr.push(arr2);
                    if(responseText.length > 0){
                         res.status(200).json({
                          data: total_arr,
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
                });
  };

    const dashboardProject = async (req, res) => {

    let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
            console.log(decoded);
        });
  
  query = "new";
  var projectData = await projectOperations.getListProject(query);
    const promise = projectDetailsOperations.getAllProjectDetail(query)
              promise
              .then((data)=>{
                console.log(data);
                  let arr = [];
                  let total_arr = [];
                  var arr2 = {};
                    var projects_total = 0;
                    var projects_commercial = 0;
                    var projects_residencial = 0;
                  // total_arr.push(arr2);
                    setQuery = "new";
                    
                    projects_total = projectData.length;
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    // console.log(req);
                    var allDataExpectNew = 0;
                    
                    if(req.projecttypeId == "654bca8dc9a73c31e42056f2"){
                        projects_commercial = Number(projects_commercial) + 1;
                      }else{
                        projects_residencial = Number(projects_residencial) + 1;
                      }
                    
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText);
                  var arr2 = {};
                    arr2['projects_total'] = projects_total;
                    arr2['projects_commercial'] = projects_commercial;
                    arr2['projects_residencial'] = projects_residencial;
                    total_arr.push(arr2);
                    if(responseText.length > 0){
                         res.status(200).json({
                          data: total_arr,
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
                });
  };


   const dashboardAttendance = async (req, res) => {

    let token=req.headers.token;
        let setdata = "";
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.', success: 0});
  
          jwt.verify(token, process.env.JWT_SCRT, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
            
            // return res.status(200).send(decoded.id.id);
            setdata = decoded.id.id;
            console.log(decoded);
        });

            let uid = req.params.userId
            if(!uid){

              query = {"userId": "","month": "11"};
              var projectData = await userAttendanceOperations.getAllAttendanceSum(query);
            const promise = userAttendanceOperations.getAllAttendanceSum(query)
              promise
              .then((data)=>{
                console.log(data);
                  let arr = [];
                  let total_arr = [];
                  var arr2 = {};
                    var attendence_total_emp = 40;
                    var attendence_present_today = 0;
                    var attendence_absent_today = 0;
                    var attendence_leave_today = 0;
                    var attendence_late_today = 0;
                  // total_arr.push(arr2);
                    setQuery = "new";
                    
                    projects_total = projectData.length;
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    // console.log(req);
                    var allDataExpectNew = 0;
                    
                    if(req.work_type == "Present"){
                        attendence_present_today = Number(attendence_present_today) + 1;
                      }
                       if(req.work_type == "Leave"){
                        attendence_leave_today = Number(attendence_leave_today) + 1;
                      }
                       if(req.work_type == ""){
                        attendence_absent_today = Number(attendence_absent_today) + 1;
                      }
                    
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText);
                  var arr2 = {};
                      arr2['attendence_total_emp'] = attendence_total_emp;
                      arr2['attendence_present_today'] = attendence_present_today;
                      arr2['attendence_absent_today'] = attendence_absent_today;
                      arr2['attendence_leave_today'] = attendence_leave_today;
                      arr2['attendence_late_today'] = attendence_late_today;
                    total_arr.push(arr2);
                    if(responseText.length > 0){
                         res.status(200).json({
                          data: total_arr,
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
                });

            }else{

              query = {"userId": uid,"month": "11"};
          var projectData = await userAttendanceOperations.getAllAttendanceSum(query);
            const promise = userAttendanceOperations.getAllAttendanceSum(query)
              promise
              .then((data)=>{
                console.log(data);
                  let arr = [];
                  let total_arr = [];
                  var arr2 = {};
                      var attendence_my_current_month = 30;
                    var attendence_my_current_month_present = 0;
                    var attendence_my_current_month_absent = 0;
                    var attendence_my_current_month_leave = 0;
                    var attendence_my_current_month_late = 0;
                  // total_arr.push(arr2);
                    setQuery = "new";
                    
                    projects_total = projectData.length;
                 var arrrr = Promise.all(data.map(async (element) => {
                    var req = element;
                    // console.log(req);
                    var allDataExpectNew = 0;
                    
                    if(req.work_type == "Present"){
                        attendence_my_current_month_present = Number(attendence_my_current_month_present) + 1;
                      }
                       if(req.work_type == "Leave"){
                        attendence_my_current_month_leave = Number(attendence_my_current_month_leave) + 1;
                      }
                       if(req.work_type == ""){
                        attendence_my_current_month_absent = Number(attendence_my_current_month_absent) + 1;
                      }
                    
                    }
                  )
                ).then((responseText) => {
                  // console.log(responseText);
                  var arr2 = {};
                      arr2['attendence_my_current_month'] = attendence_my_current_month;
                      arr2['attendence_my_current_month_present'] = attendence_my_current_month_present;
                      arr2['attendence_my_current_month_absent'] = attendence_my_current_month_absent;
                      arr2['attendence_my_current_month_leave'] = attendence_my_current_month_leave;
                      arr2['attendence_my_current_month_late'] = attendence_my_current_month_late;
                    total_arr.push(arr2);
                    if(responseText.length > 0){
                         res.status(200).json({
                          data: total_arr,
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
                });

            }
  
  
  };




module.exports = { dashboardAttendance,dashboardProject,dashboardMylead,saveChangePasswordByAdmin,dashboard,checkPunchIn,testDT,updateUserLoan,createSalary,getSalary,getRole,addRole,updateRole,getUserDoc,addUserDoc,updateUserDoc,attendanceApprove,leaveApprove,addAttendanceDummy,updateOrganization,addOrganiation,saveChangePassword,deactivateUser,register, loginUser, loginWithPhone, resetUserPassword, saveResetPassword, addUserOffice, addUserBank, addUserLeave, addUserSalary, addUserLoan, punchIn, punchOut, addUserApplyLeave, updateUserBank, updateUserPersonal, updateUserOffice, updateUserLeave, updateUserSalary };
