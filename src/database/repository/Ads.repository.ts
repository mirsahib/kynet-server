import client from "../database";
import { ObjectId } from "mongodb";

export interface IAds {
	catagory: string;
	location: string;
	title: string;
	description: string;
	image: string;
	postedBy:ObjectId
	created?: Date;
	updated?: Date;
}

const createAds = async (adsData: IAds) => {
	adsData.created = new Date();
	adsData.updated = new Date();
	return await client?.db("kynet").collection("ads").insertOne(adsData);
};

const findOneAds = async (id: string) => {
	const objectId = new ObjectId(id);
	return await client
		?.db("kynet")
		.collection("ads")
		.findOne({ _id: objectId });
};
const findAdsByCatagory = async (key: string) => {
	console.log('catagory',key)
	return await client
		?.db("kynet")
		.collection("ads")
		.find({ "catagory": key }).toArray();
};

const findAllAds = async () => {
	return await client?.db("kynet").collection("ads").find().toArray();
};

export { createAds, findOneAds, findAllAds,findAdsByCatagory };
