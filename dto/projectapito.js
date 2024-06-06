class ProjectApi{
    constructor(developerId,project_name,project_uid,status){
        this.developerId = developerId
        this.project_name = project_name
        this.project_uid = project_uid
        this.status = status
    }
}

module.exports = ProjectApi;