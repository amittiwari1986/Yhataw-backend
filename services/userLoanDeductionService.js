const UserLoanDeductionModel = require("../db/models/UserLoanDeductionModel");
const userLoanDeductionSerives = {
   async addUserLoanDeduction(UserObject){
        const promise = await UserLoanDeductionModel.create(UserObject);
        return promise
    },
    async updateUserLoanDeduction(id,data){
        const promise = await UserLoanDeductionModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = UserLoanDeductionModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await UserLoanDeductionModel.findOne({userId})
        return promise 
    },
    async getUserLoanDeductionById(id){
        const promise = await UserLoanDeductionModel.findById(id)
        return promise
    }
}

module.exports = userLoanDeductionSerives;