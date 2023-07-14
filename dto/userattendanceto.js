class userAttendance{
    constructor(userId,month,date,punch_in,punch_out,working_hours,leave_applied,work_type,approver,status){
        this.userId = userId
        this.month = month
        this.date = date
        this.punch_in = punch_in
        this.punch_out = punch_out
        this.working_hours = working_hours
        this.leave_applied = leave_applied
        this.work_type = work_type
        this.approver = approver
        this.status = status
    }
}

module.exports = userAttendance;