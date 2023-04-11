import { MongoClient } from "mongodb";

const uri = "mongodb://root:root@kynet_database:27017/kynet"
const client = new MongoClient(uri) 

const connect = async()=>{
    try {
        await client.connect()
        console.log(" Database connection established successfully")
    } catch (error) {
        console.log("Mongodb connection error:"+error)
    }
}
connect()

export default client