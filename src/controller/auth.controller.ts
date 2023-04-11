import { NextFunction, Request, Response } from "express";
import {
	findUser,
	findUserById,
	IUser,
	verifyPassword,
} from "../database/repository/user.repository";
import authSchema from "../database/schema/AuthSchema";
import jwt, { JwtPayload } from "jsonwebtoken";
import handleError from "../util/errorHandles";
import config from "../../config/config"
import { ObjectId } from "mongodb";

interface TokenInterface extends JwtPayload {
	_id:string,
}
export interface ProfileRequest extends Request{
	userId?:ObjectId
}

const login = async (req: Request<{}, {}, IUser>, res: Response) => {
	try {
		const user = await findUser(req.body);
		if (!user) {
			return res.status(401).json({
				error: {name:'UnauthorizedError',message:"User not found"},
			});
		}
		const isMatch = await verifyPassword(req.body.password, user.password);
		if (!isMatch) {
			return res.status(401).json({
				error: {name:'UnauthorizedError',message:"Email and password don't match."},
			});
		}
		const token = jwt.sign({ _id: user._id }, config.jwtSecret);
		const expiryDate = new Date(Number(new Date()) + 172800000);
		res.cookie("token", token, {
			expires: expiryDate,
			httpOnly: true,
			secure:true,
			// sameSite:'none'
		});

		return res.json({
			message:"Login successful",
			id:user._id
		});
	} catch (error) {
		return res.status(500).json(handleError(error));
	}
};

const requireSignin = async (req: ProfileRequest, res: Response, next: NextFunction) => {
	try {
		
		const decoded = jwt.verify(req.cookies.token,config.jwtSecret) as TokenInterface
		const user = await findUserById(decoded._id)
		if (!user) {
			return res.status(401).json({
				error: {name:'UnauthorizedError',message:"User not found"},
			});
		}else{
			req.userId = user._id
		}
		next()
	} catch (error) {
		return res.status(500).json(handleError(error));
	}
};

const validateAuth = (req: Request, res: Response, next: NextFunction) => {
	const { error } = authSchema.validate(req.body);
	console.log("validation", error);
	if (error) {
		console.log("error");
		return res.status(400).json(handleError(error));
	}
	next();
};

export default {
	login,
	validateAuth,
	requireSignin
};
