const propertyUnitTypeModel = require("../db/models/PropertyUnitTypeModel");
const propertyUnitTypeSerives = {
   async addPropertyUnitType(UserObject){
        const promise = await propertyUnitTypeModel.create(UserObject);
        return promise
    },
    async updatePropertyUnitType(id,data){
        const promise = await propertyUnitTypeModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = propertyUnitTypeModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await propertyUnitTypeModel.findOne({userId})
        return promise 
    },
    async findPropertyUnitTypeId(propertyTypeId){
        const promise = await propertyUnitTypeModel.find({propertyTypeId})
        return promise 
    },
    async getPropertyUnitTypeById(id){
        const promise = await propertyUnitTypeModel.findById(id)
        return promise
    },
    async getAllPropertyUnitType(query){
        const promise = query ? await propertyUnitTypeModel.find().sort({_id:-1}).limit(5): await propertyUnitTypeModel.find()
        return promise
    },
}

module.exports = propertyUnitTypeSerives;