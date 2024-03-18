const leadRemarkModel = require("../db/models/LeadRemarkModel");
const leadRemarkServices = {
   async addLeadRemark(UserObject){
        const promise = await leadRemarkModel.create(UserObject);
        return promise
    },
    async updateLeadRemark(id,data){
        const promise = await leadRemarkModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = leadRemarkModel.findByIdAndDelete(id);
        return promise
    },
    async findOneLeadRemarkLeadId(leadId){
        const promise = await leadRemarkModel.findOne({leadId})
        return promise 
    },
    async findLeadRemarkLeadId(leadId,userId){
        console.log(userId);
        if(userId == 'NA'){
            const promise = await leadRemarkModel.find({leadId}).sort({createdAt:-1})
            return promise 
        }else{
            const promise = await leadRemarkModel.find({"leadId": leadId, "userId": userId}).sort({createdAt:-1})
            return promise 
        }
        
    },
    async getLeadRemarkById(id){
        const promise = await leadRemarkModel.findById(id)
        return promise
    },
    async getAllLeadRemark(query){
        const promise = query ? await leadRemarkModel.find().sort({_id:-1}).limit(5): await leadRemarkModel.find()
        return promise
    },
}

module.exports = leadRemarkServices;