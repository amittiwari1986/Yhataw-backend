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
    async addManyLeadMapping(UserObject){
        const promise = await LeadMappingModel.insertMany(UserObject);
        return promise
    },
    async delete(id){
        const promise = LeadMappingModel.findByIdAndDelete(id);
        return promise
    },
    async deleteLeadId(leadId){
        const query = { lead_id: "66323a0a72f553c4a688a8c5" };
        console.log(query);
        const promise = await LeadMappingModel.deleteMany(query);
         return promise 
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
      async getAllLead(query){

        if(query.start_date != ''){

            const promise = await LeadMappingModel.aggregate(
            [
             {
                "$match": {"date": {"$gte": query.start_date, "$lte": query.end_date}}
             },
            { "$project": { "_id": { "$toString": "$_id" },
                "lead_id": { "$toObjectId": "$lead_id" },
                "user_id": { "$toString": "$user_id" },
                "type": { "$toString": "$type" },
                "updatedAt": { "$toString": "$updatedAt" },
            }},
            {$lookup: 
                    {from: "lead", 
                    localField: "id", 
                    foreignField: "lead_id",
                    as: "leads"}
                },
                {"$unwind":"$mapping"},
                {"$match":{"leads.team_id": query.lead_id}},
                { $sort : { updatedAt : -1} },
                  { $facet : { metadata: [ { $count: "total" }, { $addFields: { page: query.page } } ],
                            data: [ { $skip: query.skip }, { $limit: query.limit } ]
        } }])

        return promise

        }else{

             const promise = await LeadMappingModel.aggregate(
            [
             
            { "$project": { "_id": { "$toString": "$_id" },
                "lead_id": { "$toObjectId": "$lead_id" },
                "user_id": { "$toString": "$user_id" },
                "type": { "$toString": "$type" },
                "updatedAt": { "$toString": "$updatedAt" },
            }},
            {$lookup: 
                    {from: "leads", 
                    localField: "_id", 
                    foreignField: "lead_id",
                    as: "leads"}
                },
                {"$unwind":"$leads"},
                {"$match":{"leads.team_id": query.lead_id}},
                { $sort : { updatedAt : -1} },
                  { $facet : { metadata: [ { $count: "total" }, { $addFields: { page: query.page } } ],
                            data: [ { $skip: query.skip }, { $limit: query.limit } ]
        } }])
        return promise

        }
         
    },
}

module.exports = LeadMappingSerives;