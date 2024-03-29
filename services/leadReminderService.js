const leadReminderModel = require("../db/models/LeadReminderModel");
const leadReminderServices = {
   async addLeadReminder(UserObject){
        const promise = await leadReminderModel.create(UserObject);
        return promise
    },
    async updateLeadReminder(id,data){
        const promise = await leadReminderModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = leadReminderModel.findByIdAndDelete(id);
        return promise
    },
    async findOneLeadReminderLeadId(leadId){
        const promise = await leadReminderModel.findOne({leadId})
        return promise 
    },
    async findLeadReminderLeadId(leadId,userId){
        console.log(userId);
        if(userId == 'NA'){
            const promise = await leadReminderModel.find({leadId}).sort({createdAt:-1})
            return promise 
        }else{
            const promise = await leadReminderModel.find({"leadId": leadId, "userId": userId}).sort({createdAt:-1})
            return promise 
        }
        
    },
    async getLeadReminderById(id){
        const promise = await leadReminderModel.findById(id)
        return promise
    },
    async getAllLeadReminder(query){
        const promise = query ? await leadReminderModel.find().sort({_id:-1}).limit(5): await leadReminderModel.find()
        return promise
    },
}

module.exports = leadReminderServices;