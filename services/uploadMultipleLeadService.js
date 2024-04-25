const uploadMultipleLeadModel = require("../db/models/UploadMultipleLeadModel");
const uploadMultipleLeadSerives = {
   async addUploadMultipleLead(UserObject){
        const promise = await uploadMultipleLeadModel.create(UserObject);
        return promise
    },
    async updateUploadMultipleLead(id,data){
        const promise = await uploadMultipleLeadModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = uploadMultipleLeadModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await uploadMultipleLeadModel.findOne({userId})
        return promise 
    },
    async findUploadMultipleLeadId(stateId){
        const promise = await uploadMultipleLeadModel.find({stateId})
        return promise 
    },
    async getUploadMultipleLeadById(id){
        const promise = await uploadMultipleLeadModel.findById(id)
        return promise
    },
    async getAllUploadMultipleLead(query){
        const promise = query ? await uploadMultipleLeadModel.find().sort({_id:-1}).limit(5): await uploadMultipleLeadModel.find()
        return promise
    },
}

module.exports = uploadMultipleLeadSerives;