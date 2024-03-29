import db from '../configurations/mongodb.js'
import collection from '../configurations/collections.js'

const friendsControllers = {
    requiestToFriend: (username, friendname) => {
        return new Promise(async (resolve, reject) => {
            try {
                const friendDoc = await db.get().collection(collection.FRIENDS).findOne({ username: friendname })
                if (!(friendDoc == undefined && friendDoc == null)) {
                    if (friendDoc.freinds?.includes(friendname)) {
                        reject(new Error("User allready in friend list"))
                    } else {
                        if (friendDoc.reqs?.includes(username)) {
                            reject(new Error("Allready requiested,waiting for response"))
                        } else {
                            await db.get().collection(collection.FRIENDS).updateOne({ username: friendname }, {
                                $push: { 'reqs': username }
                            })
                            resolve()
                        }
                    }
                } else {
                    await db.get().collection(collection.FRIENDS).insertOne({ username: friendname, friends: [], reqs: [username] })
                    resolve()
                }
            } catch (e) {
                reject(new Error("Something Went Wrong!"))
            }
        })
    },
    acceptReq: (username, friendname) => {
        return new Promise(async (resolve, reject) => {
            const friend = await db.get().collection(collection.FRIENDS).findOne({ username })
            if (!(friend == undefined && friend == null)) {
                if (!(friend?.reqs?.includes(friendname))) {
                    reject(new Error("No friend requiest wih this id"))
                } else {
                    await db.get().collection(collection.FRIENDS).updateOne({ username }, {
                        $pull: { reqs: friendname }, $push: { friends: friendname }
                    })
                    const friendDoc = await db.get().collection(collection.FRIENDS).findOne({ friendname })
                    if (friendDoc) {
                        await db.get().collection(collection.FRIENDS).updateOne({ friendname }, {
                            $push: { friends: username }
                        })
                    } else {
                        await db.get().collection(collection.FRIENDS).insertOne({ username: friendname, friends: [username], reqs: [] })
                    }
                    resolve()
                }
            } else {
                await db.get().collection(collection.FRIENDS).insertOne({ username, freinds: [friendname], reqs: [] })
                const friendDoc = await db.get().collection(collection.FRIENDS).findOne({ friendname })
                if (friendDoc) {
                    await db.get().collection(collection.FRIENDS).updateOne({ friendname }, {
                        $push: { friends: username }
                    })
                } else {
                    await db.get().collection(collection.FRIENDS).insertOne({ username: friendname, friends: [username], reqs: [] })
                }
                resolve()
            }

        })
    },
    denieReq: (username, friendname) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await db.get().collection(collection.FRIENDS).findOne({ username })
                if (user && user?.reqs?.includes(friendname)) {
                    await db.get().collection(collection.FRIENDS).updateOne({ username }, {
                        $pull: { reqs: friendname }
                    })
                } else {
                    reject(new Error("No friend requiest wih this id"))
                }
            } catch (e) {
                reject(new Error("Something Went Wrong!"))
            }
        })
    },
    getFriendReqs: (username) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await db.get().collection(collection.FRIENDS).findOne({ username })
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
    removeFriend: (username, friendname) => {
        return new Promise(async (resolve, reject) => {
            try {
                await db.get().collection(collection.FRIENDS).updateOne({ username }, {
                    $pull: { freinds: friendname }
                })
                await db.get().collection(collection.FRIENDS).updateOne({ friendname }, {
                    $pull: { freinds: username }
                })
                resolve()
            } catch (e) {
                reject(e)
            }
        })
    },
    getFriends: (username) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await db.get().collection(collection.FRIENDS).findOne({ username })
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
