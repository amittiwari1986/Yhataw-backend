const UserLoanDeclarationModel = require("../db/models/UserLoanDeclarationModel");
const userLoanDeclarationSerives = {
   async addUserLoanDeclaration(UserObject){
        const promise = await UserLoanDeclarationModel.create(UserObject);
        return promise
    },
    async updateUserLoanDeclaration(id,data){
        const promise = await UserLoanDeclarationModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = UserLoanDeclarationModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await UserLoanDeclarationModel.findOne({userId})
        return promise 
    },
    async findAllLoanUserId(userId){
        const promise = await UserLoanDeclarationModel.find({userId})
        return promise 
    },
    async getUserLoanDeclarationById(id){
        const promise = await UserLoanDeclarationModel.findById(id)
        return promise
    },
    async getAllUserLoanDeclaration(query){
        const promise = query ? await UserLoanDeclarationModel.find().sort({_id:-1}).limit(5): await UserLoanDeclarationModel.find()
        return promise
    }
}

module.exports = userLoanDeclarationSerives;