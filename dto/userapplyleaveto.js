class userApplyLeave{
    constructor(userId,leave_type,from_date,to_date,total_days,comments){
        this.userId = userId
        this.leave_type = leave_type
        this.from_date = from_date
        this.to_date = to_date
        this.total_days = total_days
        this.comments = comments
    }
}

module.exports = userApplyLeave;