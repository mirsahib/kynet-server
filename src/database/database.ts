import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.MONGO_URI || ''
const client = new MongoClient(uri) 

const connect = async()=>{
    try {
        console.log('mongo_uri',uri)
        await client.connect()
        console.log(" Database connection established successfully")
    } catch (error) {
        console.log("Mongodb connection error:"+error)
    }
}
connect()

export default client