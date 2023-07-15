const projectDetailModel = require("../db/models/ProjectDetailModel");
const projectDetailsServices = {
   async addProjectDetail(UserObject){
        const promise = await projectDetailModel.create(UserObject);
        return promise
    },
    async updateProjectDetail(id,data){
        const promise = await projectDetailModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = projectDetailModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await projectDetailModel.findOne({userId})
        return promise 
    },
    async findOneProjectId(projectId){
        const promise = await projectDetailModel.findOne({projectId})
        return promise 
    },
    async findProjectDetailId(stateId){
        const promise = await projectDetailModel.find({stateId})
        return promise 
    },
    async getProjectDetailById(id){
        const promise = await projectDetailModel.findById(id)
        return promise
    },
    async getAllProjectDetail(query){
        const promise = query ? await projectDetailModel.find().sort({_id:-1}).limit(5): await projectDetailModel.find()
        return promise
    },
}

module.exports = projectDetailsServices;