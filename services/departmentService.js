const departmentModel = require("../db/models/DepartmentModel");
const departmentSerives = {
   async addDepartment(UserObject){
        const promise = await departmentModel.create(UserObject);
        return promise
    },
    async updatedepartment(id,data){
        const promise = await departmentModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = departmentModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await departmentModel.findOne({userId})
        return promise 
    },
    async getdepartmentById(id){
        const promise = await departmentModel.findById(id)
        return promise
    },
    async getAllDepartment(query){
        const promise = query ? await departmentModel.find().sort({_id:-1}).limit(5): await departmentModel.find()
        return promise
    },
    async getAllDepartment1(query){
        const promise = await departmentModel.aggregate([{ "$project": { "department_id": { "$toString": "$_id" },"department_name": { "$toString": "$department_name" }}},{$lookup: {from: "designations", localField: "department_id", foreignField: "departmentId", as: "designation"}}])
        
        return promise
    },
}

module.exports = departmentSerives;