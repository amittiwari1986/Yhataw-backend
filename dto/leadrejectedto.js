class Form{
    constructor(form_name,formId,developerId,projectId,projecttypeId,leadName,leadEmail,leadPhone,dynamicFields,status,AssignTo,AssignToUser,source,uid,stage,date,lead_type,upload_file_name,uploadLeadId){
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
        this.date = date
        this.lead_type = lead_type
        this.upload_file_name = upload_file_name
        this.uploadLeadId = uploadLeadId
    }
}

module.exports = Form;