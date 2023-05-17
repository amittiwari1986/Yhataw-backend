class UserBankToken{
    constructor(userId,bank_name,branch_name,holder_name,account_no,ifsc){
        this.userId = userId
        this.bank_name = bank_name
        this.branch_name = branch_name
        this.holder_name = holder_name
        this.account_no = account_no
        this.ifsc = ifsc
    }
}

module.exports = UserBankToken;