const leadSourceModel = require("../db/models/LeadSourceModel");
const leadSourceSerives = {
   async addLeadSource(UserObject){
        const promise = await leadSourceModel.create(UserObject);
        return promise
    },
    async updateLeadSource(id,data){
        const promise = await leadSourceModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = leadSourceModel.findByIdAndDelete(id);
        return promise
    },
    async findOneLeadSourceId(userId){
        const promise = await leadSourceModel.findOne({userId})
        return promise 
    },
    async findLeadSourceId(stateId){
        const promise = await leadSourceModel.find({stateId})
        return promise 
    },
    async getLeadSourceById(id){
        const promise = await leadSourceModel.findById(id)
        return promise
    },
    async getAllLeadSource(query){
        const promise = query ? await leadSourceModel.find().sort({_id:-1}).limit(100): await leadSourceModel.find()
        return promise
    },
    async getAllLeadSources(query){

             const promise = await leadSourceModel.aggregate(
            [
            { "$project": { "_id": { "$toString": "$_id" },
                "source_name": { "$toString": "$source_name" },
                "status": { "$toString": "$status" },
                "date": { "$toString": "$date" },
                "updatedAt": { "$toString": "$updatedAt" },
            }},
                { $sort : { updatedAt : -1} },
                     { $facet : { metadata: [ { $count: "total" }, { $addFields: { page: query.page } } ],
                            data: [ { $skip: query.skip }, { $limit: query.limit } ]
    } }])

        return promise
    },
}

module.exports = leadSourceSerives;