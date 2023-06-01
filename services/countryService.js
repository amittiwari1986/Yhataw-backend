const countryModel = require("../db/models/CountryModel");
const countrySerives = {
   async addcountry(UserObject){
        const promise = await countryModel.create(UserObject);
        return promise
    },
    async updatecountry(id,data){
        const promise = await countryModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = countryModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await countryModel.findOne({userId})
        return promise 
    },
    async getcountryById(id){
        const promise = await countryModel.findById(id)
        return promise
    },
    async getAllCountry(query){
        const promise = query ? await countryModel.find().sort({_id:-1}).limit(5): await countryModel.find()
        return promise
    },
}

module.exports = countrySerives;