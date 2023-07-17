class UserSalary{
    constructor(userId,basic,HRA,medical_allowance,conbeyance_allowance,special_allowance,others,EPF_deduction,ESI_deduction,i_tax,loan_deduction,total_salary,total_deduction,net_pay,month,year){
        this.userId = userId
        this.basic = basic
        this.HRA = HRA
        this.medical_allowance = medical_allowance
        this.conbeyance_allowance = conbeyance_allowance
        this.special_allowance = special_allowance
        this.others = others
        this.EPF_deduction = EPF_deduction
        this.ESI_deduction = ESI_deduction
        this.i_tax = i_tax
        this.loan_deduction = loan_deduction
        this.total_salary = total_salary
        this.total_deduction = total_deduction
        this.net_pay = net_pay
        this.month = month
        this.year = year
    }
}

module.exports = UserSalary;