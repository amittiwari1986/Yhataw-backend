class LeadLog{
    constructor(leadId,userId,old_value,new_value){
        this.leadId = leadId
        this.userId = userId
        this.old_value = old_value
        this.new_value = new_value
    }
}

module.exports = LeadLog;