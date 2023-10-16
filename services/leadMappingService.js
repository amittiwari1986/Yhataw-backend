const LeadMappingModel = require("../db/models/LeadMappingModel");
const LeadMappingSerives = {
   async addLeadMapping(UserObject){
        const promise = await LeadMappingModel.create(UserObject);
        return promise
    },
    async updateLeadMapping(id,data){
        const promise = await LeadMappingModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = LeadMappingModel.findByIdAndDelete(id);
        return promise
    },
    async deleteLeadId(leadId){
        const query = { $regex: leadId };
        const result = await LeadMappingModel.deleteMany(query);
    },
    async findOneUserId(userId){
        const promise = await LeadMappingModel.findOne({userId})
        return promise 
    },
    async findLeadMappingId(stateId){
        const promise = await LeadMappingModel.find({stateId})
        return promise 
    },
    async getLeadMappingById(id){
        const promise = await LeadMappingModel.findById(id)
        return promise
    },
    async getAllLeadMapping(query){
        const promise = query ? await LeadMappingModel.find().sort({_id:-1}).limit(5): await LeadMappingModel.find()
        return promise
    },
}

module.exports = LeadMappingSerives;