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
    async getcityById(id){
        const promise = await userTeamModel.findById(id)
        return promise
    },
    async getAllDataTeamWise(teamId){
        // const promise = userTeamModel.find({"teamId":teamId});
        //  return promise
        const promise = await userTeamModel.aggregate(
            [
             {
                "$match": {"team_id": teamId}
             },
            { "$project": { "map_id": { "$toString": "$_id" },
                "user_id": { "$toObjectId": "$user_id" },
                "team_id": { "$toString": "$team_id" },
                "userId": { "$toString": "$user_id" },
                "roleId": { "$toString": "$role_id" },
                "updatedAt": { "$toString": "$updatedAt" },
            }},
                {$lookup: 
                    {from: "users", 
                    localField: "user_id", 
                    foreignField: "_id", 
                    as: "users"}
                },
                {$lookup: 
                    {from: "user_offices", 
                    localField: "userId", 
                    foreignField: "userId", 
                    as: "user_offices"}
                },
                { $sort : { updatedAt : -1} }])

        
        return promise
    },
    async getAlldata(query){
        const promise = query ? await userTeamModel.find().sort({_id:-1}).limit(5): await userTeamModel.find()
        return promise
    },
}

module.exports = userTeamSerives;