import { Router } from "express"
import userController from './controllers/userController.js'
import friendsControllers from "./controllers/friendsController.js"

const userRouter = Router()

userRouter.post('/:key/create', (req, res) => {
    const { userId, username } = req.body
    userController.createUser(userId, username).then(() => {
        res.status(200).json({ success: true, message: 'user created Successfully' })
    }).catch(() => {
        res.status(500).json({ success: false, message: 'something went wrong , please try again later' })
    })
})

userRouter.get('/:userId', async (req, res) => {
    const { userId } = req.params
    try {
        const user = await userController.getUser(userId)
        res.status(200).json({ success: true, user })
    } catch (e) {
        res.status(500).json({ success: false, message: 'something went wrong , please try again later' })
    }
})

userRouter.delete('/:key/:userId', (req, res) => {
    const { userId } = req.body
    userController.deleteUser(userId).then(() => {
        res.status(200).json({ success: true, message: 'User deleted Successfully' })
    }).catch(() => {
        res.status(500).json({ success: false, message: 'Something went wrong , please try again later' })
    })
})

userRouter.patch('/block', (req, res) => {
    const { userId, blockedUserId } = req.body
    userController.blockUser(userId, blockedUserId).then(() => {
        res.status(200).json({ success: true, message: 'Blcked User Successfully' })
    }).catch((e) => {
        res.status(422).json({ success: false, message: e.message })
    })
})

userRouter.patch('/unblock', (req, res) => {
    const { userId, blockUserId } = req.body
    userController.unBlockUser(userId, blockUserId).then(() => {
        res.status(200).json({ success: true, message: 'Unblocked user Successfully' })
    }).catch(() => {
        res.status(422).json({ success: false, message: 'Something went wrong , please try again later' })
    })
})

const friendRouter = Router()
friendRouter.patch('/add', (req, res) => {
    const { userId, friendId } = req.body
    friendsControllers.addFriend(userId, friendId).then(() => {
        res.status(200).json({ success: true, message: 'Friend added successfully' })
    }).catch((e) => {
        res.status(422).json({ success: false, message: e.message })
    })
})

friendRouter.get('/:userId', (req, res) => {
    const { userId } = req.params
    friendsControllers.getFriends(userId).then((friends) => {
        res.status(200).json({ success: true, friends })
    }).catch(() => { })
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
