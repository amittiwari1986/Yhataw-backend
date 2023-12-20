const projectListModel = require("../db/models/ProjectListModel");
const projectListSerives = {
   async addprojectList(UserObject){
        const promise = await projectListModel.create(UserObject);
        return promise
    },
    async updateProjectList(id,data){
        const promise = await projectListModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = projectListModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await projectListModel.findOne({userId})
        return promise 
    },
    async findProjectListId(propertyTypeId){
        const promise = await propertyStatusModel.find({propertyTypeId})
        return promise 
    },
    async getProjectListById(id){
        const promise = await projectListModel.findById(id)
        return promise
    },
    async getAllProjectList(query){
        const promise = query ? await projectListModel.find().sort({_id:-1}).limit(5): await projectListModel.find()
        return promise
    },
}

module.exports = projectListSerives;