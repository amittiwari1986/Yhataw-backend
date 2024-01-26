const UserModel = require("../db/models/UserModel");
const userSerives = {
   async addUser(UserObject){
        const promise = await UserModel.create(UserObject);
        return promise
    },
    async login(email){
        const promise = await UserModel.findOne({email})
        return promise 
    },
    async findOneEmail(email){
        const promise = await UserModel.findOne({email})
        return promise 
    },
    async loginWithMobile(phone){
        const promise = await UserModel.findOne({phone})
        return promise 
    },
    async checkName(name){
        const promise = await UserModel.findOne({name})
        return promise 
    },
    async checkEmpId(employee_id){
        const promise = await UserModel.findOne({employee_id})
        return promise 
    },
    async updateUser(id,data){
        const promise = await UserModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async getAllUsers(query){
        // const promise = await UserModel.find({ _id: { $ne: id } }).populate({path: 'user_leaves',populate: { path: 'user_offices' } })
        // let ids = mongoose.Types.ObjectId(id);
        const promise = await UserModel.aggregate(
            [
             {
                "$match": {"date": {"$gte": query.start_date, "$lte": query.end_date}}
             },
            { "$project": { "user_id": { "$toString": "$_id" },
                "name": { "$toString": "$name" },
                "phone": { "$toString": "$phone" },
                "email": { "$toString": "$email" },
                "whatsapp": { "$toString": "$whatsapp" },
                "employee_id": { "$toString": "$employee_id" },
                "doj": { "$toString": "$doj" },
                "dob": { "$toString": "$dob" },
                "status": { "$toString": "$status" },
                "country": { "$toObjectId": "$country_id" },
                "state": { "$toObjectId": "$state_id" },
                "city": { "$toString": "$city" },
                "in_complete": { "$toString": "$in_complete" },
                "date": { "$toString": "$date" },
                "updatedAt": { "$toString": "$updatedAt" },
            }},
                {$lookup: 
                    {from: "user_leaves", 
                    localField: "user_id", 
                    foreignField: "userId", 
                    as: "leaves"}
                },
                {$lookup: 
                    {from: "user_offices", 
                    localField: "user_id", 
                    foreignField: "userId", 
                    as: "userOffices"}
                },
                {$lookup: 
                    {from: "states", 
                    localField: "state", 
                    foreignField: "_id", 
                    as: "states"}
                },
                {$lookup: 
                    {from: "countries", 
                    localField: "country", 
                    foreignField: "_id", 
                    as: "countries"}
                },

                { $sort : { updatedAt : -1} }])

        
        return promise
    }, 

    async getAllUserData(query){
        // const promise = await UserModel.find({ _id: { $ne: id } }).populate({path: 'user_leaves',populate: { path: 'user_offices' } })
        // let ids = mongoose.Types.ObjectId(id);
        const promise = await UserModel.aggregate(
            [
            { "$project": { "user_id": { "$toString": "$_id" },
                "name": { "$toString": "$name" },
                "phone": { "$toString": "$phone" },
                "email": { "$toString": "$email" },
                "whatsapp": { "$toString": "$whatsapp" },
                "employee_id": { "$toString": "$employee_id" },
                "doj": { "$toString": "$doj" },
                "dob": { "$toString": "$dob" },
                "status": { "$toString": "$status" },
                "country": { "$toObjectId": "$country_id" },
                "state": { "$toObjectId": "$state_id" },
                "city": { "$toString": "$city" },
                "in_complete": { "$toString": "$in_complete" },
                "date": { "$toString": "$date" },
                "updatedAt": { "$toString": "$updatedAt" },
            }},
                {$lookup: 
                    {from: "user_leaves", 
                    localField: "user_id", 
                    foreignField: "userId", 
                    as: "leaves"}
                },
                {$lookup: 
                    {from: "user_offices", 
                    localField: "user_id", 
                    foreignField: "userId", 
                    as: "userOffices"}
                },

                { $sort : { updatedAt : -1} }])

        
        return promise
    }, 
    async getAllActiveUsers(query){
        // const promise = await UserModel.find({ _id: { $ne: id } }).populate({path: 'user_leaves',populate: { path: 'user_offices' } })
        // let ids = mongoose.Types.ObjectId(id);
        const promise = await UserModel.aggregate(
            [
             {
                "$match": {"status": {"$gte": "1"}}
             },
            { "$project": { "user_id": { "$toString": "$_id" },
                "name": { "$toString": "$name" },
                "phone": { "$toString": "$phone" },
                "email": { "$toString": "$email" },
            }},
                {$lookup: 
                    {from: "user_salary_declarations", 
                    localField: "user_id", 
                    foreignField: "userId", 
                    as: "user_salary"}
                },
                { $sort : { updatedAt : -1} }])

        
        return promise
    }, 
    async findOneUserId(userId){
        const promise = await UserModel.findOne({userId})
        return promise
    },
    async getUserById(id){
        const promise = await UserModel.findById(id)
        return promise
    },
    async getAllSalesHead(userRole){
        const userrole = 4;
        const promise = await UserModel.find({userRole: userrole})
        return promise
    },
    async getAllManager(userRole){
        const userrole = userRole;
        const promise = await UserModel.find({userRole: userrole})
        return promise
    },
    async getMultipleUser(query){
        const promise = query ? await UserModel.find({ "_id": { "$in": query } }).sort({_id:-1}).limit(100): await UserModel.find({ "_id": { "$in": query } })
        return promise
    },
}

module.exports = userSerives;

// [
//             { "$project": { "user_id": { "$toString": "$_id" },
//                 "name": { "$toString": "$name" },
//                 "phone": { "$toString": "$phone" },
//                 "email": { "$toString": "$email" },
//                 "whatsapp": { "$toString": "$whatsapp" },
//                 "employee_id": { "$toString": "$employee_id" },
//                 "doj": { "$toString": "$doj" },
//                 "dob": { "$toString": "$dob" },
//                 "status": { "$toString": "$status" },
//                 "country": { "$toString": "$country_id" },
//                 "state": { "$toString": "$state_id" },
//                 "city": { "$toString": "$city" },
//                 "in_complete": { "$toString": "$in_complete" },
//                 "updatedAt": { "$toString": "$updatedAt" },
//             }},
//                 {$lookup: 
//                     {from: "user_leaves", 
//                     localField: "user_id", 
//                     foreignField: "userId", 
//                     as: "leaves"}
//                 },
//                 {$lookup: 
//                     {from: "user_offices", 
//                     localField: "user_id", 
//                     foreignField: "userId", 
//                     as: "userOffices"}
//                 },
//                 {
//                     $set: {
//                       emp_type: { "$arrayElemAt": ["$userOffices.emp_type", 0] },
//                       total_leave: { "$arrayElemAt": ["$leaves.total_leave", 0] },
//                       earned_leave: { "$arrayElemAt": ["$leaves.earned_leave", 0] },
//                     }
//                   },
//                 { $sort : { updatedAt : -1} }])
