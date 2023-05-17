class UserLeaveToken{
    constructor(userId,total_leave,earned_leave,sick_leave,casual_leave){
        this.userId = userId
        this.total_leave = total_leave
        this.earned_leave = earned_leave
        this.sick_leave = sick_leave
        this.casual_leave = casual_leave
    }
}

module.exports = UserLeaveToken;