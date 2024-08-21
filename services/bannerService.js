const bannerModel = require("../db/models/BannerModel");
const bannerSerives = {
   async addBanner(UserObject){
        const promise = await bannerModel.create(UserObject);
        return promise
    },
    async updateBanner(id,data){
        const promise = await bannerModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = bannerModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await bannerModel.findOne({userId})
        return promise 
    },
    async findBannerId(stateId){
        const promise = await bannerModel.find({stateId})
        return promise 
    },
    async getBannerById(id){
        const promise = await bannerModel.findById(id)
        return promise
    },
    async getAllBanner(query){
        const promise = query ? await bannerModel.find().sort({_id:-1}).limit(100): await bannerModel.find()
        return promise
    },
}

module.exports = bannerSerives;