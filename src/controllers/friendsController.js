import db from '../configurations/mongodb.js'
import collection from '../configurations/collections.js'

const friendsControllers = {
    addFriend: (userId, friendId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const friend = await db.get().collection(collection.FRIENDS).findOne({ userId })
                if (!(friend == undefined && friend == null)) {
                    if (friend?.freinds?.includes(friendId)) {
                        reject(new Error("Friend allready added"))
                    } else {
                        await db.get().collection(collection.FRIENDS).updateOne({ userId }, {
                            $push: { freinds: friendId }
                        })
                        resolve()
                    }
                } else {
                    await db.get().collection(collection.FRIENDS).insertOne({ userId, freinds: [friendId] })
                    resolve()
                }
            } catch (e) {
                reject(e)
            }
        })
    },
    removeFriend: (userId, friendId) => {
        return new Promise((resolve, reject) => {
            try {
                db.get().collection(collection.FRIENDS).updateOne({ userId }, {
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
                const user = await db.get().collection(collection.FRIENDS).findOne({ userId })
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
