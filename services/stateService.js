const stateModel = require("../db/models/StateModel");
const stateSerives = {
   async addstate(UserObject){
        const promise = await stateModel.create(UserObject);
        return promise
    },
    async updatestate(id,data){
        const promise = await stateModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = stateModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await stateModel.findOne({userId})
        return promise 
    },
    async findStateId(countryId){
        const promise = await stateModel.find({countryId})
        return promise 
    },
    async getstateById(id){
        const promise = await stateModel.findById(id)
        return promise
    },
    async getAllState(query){
        const promise = query ? await stateModel.find().sort({_id:-1}).limit(5): await stateModel.find()
        return promise
    },
}

module.exports = stateSerives;