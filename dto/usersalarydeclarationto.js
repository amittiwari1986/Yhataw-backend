class UserSalaryDeclaration{
    constructor(userId,PF_no,ESI_no,basic,HRA,medical_allowance,conbeyance_allowance,special_allowance,others,EPF_opt,ESI_opt{
        this.userId = userId
        this.EPF_opt = EPF_opt
        this.ESI_opt = ESI_opt
        this.EPF_no = EPF_no
        this.ESI_no = ESI_no
        this.basic = basic
        this.HRA = HRA
        this.medical_allowance = medical_allowance
        this.conbeyance_allowance = conbeyance_allowance
        this.special_allowance = special_allowance
        this.others = others
        this.i_tax = i_tax
    }
}

module.exports = UserSalaryDeclaration;