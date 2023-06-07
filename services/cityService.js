const cityModel = require("../db/models/CityModel");
const citySerives = {
   async addcity(UserObject){
        const promise = await cityModel.create(UserObject);
        return promise
    },
    async updatecity(id,data){
        const promise = await cityModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = cityModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await cityModel.findOne({userId})
        return promise 
    },
    async findCityId(stateId){
        const promise = await cityModel.find({stateId})
        return promise 
    },
    async getcityById(id){
        const promise = await cityModel.findById(id)
        return promise
    },
    async getAllCity(query){
        const promise = query ? await cityModel.find().sort({_id:-1}).limit(5): await cityModel.find()
        return promise
    },
}

module.exports = citySerives;