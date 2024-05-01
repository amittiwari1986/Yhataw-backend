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
    async findUserByMultipleData(userId,date){
        const promise = await UserAttendanceModel.find({userId: userId,date: date})
        return promise 
    },
    async getUserAttendanceById(id){
        const promise = await UserAttendanceModel.findById(id)
        return promise
    },
    async getAllAttendanceSum(query){
        // const promise = query ? await UserAttendanceModel.find().sort({_id:-1}).limit(5): await UserAttendanceModel.find()
        // return promise

        console.log(query);
if(query.userId != ''){
            const promise = await UserAttendanceModel.aggregate(
                [
                {
                    "$match": {"userId":query.userId, "month": query.month}
                },
                { "$project": {
                    "userId": { "$toObjectId": "$userId" },
                    "month": { "$toString": "$month" },
                    "date": { "$toString": "$date" },
                    "working_hours": { "$toString": "$working_hours" },
                    "work_type": { "$toString": "$work_type" },
                }},
                    { $sort : { updatedAt : -1} }])
            return promise
        }else{
            const promise = await UserAttendanceModel.aggregate(
                [
                {
                    "$match": {"month": query.month}
                },
                { "$project": {
                    "userId": { "$toObjectId": "$userId" },
                    "month": { "$toString": "$month" },
                    "date": { "$toString": "$date" },
                    "working_hours": { "$toString": "$working_hours" },
                    "work_type": { "$toString": "$work_type" },
                }},
                    { $sort : { updatedAt : -1} }])
            return promise
        }


    
    },
    async getAllAttendance(query){
        // const promise = query ? await UserAttendanceModel.find().sort({_id:-1}).limit(5): await UserAttendanceModel.find()
        // return promise
         // console.log(query);
        if(query.userId != ''){

            const promise = await UserAttendanceModel.aggregate(
                [
                {
                    "$match": {"userId":query.userId,"date": {"$gte": query.start_date, "$lte": query.end_date}}
                },
                { "$project": {
                    "userId": { "$toObjectId": "$userId" },
                    "month": { "$toString": "$month" },
                    "date": { "$toString": "$date" },
                    "punch_in": { "$toString": "$punch_in" },
                    "punch_out": { "$toString": "$punch_out" },
                    "working_hours": { "$toString": "$working_hours" },
                    "work_type": { "$toString": "$work_type" },
                    "approver": { "$toString": "$approver" },
                    "status": { "$toString": "$status" },
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


        }else{

            const promise = await UserAttendanceModel.aggregate(
                [
                {
                    "$match": {"date": {"$gte": query.start_date, "$lte": query.end_date}}
                },
                { "$project": {
                    "userId": { "$toObjectId": "$userId" },
                    "month": { "$toString": "$month" },
                    "date": { "$toString": "$date" },
                    "punch_in": { "$toString": "$punch_in" },
                    "punch_out": { "$toString": "$punch_out" },
                    "working_hours": { "$toString": "$working_hours" },
                    "work_type": { "$toString": "$work_type" },
                    "approver": { "$toString": "$approver" },
                    "status": { "$toString": "$status" },
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

        }   

    
    },
}

module.exports = userAttendanceSerives;