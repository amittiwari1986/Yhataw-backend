const leadModel = require("../db/models/LeadModel");
const leadServices = {
   async addLead(UserObject){
        const promise = await leadModel.create(UserObject);
        return promise
    },
    async updateLead(id,data){
        const promise = await leadModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = leadModel.findByIdAndDelete(id);
        return promise
    },
    async findOneLeadId(roleId){
        const promise = await leadModel.findOne({roleId})
        return promise 
    },
    async findLeadId(stateId){
        const promise = await leadModel.find({stateId})
        return promise 
    },
    async getLeadById(id){
        const promise = await leadModel.findById(id)
        return promise
    },
    async getAllLead(query){
        const promise = query ? await leadModel.find().sort({_id:-1}).limit(5): await leadModel.find()
        return promise
    },
}

module.exports = leadServices;