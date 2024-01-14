import { Router } from "express"
import userController from './controllers/userController.js'
import friendsControllers from "./controllers/friendsController.js"

const router = Router()

router.post('/:key/create-user', (req, res) => {
    const { userId, username } = req.body
    userController.createUser(userId, username).then(() => {
        res.status(200).json({ success: true, message: 'user created Successfully' })
    }).catch(() => {
        res.status(500).json({ success: false, message: 'something went wrong , please try again later' })
    })
})

router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params
    try {
        const user = await userController.getUser(userId)
        res.status(200).json({ success: true, user })
    } catch (e) {
        res.status(500).json({ success: false, message: 'something went wrong , please try again later' })
    }
})

router.delete('/:key/user/:userId', (req, res) => {
    const { userId } = req.body
    userController.deleteUser(userId).then(() => {
        res.status(200).json({ success: true, message: 'User deleted Successfully' })
    }).catch(() => {
        res.status(500).json({ success: false, message: 'Something went wrong , please try again later' })
    })
})

router.patch('/block-user', (req, res) => {
    const { userId, blockedUserId } = req.body
    userController.blockUser(userId, blockedUserId).then(() => {
        res.status(200).json({ success: true, message: 'Blcked User Successfully' })
    }).catch((e) => {
        res.status(422).json({ success: false, message: e.message })
    })
})

router.patch('/add-friend', (req, res) => {
    const { userId, friendId } = req.body
    friendsControllers.addFriend(userId, friendId).then(() => {
        res.status(200).json({ success: true, message: 'Friend added successfully' })
    }).catch((e) => {
        res.status(422).json({ success: false, message: e.message })
    })
})

router.get('/friends/:userId', (req, res) => {
    const { userId } = req.params
    friendsControllers.getFriends(userId).then((friends) => {
        res.status(200).json({ success: true, friends })
    }).catch(() => { })
})

router.patch('/remove-friend', (req, res) => {
    const { userId, friendId } = req.body
    friendsControllers.removeFriend(userId, friendId).then(() => {
        res.status(200).json({ success: true, message: 'Friend removed Successfully' })
    }).catch((e) => {
        res.status(422).json({ success: false, message: e.message })
    })
})

export default router