import db from "../configurations/mongodb.js";
import User from '../model/user.js'
import collection from '../configurations/collections.js'

const userController = {
    createUser: (username,name) => {
        return new Promise(async (resolve, reject) => {
            const userWithUsername = await db.get().collection(collection.USERS).findOne({ username })
            if (userWithUsername) {
                reject(new Error("Username aready Taken"))
            } else {
                let user = new User(username,name)
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
    deleteUser: (username) => {
        return new Promise(async (resolve, reject) => {
            try {
                await db.get().collection(collection.USERS).deleteOne({ username })
                resolve(true)
            } catch (e) {
                reject(e)
            }
        })
    },
    blockUser: (username, blockUsername) => {
        return new Promise(async (resolve, reject) => {
            try {
                await db.get().collection(collection.USERS).updateOne({ username }, {
                    $push: { blockedUsers: blockUsername }
                })
                resolve()
            } catch (e) {
                reject(e)
            }
        })
    },
    unBlockUser: (username, blockUsername) => {
        return new Promise(async (resolve, reject) => {
            try {
                await db.get().collection(collection.USERS).updateOne({ username }, {
                    $pull: { blockedUsers: blockUsername }
                })
                resolve()
            } catch (e) {
                reject(e)
            }
        })
    }
}

export default userController
