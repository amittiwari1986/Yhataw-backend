const unmergeLeadModel = require("../db/models/UnmergeLeadModel");
const unmergeLeadSerives = {
   async addunmergeLead(UserObject){
        const promise = await unmergeLeadModel.create(UserObject);
        return promise
    },
    async addManyUnmergeLeadMapping(UserObject){
        const promise = await unmergeLeadModel.insertMany(UserObject);
        return promise
    },
    async updateUnmergeLead(id,data){
        const promise = await unmergeLeadModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = unmergeLeadModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await unmergeLeadModel.findOne({userId})
        return promise 
    },
    async findUnmergeLeadId(stateId){
        const promise = await unmergeLeadModel.find({stateId})
        return promise 
    },
    async getUnmergeLeadById(id){
        const promise = await unmergeLeadModel.findById(id)
        return promise
    },
    async getAllUnmergeLead(query){
        const promise = query ? await unmergeLeadModel.find().sort({_id:-1}).limit(500): await unmergeLeadModel.find()
        return promise
    },
}

module.exports = unmergeLeadSerives;