class Form{
    constructor(form_name,formId,developerId,projectId,projecttypeId,leadName,leadEmail,leadPhone,dynamicFields,status,AssignTo,AssignToUser,source,uid,stage){
        this.form_name = form_name
        this.formId = formId
        this.developerId = developerId
        this.projectId = projectId
        this.projecttypeId = projecttypeId
        this.leadName = leadName
        this.leadEmail = leadEmail
        this.leadPhone = leadPhone
        this.dynamicFields = dynamicFields
        this.status = status
        this.AssignTo = AssignTo
        this.AssignToUser = AssignToUser
        this.source = source
        this.uid = uid
        this.stage = stage
    }
}

module.exports = Form;