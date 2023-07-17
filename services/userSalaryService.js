const UserSalaryModel = require("../db/models/UserSalaryModel");
const userSalarySerives = {
   async addUserSalary(UserObject){
        const promise = await UserSalaryModel.create(UserObject);
        return promise
    },
    async updateUserSalary(id,data){
        const promise = await UserSalaryModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = UserSalaryModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserSalaryId(userId){
        const promise = await UserSalaryModel.findOne({userId})
        return promise 
    },
    async findUserSalaryId(userId){
        const promise = await UserSalaryModel.find({"userId": userId})
        return promise 
    },
    async getUserSalaryById(id){
        const promise = await UserSalaryModel.findById(id)
        return promise
    },
    async getAllUserSalary(query){
        const promise = query ? await UserSalaryModel.find().sort({_id:-1}).limit(5): await UserSalaryModel.find()
        return promise
    },
}

module.exports = userSalarySerives;