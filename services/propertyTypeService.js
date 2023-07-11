const propertyTypeModel = require("../db/models/PropertyTypeModel");
const propertyTypeSerives = {
   async addPropertyType(UserObject){
        const promise = await propertyTypeModel.create(UserObject);
        return promise
    },
    async updatePropertyType(id,data){
        const promise = await propertyTypeModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = propertyTypeModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await propertyTypeModel.findOne({userId})
        return promise 
    },
    async findPropertyTypeId(stateId){
        const promise = await propertyTypeModel.find({stateId})
        return promise 
    },
    async getPropertyTypeById(id){
        const promise = await propertyTypeModel.findById(id)
        return promise
    },
    async getAllPropertyType(query){
        const promise = query ? await propertyTypeModel.find().sort({_id:-1}).limit(5): await propertyTypeModel.find()
        return promise
    },
}

module.exports = propertyTypeSerives;