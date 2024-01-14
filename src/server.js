/*
				Copyright © 2023 LunarLoom 
LunarLoom Web Socket Service - WebSocket Service for LunarLoom End To End Encrypted Chat App

*/

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './router.js'
import db from './configurations/mongodb.js'

const app = express()

dotenv.config()
app.use(cors())
app.use('/',router)

db.connect((err)=>err?console.log(err):console.log("Database Connected : MongoDB"))
app.listen(4001,(err)=>err?console.log(err):console.log('Server start on port : 4001'))