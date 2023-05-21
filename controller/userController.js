const UserService = require("../services/userService")
const UserBankService = require("../services/userBankService")
const UserLeaveService = require("../services/userLeaveService")
const UserOfficeService = require("../services/userOfficeService")
const userController = {
    //User Update By Verify Token
    updateUser(req,res){
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
    },
    // Delete User
    deleteUser(req,res){
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
    },
    // Get User By id
    getUserByIds(req,res){
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
    },
    // fetch All Users
    fetchAllUser(req,res){
        const query = req.query.new
        console.log(query)
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
    },

    // Get User Bank By userid
    getUserBankByIds(req,res){
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
            res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
        })
    },

    // Get User leave By userid
    getUserLeaveByIds(req,res){
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
            res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
        })
    },

    // Get User office By userid
    getUserOfficeByIds(req,res){
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
            res.status(500).json({message: "Internal Server Error", success: 0, error_msg: err.message});
        })
    }
}

module.exports = userController