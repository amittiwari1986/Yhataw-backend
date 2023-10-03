const UserOfficeModel = require("../db/models/UserOfficeModel");
const userOfficeSerives = {
   async addUserOffice(UserObject){
        const promise = await UserOfficeModel.create(UserObject);
        return promise
    },
    async updateUserOffice(id,data){
        const promise = await UserOfficeModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = UserOfficeModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await UserOfficeModel.findOne({userId})
        return promise 
    },
    async findUserId(userId){
        const promise = await UserOfficeModel.find({userId})
        return promise 
    },
    async getUserOfficeById(id){
        const promise = await UserOfficeModel.findById(id)
        return promise
    },
    async getAllManagerByTeamWise(teamId){
        const roleId = 5;
        const promise = await UserOfficeModel.find({team_id: teamId, roleId: roleId})
        return promise 
    },
    async getAllTeamDropDown(query){
        const promise = await UserOfficeModel.aggregate(
            [
                {
                "$match": {"team_id": query}
             },
            { "$project": { "userId": { "$toObjectId": "$userId" },
            }},
                {$lookup: 
                    {from: "users", 
                    localField: "userId", 
                    foreignField: "_id", 
                    as: "users"}
                },
                { $sort : { updatedAt : -1} }])
        return promise
    },
}

module.exports = userOfficeSerives;