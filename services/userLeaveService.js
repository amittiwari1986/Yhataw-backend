const UserLeaveModel = require("../db/models/UserLeaveModel");
const userLeaveSerives = {
   async addUserLeave(UserObject){
        const promise = await UserLeaveModel.create(UserObject);
        return promise
    },
    async updateUserLeave(id,data){
        const promise = await UserLeaveModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = UserLeaveModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await UserLeaveModel.findOne({userId})
        return promise 
    },
    async findUserId(userId){
        const promise = await UserLeaveModel.find({userId})
        return promise 
    },
    async getUserLeaveById(id){
        const promise = await UserLeaveModel.findById(id)
        return promise
    }
}

module.exports = userLeaveSerives;