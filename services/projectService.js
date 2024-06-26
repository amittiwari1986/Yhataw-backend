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
    async findProjectUid(uid){
        const promise = await projectModel.find({"project_uid": uid})
        return promise 
    },
    async getProjectById(id){
        const promise = await projectModel.findById(id)
        return promise
    },
    async getProjectByName(project_name){
        const promise = await projectModel.find({project_name}).count();
        return promise
    },
    async getListProject(query){
        const promise = query ? await projectModel.find().sort({_id:-1}).limit(1000): await projectModel.find()
        return promise
    },
    async getAllProject(query,projectId){
        //const promise = query ? await projectModel.find().sort({_id:-1}).limit(5): await projectModel.find()
        console.log(projectId);
        if(projectId == 'all'){
            const promise = await projectModel.aggregate(
            [
            { "$project": { "_id": { "$toString": "$_id" },
                 "projectId": { "$toString": "$_id" },
                "project_name": { "$toString": "$project_name" },
                "updatedAt": { "$toString": "$updatedAt" },
            }},
                { $sort : { updatedAt : -1} },
                { $facet : { metadata: [ { $count: "total" }, { $addFields: { page: query.page } } ],
                            data: [ { $skip: query.skip }, { $limit: query.limit } ]
            } }])
            return promise
        }else{
            const promise = await projectModel.aggregate(
            [
            { "$project": { "_id": { "$toString": "$_id" },
                 "projectId": { "$toString": "$_id" },
                "project_name": { "$toString": "$project_name" },
                "updatedAt": { "$toString": "$updatedAt" },
            }},
            {
                "$match": {"projectId": projectId}
             },
                { $sort : { updatedAt : -1} },
                { $facet : { metadata: [ { $count: "total" }, { $addFields: { page: query.page } } ],
                            data: [ { $skip: query.skip }, { $limit: query.limit } ]
            } }])
            return promise
        }
          
    },
    async getAllProjectSimple(query,projectId){
        //const promise = query ? await projectModel.find().sort({_id:-1}).limit(5): await projectModel.find()
        console.log(projectId);
        if(projectId == 'all'){
            const promise = await projectModel.aggregate(
            [
            { "$project": { "_id": { "$toString": "$_id" },
                 "projectId": { "$toString": "$_id" },
                "project_name": { "$toString": "$project_name" },
                "project_uid": { "$toString": "$project_uid" },
                "updatedAt": { "$toString": "$updatedAt" },
            }},
                ])
            return promise
        }else{
            const promise = await projectModel.aggregate(
            [
            { "$project": { "_id": { "$toString": "$_id" },
                 "projectId": { "$toString": "$_id" },
                "project_name": { "$toString": "$project_name" },
                "project_uid": { "$toString": "$project_uid" },
                "updatedAt": { "$toString": "$updatedAt" },
            }},
            {
                "$match": {"projectId": projectId}
             },
             ])
            return promise
        }
          
    },
}

module.exports = projectSerives;