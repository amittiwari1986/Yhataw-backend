class UserLeaveToken{
    constructor(userId,total_leave,earned_leave,sick_leave,casual_leave,total_leave_available,earned_leave_available,sick_leave_available,casual_leave_available){
        this.userId = userId
        this.total_leave = total_leave
        this.earned_leave = earned_leave
        this.sick_leave = sick_leave
        this.casual_leave = casual_leave
        this.total_leave_available = total_leave_available
        this.earned_leave_available = earned_leave_available
        this.sick_leave_available = sick_leave_available
        this.casual_leave_available = casual_leave_available

    }
}

module.exports = UserLeaveToken;