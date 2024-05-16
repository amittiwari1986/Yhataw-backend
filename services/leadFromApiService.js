const leadFromApiModel = require("../db/models/LeadFromApiModel");
const leadFromApiServices = {
   async addLead(UserObject){
        const promise = await leadFromApiModel.create(UserObject);
        return promise
    },
    async addManyLead(UserObject){
        const promise = await leadFromApiModel.insertMany(UserObject);
        return promise
    },
    async updateLead(id,data){
        const promise = await leadFromApiModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = leadFromApiModel.findByIdAndDelete(id);
        return promise
    },
    async findOneLeadId(roleId){
        const promise = await leadFromApiModel.findOne({roleId})
        return promise 
    },
    async findLeadId(stateId){
        const promise = await leadFromApiModel.find({stateId})
        return promise 
    },
    async getLeadById(id){
        const promise = await leadFromApiModel.findById(id).sort({updatedAt:-1})
        return promise
    },
    async getLeadByUploadLeadId(uploadLeadId){
        const promise = await leadFromApiModel.find({uploadLeadId})
        return promise
    },
    async getLeadCountStageWise(stage){
        const promise = await leadFromApiModel.find({"stage":stage}).count();
        return promise
    },
    async getLeadCountSourceWise(stage,source){
        const promise = await leadFromApiModel.find({"stage":stage,"source":source}).count();
        return promise
    },
    async getLeadCountProjectWise(stage,projectId){
        const promise = await leadFromApiModel.find({"stage":stage,"projectId":projectId}).count();
        return promise
    },
    async getLeadCountProjectWiseNotStage(stage,projectId){
        const promise = await leadFromApiModel.find({"stage":{"$ne": stage}}).count();
        return promise
    },
    async getAllleadData(source){
        const promise = leadFromApiModel.find({"source":source});
         return promise
    },
    async getAllleadDataByProjectId(projectId){
        const promise = leadFromApiModel.find({"projectId":projectId});
         return promise
    },
    
    
}

module.exports = leadFromApiServices;