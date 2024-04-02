import { Router } from "express"
import userController from './controllers/userController.js'
import friendsControllers from "./controllers/friendsController.js"

const userRouter = Router()

userRouter.post('/private/create', (req, res) => {
    const { username,name,userId } = req.body
    userController.createUser(username,name,userId).then(() => {
        res.status(200).json({ success: true, message: 'User created Successfully' })
    }).catch(() => {
        res.status(500).json({ success: false, message: 'Something went wrong , please try again later' })
    })

})

userRouter.get('/:userId', async (req, res) => {
    const { userId } = req.params
    try {
        const user = await userController.getUser(userId)
        if (user) {
            res.status(200).json({ success: true, user })
        } else {
            res.status(404).json({ success: false, message: "User not found" })
        }
    } catch (e) {
        res.status(500).json({ success: false, message: 'something went wrong , please try again later' })
    }
})

userRouter.delete('/private/:userId', (req, res) => {
    const { userId } = req.params
    userController.deleteUser(userId).then(() => {
        res.status(200).json({ success: true, message: 'User deleted Successfully' })
    }).catch(() => {
        res.status(500).json({ success: false, message: 'Something went wrong , please try again later' })
    })

})

userRouter.patch('/block', (req, res) => {
    const { userId, blockUserId } = req.body
    if (!(userId && blockUserId)) {
        return res.status(422).json({ success: false, message: "UserId or BlockUserId is missing" })
    }
    userController.blockUser(userId, blockUserId).then(() => {
        res.status(200).json({ success: true, message: 'Blcked User Successfully' })
    }).catch((e) => {
        res.status(422).json({ success: false, message: e.message })
    })
})

userRouter.patch('/unblock', (req, res) => {
    const { userId, blockUserId } = req.body
    if (!(userId && blockUserId)) {
        return res.status(422).json({ success: false, message: "UserId or BlockUserId is missing" })
    }
    userController.unBlockUser(userId, blockUserId).then(() => {
        res.status(200).json({ success: true, message: 'Unblocked user Successfully' })
    }).catch(() => {
        res.status(422).json({ success: false, message: 'Something went wrong , please try again later' })
    })

})

const friendRouter = Router()

friendRouter.patch('/requiest', (req, res) => {
    const { userId, friendId } = req.body
    friendsControllers.requiestToFriend(userId, friendId).then(() => {
        res.status(200).json({ success: true, message: 'Requiest,waiting for response' })
    }).catch((e) => {
        res.status(500).json({ success: false, message: e.message })
    })
})

friendRouter.patch('/accept', (req, res) => {
    const { userId, friendId } = req.body
    friendsControllers.acceptReq(userId, friendId).then(() => {
        res.status(200).json({ success: true, message: 'Requiest Accepted successfully' })
    }).catch((e) => {
        res.status(422).json({ success: false, message: e.message })
    })
})

friendRouter.get('/reqs/:userId', (req, res) => {
    const { userId } = req.params
    friendsControllers.getFriendReqs(userId).then((reqs) => {
        res.status(200).json({ success: true, reqs })
    }).catch(() => {
        res.status(500).json({ success: false, message: "Somthing Went Wrong!" })
    })
})

friendRouter.get('/:userId', (req, res) => {
    const { userId } = req.params
    friendsControllers.getFriends(userId).then((friends) => {
        res.status(200).json({ success: true, friends })
    }).catch(() => {
        res.status(500).json({ success: false, message: "Somthing Went Wrong!" })
    })
})

friendRouter.patch('/remove', (req, res) => {
    const { userId, friendId } = req.body
    friendsControllers.removeFriend(userId, friendId).then(() => {
        res.status(200).json({ success: true, message: 'Friend removed Successfully' })
    }).catch((e) => {
        res.status(422).json({ success: false, message: e.message })
    })
})

export { userRouter, friendRouter }
