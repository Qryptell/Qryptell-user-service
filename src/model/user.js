export default class User{
    constructor(username,name,userId){
        this.username = username
        this.userId = userId
        this.name = name
        this.blockedUsers = []
        this.createdDate = Date.now()
    }
}
