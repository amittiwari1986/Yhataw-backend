class UserDocument{
    constructor(userId,aadhar,pan,passport,medical,voterId,others){
        this.userId = userId
        this.aadhar = aadhar
        this.pan = pan
        this.passport = passport
        this.medical = medical
        this.voterId = voterId
        this.others = others
    }
}

module.exports = UserDocument;