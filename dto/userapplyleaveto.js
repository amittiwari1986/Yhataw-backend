class userApplyLeave{
    constructor(userId,leave_type,from_date,to_date,comments,total_days){
        this.userId = userId
        this.leave_type = leave_type
        this.from_date = from_date
        this.to_date = to_date
        this.comments = comments
        this.total_days = total_days
        
    }
}

module.exports = userApplyLeave;