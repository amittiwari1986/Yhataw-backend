const UserOfficeModel = require("../db/models/UserOfficeModel");
const userOfficeSerives = {
   async addUserOffice(UserObject){
        const promise = await UserOfficeModel.create(UserObject);
        return promise
    },
    async updateUserOffice(id,data){
        const promise = await UserOfficeModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = UserOfficeModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await UserOfficeModel.findOne({userId})
        return promise 
    },
    async findUserId(userId){
        const promise = await UserOfficeModel.find({userId})
        return promise 
    },
    async getUserOfficeById(id){
        const promise = await UserOfficeModel.findById(id)
        return promise
    }
}

module.exports = userOfficeSerives;