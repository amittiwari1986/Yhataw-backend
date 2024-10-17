const leadLogModel = require("../db/models/LeadLogModel");
const leadLogSerives = {
   async addLeadLog(UserObject){
        const promise = await leadLogModel.create(UserObject);
        return promise
    },
    async updateLeadLog(id,data){
        const promise = await leadLogModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async addManyLeadLog(UserObject){
        const promise = await leadLogModel.insertMany(UserObject);
        return promise
    },
    async delete(id){
        const promise = leadLogModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await leadLogModel.findOne({userId})
        return promise 
    },
    async findLeadLogByLeadId(leadId){
        // const promise = await leadLogModel.find({"leadId": leadId})
        // return promise 

        const promise = await leadLogModel.aggregate(
            [
             {
                "$match": {"leadId": leadId}
             },
            { "$project": { "log_id": { "$toString": "$_id" },
                "user_id": { "$toObjectId": "$userId" },
                "leadId": { "$toString": "$leadId" },
                "userId": { "$toString": "$userId" },
                "old_value": { "$toString": "$old_value" },
                "new_value": { "$toString": "$new_value" },
                "updatedAt": { "$toString": "$updatedAt" },
            }},
                {$lookup: 
                    {from: "users", 
                    localField: "user_id", 
                    foreignField: "_id", 
                    as: "users"}
                },
                { $sort : { updatedAt : -1} }])

        
        return promise
    },
    async getLeadLogById(id){
        const promise = await leadLogModel.findById(id)
        return promise
    },
    async getAllLeadLog(query){
        const promise = query ? await leadLogModel.find().sort({_id:-1}).limit(5): await leadLogModel.find()
        return promise
    },
}

module.exports = leadLogSerives;