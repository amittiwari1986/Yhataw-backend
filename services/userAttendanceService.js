const UserAttendanceModel = require("../db/models/UserAttendanceModel");
const userAttendanceSerives = {
   async addUserAttendance(UserObject){
        const promise = await UserAttendanceModel.create(UserObject);
        return promise
    },
    async updateUserAttendance(id,data){
        const promise = await UserAttendanceModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = UserAttendanceModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await UserAttendanceModel.findOne({userId})
        return promise 
    },
    async findUserId(userId){
        const promise = await UserAttendanceModel.find({userId})
        return promise 
    },
    async getUserAttendanceById(id){
        const promise = await UserAttendanceModel.findById(id)
        return promise
    },
    async getAllAttendance(query){
        // const promise = query ? await UserAttendanceModel.find().sort({_id:-1}).limit(5): await UserAttendanceModel.find()
        // return promise
        const promise = await UserAttendanceModel.aggregate(
            [
            { "$project": {
                "userId": { "$toString": "$userId" },
                "month": { "$toString": "$month" },
                "date": { "$toString": "$date" },
                "punch_in": { "$toString": "$punch_in" },
                "punch_out": { "$toString": "$punch_out" },
                "working_hours": { "$toString": "$working_hours" },
                "updatedAt": { "$toString": "$updatedAt" },
            }},
                {$lookup: 
                    {from: "users", 
                    localField: "_id", 
                    foreignField: "userId", 
                    as: "users"}
                },
                { $sort : { updatedAt : -1} }])

        
        return promise
    },
}

module.exports = userAttendanceSerives;