const UserModel = require("../db/models/UserModel");
const userSerives = {
   async addUser(UserObject){
        const promise = await UserModel.create(UserObject);
        return promise
    },
    async login(email){
        const promise = await UserModel.findOne({email})
        return promise 
    },
    async findOneEmail(email){
        const promise = await UserModel.findOne({email})
        return promise 
    },
    async loginWithMobile(phone){
        const promise = await UserModel.findOne({phone})
        return promise 
    },
    async updateUser(id,data){
        const promise = await UserModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async getAllUsers(id){
        const promise = await UserModel.find({ _id: { $ne: id } })
        return promise
    }, 
    async findOneUserId(userId){
        const promise = await UserModel.findOne({userId})
        return promise
    },
    // async delete(id){
    //     const promise = UserModel.findByIdAndDelete(id);
    //     return promise
    // },
    async getUserById(id){
        const promise = await UserModel.findById(id)
        return promise
    }
}

module.exports = userSerives;