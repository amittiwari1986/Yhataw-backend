const UserApplyLeaveModel = require("../db/models/UserApplyLeaveModel");
const userApplyLeaveSerives = {
   async addUserApplyLeave(UserObject){
        const promise = await UserApplyLeaveModel.create(UserObject);
        return promise
    },
    async updateUserApplyLeave(id,data){
        const promise = await UserApplyLeaveModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = UserApplyLeaveModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserApplyLeaveId(userId){
        const promise = await UserApplyLeaveModel.findOne({userId})
        return promise 
    },
    async findUserApplyLeaveId(userId){
        const promise = await UserApplyLeaveModel.find({userId})
        return promise 
    },
    async getUserApplyLeaveById(id){
        const promise = await UserApplyLeaveModel.findById(id)
        return promise
    },
     async getAllUserApplyLeave(query){
        const promise = query ? await UserApplyLeaveModel.find().sort({_id:-1}).limit(5): await UserApplyLeaveModel.find()
        return promise
     }
}

module.exports = userApplyLeaveSerives;