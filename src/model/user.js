export default class User{
    constructor(username){
        this.username = username
        this.blockedUsers = []
        this.createdDate = Date.now()
    }
}
