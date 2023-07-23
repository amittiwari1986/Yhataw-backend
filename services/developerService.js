const developerModel = require("../db/models/DeveloperModel");
const developerSerives = {
   async addDeveloper(UserObject){
        const promise = await developerModel.create(UserObject);
        return promise
    },
    async updateDeveloper(id,data){
        const promise = await developerModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = developerModel.findByIdAndDelete(id);
        return promise
    },
    async findOneUserId(userId){
        const promise = await developerModel.findOne({userId})
        return promise 
    },
    async getDeveloperById(id){
        const promise = await developerModel.findById(id)
        return promise
    },
    async getAllDeveloper(query){
        const promise = query ? await developerModel.find().sort({_id:-1}).limit(5): await developerModel.find()
        return promise
    },
    async getAllDeveloper1(id){
        if(id){
            const promise = await developerModel.aggregate([
            { "$project": { "_id": { "$toString": "$_id" },
            "developer_name": { "$toString": "$developer_name" }
            }},
            {$lookup: {
                from: "projects", 
                localField: "_id", 
                foreignField: "developerId", 
                as: "projects"
                    }
                },
                {$match: {_id: id} }
            ])
            
            return promise
        }else{
            const promise = await developerModel.aggregate([
            { "$project": { "_id": { "$toString": "$_id" },
            "developer_name": { "$toString": "$developer_name" }
            }},
            {$lookup: {
                from: "projects", 
                localField: "_id", 
                foreignField: "developerId", 
                as: "projects"
                    }
                }
            ])
            
            return promise
        }
        
    },
}

module.exports = developerSerives;