const ProjectMappingModel = require("../db/models/ProjectMappingModel");
const ProjectMappingSerives = {
   async addProjectMapping(UserObject){
        const promise = await ProjectMappingModel.create(UserObject);
        return promise
    },
    async updateProjectMapping(id,data){
        const promise = await ProjectMappingModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = ProjectMappingModel.findByIdAndDelete(id);
        return promise
    },
    async deleteProjectId(leadId){
        const query = { project_id: leadId };
        const result = await ProjectMappingModel.deleteMany(query);
    },
    async deleteLeadId(leadId){
        const query = { project_id: leadId };
        const result = await ProjectMappingModel.deleteMany(query);
    },
    async findOneUserId(userId){
        const promise = await ProjectMappingModel.findOne({userId})
        return promise 
    },
    async findProjectMappingId(stateId){
        const promise = await ProjectMappingModel.find({stateId})
        return promise 
    },
    async getProjectMappingById(id){
        const promise = await ProjectMappingModel.findById(id)
        return promise
    },
    async getAllProjectMapping(query){
        const promise = query ? await ProjectMappingModel.find().sort({_id:-1}).limit(5): await ProjectMappingModel.find()
        return promise
    },
}

module.exports = ProjectMappingSerives;