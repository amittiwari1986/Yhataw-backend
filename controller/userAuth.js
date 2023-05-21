const userOperations = require("../services/userService");
const userOfficeOperations = require("../services/userOfficeService");
const userBankOperations = require("../services/userBankService");
const userLeaveOperations = require("../services/userLeaveService");
//const userSalaryOperations = require("../services/userSalaryService");
const userTokens = require("../services/userTokenService");
const User = require("../dto/userdto");
const UserToken = require("../dto/usertokendto");
const UserOffice = require("../dto/userofficeto");
const UserBank = require("../dto/userbankto");
const UserLeave = require("../dto/userleaveto");
//const UserSalary = require("../dto/usersalaryto");
const bcrypt = require("../utils/encrypt");
const token = require("../utils/token");
const otpGenerator = require('otp-generator');
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken")

const {
  PHONE_NOT_FOUND_ERR,

  PHONE_ALREADY_EXISTS_ERR,
  USER_NOT_FOUND_ERR,
  INCORRECT_OTP_ERR,
  ACCESS_DENIED_ERR,
} = require("../messages/errors");

//User Registration
const register = (req, res) => {
  let hashPassword = bcrypt.doEncrypt(req.body.password);
  const user = new User(
    req.body.name,
    hashPassword,
    req.body.phone,
    req.body.email,
    req.body.phoneOtp,
    req.body.whatsapp,
    req.body.dob,
    req.body.martial_status,
    req.body.gender,
    req.body.address,
    req.body.country_id,
    req.body.state_id,
    req.body.city,
    req.body.zipcode,
  );
  const promise = userOperations.addUser(user);
  promise
    .then((data) => {
      res.status(201).json({
        message: "Registration Successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

const addUserOffice = (req, res) => {
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
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

const addUserBank = (req, res) => {
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
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

const addUserLeave = (req, res) => {
  const userLeave = new UserLeave(
    req.body.userId,
    req.body.total_leave,
    req.body.earned_leave,
    req.body.sick_leave,
    req.body.casual_leave,
  );
  const promise = userLeaveOperations.addUserLeave(userLeave);
  promise
    .then((data) => {
      res.status(201).json({
        message: "Save Successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

const addUserSalary = (req, res) => {
  // const userSalary = new UserSalary(
  //   req.body.userId,
  //   req.body.total_leave,
  //   req.body.earned_leave,
  //   req.body.sick_leave,
  //   req.body.casual_leave,
  // );
  // const promise = userSalaryperations.addUserSalary(userSalary);
  // promise
  //   .then((data) => {
  //     res.status(201).json({
  //       message: "Save Successfully",
  //       data: data,
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(500).json(err.message);
  //   });
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
      return res.status(400).json({ message: "User not found" });
    }

    res.status(201).json({
      data: {
        userId: user._id,
      },
      settings: {
            success: 1,
            message: `OTP sended to your registered phone number`,
          },
    });

    const otp = otpGenerator.generate(8, { upperCaseAlphabets: false, specialChars: false });
    // // save otp to user collection
    user.phoneOtp = otp;
    // // user.isAccountVerified = true;
    await userOperations.updateUser(user._id,user);

  } else {

    let email = req.body.username;
    let password = req.body.password;
    let user = await userOperations.login(email);
    // let tokens = await userTokens.checkToken(user._id);
    if (user) {
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
        user = {
          _id: user._id,
          accessToken,
          fullName: user.name,
          email: user.email,
          role: 1,
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
        return res.status(400).json({ message: "User not found" });
      }

      if (user.phoneOtp !== otp) {
        return res.status(400).json({ message: "Please check OTP and enter again" });
      }
      const accessToken = token.createToken({
        id: user._id,
        isAdmin: false,
      });
      // console.log(accessToken);
      res.status(201).json({
        data: {
        _id: user._id,
        accessToken,
        fullName: user.name,
        lastUpdate: new Date(),
        name: user.name,
        },
        settings: {
          success: 0,
          message: `OTP verified successfully`,
        },
      });
    } catch (error) {
      return res.status(400).json({ message: "User not found" });
    }

};

const updateUser = async (req, res) => {
  let data;


    try {
      let user = await userOperations.loginWithMobile(phone);

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }


      user.phoneOtp = otp;
      await userOperations.updateUser(user._id,user);
    } catch (error) {
      return res.status(400).json({ message: "User not found" });
    }

};

const resetUserPassword = async (req, res) => {
 const { email } = req.body;
  const user = await userOperations.findOneEmail(email);
  if (!user) {
    res.status(404);
    res.json({ message: "the email provided was not found" });
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
    try {
      let subject = 'Reset Password Link - Amit.com';
      let html = '<p>You requested for reset password, kindly use this <a href="http://localhost:5000/reset-password?token=' + token + '">link</a> to reset your password</p>';
      await sendEmail.sendEmail(user.email, subject, html);
      res.status(200);
      res.json({
        message: `a link to reset your password has been sent to: ${user.email}`,
      });
    } catch (error) {
      res.status(500);
      res.json({ message: error });
    }
  } else {
    res.status(500);
    res.json({ message: "Internal Server Error" });
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
      user.password = bcrypt.doEncrypt(req.body.password);;
      await userOperations.updateUser(user._id,user);
      res.status(200);
      res.json({ message: `Password change Successfully` });
    } catch (error) {
      res.status(404);
      res.json({ message: `an error occured: ${error}` });
    }
  }else{
    res.status(500)
    res.json({message: "an error occured"})
  }
};
module.exports = { register, loginUser, loginWithPhone, resetUserPassword, saveResetPassword, addUserOffice, addUserBank, addUserLeave, addUserSalary };
