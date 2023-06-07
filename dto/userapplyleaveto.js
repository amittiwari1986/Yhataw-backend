class userApplyLeave{
    constructor(userId,leave_type,from_date,to_date,comments,total_days,status){
        this.userId = userId
        this.leave_type = leave_type
        this.from_date = from_date
        this.to_date = to_date
        this.comments = comments
        this.total_days = total_days
        this.is_status = status
        
    }
}

module.exports = userApplyLeave;