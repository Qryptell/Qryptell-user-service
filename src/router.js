import { Router } from "express"
import userController from './controllers/userController.js'
import friendsControllers from "./controllers/friendsController.js"

const userRouter = Router()

userRouter.post('/private/create', (req, res) => {
        const { username } = req.body
        userController.createUser( username).then(() => {
            res.status(200).json({ success: true, message: 'User created Successfully' })
        }).catch(() => {
            res.status(500).json({ success: false, message: 'Something went wrong , please try again later' })
        })

})

userRouter.get('/:username', async (req, res) => {
    const { username } = req.params
    try {
        const user = await userController.getUser(username)
        if (user) {
            res.status(200).json({ success: true, user })
        } else {
            res.status(404).json({ success: false, message: "User not found" })
        }
    } catch (e) {
        res.status(500).json({ success: false, message: 'something went wrong , please try again later' })
    }
})

userRouter.delete('/private/:username', (req, res) => {
    const { userId } = req.body
        userController.deleteUser(userId).then(() => {
            res.status(200).json({ success: true, message: 'User deleted Successfully' })
        }).catch(() => {
            res.status(500).json({ success: false, message: 'Something went wrong , please try again later' })
        })
    
})

userRouter.patch('/block', (req, res) => {
    const { username, blockUsername } = req.body
    if (!(username && blockUsername)) {
        return res.status(422).json({ success: false, message: "Username or BlockUsername is missing" })
    }
    userController.blockUser(username, blockUsername).then(() => {
        res.status(200).json({ success: true, message: 'Blcked User Successfully' })
    }).catch((e) => {
        res.status(422).json({ success: false, message: e.message })
    })
})

userRouter.patch('/unblock', (req, res) => {
    const { username, blockUsername } = req.body
    if (!(userId && blockUserId)) {
        return res.status(422).json({ success: false, message: "Username or BlockUsername is missing" })
    }
    userController.unBlockUser(username, blockUsername).then(() => {
        res.status(200).json({ success: true, message: 'Unblocked user Successfully' })
    }).catch(() => {
        res.status(422).json({ success: false, message: 'Something went wrong , please try again later' })
    })

})

const friendRouter = Router()

friendRouter.post('/requiest',(req,res)=>{
        const {username,friendname} = req.body
	friendsControllers.addFriend(username,friendname).then(()=>{
		res.status(200).json({success:true,message:'Requiested'})
	}).catch((e)=>{
		res.status(500).json({success:false,message:e.message})
	})
})

friendRouter.patch('/add', (req, res) => {
    const { username, friendname } = req.body
    friendsControllers.addFriend(username, friendname).then(() => {
        res.status(200).json({ success: true, message: 'Friend added successfully' })
    }).catch((e) => {
        res.status(422).json({ success: false, message: e.message })
    })
})

friendRouter.get('/:username', (req, res) => {
    const { username } = req.params
    friendsControllers.getFriends(username).then((friends) => {
        res.status(200).json({ success: true, friends })
    }).catch(() => { })
})

friendRouter.patch('/remove', (req, res) => {
    const { username, friendname } = req.body
    friendsControllers.removeFriend(username, friendname).then(() => {
        res.status(200).json({ success: true, message: 'Friend removed Successfully' })
    }).catch((e) => {
        res.status(422).json({ success: false, message: e.message })
    })
})

export { userRouter, friendRouter }
