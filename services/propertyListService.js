const propertyListModel = require("../db/models/PropertyListModel");
const propertyListSerives = {
   async addPropertyList(UserObject){
        const promise = await propertyListModel.create(UserObject);
        return promise
    },
    async updatePropertyList(id,data){
        const promise = await propertyListModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = propertyListModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await propertyListModel.findOne({userId})
        return promise 
    },
    async findPropertyListId(propertyTypeId){
        const promise = await propertyListModel.find({propertyTypeId})
        return promise 
    },
    async getPropertyListById(id){
        const promise = await propertyListModel.findById(id)
        return promise
    },
    async getAllPropertyList(query){
        const promise = query ? await propertyListModel.find().sort({_id:-1}).limit(5): await propertyListModel.find()
        return promise
    },
}

module.exports = propertyListSerives;