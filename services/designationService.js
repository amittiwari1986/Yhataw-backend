const designationModel = require("../db/models/DesignationModel");
const designationSerives = {
   async addDesignation(UserObject){
        const promise = await designationModel.create(UserObject);
        return promise
    },
    async updatedesignation(id,data){
        const promise = await designationModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = designationModel.findByIdAndDelete(id);
        return promise
    },
    async findOneDepartmentId(departmentId){
        const promise = await designationModel.find({departmentId})
        return promise 
    },
    async getdesignationById(id){
        const promise = await designationModel.findById(id)
        return promise
    },
    async getAllDesignation(query){
        const promise = query ? await designationModel.find().sort({_id:-1}).limit(5): await designationModel.find()
        return promise
    },
    
}

module.exports = designationSerives;