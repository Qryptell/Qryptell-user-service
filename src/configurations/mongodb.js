import { MongoClient } from "mongodb"
import dotenv from 'dotenv'
const state = {
    db: null
}
dotenv.config()
const url = process.env.MONGO_URL
const dbName = "lunarloom_user"
const client = new MongoClient(url)
const connect = async (cb) => {
    try {
        await client.connect()
        const db = client.db(dbName)
        state.db = db
        return cb()
    } catch (err) {
        return cb(err)
    }
}
const get = () => state.db
export default {
    connect,
    get,
}