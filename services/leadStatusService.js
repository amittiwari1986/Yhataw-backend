const leadStatusModel = require("../db/models/LeadStatusModel");
const leadStatusSerives = {
   async addLeadStatus(UserObject){
        const promise = await leadStatusModel.create(UserObject);
        return promise
    },
    async updateLeadStatus(id,data){
        const promise = await leadStatusModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = leadStatusModel.findByIdAndDelete(id);
        return promise
    },
    async findOneLeadStatusId(userId){
        const promise = await leadStatusModel.findOne({userId})
        return promise 
    },
    async findLeadStatusId(stateId){
        const promise = await leadStatusModel.find({stateId})
        return promise 
    },
    async getLeadStatusById(id){
        const promise = await leadStatusModel.findById(id)
        return promise
    },
    async getAllLeadStatus(query){
        const promise = query ? await leadStatusModel.find().sort({_id:-1}).limit(5): await leadStatusModel.find()
        return promise
    },
}

module.exports = leadStatusSerives;