class UploadLead{
    constructor(upload_file_name,formId,file_path,mapping_info,status){
        this.upload_file_name = upload_file_name
        this.formId = formId
        this.file_path = file_path
        this.mapping_info = mapping_info
        this.status = status
    }
}

module.exports = UploadLead;