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
        // const promise = query ? await leadModel.find().sort({_id:-1}).limit(5): await leadModel.find()

         const promise = await leadModel.aggregate(
            [
             {
                "$match": {"date": {"$gte": query.start_date, "$lte": query.end_date}}
             },
            { "$project": { "_id": { "$toString": "$_id" },
                "form_name": { "$toString": "$form_name" },
                "formId": { "$toString": "$formId" },
                "developerId": { "$toString": "$developerId" },
                "projectId": { "$toString": "$projectId" },
                "projecttypeId": { "$toString": "$projecttypeId" },
                "leadName": { "$toString": "$leadName" },
                "leadEmail": { "$toString": "$leadEmail" },
                "status": { "$toString": "$status" },
                "leadPhone": { "$toString": "$leadPhone" },
                "AssignTo": { "$toString": "$AssignTo" },
                "AssignToUser": { "$toString": "$AssignToUser" },
                "source": { "$toString": "$source" },
                "uid": { "$toString": "$uid" },
                "stage": { "$toString": "$stage" },
                "dynamicFields": { "$toString": "$dynamicFields" },
                "create_date": { "$toString": "$date" },
                "updatedAt": { "$toString": "$updatedAt" },
            }},
                { $sort : { updatedAt : -1} }])

        return promise
    },
}

module.exports = leadServices;