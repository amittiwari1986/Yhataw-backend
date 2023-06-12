const timezoneModel = require("../db/models/TimezoneModel");
const timezoneSerives = {
   async addtimezone(UserObject){
        const promise = await timezoneModel.create(UserObject);
        return promise
    },
    async updatetimezone(id,data){
        const promise = await timezoneModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = timezoneModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await timezoneModel.findOne({userId})
        return promise 
    },
    async findtimezoneId(countryId){
        const promise = await timezoneModel.find({countryId})
        return promise 
    },
    async gettimezoneById(id){
        const promise = await timezoneModel.findById(id)
        return promise
    },
    async getAllTimezone(query){
        const promise = query ? await timezoneModel.find().sort({_id:-1}).limit(5): await timezoneModel.find()
        return promise
    },
}

module.exports = timezoneSerives;