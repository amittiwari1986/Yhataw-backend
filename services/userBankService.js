const UserBankModel = require("../db/models/UserBankModel");
const userBankSerives = {
   async addUserBank(UserObject){
        const promise = await UserBankModel.create(UserObject);
        return promise
    },
    async updateUserBank(id,data){
        const promise = await UserBankModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = UserBankModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await UserBankModel.findOne({userId})
        return promise 
    },
    async getUserBankById(id){
        const promise = await UserBankModel.findById(id)
        return promise
    }
}

module.exports = userBankSerives;