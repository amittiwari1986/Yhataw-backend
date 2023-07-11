const propertyForModel = require("../db/models/PropertyForModel");
const propertyForSerives = {
   async addPropertyFor(UserObject){
        const promise = await propertyForModel.create(UserObject);
        return promise
    },
    async updatePropertyFor(id,data){
        const promise = await propertyForModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = propertyForModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await propertyForModel.findOne({userId})
        return promise 
    },
    async findPropertyForId(stateId){
        const promise = await propertyForModel.find({stateId})
        return promise 
    },
    async getPropertyForById(id){
        const promise = await propertyForModel.findById(id)
        return promise
    },
    async getAllPropertyFor(query){
        const promise = query ? await propertyForModel.find().sort({_id:-1}).limit(5): await propertyForModel.find()
        return promise
    },
}

module.exports = propertyForSerives;