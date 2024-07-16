const leadModel = require("../db/models/LeadModel");
const leadServices = {
   async addLead(UserObject){
        const promise = await leadModel.create(UserObject);
        return promise
    },
    async addManyLead(UserObject){
        const promise = await leadModel.insertMany(UserObject);
        return promise
    },
    async updateLead(id,data){
        const promise = await leadModel.findByIdAndUpdate(id,data,{new:true})
        return promise
    },
    async delete(id){
        const promise = leadModel.findByIdAndDelete(id);
        return promise
    },
    async findOneLeadId(roleId){
        const promise = await leadModel.findOne({roleId})
        return promise 
    },
    async findLeadId(stateId){
        const promise = await leadModel.find({stateId})
        return promise 
    },
    async getLeadById(id){
        const promise = await leadModel.findById(id).sort({updatedAt:-1})
        return promise
    },
    async getLeadByUploadLeadId(uploadLeadId){
        const promise = await leadModel.find({uploadLeadId})
        return promise
    },
    async getLeadCountStageWise(stage){
        const promise = await leadModel.find({"stage":stage}).count();
        return promise
    },
    async getLeadCountSourceWise(stage,source){
        const promise = await leadModel.find({"stage":stage,"source":source}).count();
        return promise
    },
    async getLeadCountProjectWise(stage,projectId){
        const promise = await leadModel.find({"stage":stage,"projectId":projectId}).count();
        return promise
    },
    async getLeadCountProjectWiseNotStage(stage,projectId){
        const promise = await leadModel.find({"stage":{"$ne": stage}}).count();
        return promise
    },
    async getAllleadData(source){
        const promise = leadModel.find({"source":source});
         return promise
    },
    async getAllleadDataByProjectId(projectId){
        const promise = leadModel.find({"projectId":projectId});
         return promise
    },
    async getAllLead(query){
        // const promise = query ? await leadModel.find().sort({_id:-1}).limit(5): await leadModel.find()
        if(query.start_date != ''){

            const promise = await leadModel.aggregate(
            [
             {
                "$match": {"date": {"$gte": query.start_date, "$lte": query.end_date}}
             },
            { "$project": { "_id": { "$toString": "$_id" },
                "form_name": { "$toString": "$form_name" },
                "formId": { "$toString": "$formId" },
                "developerId": { "$toString": "$developerId" },
                "projectId": { "$toString": "$projectId" },
                "projecttypeId": { "$toString": "$projecttypeId" },
                "leadName": { "$toString": "$leadName" },
                "leadEmail": { "$toString": "$leadEmail" },
                "status": { "$toString": "$status" },
                "leadPhone": { "$toString": "$leadPhone" },
                "AssignTo": { "$toString": "$AssignTo" },
                "AssignToUser": { "$toString": "$AssignToUser" },
                "source": { "$toString": "$source" },
                "uid": { "$toString": "$uid" },
                "stage": { "$toString": "$stage" },
                "dynamicFields": { "$toString": "$dynamicFields" },
                "lead_type": { "$toString": "$lead_type" },
                "create_date": { "$toString": "$date" },
                "createdAt": { "$toString": "$createdAt" },
                "updatedAt": { "$toString": "$updatedAt" },
            }},
            {$lookup: 
                    {from: "lead_mapping", 
                    localField: "leadId", 
                    foreignField: "lead_id",
                    as: "mapping"}
                },
                {"$unwind":"$mapping"},
                {"$match":{"mapping.user_id": {$in: query.user_id}}},
                { $sort : { updatedAt : -1} },
                  { $facet : { metadata: [ { $count: "total" }, { $addFields: { page: query.page } } ],
                            data: [ { $skip: query.skip }, { $limit: query.limit } ]
    } }])

        return promise

        }else{

             const promise = await leadModel.aggregate(
            [
            { "$project": { "_id": { "$toString": "$_id" },
                "form_name": { "$toString": "$form_name" },
                "formId": { "$toString": "$formId" },
                "developerId": { "$toString": "$developerId" },
                "projectId": { "$toString": "$projectId" },
                "projecttypeId": { "$toString": "$projecttypeId" },
                "leadName": { "$toString": "$leadName" },
                "leadEmail": { "$toString": "$leadEmail" },
                "status": { "$toString": "$status" },
                "leadPhone": { "$toString": "$leadPhone" },
                "AssignTo": { "$toString": "$AssignTo" },
                "AssignToUser": { "$toString": "$AssignToUser" },
                "source": { "$toString": "$source" },
                "uid": { "$toString": "$uid" },
                "stage": { "$toString": "$stage" },
                "dynamicFields": { "$toString": "$dynamicFields" },
                "lead_type": { "$toString": "$lead_type" },
                "create_date": { "$toString": "$date" },
                "createdAt": { "$toString": "$createdAt" },
                "updatedAt": { "$toString": "$updatedAt" },
            }},
                { $sort : { updatedAt : -1} },
                { $facet : { metadata: [ { $count: "total" }, { $addFields: { page: query.page } } ],
                            data: [ { $skip: query.skip }, { $limit: query.limit } ]
    } }])

        return promise

        }
         
    },
    async getAllMyLead(query){
        // const promise = query ? await leadModel.find().sort({_id:-1}).limit(5): await leadModel.find()
        console.log(query);
        if(query.start_date != ''){

            const promise = await leadModel.aggregate(
            [
             {
                "$match": {"date": {"$gte": query.start_date, "$lte": query.end_date}}
             },
            { "$project": { "_id": { "$toString": "$_id" },
                "leadId": { "$toString": "$_id" },
                "form_name": { "$toString": "$form_name" },
                "formId": { "$toString": "$formId" },
                "developerId": { "$toString": "$developerId" },
                "projectId": { "$toString": "$projectId" },
                "projecttypeId": { "$toString": "$projecttypeId" },
                "leadName": { "$toString": "$leadName" },
                "leadEmail": { "$toString": "$leadEmail" },
                "status": { "$toString": "$status" },
                "leadPhone": { "$toString": "$leadPhone" },
                "AssignTo": { "$toString": "$AssignTo" },
                "AssignToUser": { "$toString": "$AssignToUser" },
                "source": { "$toString": "$source" },
                "uid": { "$toString": "$uid" },
                "stage": { "$toString": "$stage" },
                "dynamicFields": { "$toString": "$dynamicFields" },
                "lead_type": { "$toString": "$lead_type" },
                "create_date": { "$toString": "$date" },
                "createdAt": { "$toString": "$createdAt" },
                "updatedAt": { "$toString": "$updatedAt" },
            }},
            {$lookup: 
                    {from: "lead_mapping", 
                    localField: "leadId", 
                    foreignField: "lead_id",
                    as: "mapping"}
                },
                {"$unwind":"$mapping"},
                {"$match":{"mapping.user_id": query.user_id}},
                { $sort : { updatedAt : -1} },
                 { $facet : { metadata: [ { $count: "total" }, { $addFields: { page: query.page } } ],
                            data: [ { $skip: query.skip }, { $limit: query.limit } ]
    } }])

        return promise

        }else{

             const promise = await leadModel.aggregate(
            [
            { "$project": { "_id": { "$toString": "$_id" },
                 "leadId": { "$toString": "$_id" },
                "form_name": { "$toString": "$form_name" },
                "formId": { "$toString": "$formId" },
                "developerId": { "$toString": "$developerId" },
                "projectId": { "$toString": "$projectId" },
                "projecttypeId": { "$toString": "$projecttypeId" },
                "leadName": { "$toString": "$leadName" },
                "leadEmail": { "$toString": "$leadEmail" },
                "status": { "$toString": "$status" },
                "leadPhone": { "$toString": "$leadPhone" },
                "AssignTo": { "$toString": "$AssignTo" },
                "AssignToUser": { "$toString": "$AssignToUser" },
                "source": { "$toString": "$source" },
                "uid": { "$toString": "$uid" },
                "stage": { "$toString": "$stage" },
                "dynamicFields": { "$toString": "$dynamicFields" },
                "lead_type": { "$toString": "$lead_type" },
                "create_date": { "$toString": "$date" },
                "createdAt": { "$toString": "$createdAt" },
                "updatedAt": { "$toString": "$updatedAt" },
            }},
            {$lookup: 
                    {from: "lead_mappings", 
                    localField: "leadId", 
                    foreignField: "lead_id",
                    as: "mapping"}
                },
                {"$unwind":"$mapping"},
                {"$match":{"mapping.user_id": query.user_id}},
                { $sort : { updatedAt : -1} },
                { $facet : { metadata: [ { $count: "total" }, { $addFields: { page: query.page } } ],
                            data: [ { $skip: query.skip }, { $limit: query.limit } ]
        } }])

        return promise

        }
         
    },
    async getLeadCountStageWiseAndUserWise(stage,query){
        // const promise = query ? await leadModel.find().sort({_id:-1}).limit(5): await leadModel.find()
        // console.log(query);
        if(query.start_date != ''){

            const promise = await leadModel.aggregate(
            [
             {
                "$match": {"stage": stage,"date": {"$gte": query.start_date, "$lte": query.end_date}}
             },
            { "$project": { "_id": { "$toString": "$_id" },
                "leadId": { "$toString": "$_id" },
                "form_name": { "$toString": "$form_name" },
                "formId": { "$toString": "$formId" },
                "developerId": { "$toString": "$developerId" },
                "projectId": { "$toString": "$projectId" },
                "projecttypeId": { "$toString": "$projecttypeId" },
                "leadName": { "$toString": "$leadName" },
                "leadEmail": { "$toString": "$leadEmail" },
                "status": { "$toString": "$status" },
                "leadPhone": { "$toString": "$leadPhone" },
                "AssignTo": { "$toString": "$AssignTo" },
                "AssignToUser": { "$toString": "$AssignToUser" },
                "source": { "$toString": "$source" },
                "uid": { "$toString": "$uid" },
                "stage": { "$toString": "$stage" },
                "dynamicFields": { "$toString": "$dynamicFields" },
                "lead_type": { "$toString": "$lead_type" },
                "create_date": { "$toString": "$date" },
                "createdAt": { "$toString": "$createdAt" },
                "updatedAt": { "$toString": "$updatedAt" },
            }},
            {$lookup: 
                    {from: "lead_mapping", 
                    localField: "leadId", 
                    foreignField: "lead_id",
                    as: "mapping"}
                },
                {"$unwind":"$mapping"},
                {"$match":{"mapping.user_id": query.user_id}},
                { $sort : { updatedAt : -1} },{ $group: { _id: null, total_records: { $sum: 1 } } },])

        return promise

        }else{

             const promise = await leadModel.aggregate(
            [
            {
                "$match": {"stage": stage}
             },
            { "$project": { "_id": { "$toString": "$_id" },
                 "leadId": { "$toString": "$_id" },
                "form_name": { "$toString": "$form_name" },
                "formId": { "$toString": "$formId" },
                "uid": { "$toString": "$uid" },
                "stage": { "$toString": "$stage" },
                "create_date": { "$toString": "$date" },
                "createdAt": { "$toString": "$createdAt" },
                "updatedAt": { "$toString": "$updatedAt" },
            }},
            {$lookup: 
                    {from: "lead_mappings", 
                    localField: "leadId", 
                    foreignField: "lead_id",
                    as: "mapping"}
                },
                {"$unwind":"$mapping"},
                {"$match":{"mapping.user_id": query.user_id}},
                { $sort : { updatedAt : -1} },{ $group: { _id: null, total_records: { $sum: 1 } } },])

        return promise

        }
         
    },
    
}

module.exports = leadServices;