import db from "../configurations/mongodb.js";
import User from '../model/user.js'
import collection from '../configurations/collections.js'

const userController = {
    createUser: (userId, username) => {
        return new Promise(async (resolve, reject) => {
            const userWithUsername = await db.get().collection(collection.USERS).findOne({ username })
            const userWithUserId = await db.get().collection(collection.USERS).findOne({ userId })
            if (userWithUsername) {
                reject(new Error("Username aready Taken"))
            } else if (userWithUserId) {
                reject(new Error("Internal Server error"))
            } else {
                let user = new User(userId, username)
                try {
                    const res = await db.get().collection(collection.USERS).insertOne(user)
                    resolve(res.insertedId)
                } catch (e) {
                    reject(e)
                }
            }
        })
    },
    getUser: (username) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await db.get().collection(collection.USERS).findOne({ username })
                resolve(user)
            } catch (e) {
                reject(e)
            }
        })
    },
    deleteUser: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                await db.get().collection(collection.USERS).deleteOne({ userId })
                resolve(true)
            } catch (e) {
                reject(e)
            }
        })
    },
    blockUser: (userId, blockUserId) => {
        return new Promise(async (resolve, reject) => {
            try {
                await db.get().collection(collection.USERS).updateOne({ userId }, {
                    $push: { blockedUsers: blockUserId }
                })
                resolve()
            } catch (e) {
                reject(e)
            }
        })
    },
    unBlockUser: (userId, blockUserId) => {
        return new Promise(async (resolve, reject) => {
            try {
                await db.get().collection(collection.USERS).updateOne({ userId }, {
                    $pull: { blockedUsers: blockUserId }
                })
                resolve()
            } catch (e) {
                reject(e)
            }
        })
    }
}

export default userController