const roleModel = require("../db/models/RoleModel");
const roleServices = {
   async addRole(UserObject){
        const promise = await roleModel.create(UserObject);
        return promise
    },
    async updateRole(id,data){
        const promise = await roleModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = roleModel.findByIdAndDelete(id);
        return promise
    },
    async findOneRoleId(roleId){
        const promise = await roleModel.findOne({roleId})
        return promise 
    },
    async findRoleId(stateId){
        const promise = await roleModel.find({stateId})
        return promise 
    },
    async getRoleById(id){
        const promise = await roleModel.findById(id)
        return promise
    },
    async getAllRole(query){
        const promise = query ? await roleModel.find().sort({_id:-1}).limit(5): await roleModel.find()
        return promise
    },
}

module.exports = roleServices;