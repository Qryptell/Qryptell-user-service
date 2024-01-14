import db from "../configurations/mongodb";
import User from '../model/user.js'

module.exports = {
    createUser: (userId) => {
        return new Promise(async (resolve, rejetct) => {
            let user = new User(userId)
            try {
                const res = await db.get().collection(process.env.USERS_COLLECTION).insertOne(user)
                resolve(res.insertedId)
            } catch (e) {
                rejetct(e)
            }
        })
    },
    getUser: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await db.get().collection(process.env.USERS_COLLECTION).findOne({ userId })
                resolve(user)
            } catch (e) {
                reject(e)
            }
        })
    },
    deleteUser:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                await db.get().collection(process.env.USERS_COLLECTION).deleteOne({userId})
                resolve(true)
            }catch(e){
                reject(e)
            }
        })
    },
}