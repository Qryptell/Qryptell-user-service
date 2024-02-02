export default class User{
    constructor(username,name){
        this.username = username
        this.name = name
        this.blockedUsers = []
        this.createdDate = Date.now()
    }
}
