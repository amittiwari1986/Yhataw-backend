class Form{
    constructor(form_name,developerId,projectId,projecttypeId,leadName,leadEmail,leadPhone,dynamicFields){
        this.form_name = form_name
        this.developerId = developerId
        this.projectId = projectId
        this.projecttypeId = projecttypeId
        this.leadName = leadName
        this.leadEmail = leadEmail
        this.leadPhone = leadPhone
        this.dynamicFields = dynamicFields
    }
}

module.exports = Form;