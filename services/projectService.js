const projectModel = require("../db/models/ProjectModel");
const projectSerives = {
   async addProject(UserObject){
        const promise = await projectModel.create(UserObject);
        return promise
    },
    async updateProject(id,data){
        const promise = await projectModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = projectModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await projectModel.findOne({userId})
        return promise 
    },
    async findProjectId(developerId){
        const promise = await projectModel.find({developerId})
        return promise 
    },
    async getProjectById(id){
        const promise = await projectModel.findById(id)
        return promise
    },
    async getAllProject(query){
        const promise = query ? await projectModel.find().sort({_id:-1}).limit(5): await projectModel.find()
        return promise
    },
}

module.exports = projectSerives;