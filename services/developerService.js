const developerModel = require("../db/models/DeveloperModel");
const developerSerives = {
   async addDeveloper(UserObject){
        const promise = await developerModel.create(UserObject);
        return promise
    },
    async updateDeveloper(id,data){
        const promise = await developerModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = developerModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await developerModel.findOne({userId})
        return promise 
    },
    async getDeveloperById(id){
        const promise = await developerModel.findById(id)
        return promise
    },
    async getAllDeveloper(query){
        const promise = query ? await developerModel.find().sort({_id:-1}).limit(5): await developerModel.find()
        return promise
    },
    async getAllDeveloper1(query){
        const promise = await developerModel.aggregate([{ "$project": { "department_id": { "$toString": "$_id" },"department_name": { "$toString": "$department_name" }}},{$lookup: {from: "designations", localField: "department_id", foreignField: "departmentId", as: "designation"}}])
        
        return promise
    },
}

module.exports = developerSerives;