class LeadReminder{
    constructor(leadId,userId,title,notes,date,time,status){
        this.leadId = leadId
        this.userId = userId
        this.title = title
        this.notes = notes
        this.date = date
        this.time = time
        this.status = status
    }
}

module.exports = LeadReminder;