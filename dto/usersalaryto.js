class UserLeaveToken{
    constructor(userId,PF_no,UAN,ESI_no,basic,HRA,medical_allowance,conbeyance_allowance,special_allowance,others,overtime,EPF_deduction,esi_deduction,vehicle_loan,others_loan){
        this.userId = userId
        this.PF_no = PF_no
        this.UAN = UAN
        this.ESI_no = ESI_no
        this.basic = basic
        this.HRA = HRA
        this.medical_allowance = medical_allowance
        this.conbeyance_allowance = conbeyance_allowance
        this.special_allowance = special_allowance
        this.others = others
        this.overtime = overtime
        this.EPF_deduction = EPF_deduction
        this.esi_deduction = esi_deduction
        this.vehicle_loan = vehicle_loan
        this.others_loan = others_loan
    }
}

module.exports = UserLeaveToken;