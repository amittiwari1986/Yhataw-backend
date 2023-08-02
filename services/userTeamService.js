const userTeamModel = require("../db/models/UserTeamModel");
const userTeamSerives = {
   async addUserTeam(UserObject){
        const promise = await userTeamModel.create(UserObject);
        return promise
    },
    async updatecity(id,data){
        const promise = await userTeamModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = userTeamModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await userTeamModel.findOne({userId})
        return promise 
    },
    async getAllManagerByTeamWise(teamId){
        const roleId = 4;
        const promise = await userTeamModel.find({teamId: teamId,roleId: roleId})
        return promise 
    },
    async getcityById(id){
        const promise = await userTeamModel.findById(id)
        return promise
    },
    async getAllCity(query){
        const promise = query ? await userTeamModel.find().sort({_id:-1}).limit(5): await userTeamModel.find()
        return promise
    },
}

module.exports = userTeamSerives;