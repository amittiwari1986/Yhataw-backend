class LeadUserStage{
    constructor(lead_id,user_id,type,user_name,stage,status){
        this.lead_id = lead_id
        this.user_id = user_id
        this.type = type
        this.user_name = user_name
        this.stage = stage
        this.status = status
    }
}

module.exports = LeadUserStage;