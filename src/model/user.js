export default class User{
    constructor(userId,username) {
        this.userId = userId
        this.username = username
        this.blockedUsers = []
        this.createdDate = Date.now()
    }
}