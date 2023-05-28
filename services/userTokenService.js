const UserTokenModel = require("../db/models/UserTokenModel");
const jwt = require("jsonwebtoken")
const userTokenSerives = {
   async addUserToken(UserObject){
        const promise = await UserTokenModel.create(UserObject);
        return promise
    },
    // async login(email){
    //     const promise = await UserTokenModel.findOne({email})
    //     return promise 
    // },
    async checkToken(userId){
        const promise = await UserTokenModel.findOne({userId})
        return promise 
    },
    async updateUserToken(id,data){
        const promise = await UserTokenModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    }
    // async getAllUsers(query){
    //     const promise = query ? await UserTokenModel.find().sort({_id:-1}).limit(5): await UserTokenModel.find()
    //     return promise
    // },
    // async delete(id){
    //     const promise = UserTokenModel.findByIdAndDelete(id);
    //     return promise
    // },
    // async getUserById(id){
    //     const promise = await UserTokenModel.findById(id)
    //     return promise
    // }
}

module.exports = userTokenSerives;