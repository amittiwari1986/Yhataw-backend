class UserOfficeToken{
    constructor(userId,emp_type,department,designation,joining,working_days,working_shift,reporting_manager,role_id,team_id,dor,team_name){
        this.userId = userId
        this.emp_type = emp_type
        this.department = department
        this.designation = designation
        this.joining = joining
        this.working_days = working_days
        this.working_shift = working_shift
        this.reporting_manager = reporting_manager
        this.role_id = role_id
        this.team_id = team_id
        this.dpr = dor
        this.team_name = team_name
    }
}

module.exports = UserOfficeToken;