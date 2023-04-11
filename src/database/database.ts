import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
// MONGODB_URI=mongodb
// MONGOHOST=kynet_database
// MONGOPORT=27017
// MONGOUSER=root
// MONGOPASSWORD=root
const uri = process.env.MONGO_URL || "mongodb://root:root@kynet_database:27017/kynet"
const client = new MongoClient(uri);

const connect = async () => {
	try {
		console.log("mongo_uri", uri);
		await client.connect();
		console.log(" Database connection established successfully");
	} catch (error) {
		console.log("Mongodb connection error:" + error);
	}
};
connect();

export default client;
