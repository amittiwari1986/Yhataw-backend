const UserLeaveModel = require("../db/models/UserLeaveModel");
const userLeaveSerives = {
   async addUserLeave(UserObject){
        const promise = await UserLeaveModel.create(UserObject);
        return promise
    },
    async updateUserLeave(id,data){
        const promise = await UserLeaveModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = UserLeaveModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await UserLeaveModel.findOne({userId})
        return promise 
    },
    async findUserId(userId){
        const promise = await UserLeaveModel.find({userId})
        return promise 
    },
    async getUserLeaveById(id){
        const promise = await UserLeaveModel.findById(id)
        return promise
    },
    async getAllLeave(query){
         const promise = await UserLeaveModel.aggregate(
                [
                {
                    "$match": {"userId":query.userId,"from_date": {"$gte": query.start_date, "$lte": query.end_date}}
                },
                { "$project": {
                    "userId": { "$toObjectId": "$userId" },
                    "leave_type": { "$toString": "$leave_type" },
                    "from_date": { "$toString": "$from_date" },
                    "to_date": { "$toString": "$to_date" },
                    "comments": { "$toString": "$comments" },
                    "total_days": { "$toString": "$total_days" },
                    "status": { "$toString": "$status" },
                    "createdAt": { "$toString": "$createdAt" },
                    "updatedAt": { "$toString": "$updatedAt" },
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

module.exports = userLeaveSerives;