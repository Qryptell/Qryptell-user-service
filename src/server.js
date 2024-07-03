/*
				Copyright © 2023 LunarLoom 
LunarLoom Web Socket Service - WebSocket Service for LunarLoom End To End Encrypted Chat App

*/

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter, friendRouter } from './router.js'
import db from './configurations/mongodb.js'

const app = express()

dotenv.config()
app.use(express.json())
app.use(cors({ origin: [process.env.CLIENT_URL], credentials: true }))
app.use('/user', userRouter)
app.use('/friend', friendRouter)

db.connect(err =>  {
    if (err)  {
        throw err
    }
    console.log("Database Connected : MongoDB")
})

app.listen(process.env.PORT, (err) => {
    if (err) {
        throw err
    }
    console.log('Server start on port : ' + process.env.PORT)
})
