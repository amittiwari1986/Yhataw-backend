const propertyStatusModel = require("../db/models/PropertyStatusModel");
const propertyStatusSerives = {
   async addPropertyStatus(UserObject){
        const promise = await propertyStatusModel.create(UserObject);
        return promise
    },
    async updatePropertyStatus(id,data){
        const promise = await propertyStatusModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = propertyStatusModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await propertyStatusModel.findOne({userId})
        return promise 
    },
    async findPropertyStatusId(propertyTypeId){
        const promise = await propertyStatusModel.find({propertyTypeId})
        return promise 
    },
    async getPropertyStatusById(id){
        const promise = await propertyStatusModel.findById(id)
        return promise
    },
    async getAllPropertyStatus(query){
        const promise = query ? await propertyStatusModel.find().sort({_id:-1}).limit(5): await propertyStatusModel.find()
        return promise
    },
}

module.exports = propertyStatusSerives;