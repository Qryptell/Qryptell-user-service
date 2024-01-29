import db from '../configurations/mongodb.js'
import collection from '../configurations/collections.js'

const friendsControllers = {
    requiestToFriend: (username, friendname) => {
        return new Promise(async (resolve, reject) => {
            try {
                const friendDoc = await db.get().collectioction(collection.FRIENDS).findOne({ username: friendname })
                if (!(friend == undefined && friend == null)) {
                    db.get().collection(collection.FRIENDS).updateOne({ username: friendname }, {
                        $push: { 'reqs': username }
                    })
                } else {
                    db.get().collection(collection.FRIENDS).insertOne({ username: friendname, friends: [], reqs: [username] })
                }
            } catch (e) {
                reject(e)
            }
        })
    },
    acceptReq: (username, friendname) => {
        return new Promise(async (resolve, reject) => {
            try {
                const friend = await db.get().collection(collection.FRIENDS).findOne({ username })
                if (!(friend == undefined && friend == null)) {
                    if (!(friend?.freinds?.includes(friendname))) {
                        reject(new Error("No friend requiest wih this id"))
                    } else {
                        await db.get().collection(collection.FRIENDS).updateOne({ username }, {
                            $pop: { reqs: friendname }, $push: { friends: friendname }
                        })
                        await db.get().collection(collection.FRIENDS).updateOne({ friendname }, {
                            $push: { friends: username }
                        })
                        resolve()
                    }
                } else {
                    await db.get().collection(collection.FRIENDS).insertOne({ username, freinds: [friendname], reqs: [] })
                    resolve()
                }
            } catch (e) {
                reject(e)
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
        return new Promise((resolve, reject) => {
            try {
                db.get().collection(collection.FRIENDS).updateOne({ username }, {
                    $pull: { freinds: friendname }
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
