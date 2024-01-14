import db from "../configurations/mongodb.js";
import User from '../model/user.js'

const userController = {
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
    deleteUser: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                await db.get().collection(process.env.USERS_COLLECTION).deleteOne({ userId })
                resolve(true)
            } catch (e) {
                reject(e)
            }
        })
    },
    blockUser: (userId, blockedUserId) => {
        return new Promise(async (resolve, reject) => {
            try {
                await db.get().collection(process.env.USERS_COLLECTION).updateOne({ userId }, {
                    $push:{blockedUsers:blockedUserId}
                })
                resolve()
            } catch (e) {
                reject(e)
            }
        })
    },
    unBlockUser: (userId, blockedUserId) => {
        return new Promise(async (resolve, reject) => {
            try {
                await db.get().collection(process.env.USERS_COLLECTION).updateOne({ userId }, {
                    $pull:{blockedUsers:blockedUserId}
                })
                resolve()
            } catch (e) {
                reject(e)
            }
        })
    }
}

export default userController