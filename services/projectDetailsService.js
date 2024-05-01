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
    async findProjectDetailPropertyTypeId(propertyType){
        const promise = await projectDetailModel.find({"propertytypeid": propertyType})
        return promise 
    },
    async getProjectDetailById(id){
        const promise = await projectDetailModel.findById(id)
        return promise
    },
    async getAllProjectDetail(query){
        const promise = query ? await projectDetailModel.find().sort({_id:-1}).limit(1000): await projectDetailModel.find()
       // const promise = await projectDetailModel.aggregate(
       //      [
       //          { "$project": { "developer_id": { "$toObjectId": "$developerId" },
       //                      "project_id": { "$toObjectId": "$projectId" },
       //                      "country_id": { "$toObjectId": "$countryId" },
       //                      "state_id": { "$toObjectId": "$stateId" },
       //                      "city": { "$toString": "$city" },
       //                      "description": { "$toString": "$description" },
       //                      "status": { "$toString": "$status" },
       //                      "projectfor_id": { "$toObjectId": "$projectforId" },
       //                      "projectstatus_id": { "$toObjectId": "$projectstatusId" },
       //                      "projectunittype_id": { "$toObjectId": "$projectunittypeId" },
       //                      "projectype_id": { "$toObjectId": "$projectypeId" },
       //                      "bathroom": { "$toString": "$bathroom" },
       //                      "washroom": { "$toString": "$washroom" },
       //          }},
       //          {$lookup: 
       //              {from: "developers", 
       //              localField: "developer_id", 
       //              foreignField: "_id", 
       //              as: "developer_name"}
       //          },
       //          {$lookup: 
       //              {from: "projects", 
       //              localField: "project_id", 
       //              foreignField: "_id", 
       //              as: "project_name"}
       //          },
       //          {$lookup: 
       //              {from: "countries", 
       //              localField: "country_id", 
       //              foreignField: "_id", 
       //              as: "country_name"}
       //          },
       //          {$lookup: 
       //              {from: "states", 
       //              localField: "state_id", 
       //              foreignField: "_id", 
       //              as: "state_name"}
       //          },
       //          {$lookup: 
       //              {from: "property_fors", 
       //              localField: "projectfor_id", 
       //              foreignField: "_id", 
       //              as: "property_for_name"}
       //          },
       //          {$lookup: 
       //              {from: "property_statuses", 
       //              localField: "projectstatus_id", 
       //              foreignField: "_id", 
       //              as: "property_status_name"}
       //          },
       //          {$lookup: 
       //              {from: "property_unit_types", 
       //              localField: "projectunittype_id", 
       //              foreignField: "_id", 
       //              as: "property_unit_type_name"}
       //          },
       //          {$lookup: 
       //              {from: "property_types", 
       //              localField: "projectype_id", 
       //              foreignField: "_id", 
       //              as: "property_type_name"}
       //          },
       //          {
       //              $set: {
       //                project_name: { "$arrayElemAt": ["$project_name.project_name", 0] },
       //                developer_name: { "$arrayElemAt": ["$developer_name.developer_name", 0] },
       //                country_name: { "$arrayElemAt": ["$country_name.country_name", 0] },
       //                state_name: { "$arrayElemAt": ["$state_name.state_name", 0] },
       //                property_for_name: { "$arrayElemAt": ["$property_for_name.name", 0] },
       //                property_status_name: { "$arrayElemAt": ["$property_status_name.name", 0] },
       //                property_unit_type_name: { "$arrayElemAt": ["$property_unit_type_name.name", 0] },
       //                property_type_name: { "$arrayElemAt": ["$property_type_name.name", 0] },
       //              }
       //            },
       //          { $sort : { updatedAt : -1} }])

        
        return promise
    }
}

module.exports = projectDetailsServices; 