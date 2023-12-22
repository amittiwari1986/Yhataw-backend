class UploadLead{
    constructor(upload_file_name,formId,file_path,mapping_info,status,success_count,fail_count,error_file_path){
        this.upload_file_name = upload_file_name
        this.formId = formId
        this.file_path = file_path
        this.mapping_info = mapping_info
        this.status = status
        this.success_count = success_count
        this.fail_count = fail_count
        this.error_file_path = error_file_path
    }
}

module.exports = UploadLead;