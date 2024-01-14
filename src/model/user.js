export default class User{
    constructor(userId,role = 'user') {
        this.userId = userId
        this.role = role
        this.createdDate = Date.now()
    }
}