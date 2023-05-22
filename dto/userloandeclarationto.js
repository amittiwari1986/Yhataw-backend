class UserLoanDeclaration{
    constructor(userId,loan_acc,loan_amt,loan_emi,start_from,updated_amt,status){
        this.userId = userId
        this.loan_acc = loan_acc
        this.loan_amt = loan_amt
        this.loan_emi = loan_emi
        this.start_from = start_from
        this.updated_amt = updated_amt
        this.status = status
    }
}

module.exports = UserLoanDeclaration;