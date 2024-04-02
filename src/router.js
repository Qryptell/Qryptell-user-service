import { Router } from "express"
import userController from './controllers/userController.js'
import friendsControllers from "./controllers/friendsController.js"
import jsonwebtoken from "jsonwebtoken"

const userRouter = Router()

const checkLogin = (req,res,next) => {
    const t = req.headers.authorization
    const token = t.split(" ")[1]
    if (!token) {
        res.status(401).json("Not logged In")
        return
    }
    const secret = process.env.SECRET
    const auth = jsonwebtoken.verify(token, secret)
    req.userId = auth.userId
    req.username = auth.username
    next()
}

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

userRouter.patch('/block',checkLogin, (req, res) => {
    const userId = req.userId
    const { blockUserId } = req.body
    if (!(userId && blockUserId)) {
        return res.status(422).json({ success: false, message: "UserId or BlockUserId is missing" })
    }
    userController.blockUser(userId, blockUserId).then(() => {
        res.status(200).json({ success: true, message: 'Blcked User Successfully' })
    }).catch((e) => {
        res.status(422).json({ success: false, message: e.message })
    })
})

userRouter.patch('/unblock', checkLogin,(req, res) => {
    const userId = req.userId
    const { blockUserId } = req.body
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

friendRouter.patch('/request', checkLogin,(req, res) => {
    const userId = req.userId
    const { friendId } = req.body
    friendsControllers.requiestToFriend(userId, friendId).then(() => {
        res.status(200).json({ success: true, message: 'Requiest,waiting for response' })
    }).catch((e) => {
        res.status(500).json({ success: false, message: e.message })
    })
})

friendRouter.patch('/accept', checkLogin,(req, res) => {
    const userId = req.userId
    const { friendId } = req.body
    friendsControllers.acceptReq(userId, friendId).then(() => {
        res.status(200).json({ success: true, message: 'Requiest Accepted successfully' })
    }).catch((e) => {
        res.status(422).json({ success: false, message: e.message })
    })
})

friendRouter.get('/reqs/', checkLogin, (req, res) => {
    const userId = req.userId
    friendsControllers.getFriendReqs(userId).then((reqs) => {
        res.status(200).json({ success: true, reqs })
    }).catch(() => {
        res.status(500).json({ success: false, message: "Somthing Went Wrong!" })
    })
})

friendRouter.get('/', checkLogin, (req, res) => {
    const userId = req.userId
    friendsControllers.getFriends(userId).then((friends) => {
        res.status(200).json({ success: true, friends })
        return
    }).catch((e) => {
        res.status(500).json({ success: false, message: "Somthing Went Wrong!" })
    })
})

friendRouter.patch('/remove', checkLogin,(req, res) => {
    const userId = req.userId
    const { friendId } = req.body
    friendsControllers.removeFriend(userId, friendId).then(() => {
        res.status(200).json({ success: true, message: 'Friend removed Successfully' })
    }).catch((e) => {
        res.status(422).json({ success: false, message: e.message })
    })
})


export { userRouter, friendRouter }
