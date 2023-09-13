class Form{
    constructor(form_name,developerId,projectId,projecttypeId,leadName,leadEmail,leadPhone,dynamicFields,status){
        this.form_name = form_name
        this.developerId = developerId
        this.projectId = projectId
        this.projecttypeId = projecttypeId
        this.leadName = leadName
        this.leadEmail = leadEmail
        this.leadPhone = leadPhone
        this.dynamicFields = dynamicFields
        this.status = status
    }
}

module.exports = Form;