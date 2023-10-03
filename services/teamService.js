const teamModel = require("../db/models/TeamModel");
const teamSerives = {
   async addTeam(UserObject){
        const promise = await teamModel.create(UserObject);
        return promise
    },
    async updateTeam(id,data){
        const promise = await teamModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = teamModel.findByIdAndDelete(id);
        return promise
    },
    async getTeamById(id){
        const promise = await teamModel.findById(id)
        return promise
    },
    async getAllTeam(query){
        const promise = query ? await teamModel.find().sort({_id:-1}).limit(5): await teamModel.find()
        return promise
    },
    
}

module.exports = teamSerives;