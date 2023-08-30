const formModel = require("../db/models/FormModel");
const formServices = {
   async addForm(UserObject){
        const promise = await formModel.create(UserObject);
        return promise
    },
    async updateForm(id,data){
        const promise = await formModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = formModel.findByIdAndDelete(id);
        return promise
    },
    async findOneFormId(roleId){
        const promise = await formModel.findOne({roleId})
        return promise 
    },
    async findFormId(stateId){
        const promise = await formModel.find({stateId})
        return promise 
    },
    async getFormById(id){
        const promise = await formModel.findById(id)
        return promise
    },
    async getAllForm(query){
        const promise = query ? await formModel.find().sort({_id:-1}).limit(5): await formModel.find()
        return promise
    },
}

module.exports = formServices;