import { NextFunction, Request, Response } from "express";
import {
	createAds,
	findOneAds,
    findAllAds,
	IAds,
	findAdsByCatagory,
} from "../database/repository/Ads.repository";
import handleError from "../util/errorHandles";
import { v2 as cloudinary } from "cloudinary";
import { ProfileRequest } from "./auth.controller";

cloudinary.config({
	cloud_name: "dfdmsw4lg",
	api_key: "117463879357159",
	api_secret: "VHN7mjO5KDXvFiI07Tr-zqF2Ijc",
});

interface RequestParams {
	adsId?: string;
	catagory?: string;
}

const create = async (req: ProfileRequest, res: Response) => {
	try {
		const ads = await createAds({...req.body,postedBy:req?.userId});
		res.status(200).json({ message: "Ads publish succesfully", data: ads });
	} catch (error) {
		return res.status(500).json(handleError(error));
	}
};
const read= async (req: Request<RequestParams>, res: Response) => {
    return res.json({"ads":req.body.data})
}

const list = async (req: Request, res: Response) => {
    try {
        const allAds = await findAllAds()
        return res.status(200).json({ads:allAds})
    } catch (error) {
        return res.status(500).json(handleError(error));
    }
}

const findAdsbyId = async (req: Request<RequestParams>, res: Response,next:NextFunction) => {
	try {
        console.log('params',req.params.adsId)
		let ads = null
		if(req.params.adsId){
			ads = await findOneAds(req.params.adsId);
		}
        if(!ads){
            return res.status(401).json({
				error: "ads not found",
			});
        }
        req.body.data = ads
        next()
        //res.status(200).json({ads:ads});
	} catch (error) {
        return res.status(500).json(handleError(error));
    }
};

const findAdsbyCatagory = async (req: Request<RequestParams>, res: Response,next:NextFunction) => {
	try {
        console.log('params catagory',req.params.catagory)
		let ads = null;
		if(req.params.catagory){
			ads = await findAdsByCatagory(req.params.catagory);
		}
        if(!ads){
            return res.status(401).json({
				error: "ads not found",
			});
        }
        req.body.data = ads
        next()
        //res.status(200).json({ads:ads});
	} catch (error) {
        return res.status(500).json(handleError(error));
    }
}


const uploadImage = async (
	req: Request<{}, {}, IAds>,
	res: Response,
	next: NextFunction
) => {
	if (req.file) {
		try {
			const buf = req.file.buffer.toString("base64");
			const res = await cloudinary.uploader.upload(
				"data:image/png;base64," + buf,
				{
					upload_preset: "kynet",
					folder: "kynet",
					public_id: `${Date.now()}`,
					resource_type: "auto",
				}
			);
			req.body.image = res.url;
			next();
		} catch (error) {
			console.log("upload error", error);
			return res.status(500).json(handleError(error));
		}
	} else {
		return res.status(400).json({
			error: {
				name: "ValidationError",
				message: "image is required",
			},
		});
	}
};

export default {
	create,
    read,
    list,
	findAdsbyId,
	findAdsbyCatagory,
	uploadImage,
};
