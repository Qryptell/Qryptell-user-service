import db from '../configurations/mongodb.js'
import collection from '../configurations/collections.js'

const friendsControllers = {
    requiestToFriend: (userId, friendId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const friendDoc = await db.get().collection(collection.FRIENDS).findOne({ userId: friendId })
                if (!(friendDoc == undefined && friendDoc == null)) {
                    if (friendDoc.freinds?.includes(friendId)) {
                        reject(new Error("User allready in friend list"))
                    } else {
                        if (friendDoc.reqs?.includes(userId)) {
                            reject(new Error("Allready requiested,waiting for response"))
                        } else {
                            await db.get().collection(collection.FRIENDS).updateOne({ userId: friendId }, {
                                $push: { 'reqs': userId }
                            })
                            resolve()
                        }
                    }
                } else {
                    await db.get().collection(collection.FRIENDS).insertOne({ userId: friendId, friends: [], reqs: [userId] })
                    resolve()
                }
            } catch (e) {
                reject(new Error("Something Went Wrong!"))
            }
        })
    },
    acceptReq: (userId, friendId) => {
        return new Promise(async (resolve, reject) => {
            const friend = await db.get().collection(collection.FRIENDS).findOne({ userId })
            if (!(friend == undefined && friend == null)) {
                if (!(friend?.reqs?.includes(friendId))) {
                    reject(new Error("No friend requiest wih this id"))
                } else {
                    await db.get().collection(collection.FRIENDS).updateOne({ userId }, {
                        $pull: { reqs: friendId }, $push: { friends: friendId }
                    })
                    const friendDoc = await db.get().collection(collection.FRIENDS).findOne({ friendId })
                    if (friendDoc) {
                        await db.get().collection(collection.FRIENDS).updateOne({ friendId }, {
                            $push: { friends: userId }
                        })
                    } else {
                        await db.get().collection(collection.FRIENDS).insertOne({ userId: friendId, friends: [userId], reqs: [] })
                    }
                    resolve()
                }
            } else {
                await db.get().collection(collection.FRIENDS).insertOne({ userId, freinds: [friendId], reqs: [] })
                const friendDoc = await db.get().collection(collection.FRIENDS).findOne({ friendId })
                if (friendDoc) {
                    await db.get().collection(collection.FRIENDS).updateOne({ friendId }, {
                        $push: { friends: userId }
                    })
                } else {
                    await db.get().collection(collection.FRIENDS).insertOne({ userId: friendId, friends: [userId], reqs: [] })
                }
                resolve()
            }

        })
    },
    denieReq: (userId, friendId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await db.get().collection(collection.FRIENDS).findOne({ userId })
                if (user && user?.reqs?.includes(friendId)) {
                    await db.get().collection(collection.FRIENDS).updateOne({ userId }, {
                        $pull: { reqs: friendId }
                    })
                } else {
                    reject(new Error("No friend requiest wih this id"))
                }
            } catch (e) {
                reject(new Error("Something Went Wrong!"))
            }
        })
    },
    getFriendReqs: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await db.get().collection(collection.FRIENDS).findOne({ userId })
                if (user) {
                    resolve(user.reqs)
                } else {
                    resolve([])
                }
            } catch (e) {
                reject()
            }
        })
    },
    removeFriend: (userId, friendId) => {
        return new Promise(async (resolve, reject) => {
            try {
                await db.get().collection(collection.FRIENDS).updateOne({ userId }, {
                    $pull: { freinds: friendId }
                })
                await db.get().collection(collection.FRIENDS).updateOne({ friendId }, {
                    $pull: { freinds: userId }
                })
                resolve()
            } catch (e) {
                reject(e)
            }
        })
    },
    getFriends: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await db.get().collection(collection.FRIENDS).findOne({ userId })
                if (user) {
                    resolve(user.friends)
                } else {
                    reject(new Error("User not found"))
                }
            } catch (e) {
                reject(new Error("Something Went Wrong!"))
            }
        })
    }
}

export default friendsControllers
