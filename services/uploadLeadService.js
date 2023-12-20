const uploadLeadModel = require("../db/models/UploadLeadModel");
const uploadLeadSerives = {
   async addUploadLead(UserObject){
        const promise = await uploadLeadModel.create(UserObject);
        return promise
    },
    async updateUploadLead(id,data){
        const promise = await uploadLeadModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = uploadLeadModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await uploadLeadModel.findOne({userId})
        return promise 
    },
    async findUploadLeadId(stateId){
        const promise = await uploadLeadModel.find({stateId})
        return promise 
    },
    async getUploadLeadById(id){
        const promise = await uploadLeadModel.findById(id)
        return promise
    },
    async getAllUploadLead(query){
        const promise = query ? await uploadLeadModel.find().sort({_id:-1}).limit(5): await uploadLeadModel.find()
        return promise
    },
}

module.exports = uploadLeadSerives;