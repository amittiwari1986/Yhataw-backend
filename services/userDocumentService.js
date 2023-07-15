const userDocumentModel = require("../db/models/UserDocumentModel");
const userDocumentServices = {
   async addUserDocument(UserObject){
        const promise = await userDocumentModel.create(UserObject);
        return promise
    },
    async updateUserDocument(id,data){
        const promise = await userDocumentModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = userDocumentModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserDocumentId(userId){
        const promise = await userDocumentModel.findOne({userId})
        return promise 
    },
    async findUserDocumentId(stateId){
        const promise = await userDocumentModel.find({stateId})
        return promise 
    },
    async getUserDocumentById(id){
        const promise = await userDocumentModel.findById(id)
        return promise
    },
    async getAllUserDocument(query){
        const promise = query ? await userDocumentModel.find().sort({_id:-1}).limit(5): await userDocumentModel.find()
        return promise
    },
}

module.exports = userDocumentServices;