const UserAttendanceModel = require("../db/models/UserAttendanceModel");
const userAttendanceSerives = {
   async addUserAttendance(UserObject){
        const promise = await UserAttendanceModel.create(UserObject);
        return promise
    },
    async updateUserAttendance(id,data){
        const promise = await UserAttendanceModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = UserAttendanceModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await UserAttendanceModel.findOne({userId})
        return promise 
    },
    async findUserId(userId){
        const promise = await UserAttendanceModel.find({userId})
        return promise 
    },
    async getUserAttendanceById(id){
        const promise = await UserAttendanceModel.findById(id)
        return promise
    }
}

module.exports = userAttendanceSerives;