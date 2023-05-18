const UserSalaryDeclarationModel = require("../db/models/UserSalaryDeclarationModel");
const userSalaryDeclarationSerives = {
   async addUserSalaryDeclaration(UserObject){
        const promise = await UserSalaryDeclarationModel.create(UserObject);
        return promise
    },
    async updateUserSalaryDeclaration(id,data){
        const promise = await UserSalaryDeclarationModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = UserSalaryDeclarationModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await UserSalaryDeclarationModel.findOne({userId})
        return promise 
    },
    async getUserSalaryDeclarationById(id){
        const promise = await UserSalaryDeclarationModel.findById(id)
        return promise
    }
}

module.exports = userSalaryDeclarationSerives;