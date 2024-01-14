import db from '../configurations/mongodb.js'

const friendsControllers = {
    addFriend: (userId, friendId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const freindList = await db.get().collection(process.env.FRIENDS_COLLECTION)
                if (freindList) {
                    await db.get().collection(process.env.FRIENDS_COLLECTION).updateOne({ userId }, {
                        $push: { freinds: friendId }
                    })
                    resolve()
                } else {
                    await db.get().collection(process.env.FRIENDS_COLLECTION).insertOne({ userId, freinds: [friendId] })
                }
            } catch (e) {
                reject(e)
            }
        })
    },
    removeFriend: (userId, friendId) => {
        return new Promise((resolve, reject) => {
            try {
                db.get().collection(process.env.FRIENDS_COLLECTION).updateOne({ userId }, {
                    $pull: { freinds: friendId }
                })
                resolve()
            } catch (e) {
                reject()
            }
        })
    },
    getFriends: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await db.get().collection(process.env.FRIENDS_COLLECTION).findOne({ userId })
                if (user) {
                    resolve(user.freinds)
                } else {
                    resolve([])
                }
            } catch (e) {
                reject(e)
            }
        })
    }
}

export default friendsControllers
