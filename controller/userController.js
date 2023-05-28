const UserService = require("../services/userService")
const UserTokenService = require("../services/userTokenService")
const UserBankService = require("../services/userBankService")
const UserLeaveService = require("../services/userLeaveService")
const UserOfficeService = require("../services/userOfficeService")
const UserSalaryDeclarationService = require("../services/userSalaryDeclarationService")
const UserLoanDeclarationService = require("../services/userLoanDeclarationService")
const UserAttendanceService = require("../services/userAttendanceService")
const UserApplyLeaveService = require("../services/userApplyLeaveService")
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
                res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
            })
        }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0, error_msg: err.message });
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
                res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
            })
        }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0, error_msg: err.message });
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
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0, error_msg: err.message });
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
                console.log(data)
                const {password,...others} = data._doc
                res.status(200).json({
                    data: others,
                    success: 1
                })
            })
            .catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
            })
        }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0, error_msg: err.message });
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
        if(setdata){
            const query = req.query.new 
            const promise = UserService.getAllUsers(query);
            promise.then((data)=>{
                res.status(200).json({
                    data: data,
                    success: 1
                })
                console.log(data)
            }).catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
            })
        }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0, error_msg: err.message });
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
            let id = req.params.id
            const promise = UserBankService.findOneUserId(id)
            promise
            .then((data)=>{
                console.log(data)
                const {password,...others} = data._doc
                res.status(200).json({
                    data: others,
                    success: 1
                })
            })
            .catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "Data not found", success: 0, error_msg: err.message});
            })
        }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0, error_msg: err.message });
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
                const {password,...others} = data._doc
                res.status(200).json({
                    data: others,
                    success: 1
                })
            })
            .catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "Data not found", success: 0, error_msg: err.message});
            })
        }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0, error_msg: err.message });
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
                console.log(data)
                const {password,...others} = data._doc
                res.status(200).json({
                    data: others,
                    success: 1
                })
            })
            .catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "Data not found", success: 0, error_msg: err.message});
            })
        }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0, error_msg: err.message });
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
                console.log(data)
                const {password,...others} = data._doc
                res.status(200).json({
                    data: others,
                    success: 1
                })
            })
            .catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "Data not found", success: 0, error_msg: err.message});
            })
        }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0, error_msg: err.message });
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
                console.log(data)
                const {password,...others} = data._doc
                res.status(200).json({
                    data: others,
                    success: 1
                })
            })
            .catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "Data not found", success: 0, error_msg: err.message});
            })
        }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0, error_msg: err.message });
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
            let id = req.params.id
            const promise = UserAttendanceService.findOneUserId(id)
            promise
            .then((data)=>{
                console.log(data)
                const {password,...others} = data._doc
                res.status(200).json({
                    data: others,
                    success: 1
                })
            })
            .catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
            })
        }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0, error_msg: err.message });
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
            let id = req.params.id
            const promise = UserApplyLeaveService.findOneUserId(id)
            promise
            .then((data)=>{
                console.log(data)
                const {password,...others} = data._doc
                res.status(200).json({
                    data: others,
                    success: 1
                })
            })
            .catch((err)=>{
                // console.log(err.message)
                res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
            })
        }else{
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', success: 0, error_msg: err.message });
        }
    }
}

module.exports = userController