const organizationModel = require("../db/models/OrganizationModel");
const organizationSerives = {
   async addOrganization(UserObject){
        const promise = await organizationModel.create(UserObject);
        return promise
    },
    async updateOrganization(id,data){
        const promise = await organizationModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = organizationModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await organizationModel.findOne({userId})
        return promise 
    },
    async findOrganizationId(userId){
        const promise = await organizationModel.find({userId})
        return promise 
    },
    async getOrganizationById(id){
        const promise = await organizationModel.findById(id)
        return promise
    },
    async getAllOrganization(query){
        const promise = query ? await organizationModel.find().sort({_id:-1}).limit(5): await organizationModel.find()
        return promise
    },
}

module.exports = organizationSerives;