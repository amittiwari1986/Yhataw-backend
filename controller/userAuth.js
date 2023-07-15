const userOperations = require("../services/userService");
const userOfficeOperations = require("../services/userOfficeService");
const userBankOperations = require("../services/userBankService");
const userLeaveOperations = require("../services/userLeaveService");
const userApplyLeaveOperations = require("../services/userApplyLeaveService");
const userSalaryDeclarationOperations = require("../services/userSalaryDeclarationService");
const userLoanDeclarationOperations = require("../services/userLoanDeclarationService");
const userAttendanceOperations = require("../services/userAttendanceService");
const organizationOperations = require("../services/organizationService");
const userTokens = require("../services/userTokenService");
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
    

    let hashPassword = bcrypt.doEncrypt(req.body.password);
    let role = 2;
    let status = 1;
    let inComplete = 0;
    const user = new User(
      req.body.name,
      hashPassword,
      role,
      req.body.phone,
      req.body.email,
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
    const promise = userOperations.getUserById(id);
    promise
      .then((data) => {
        // console.log(data);
        if(data){
          const userOffice = new UserOffice(
              req.body.userId,
              req.body.emp_type,
              req.body.department,
              req.body.designation,
              req.body.joining,
              req.body.working_days,
              req.body.working_shift,
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
  console.log(isnum);

  if(isnum == false){

    let phone = req.body.username;
    let user = await userOperations.loginWithMobile(phone);

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
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.phoneOtp = otp;
    
    res.status(200).json({
      data: {
        userId: user._id,
      },
      settings: {
            success: 1,
            message: `OTP sended to your registered phone number. otp is ${otp}`,
          },
    });
    // // user.isAccountVerified = true;
    await userOperations.updateUser(user._id,user);

  } else {

    let email = req.body.username;
    
    let user = await userOperations.login(email);
    let role = "";
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
        }else if(user.userRole == 3){
           role = "Hr";
        }else{
          role = "User";
        }
        user = {
          _id: user._id,
          accessToken,
          fullName: user.name,
          email: user.email,
          role: role,
          lastUpdate: new Date(),
          name: user.name,
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
  }
  
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
          success: 1,
          message: `OTP verified successfully`,
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

        user.userId = req.body.userId;
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

        user.userId = req.body.userId;
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
      try {
        let user = await userOfficeOperations.getUserOfficeById(id);

        if (!user) {
          return res.status(400).json({ success: 0, message: "Details not found" });
        };
        user.userId = req.body.userId;
        user.emp_type = req.body.emp_type;
        user.department = req.body.department;
        user.designation = req.body.designation;
        user.joining = req.body.joining;
        user.working_days = req.body.working_days;
        user.working_shift = req.body.working_shift;
        await userOfficeOperations.updateUserOffice(user._id,user);
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

          user.userId = req.body.userId;
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

      
       user.userId = req.body.userId;
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
  let hours = dt.getHours();
  let minutes = dt.getMinutes();
  let seconds = dt.getSeconds();
  // let date = ("0" + dt.getDate()).slice(-2);

  var day1 = day +'/' + month + '/' + year;

  let userAtt = await userAttendanceOperations.findUserByMultipleData(uid,day1);
  var datetime = hours  + ':' + minutes;
  if (userAtt[0].punch_in != "00:00") {
            return res.status(400).json({ success: 0, message: "You have already punch-in for Today" });
          }
    
    userAtt[0].punch_in = datetime;
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
    // console.log(getpunch_in);

    try {
      // console.log(req.body.id);
          let userAtt = await userAttendanceOperations.getUserAttendanceById(req.body.id);

          var startTime = new Date(getpunch_in); 
          var endTime = new Date(current_datetimecheck);
          var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
          var resultInMinutes = Math.round(difference / 60000);
          var hourss = Math.round(resultInMinutes / 60);
          var mint = resultInMinutes % 60;

          if (!userAtt) {
            return res.status(400).json({ success: 0, message: "User Attendence not found" });
          }
          if (userAtt.punch_out != "00:00") {
            return res.status(400).json({ success: 0, message: "User Attendence All ready updated" });
          }

          userAtt.punch_out = current_datetime;
          userAtt.working_hours = hourss+":"+mint;
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
      // console.log(user);
      if (!user) {
        return res.status(400).json({ message: "User Id not found",success: 0});
      }
    let status = 0;
    let date1 = req.body.from_date;
    let dates1 = date1.split("-")
    // console.log(dates1);
    var date_1 = dates1[2] + '/' + dates1[1] + '/' + dates1[0]  + ' 00:00';
    let date2 = req.body.to_date;
    let date1_1 = new Date(date_1);

    let dates2 = date2.split("-")
    var date_2 = dates2[2] + '/' + dates2[1] + '/' + dates2[0]  + ' 00:00';
    let date2_2 = new Date(date_2);
    var dateDiff = date2_2.getTime() - date1_1.getTime();
    var resultInMinutes = Math.round(dateDiff / 60000);
          var hourss = Math.round(resultInMinutes / 60);
          var day = Math.round(hourss / 24);
          if(hourss < 5){
            var days = 0.5;
          }else{
            var days = day+1;
          }
          
          var mint = resultInMinutes % 60;

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
            console.log(org);
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
    const users = await userOperations.getAllUsers();
     
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
        return res.status(400).json({ success: 0, message: "Details not found" });
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
       let uid = req.body.userId;
       let statusId = req.body.status;
        const user = await userOperations.getUserById(uid);
          // console.log(user);
          if (!user) {
            return res.status(400).json({ message: "User Id not found",success: 0});
          }

    

    try {
      // console.log(req.body.id);
          let userApplyLeave = await userApplyLeaveOperations.getUserApplyLeaveById(req.body.id);
          // console.log(userApplyLeave);

          if (!userApplyLeave) {
            return res.status(400).json({ success: 0, message: "User Leave not found" });
          }

          userApplyLeave.status = statusId;
          userApplyLeave.approver = uid;
          let updatedata = await userApplyLeaveOperations.updateUserApplyLeave(userApplyLeave._id,userApplyLeave);
          if(statusId == 1){
              message = "Leave Approved Successfully";
            }else{
              message = "Leave Rejected Successfully";
            }
           res.status(200).json({
            message: message,
            success: 1,
            data: updatedata,
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
            return res.status(400).json({ success: 0, message: "User Attendence not found1" });
          }

          userAttendance.status = statusId;
          userAttendance.approver = uid;
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
          return res.status(400).json({ success: 0, message: "User Attendence not found2", err: error });
        }

   }else{
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.', success: 0});
        }
};




module.exports = { attendanceApprove,leaveApprove,addAttendanceDummy,updateOrganization,addOrganiation,saveChangePassword,deactivateUser,register, loginUser, loginWithPhone, resetUserPassword, saveResetPassword, addUserOffice, addUserBank, addUserLeave, addUserSalary, addUserLoan, punchIn, punchOut, addUserApplyLeave, updateUserBank, updateUserPersonal, updateUserOffice, updateUserLeave, updateUserSalary };
