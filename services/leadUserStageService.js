const LeadUserStageModel = require("../db/models/LeadUserStageModel");
const LeadUserStageSerives = {
   async addLeadUserStage(UserObject){
        const promise = await LeadUserStageModel.create(UserObject);
        return promise
    },
    async updateLeadUserStage(id,data){
        const promise = await LeadUserStageModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async addManyLeadUserStage(UserObject){
        const promise = await LeadUserStageModel.insertMany(UserObject);
        return promise
    },
    async delete(id){
        const promise = LeadUserStageModel.findByIdAndDelete(id);
        return promise
    },
    async deleteLeadId(leadId){
        const query = { lead_id: leadId };
        const result = await LeadUserStageModel.deleteMany(query);
    },
    async findOneUserId(userId){
        const promise = await LeadUserStageModel.findOne({userId})
        return promise 
    },
    async findLeadUserStageId(leadId){
        const promise = await LeadUserStageModel.find({leadId})
        return promise 
    },
    async findLeadUserStageByleadIdUserId(leadId,userId){
        const promise = await LeadUserStageModel.findOne({ "lead_id": leadId, "user_id": userId})
        return promise 
    },
    async getLeadUserStageById(id){
        const promise = await LeadUserStageModel.findById(id)
        return promise
    },
    async getAllLeadUserStage(query){
        const promise = query ? await LeadUserStageModel.find().sort({_id:-1}).limit(5): await LeadUserStageModel.find()
        return promise
    },
    async getMultipleUser(query){
        const promise = query ? await LeadUserStageModel.find({ "lead_id": query.leadId,"user_id": { "$in": query.user } }).sort({_id:-1}).limit(5): await LeadUserStageModel.find({ "lead_id": query.leadId,"user_id": { "$in": query.user } })
        return promise
    },
}

module.exports = LeadUserStageSerives;