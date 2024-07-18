const projectApiModel = require("../db/models/ProjectApiModel");
const projectApiSerives = {
   async addProject(UserObject){
        const promise = await projectApiModel.create(UserObject);
        return promise
    },
    async addManyProject(UserObject){
        const promise = await projectApiModel.insertMany(UserObject);
        return promise
    },
    async updateProject(id,data){
        const promise = await projectApiModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = projectApiModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await projectApiModel.findOne({userId})
        return promise 
    },
    async findProjectId(developerId){
        const promise = await projectApiModel.find({developerId})
        return promise 
    },
    async findProjectUid(uid){
        const promise = await projectApiModel.find({"project_uid": uid})
        return promise 
    },
    async getProjectById(id){
        const promise = await projectApiModel.findById(id)
        return promise
    },
    async getProjectByName(project_name){
        const promise = await projectApiModel.find({project_name}).count();
        return promise
    },
    async getListProject(query){
        const promise = query ? await projectApiModel.find().sort({_id:-1}).limit(1000): await projectApiModel.find()
        return promise
    },
    async getAllProject(query,projectId){
        //const promise = query ? await projectModel.find().sort({_id:-1}).limit(5): await projectModel.find()
        console.log(projectId);
        if(projectId == 'all'){
            const promise = await projectApiModel.aggregate(
            [
            { "$project": { "_id": { "$toString": "$_id" },
                 "projectId": { "$toString": "$_id" },
                "project_name": { "$toString": "$project_name" },
                "status": {"$toString": "$status"},
                "updatedAt": { "$toString": "$updatedAt" },
            }},
                { $sort : { updatedAt : -1} },
                { $facet : { metadata: [ { $count: "total" }, { $addFields: { page: query.page } } ],
                            data: [ { $skip: query.skip }, { $limit: query.limit } ]
            } }])
            return promise
        }else{
            const promise = await projectApiModel.aggregate(
            [
            { "$project": { "_id": { "$toString": "$_id" },
                 "projectId": { "$toString": "$_id" },
                "project_name": { "$toString": "$project_name" },
                "status": {"$toString": "$status"},
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
            const promise = await projectApiModel.aggregate(
            [
            { "$project": { "_id": { "$toString": "$_id" },
                 "projectId": { "$toString": "$_id" },
                "project_name": { "$toString": "$project_name" },
                "project_uid": { "$toString": "$project_uid" },
                "status": {"$toString": "$status"},
                "updatedAt": { "$toString": "$updatedAt" },
            }},
                ])
            return promise
        }else{
            const promise = await projectApiModel.aggregate(
            [
            { "$project": { "_id": { "$toString": "$_id" },
                 "projectId": { "$toString": "$_id" },
                "project_name": { "$toString": "$project_name" },
                "project_uid": { "$toString": "$project_uid" },
                "status": {"$toString": "$status"},
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

module.exports = projectApiSerives;