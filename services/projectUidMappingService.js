const ProjectUidMappingModel = require("../db/models/ProjectUidMappingModel");
const ProjectUidMappingSerives = {
   async addProjectUidMapping(UserObject){
        const promise = await ProjectUidMappingModel.create(UserObject);
        return promise
    },
    async updateProjectUidMapping(id,data){
        const promise = await ProjectUidMappingModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = ProjectUidMappingModel.findByIdAndDelete(id);
        return promise
    },
    async deleteProjectId(leadId){
        const query = { project_id: leadId };
        const result = await ProjectUidMappingModel.deleteMany(query);
    },
    async deleteLeadId(leadId){
        const query = { project_id: leadId };
        const result = await ProjectUidMappingModel.deleteMany(query);
    },
    async findOneUserId(userId){
        const promise = await ProjectUidMappingModel.findOne({userId})
        return promise 
    },
    async findProjectUidMappingProjectId(project_id){
        const promise = await ProjectUidMappingModel.find({project_id})
        return promise 
    },
    async getProjectUidMappingById(id){
        const promise = await ProjectUidMappingModel.findById(id)
        return promise
    },
    async getAllProjectUidMapping(query){
        const promise = query ? await ProjectUidMappingModel.find().sort({_id:-1}).limit(5): await ProjectUidMappingModel.find()
        return promise
    },
}

module.exports = ProjectUidMappingSerives;